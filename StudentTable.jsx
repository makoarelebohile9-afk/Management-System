
import React from "react";

function StudentTable({ students = [], onEdit, onDelete }) {
  const studentList = Array.isArray(students) ? students : [];

  return (
    <div className="student-table-container">
      <div className="student-table-wrapper">
        <table className="student-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Student ID</th>
              <th>Full Name</th>
              <th>Age</th>
              <th>Email Address</th>
              <th>Course of Study</th>
              <th>Enrollment</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {studentList.length > 0 ? (
              studentList.map((student, index) => (
                <tr key={student.id ?? student.studentId ?? index}>
                  <td>{index + 1}</td>

                  <td className="student-id">
                    {student.studentId || "N/A"}
                  </td>

                  <td className="student-name">
                    {student.fullName || "N/A"}
                  </td>

                  <td>{student.age ?? "N/A"}</td>

                  <td>{student.email || "N/A"}</td>

                  <td className="student-course">
                    {student.course || "N/A"}
                  </td>

                  <td>
                    <span
                      className={`enrollment-badge ${
                        student.enrolled
                          ? "enrolled"
                          : "not-enrolled"
                      }`}
                    >
                      {student.enrolled ? "Enrolled" : "Not Enrolled"}
                    </span>
                  </td>

                  <td>
                    <div className="student-table-actions">
                      <button
                        type="button"
                        className="student-edit-btn"
                        onClick={() => onEdit?.(student)}
                        aria-label={`Edit ${student.fullName || "student"}`}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="student-delete-btn"
                        onClick={() => onDelete?.(student.id)}
                        aria-label={`Delete ${student.fullName || "student"}`}
                        disabled={!student.id}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="student-empty-state">
                  <div className="empty-icon">▤</div>
                  <strong>No students found</strong>
                  <p>
                    Add a new student or change your search.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentTable;