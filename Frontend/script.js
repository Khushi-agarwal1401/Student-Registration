async function addStudent() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const course = document.getElementById("course").value;

    if (name === "" || email === "" || course === "") {
        document.getElementById("message").innerText = "Please fill all fields";
        return;
    }

    const response = await fetch("http://localhost:3000/add-student", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email: email,
            course: course
        })
    });

    const data = await response.json();

    document.getElementById("message").innerText = data.message;

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("course").value = "";
}

async function getStudents() {
    const response = await fetch("http://localhost:3000/students");

    const students = await response.json();

    const studentList = document.getElementById("studentList");
    studentList.innerHTML = "";

    students.forEach(student => {
        const li = document.createElement("li");
        li.innerText = `${student.name} - ${student.email} - ${student.course}`;
        studentList.appendChild(li);
    });
}