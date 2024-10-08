import React from 'react';

const ConfirmationModal = ({ showModal, handleConfirm, handleCancel }) => {
  if (!showModal) return null; // Don't render anything if `showModal` is false

  return (
    <div className="confirmation-modal">
      <div className="confirmation-modal-content">
      <div className="modal-header">
          <p>Please confirm your action:</p> {/* Example content before h2 */}
        </div>
        <h2>Are you sure?</h2>
        <button onClick={handleConfirm}>Yes</button>
        <button onClick={handleCancel}>No</button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
