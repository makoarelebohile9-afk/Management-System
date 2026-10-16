import { useEffect, useState } from "react";
import {
  COURSE_OPTIONS,
  hasErrors,
  validateStudentForm,
} from "../utils/studentHelpers.js";

const emptyForm = {
  studentId: "",
  fullName: "",
  age: "",
  email: "",
  course: COURSE_OPTIONS[0],
  enrolled: true,
};

// Builds the starting form values: pre-filled when editing, blank when adding.
const buildInitialForm = (student) =>
  student
    ? {
        studentId: student.studentId ?? "",
        fullName: student.fullName ?? "",
        age: student.age ?? "",
        email: student.email ?? "",
        course: student.course || COURSE_OPTIONS[0],
        enrolled: student.enrolled ?? true,
      }
    : emptyForm;

function StudentModal({ student, students = [], onClose, onSave }) {
  // formData is an object (non-primitive); every field starts as a string
  // because values come from HTML inputs. age/enrolled are converted in
  // createStudentRecord before they are stored.
  // App re-mounts this modal with a key whenever the mode changes, so the
  // initial value is enough - no effect is needed to populate the form.
  const [formData, setFormData] = useState(() => buildInitialForm(student));

  const [errors, setErrors] = useState({});

  const isEditing = Boolean(student);

  // Controlled inputs: every keystroke updates the state object and clears
  // that field's error message.
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = validateStudentForm(formData, students, student?.id);
    setErrors(newErrors);

    if (hasErrors(newErrors)) return;

    onSave({
      ...formData,
      studentId: formData.studentId.trim(),
      fullName: formData.fullName.trim(),
      age: Number(formData.age),
      email: formData.email.trim(),
      course: formData.course.trim(),
      enrolled: Boolean(formData.enrolled),
    });
  };

  // Close the modal when the Escape key is pressed.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="student-modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="student-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="student-modal-title"
      >
        <div className="student-modal-header">
          <div>
            <p className="student-modal-eyebrow">
              STUDENT MANAGEMENT
            </p>

            <h2 id="student-modal-title">
              {isEditing ? "Edit Student" : "Add New Student"}
            </h2>

            <p>
              {isEditing
                ? "Update the student's information below."
                : "Enter the student's details below."}
            </p>
          </div>

          <button
            type="button"
            className="student-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="student-modal-body">
            <div className="student-form-group">
              <label htmlFor="studentId">Student ID *</label>

              <input
                id="studentId"
                name="studentId"
                type="text"
                placeholder="e.g. NUL260005"
                value={formData.studentId}
                onChange={handleChange}
                aria-invalid={Boolean(errors.studentId)}
                aria-describedby={
                  errors.studentId ? "studentId-error" : undefined
                }
              />

              {errors.studentId && (
                <span id="studentId-error" className="student-form-error">
                  {errors.studentId}
                </span>
              )}
            </div>

            <div className="student-form-group">
              <label htmlFor="fullName">Full Name *</label>

              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter full name"
                value={formData.fullName}
                onChange={handleChange}
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={
                  errors.fullName ? "fullName-error" : undefined
                }
              />

              {errors.fullName && (
                <span id="fullName-error" className="student-form-error">
                  {errors.fullName}
                </span>
              )}
            </div>

            <div className="student-form-row">
              <div className="student-form-group">
                <label htmlFor="age">Age *</label>

                <input
                  id="age"
                  name="age"
                  type="number"
                  min="16"
                  max="120"
                  step="1"
                  placeholder="e.g. 21"
                  value={formData.age}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.age)}
                  aria-describedby={errors.age ? "age-error" : undefined}
                />

                {errors.age && (
                  <span id="age-error" className="student-form-error">
                    {errors.age}
                  </span>
                )}
              </div>

              <div className="student-form-group">
                <label htmlFor="enrolled">Enrollment Status</label>

                <select
                  id="enrolled"
                  name="enrolled"
                  value={String(formData.enrolled)}
                  onChange={(event) =>
                    setFormData((previous) => ({
                      ...previous,
                      enrolled: event.target.value === "true",
                    }))
                  }
                >
                  <option value="true">Enrolled</option>
                  <option value="false">Not Enrolled</option>
                </select>
              </div>
            </div>

            <div className="student-form-group">
              <label htmlFor="email">Email Address *</label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="relebohile.makoa@nul.ac.ls"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? "email-error" : undefined
                }
              />

              {errors.email && (
                <span id="email-error" className="student-form-error">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="student-form-group">
              <label htmlFor="course">Course of Study *</label>

              <select
                id="course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                aria-invalid={Boolean(errors.course)}
              >
                {COURSE_OPTIONS.map((courseOption) => (
                  <option key={courseOption} value={courseOption}>
                    {courseOption}
                  </option>
                ))}
              </select>

              {errors.course && (
                <span className="student-form-error">
                  {errors.course}
                </span>
              )}
            </div>
          </div>

          <div className="student-modal-footer">
            <button
              type="button"
              className="student-btn student-btn-cancel"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="student-btn student-btn-save"
            >
              {isEditing ? "Save Changes" : "Add Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default StudentModal;