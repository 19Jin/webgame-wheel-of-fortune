import React from 'react';
import './ConfirmBox.css';

const ConfirmBox = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal">
        <p className="confirm-modal-text">
          Game Over. 
          <p>
          Do you want to update this game score?
          </p>
        </p>
        <div className="confirm-modal-actions">
          <button onClick={onConfirm} className='confirm-button'>YES</button>
          <button onClick={onClose} className='confirm-button'>NO</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBox;