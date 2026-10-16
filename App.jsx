import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard.jsx";
import StudentTable from "./components/StudentTable.jsx";
import StudentModal from "./components/StudentModal.jsx";
import DeleteModal from "./components/DeleteModal.jsx";
import {
  buildDashboardStats,
  createStudentRecord,
  filterStudents,
  loadStoredStudents,
  removeStudentFromList,
  saveStudentsToStorage,
  updateStudentInList,
} from "./utils/studentHelpers.js";

// Starter records for the National University of Lesotho (NUL) demo data.
// Each record is an object; studentId/name/email/course are strings,
// age is a number and enrolled is a boolean.
const starterStudents = [
  {
    id: "nul-1",
    studentId: "NUL260001",
    fullName: "Relebohile Makoa",
    age: 21,
    email: "relebohile.makoa@nul.ac.ls",
    course: "Computer Science",
    enrolled: true,
  },
  {
    id: "nul-2",
    studentId: "NUL260002",
    fullName: "Reabetsoe Pelesa",
    age: 22,
    email: "reabetsoe.pelesa@nul.ac.ls",
    course: "Economics",
    enrolled: true,
  },
  {
    id: "nul-3",
    studentId: "NUL260003",
    fullName: "Tebello Mabeleng",
    age: 20,
    email: "tebello.mabeleng@nul.ac.ls",
    course: "General Nursing",
    enrolled: false,
  },
  {
    id: "nul-4",
    studentId: "NUL260004",
    fullName: "Lerato Shale",
    age: 23,
    email: "lerato.shale@nul.ac.ls",
    course: "BSc General",
    enrolled: true,
  },
];

function App() {
  // useState: students is the single source of truth for the records.
  // `const` is used because the binding itself is never reassigned - only the
  // array it points to is replaced with a new one through setStudents.
  const [students, setStudents] = useState(() => loadStoredStudents(starterStudents));
  const [search, setSearch] = useState("");
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [deletingStudent, setDeletingStudent] = useState(null);
  const [notice, setNotice] = useState("");

  // Persist every change to localStorage, so records survive a page refresh.
  useEffect(() => {
    saveStudentsToStorage(students);
  }, [students]);

  // Derived state: recomputed on every render (array.filter / array.some).
  const filteredStudents = filterStudents(students, search);
  const stats = buildDashboardStats(students);

  // ---- Modal state handlers (event handlers) ----
  const openAddModal = () => {
    setEditingStudent(null);
    setShowStudentModal(true);
  };

  const openEditModal = (student) => {
    setEditingStudent(student);
    setShowStudentModal(true);
  };

  const closeStudentModal = () => {
    setShowStudentModal(false);
    setEditingStudent(null);
  };

  const openDeleteModal = (studentId) => {
    const student = students.find((item) => item.id === studentId);

    if (student) {
      setDeletingStudent(student);
    }
  };

  // ---- CRUD operations ----
  // Add a new student, or update the one being edited.
  const saveStudent = (formData) => {
    if (editingStudent) {
      setStudents((previousStudents) =>
        updateStudentInList(previousStudents, editingStudent.id, formData)
      );
      setNotice("Student record updated successfully.");
    } else {
      const newStudent = createStudentRecord(formData);
      setStudents((previousStudents) => [...previousStudents, newStudent]);
      setNotice("Student added successfully.");
    }

    closeStudentModal();
  };

  // Delete a student after the user confirms in the delete modal.
  const confirmDelete = () => {
    if (!deletingStudent) return;

    setStudents((previousStudents) =>
      removeStudentFromList(previousStudents, deletingStudent.id)
    );

    setNotice("Student deleted successfully.");
    setDeletingStudent(null);
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#home">
          <span className="brand-mark">N</span>

          <span>
            <strong>NUL StudentHub</strong>
            <small>National University of Lesotho</small>
          </span>
        </a>

        <p className="sidebar-label">WORKSPACE</p>

        <a className="nav-link active" href="#students">
          <span aria-hidden="true">▦</span>
          Student Records
        </a>

        <div className="sidebar-footer">
          <div className="profile-avatar">RM</div>

          <div>
            <strong>Relebohile Makoa</strong>
            <small>DIWA2110 · 2nd Year IT</small>
          </div>
        </div>
      </aside>

      <main className="main-content" id="home">
        <header className="topbar">
          <div>
            <p className="eyebrow">FACULTY OF INFORMATION AND COMMUNICATION TECHNOLOGY</p>

            <p className="breadcrumb">
              NUL Workspace / <strong>Student Records</strong>
            </p>
          </div>

          <span className="semester-badge">Semester 3</span>
        </header>

        <section className="page-heading" id="students">
          <div>
            <p className="eyebrow">STUDENT ADMINISTRATION</p>

            <h1>Student Management</h1>

            <p className="page-description">
              Manage student profiles, courses, ages, emails,
              and enrollment records at the National University of Lesotho.
            </p>
          </div>

          <button
            type="button"
            className="button button-primary"
            onClick={openAddModal}
          >
            <span aria-hidden="true">＋</span>
            Add Student
          </button>
        </section>

        {notice && (
          <div className="notice" role="status">
            <span>{notice}</span>

            <button
              type="button"
              className="notice-close"
              onClick={() => setNotice("")}
              aria-label="Dismiss notification"
            >
              ×
            </button>
          </div>
        )}

        <Dashboard stats={stats} />

        <section className="records-panel">
          <div className="records-heading">
            <div>
              <h2>All Students</h2>

              <p>
                Showing {filteredStudents.length} of{" "}
                {students.length} records
              </p>
            </div>

            <label className="search-box">
              <span aria-hidden="true">⌕</span>

              <input
                type="search"
                placeholder="Search students..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search by student ID, name, email, or course"
              />
            </label>
          </div>

          <StudentTable
            students={filteredStudents}
            onEdit={openEditModal}
            onDelete={openDeleteModal}
          />
        </section>

        <footer className="page-footer">
          <span>DIWA2110 · Web Application Development · Assignment 1</span>
          <span>Built by Relebohile Makoa · National University of Lesotho</span>
        </footer>
      </main>

      {showStudentModal && (
        <StudentModal
          key={editingStudent ? editingStudent.id : "add-student"}
          student={editingStudent}
          students={students}
          onClose={closeStudentModal}
          onSave={saveStudent}
        />
      )}

      {deletingStudent && (
        <DeleteModal
          student={deletingStudent}
          onCancel={() => setDeletingStudent(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}

export default App;
