let students = JSON.parse(localStorage.getItem("students")) || [];

function saveStudents() {
  localStorage.setItem("students", JSON.stringify(students));
}

function renderTable() {
  const tbody = document.getElementById("studentTableBody");
  const search = document.getElementById("search").value.toLowerCase();
  tbody.innerHTML = "";

  students
    .filter(s => s.name.toLowerCase().includes(search) || s.reg.toLowerCase().includes(search))
    .forEach((s, i) => {
      const row = `<tr>
        <td>${s.name}</td>
        <td>${s.reg}</td>
        <td>${s.dept}</td>
        <td>${s.year}</td>
        <td>${s.marks}</td>
        <td class="actions">
          <button class="edit-btn" onclick="editStudent(${i})">Edit</button>
          <button class="delete-btn" onclick="deleteStudent(${i})">Delete</button>
        </td>
      </tr>`;
      tbody.innerHTML += row;
    });
}

document.getElementById("studentForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const reg = document.getElementById("reg").value;
  const dept = document.getElementById("dept").value;
  const year = document.getElementById("year").value;
  const marks = document.getElementById("marks").value;

  if (this.dataset.editIndex !== undefined) {
    students[this.dataset.editIndex] = { name, reg, dept, year, marks };
    delete this.dataset.editIndex;
  } else {
    students.push({ name, reg, dept, year, marks });
  }

  saveStudents();
  renderTable();
  this.reset();
});

function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this record?")) {
    students.splice(index, 1);
    saveStudents();
    renderTable();
  }
}

function editStudent(index) {
  const s = students[index];
  document.getElementById("name").value = s.name;
  document.getElementById("reg").value = s.reg;
  document.getElementById("dept").value = s.dept;
  document.getElementById("year").value = s.year;
  document.getElementById("marks").value = s.marks;
  document.getElementById("studentForm").dataset.editIndex = index;
}

document.getElementById("search").addEventListener("input", renderTable);

renderTable();
