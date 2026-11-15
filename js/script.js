const menuToggle = document.getElementById("menu-toggle");
const navlinks = document.getElementById("nav-links");

if (menuToggle && navlinks) {
  menuToggle.addEventListener("click", function () {
    navlinks.classList.toggle("show");
  });
}

let students = [
  { id: 1, name: "John mbugua", age: 21, gender: "male", course: "web design", marks: 75 },
  { id: 2, name: "sharon wambui", age: 21, gender: "female", course: "Soft development", marks: 65 }
];

function getPerformance(marks) {
  if (marks >= 80) return { label: "Excellent", className: "badge-excellent" };
  if (marks >= 70) return { label: "Very Good", className: "badge-very-good" };
  if (marks >= 60) return { label: "Good", className: "badge-good" };
  if (marks >= 50) return { label: "Average", className: "badge-average" };
  return { label: "Failed", className: "badge-failed" };
}

function renderStudents(list = students) {
const studentlist = document.getElementById("student-list");
const noresultmsg = document.getElementById("no-result-message");
if (!studentlist) return;
  studentlist.innerHTML = "";

  if (list.length === 0) {
    if (noresultmsg) noresultmsg.textContent = "No matching student records found.";
    return;
  }

  if (noresultmsg) noresultmsg.textContent = "";

  list.forEach(function (student) {
    const perf = getPerformance(student.marks);
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.gender}</td>
      <td>${student.course}</td>
      <td>${student.marks}</td>
      <td><span class="badge ${perf.className}">${perf.label}</span></td>
      <td>
        <button class="btn-edit" data-id="${student.id}" type="button">Edit Marks</button>
        <button class="btn-delete" data-id="${student.id}" type="button">Delete</button>
      </td>
    `;

    const editBtn = row.querySelector(".btn-edit");
    const deleteBtn = row.querySelector(".btn-delete");

    if (editBtn) {
      editBtn.addEventListener("click", function () {
        updateMarks(student.id);
      });
    }

    if (deleteBtn) {
      deleteBtn.addEventListener("click", function () {
        deleteStudent(student.id);
      });
    }

    studentlist.appendChild(row);
  });
}

function updateDashboard() {
  const totalEl = document.getElementById("total-students");
  const passedEl = document.getElementById("passed-students");
  const failedEl = document.getElementById("failed-students");
  const averageEl = document.getElementById("average-marks");

  if (!totalEl || !passedEl || !failedEl || !averageEl) return;

  let total = students.length;
  let passed = 0;
  let failed = 0;
  let sumMarks = 0;

  for (let i = 0; i < students.length; i++) {
    sumMarks += students[i].marks;
    if (students[i].marks >= 50) {
      passed++;
    } else {
      failed++;
    }
  }

  let average = total > 0 ? (sumMarks / total).toFixed(1) : 0;

  totalEl.textContent = total;
  passedEl.textContent = passed;
  failedEl.textContent = failed;
  averageEl.textContent = average + "%";
}

const studentform = document.getElementById("student-form");
const formMessage = document.getElementById("form-message");

if (studentform) {
  studentform.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("student-name").value.trim();
    const age = Number(document.getElementById("student-age").value);
    const gender = document.getElementById("student-gender").value;
    const course = document.getElementById("student-course").value.trim();
    const marksInput = document.getElementById("student-mark").value;
    const marks = Number(marksInput);

    if (name === "" || gender === "" || course === "" || marksInput === "") {
      if (formMessage) {
        formMessage.textContent = "Error: please fill in all required fields.";
        formMessage.className = "message error-msg";
      }
      return;
    }

    if (isNaN(age) || age <= 0 || isNaN(marks) || marks < 0 || marks > 100) {
      if (formMessage) {
        formMessage.textContent = "Error: Marks must be between 0 and 100.";
        formMessage.className = "message error-msg";
      }
      return;
    }

    students.push({
      id: Date.now(),
      name: name,
      age: age,
      gender: gender,
      course: course,
      marks: marks
    });

    renderStudents();
    updateDashboard();

    if (formMessage) {
      formMessage.textContent = "Success! Student has been registered.";
      formMessage.className = "message success-msg";
    }

    studentform.reset();
  });
}

const searchinput = document.getElementById("searchinput");

if (searchinput) {
  searchinput.addEventListener("input", function () {
    const keyword = searchinput.value.toLowerCase().trim();
    const filtered = students.filter(function (student) {
      return student.name.toLowerCase().includes(keyword);
    });
    renderStudents(filtered);
  });
}

function updateMarks(id) {
  const student = students.find(function (s) {
    return s.id === id;
  });

  if (!student) return;

  const newMarks = Number(prompt("Enter new marks for " + student.name + " (0-100):"));

  if (isNaN(newMarks) || newMarks < 0 || newMarks > 100) {
    alert("Invalid marks! Please enter a number between 0 and 100.");
    return;
  }

  student.marks = newMarks;
  renderStudents();
  updateDashboard();
}

function deleteStudent(id) {
  students = students.filter(function (student) {
    return student.id !== id;
  });

  renderStudents();
  updateDashboard();
}

const contactform = document.getElementById("contact-form");
const contactstatus = document.getElementById("contact-message-status");

if (contactform) {
  contactform.addEventListener("submit", function (event) {
    event.preventDefault();

    const fullName = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const subject = document.getElementById("contact-subject").value.trim();
    const message = document.getElementById("contact-message").value.trim();

    if (!fullName || !email || !subject || !message) {
      if (contactstatus) {
        contactstatus.textContent = "Please fill in all contact form fields.";
        contactstatus.className = "message error-msg";
      }
      return;
    }

    if (contactstatus) {
      contactstatus.textContent = "Your message has been sent successfully.";
      contactstatus.className = "message success-msg";
    }

    contactform.reset();
  });
}


renderStudents();
updateDashboard();




