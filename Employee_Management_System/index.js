const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Load data
let employees = [];
if (fs.existsSync("data.json")) {
    employees = JSON.parse(fs.readFileSync("data.json"));
}

// Save data
function saveData() {
    fs.writeFileSync("data.json", JSON.stringify(employees, null, 2));
}

// Show Menu
function showMenu() {
    console.log("\n===== Employee Management System =====");
    console.log("1. Add Employee");
    console.log("2. View Employees");
    console.log("3. Update Employee");
    console.log("4. Delete Employee");
    console.log("5. Exit");

    rl.question("Enter your choice: ", handleMenu);
}

// Handle Menu
function handleMenu(choice) {
    switch (choice) {
        case "1":
            addEmployee();
            break;
        case "2":
            viewEmployees();
            break;
        case "3":
            updateEmployee();
            break;
        case "4":
            deleteEmployee();
            break;
        case "5":
            console.log("Exiting...");
            rl.close();
            break;
        default:
            console.log("Invalid choice!");
            showMenu();
    }
}

// Add Employee
function addEmployee() {
    rl.question("Enter ID: ", (id) => {
        rl.question("Enter Name: ", (name) => {
            rl.question("Enter Salary: ", (salary) => {

                if (!id || !name || isNaN(salary)) {
                    console.log("Invalid input!");
                    return showMenu();
                }

                employees.push({ id, name, salary: Number(salary) });
                saveData();
                console.log("Employee Added Successfully!");
                showMenu();
            });
        });
    });
}

// View Employees
function viewEmployees() {
    if (employees.length === 0) {
        console.log("No employees found.");
    } else {
        console.table(employees);
    }
    showMenu();
}

// Update Employee
function updateEmployee() {
    rl.question("Enter ID to update: ", (id) => {
        const emp = employees.find(e => e.id === id);

        if (!emp) {
            console.log("Employee not found!");
            return showMenu();
        }

        rl.question("Enter new Name: ", (name) => {
            rl.question("Enter new Salary: ", (salary) => {

                if (name) emp.name = name;
                if (!isNaN(salary)) emp.salary = Number(salary);

                saveData();
                console.log("Employee Updated Successfully!");
                showMenu();
            });
        });
    });
}

// Delete Employee
function deleteEmployee() {
    rl.question("Enter ID to delete: ", (id) => {
        employees = employees.filter(e => e.id !== id);
        saveData();
        console.log("Employee Deleted Successfully!");
        showMenu();
    });
}

showMenu();