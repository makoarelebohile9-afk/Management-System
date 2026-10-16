function DeleteModal({ student, onCancel, onConfirm }) {
  if (!student) return null;

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onCancel();
        }
      }}
    >
      <section
        className="modal confirm-modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-title"
      >
        <div className="delete-icon">!</div>

        <h2 id="delete-title">Delete student?</h2>

        <p>
          Are you sure you want to delete{" "}
          <strong>{student.fullName || "this student"}</strong>{" "}
          ({student.studentId || "No student ID"})?
          This action cannot be undone.
        </p>

        <div className="modal-actions">
          <button
            type="button"
            className="button button-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            type="button"
            className="button button-danger"
            onClick={onConfirm}
          >
            Yes, delete
          </button>
        </div>
      </section>
    </div>
  );
}

export default DeleteModal;