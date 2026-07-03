import React, { useState } from 'react';
import { GameAudio } from '../game/audio';

export default function MainMenu({ username, shipColor, onStartSolo, onCreateRoom, onJoinRoom, onOpenLeaderboard, onOpenEditProfile }) {
  const [showTeamOptions, setShowTeamOptions] = useState(false);
  const [roomCodeInput, setRoomCodeInput] = useState('');

  const getShipSvg = (color) => {
    let strokeColor = 'var(--neon-blue)';
    if (color === 'red') strokeColor = 'var(--neon-red)';
    if (color === 'green') strokeColor = 'var(--neon-green)';

    return (
      <svg width="24" height="24" viewBox="0 0 40 40" style={{ filter: `drop-shadow(0 0 3px ${strokeColor})`, marginRight: '8px' }}>
        <path
          d="M 20 5 L 32 30 L 20 23 L 8 30 Z"
          fill="none"
          stroke={strokeColor}
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  const handleButtonClick = () => {
    GameAudio.play('click');
  };

  const handleJoin = (e) => {
    e.preventDefault();
    if (roomCodeInput.length === 4) {
      handleButtonClick();
      onJoinRoom(roomCodeInput.toUpperCase());
    }
  };

  return (
    <div className="glass-panel" style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <h1 className="game-title">Vanguar<span style={{ color: '#abb4c4' }}>D</span></h1>
      
      {/* Profile Card */}
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.02)', 
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '10px',
        padding: '0.8rem 1.2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {getShipSvg(shipColor)}
          <span style={{ fontWeight: '600', letterSpacing: '0.5px' }}>{username}</span>
        </div>
        <span 
          onClick={() => { handleButtonClick(); onOpenEditProfile(); }} 
          style={{ 
            fontSize: '0.8rem', 
            color: 'var(--neon-blue)', 
            cursor: 'pointer', 
            textTransform: 'uppercase',
            fontWeight: '600',
            letterSpacing: '0.5px'
          }}
        >
          Edit
        </span>
      </div>

      {!showTeamOptions ? (
        <>
          <button 
            className="btn btn-primary" 
            onClick={() => { handleButtonClick(); onStartSolo(); }}
          >
            Solo
          </button>
          
          <button 
            className="btn" 
            onClick={() => { handleButtonClick(); setShowTeamOptions(true); }}
          >
            Multiplayer
          </button>
          
          <button 
            className="btn" 
            style={{ 
              opacity: 0.45, 
              fontSize: '0.8rem', 
              padding: '0.4rem 1rem', 
              width: 'auto', 
              marginTop: '1.2rem',
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: 'none'
            }}
            onClick={() => { handleButtonClick(); onOpenLeaderboard(); }}
          >
            Leaderboard
          </button>
        </>
      ) : (
        <div style={{ animation: 'slideDown 0.3s ease' }}>
          <button 
            className="btn btn-primary" 
            onClick={() => { handleButtonClick(); onCreateRoom(); }}
          >
            Create Team Room
          </button>
          
          <form onSubmit={handleJoin} style={{ marginTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '1.2rem' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', textAlign: 'left', textTransform: 'uppercase', fontFamily: 'var(--font-display)', letterSpacing: '1px' }}>
              Join with Room Code
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                className="text-input"
                style={{ marginBottom: 0, textTransform: 'uppercase', fontFamily: 'var(--font-display)', letterSpacing: '2px', textAlign: 'center', fontSize: '1.2rem' }}
                placeholder="CODE"
                maxLength={4}
                value={roomCodeInput}
                onChange={(e) => setRoomCodeInput(e.target.value.replace(/[^a-zA-Z]/g, '').substring(0, 4))}
              />
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: 'auto', marginBottom: 0, padding: '0 1.5rem' }}
                disabled={roomCodeInput.length !== 4}
              >
                Join
              </button>
            </div>
          </form>

          <button 
            className="btn" 
            style={{ marginTop: '1.5rem', background: 'transparent', border: 'none' }}
            onClick={() => { handleButtonClick(); setShowTeamOptions(false); }}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
}
