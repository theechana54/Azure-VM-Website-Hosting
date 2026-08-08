# 🎓 STUDENT MANAGEMENT SYSTEM

A full-stack **MERN** (MongoDB, Express.js, React.js, Node.js) web application that allows educational institutions to digitally manage student records — built as part of the Web Development project at **Bishop Heber College**.

🔗 **Live Website:** https://azure-vm-website-hosting-nine.vercel.app
🔗 **Backend API:** https://azure-vm-website-hosting.onrender.com
🔗 **GitHub Repository:** https://github.com/theechana54/Azure-VM-Website-Hosting

---

## 📌 Objective

To develop a full-stack web application that enables educational institutions to efficiently manage student information — covering frontend development, backend development, database management, REST APIs, user authentication, and cloud deployment using the MERN Stack.

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Tailwind CSS, Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Authentication | JWT (JSON Web Token) |
| Deployment (Frontend) | Vercel |
| Deployment (Backend) | Render |
| Version Control | Git & GitHub |

---

## ✨ Features

- 🔐 User Registration & Login
- 🔑 JWT-based Authentication
- 👤 Role-Based Access Control (Admin / User)
- ➕ Student Registration (Add new student records)
- ✏️ Update Student Details
- 🗑️ Delete Student Records
- 🔍 Search & Filter Students (by name, roll no, email, department)
- 📊 Dashboard with Student Statistics
- 📱 Responsive UI (Desktop & Mobile)
- ✅ Form Validation
- 📥 Export Student Records to Excel
- 🌐 RESTful APIs
- 🗄️ MongoDB Database Integration

---

## 🏗️ Architecture

```
┌───────────────┐        HTTPS/REST API        ┌───────────────┐        MongoDB Driver       ┌───────────────┐
│   Frontend    │  ───────────────────────▶   │   Backend      │  ─────────────────────▶    │   Database    │
│  React + Vite │  ◀───────────────────────   │ Node/Express   │  ◀─────────────────────    │MongoDB Atlas  │
│ (Vercel Host) │        JSON Response         │ (Render Host)  │        Query Result        |  (studentDB)  |
└───────────────┘                              └────────────────┘                            └───────────────┘
```

See `Architecture Diagram/` folder for the detailed diagram.

---

## 🚀 Deployment Steps

### Backend (Render)
1. Pushed backend code (`Website Source Code/server`) to GitHub.
2. Created a new Web Service on [Render](https://render.com), connected to the GitHub repo.
3. Set Root Directory to `Website Source Code/server`.
4. Added environment variables: `PORT`, `MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRE`.
5. Deployed — live at `https://azure-vm-website-hosting.onrender.com`.

### Frontend (Vercel)
1. Imported the GitHub repo into [Vercel](https://vercel.com).
2. Set Root Directory to `Website Source Code/client`.
3. Added environment variable: `VITE_API_URL = https://azure-vm-website-hosting.onrender.com/api`.
4. Deployed — live at `https://azure-vm-website-hosting-nine.vercel.app`.

### Database (MongoDB Atlas)
1. Created a free MongoDB Atlas cluster.
2. Created database `studentDB`.
3. Whitelisted network access and created a database user.
4. Connected backend using the `MONGO_URI` connection string.

---

## 📸 Screenshots

> See the `Screenshots/` folder for full-size images.

| Page | Description |
|---|---|
| Register | New user account creation with role selection |
| Login | User login screen |
| Dashboard | Student list with statistics |
| Add Student | Form to add a new student record |
| Edit Student | Form to update an existing student record |
| Search & Filter | Searching/filtering student records |
| Excel Export | Exported student data in Excel format |

---

## 🎯 Learning Outcomes

Through this project, the following skills were developed:

- Building a complete MERN Stack application from scratch
- Designing and consuming RESTful APIs
- Implementing CRUD (Create, Read, Update, Delete) operations
- Implementing Authentication & Role-Based Authorization using JWT
- Connecting a React frontend to a Node/Express backend
- Managing a MongoDB Atlas cloud database
- Deploying a full-stack application to cloud platforms (Render & Vercel)
- Using Git & GitHub for version control and collaboration
- Debugging real-world deployment issues (CORS, environment variables, build configuration)

---

## 🔮 Future Enhancements

- Add pagination for large student datasets
- Add profile picture upload for students
- Add email notifications for account creation
- Add attendance tracking module
- Add data visualization (charts) on the dashboard
- Implement password reset via email

---

## 👩‍💻 Developed By

**Name:** Theechana R
**College:** Bishop Heber College
**Project:** Student Management System (Web Development)

---

## 📄 License

This project is developed for academic purposes as part of a college web development course.
