const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "Meena@4690",
    database: "student_db"
});

db.connect((err) => {
    if (err) {
        console.log("Database connection failed");
        console.log(err);
    } else {
        console.log("Connected to MySQL database");
    }
});

app.post("/add-student", (req, res) => {
    const { name, email, course } = req.body;

    const sql = "INSERT INTO students (name, email, course) VALUES (?, ?, ?)";

    db.query(sql, [name, email, course], (err, result) => {
        if (err) {
            res.json({ message: "Error saving student" });
        } else {
            res.json({ message: "Student added successfully" });
        }
    });
});

app.get("/students", (req, res) => {
    const sql = "SELECT * FROM students";

    db.query(sql, (err, results) => {
        if (err) {
            res.json([]);
        } else {
            res.json(results);
        }
    });
});

app.listen(3000, () => {
    console.log("Server running on https://student-registration-id5p.onrender.com");
});
