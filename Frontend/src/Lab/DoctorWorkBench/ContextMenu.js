import React from 'react';
import './DoctorDashboard.css';

const ContextMenu = ({ x, y, onClose, onSelectStatus, onMouseLeave }) => {
  return (
    <div
      className="context-menu"
      style={{ top: y, left: x }}
      onMouseLeave={onMouseLeave}
    >
      <ul>

        <li onClick={() => onSelectStatus('ConsultingTime')}>Consulting Time</li>
        <li onClick={() => onSelectStatus('Completed')}>Completed</li>
      </ul>
    </div>
  );
};

export default ContextMenu;
