let employees = JSON.parse(localStorage.getItem('employees')) || [];
let editIndex = -1;

document.getElementById('myform').addEventListener('submit', addEmployee);

// Function to add or update employee data
function addEmployee(event) {
    event.preventDefault();

    const employeeId = document.getElementById('employeeId').value;
    const employeeName = document.getElementById('employeeName').value;
    const employeePosition = document.getElementById('employeePosition').value;
    const contactNumber = document.getElementById('contactNumber').value;
    const joiningDate = document.getElementById('joiningDate').value;
    const salary = document.getElementById('salary').value;

    // Validation: Check if all fields are filled
    if (!employeeId || !employeeName || !employeePosition || !contactNumber || !joiningDate || !salary) {
        alert('Please fill in all the fields');
        return;
    }

    // Check if employeeId is unique when adding a new employee
    if (editIndex === -1 && employees.some(employee => employee.employeeId === employeeId)) {
        alert('This Employee ID already exists');
        return;
    }

    const employee = { employeeId, employeeName, employeePosition, contactNumber, joiningDate, salary };

    // Add or update employee in the array
    if (editIndex === -1) {
        employees.push(employee);
    } else {
        employees[editIndex] = employee;
        editIndex = -1;
    }

    // Save the employee data to localStorage
    localStorage.setItem('employees', JSON.stringify(employees));
    renderEmployeeList();

    // Reset form
    document.getElementById('myform').reset();
}

// Function to render employee list in the table
function renderEmployeeList() {
    const employeeList = document.getElementById('employeeList');
    employeeList.innerHTML = '';  // Clear previous rows

    employees.forEach((employee, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <th scope="row">${employee.employeeId}</th>
            <td>${employee.employeeName}</td>
            <td>${employee.employeePosition}</td>
            <td>${employee.contactNumber}</td>
            <td>${employee.joiningDate}</td>
            <td>${employee.salary}</td>
            <td style="display:flex ;">
                <button class="btn btn-warning btn-sm mx-1" onclick="editEmployee(${index})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteEmployee(${index})">Delete</button>
            </td>
        `;

        employeeList.appendChild(row);
    });
}

// Function to delete employee
function deleteEmployee(index) {
    if (confirm('Are you sure you want to delete this employee?')) {
        employees.splice(index, 1);
        localStorage.setItem('employees', JSON.stringify(employees));
        renderEmployeeList();
    }
}

// Function to edit employee
function editEmployee(index) {
    const employee = employees[index];

    document.getElementById('employeeId').value = employee.employeeId;
    document.getElementById('employeeName').value = employee.employeeName;
    document.getElementById('employeePosition').value = employee.employeePosition;
    document.getElementById('contactNumber').value = employee.contactNumber;
    document.getElementById('joiningDate').value = employee.joiningDate;
    document.getElementById('salary').value = employee.salary;

    editIndex = index; // Track which employee is being edited
}

// Load employees from localStorage when page loads
window.onload = function () {
    renderEmployeeList();
};