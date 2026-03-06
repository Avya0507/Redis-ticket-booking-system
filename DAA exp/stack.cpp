#include<iostream>
using namespace std;
int stack[5], top = -1;

int main() {
// Push elements
stack[++top] = 10;
stack[++top] = 20;
stack[++top] = 30;

// Display stack
cout << "Stack elements:\n";
for (int i = top; i >= 0; i--)
cout << stack[i] << " ";

// Pop element
top--;

cout << "\nAfter pop operation:\n";
for (int i = top; i >= 0; i--)
cout << stack[i] << " ";

return 0;
}


