import streamlit as st
from ultralytics import YOLO
import sqlite3
from datetime import datetime
import folium
from streamlit_folium import st_folium
import tempfile
import os

# Load YOLO model
model = YOLO("best.pt")

# Database setup
conn = sqlite3.connect("garbage_data.db", check_same_thread=False)
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS detections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    location TEXT,
    garbage_count INTEGER,
    timestamp TEXT
)
""")
conn.commit()

# 🔥 RESET DATABASE EVERY TIME APP STARTS (FOR DEMO)
cursor.execute("DELETE FROM detections")
conn.commit()

# App title
st.title("Smart Waste Detection System")

# Upload image
uploaded_file = st.file_uploader("Upload Garbage Image", type=["jpg", "png", "jpeg"])

# Location selection
location = st.selectbox("Select Location", ["Area_A", "Area_B", "Area_C"])

# ---------------- DETECTION SECTION ---------------- #

if uploaded_file is not None:

    # Get file extension
    file_extension = os.path.splitext(uploaded_file.name)[1]

    # Save uploaded file temporarily
    with tempfile.NamedTemporaryFile(delete=False, suffix=file_extension) as tmp_file:
        tmp_file.write(uploaded_file.getbuffer())
        temp_file_path = tmp_file.name

    # Run YOLO detection
    results = model(temp_file_path)

    boxes = results[0].boxes
    garbage_count = len(boxes)

    # Save to database
    cursor.execute(
        "INSERT INTO detections (location, garbage_count, timestamp) VALUES (?, ?, ?)",
        (location, garbage_count, datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    )
    conn.commit()

    # Show result image
    result_image = results[0].plot()
    st.image(result_image, caption=f"Detected Garbage: {garbage_count}", use_column_width=True)

    st.success("Detection stored successfully!")

# ---------------- HOTSPOT ANALYSIS ---------------- #

st.header("Hotspot Analysis")

locations_coords = {
    "Area_A": (28.6139, 77.2090),
    "Area_B": (19.0760, 72.8777),
    "Area_C": (13.0827, 80.2707)
}

m = folium.Map(location=[22.0, 78.0], zoom_start=5)

for loc, coords in locations_coords.items():

    cursor.execute("SELECT SUM(garbage_count) FROM detections WHERE location=?", (loc,))
    total = cursor.fetchone()[0]

    if total is None:
        total = 0

    if total >= 5:
        color = "red"
        status = "HOTSPOT 🚨"
    else:
        color = "green"
        status = "Normal ✅"

    folium.Marker(
        location=coords,
        popup=f"{loc}: {status} (Total: {total})",
        icon=folium.Icon(color=color)
    ).add_to(m)

st_folium(m, width=700, height=500)
