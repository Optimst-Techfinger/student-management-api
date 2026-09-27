
// In-memory database
// let students = [
//   {
//     id: 1,
//     name: "John Doe",
//     age: 20,
//     course: "Computer Science"
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     age: 22,
//     course: "Information Technology"
//   }
// ];

// Generate the next student ID
const express = require('express');
const app = express()
PORT = 3000;
let nextId = 0;

app.use(express.json()) //middleware to parse JSON request bodies
const studentInfo = []; // in memory array to store student information)

/* ADD A NEW STUDENT - POST /student */
app.post("/createstudents", (req, res) => {
  const { name, age, email, course, faculty, department } = req.body;

  // Validate required fields
  if (!name || !age || !email || !course || !faculty || !department) {
    return res.status(400).json({
      message: "Name, age, email, course, faculty, and department are required"
    });
  }

  const newStudent = {
    id: nextId++,
    name,
    age,
    email,
    course,
    faculty,
    department
  };

  studentInfo.push(newStudent);

  res.status(201).json({
    message: "Student created successfully",
    student: newStudent
  });
});


/* GET ALL STUDENTS - GET /students*/
app.get("/getallstudents", (req, res) => {
  res.send(studentInfo);
});

/* GET STUDENT BY ID - GET /students/:id*/
app.get("/students/:id", (req, res) => {
  const id = Number(req.params.id);

  const student = studentInfo.find((student) => student.id === id);

  if (!student) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  res.status(200).json(student);
});


/* UPDATE STUDENT - PUT /students/:id */

app.put("/students/:id", (req, res) => {
  const id = Number(req.params.id);

  const studentIndex = studentInfo.findIndex(
    (student) => student.id === id
  );

  if (studentIndex === -1) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  const { name, age,email, course, faculty, department } = req.body;

  // Update only the fields provided
  if (name !== undefined) {
    studentInfo[studentIndex].name = name;
  }

  if (age !== undefined) {
    studentInfo[studentIndex].age = age;
  }

  if (email !== undefined) {
    studentInfo[studentIndex].email = email;
  }

  if (course !== undefined) {
    studentInfo[studentIndex].course = course;
  }

  if (faculty !== undefined) {
    studentInfo[studentIndex].faculty = faculty;
  }

  if (department !== undefined) {
    studentInfo[studentIndex].department = department;
  }

  res.status(200).json({
    message: "Student updated successfully",
    student: studentInfo[studentIndex]
  });
});

/* DELETE STUDENT - DELETE /students/:id */
app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);

  const studentIndex = studentInfo.findIndex(
    (student) => student.id === id
  );

  if (studentIndex === -1) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  const deletedStudent = studentInfo.splice(studentIndex, 1);

  res.status(200).json({
    message: "Student deleted successfully",
    student: deletedStudent[0]
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


