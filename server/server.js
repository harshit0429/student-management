const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let students = [];

// TEST ROUTE
app.get("/", (req, res) => {
    res.send("Student Management Server Running");
});

// ADD STUDENT
app.post("/add", (req, res) => {
    students.push(req.body);
    res.json({ message: "Student added" });
});

// GET ALL STUDENTS
app.get("/students", (req, res) => {
    res.json(students);
});

// DELETE STUDENT
app.delete("/delete/:index", (req, res) => {
    students.splice(req.params.index, 1);
    res.json({ message: "Student deleted" });
});

app.listen(5000, () => {
    console.log(https://student-management-backend-ysad.onrender.com

});
