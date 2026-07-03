import React, { useState } from 'react';

export default function ProfileEdit({ initialUsername, initialColor, onSave, onCancel }) {
  const [username, setUsername] = useState(initialUsername || '');
  const [color, setColor] = useState(initialColor || 'blue');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    onSave(username.trim(), color);
  };

  const getShipSvg = (shipColor) => {
    let strokeColor = 'var(--neon-blue)';
    if (shipColor === 'red') strokeColor = 'var(--neon-red)';
    if (shipColor === 'green') strokeColor = 'var(--neon-green)';

    return (
      <svg width="40" height="40" viewBox="0 0 40 40" style={{ filter: `drop-shadow(0 0 5px ${strokeColor})` }}>
        <path
          d="M 20 5 L 32 30 L 20 23 L 8 30 Z"
          fill="none"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <line x1="20" y1="23" x2="20" y2="10" stroke={strokeColor} strokeWidth="1.5" />
      </svg>
    );
  };

  return (
    <div className="modal-overlay">
      <div className="glass-panel modal-content">
        <div className="modal-header">
          <h2>Edit Profile</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="profile-title">Username</div>
          <input
            type="text"
            className="text-input"
            value={username}
            onChange={(e) => setUsername(e.target.value.substring(0, 15))}
            placeholder="Enter Username"
            maxLength={15}
            required
          />

          <div className="profile-title" style={{ marginBottom: '1rem' }}>Select Ship Color</div>
          <div className="ship-selector">
            <div
              className={`ship-option ${color === 'red' ? 'selected red' : ''}`}
              onClick={() => setColor('red')}
            >
              {getShipSvg('red')}
            </div>
            <div
              className={`ship-option ${color === 'blue' ? 'selected blue' : ''}`}
              onClick={() => setColor('blue')}
            >
              {getShipSvg('blue')}
            </div>
            <div
              className={`ship-option ${color === 'green' ? 'selected green' : ''}`}
              onClick={() => setColor('green')}
            >
              {getShipSvg('green')}
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
          
          {onCancel && (
            <button type="button" className="btn" onClick={onCancel} style={{ background: 'transparent', border: 'none' }}>
              Cancel
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
