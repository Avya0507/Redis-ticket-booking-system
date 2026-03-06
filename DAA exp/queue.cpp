#include <iostream>
using namespace std;

#define SIZE 5

class Queue {
    int arr[SIZE];
    int front, rear;

public:
    Queue() {
        front = -1;
        rear = -1;
    }

    void enqueue(int value) {
        if (rear == SIZE - 1) {
            cout << "Queue is Full\n";
            return;
        }

        if (front == -1) {
            front = 0;
        }

        rear++;
        arr[rear] = value;
        cout << value << " inserted\n";
    }

    void dequeue() {
        if (front == -1) {
            cout << "Queue is Empty\n";
            return;
        }

        cout << arr[front] << " removed\n";
        front++;

        if (front > rear) {
            front = rear = -1;
        }
    }

    void showFront() {
        if (front == -1) {
            cout << "Queue is Empty\n";
        } else {
            cout << "Front element: " << arr[front] << endl;
        }
    }

    void showRear() {
        if (rear == -1) {
            cout << "Queue is Empty\n";
        } else {
            cout << "Rear element: " << arr[rear] << endl;
        }
    }

    void display() {
        if (front == -1) {
            cout << "Queue is Empty\n";
            return;
        }

        cout << "Queue: ";
        for (int i = front; i <= rear; i++) {
            cout << arr[i] << " ";
        }
        cout << endl;
    }
};

int main() {
    Queue q;

    q.enqueue(10);
    q.enqueue(20);
    q.enqueue(30);

    q.display();

    q.showFront();
    q.showRear();

    q.dequeue();
    q.display();

    return 0;
}
