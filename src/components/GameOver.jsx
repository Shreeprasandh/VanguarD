import React from 'react';
import { GameAudio } from '../game/audio';

export default function GameOver({ score, wave, isMultiplayer, teamPlayers, onReturnMenu }) {
  const handleReturn = () => {
    GameAudio.play('click');
    onReturnMenu();
  };

  return (
    <div className="modal-overlay">
      <div className="glass-panel" style={{ maxWidth: '480px', animation: 'fadeIn 0.5s ease-out' }}>
        <h1 className="game-title" style={{ color: 'var(--neon-red)', filter: 'drop-shadow(0 0 10px rgba(255, 51, 102, 0.4))', margin: '1rem 0' }}>
          DEFEATED
        </h1>
        
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.95rem', letterSpacing: '0.5px' }}>
          Your ship was vaporized by letter-bullet impacts.
        </p>

        <div className="stats-grid">
          <div className="stat-box">
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Final Score
            </div>
            <div className="value" style={{ color: 'var(--neon-blue)', textShadow: 'var(--shadow-blue)' }}>
              {score.toLocaleString()}
            </div>
          </div>
          <div className="stat-box">
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Waves Defeated
            </div>
            <div className="value">
              {wave - 1}
            </div>
          </div>
        </div>

        {isMultiplayer && teamPlayers && teamPlayers.length > 0 && (
          <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', padding: '1rem', marginBottom: '2rem', textAlign: 'left' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.8rem', fontWeight: 'bold' }}>
              Co-op Squad Summary
            </div>
            {teamPlayers.map((player) => (
              <div key={player.socketId} style={{ display: 'flex', justifyContent: 'between', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.4rem', borderBottom: '1px dashed rgba(255,255,255,0.03)', paddingBottom: '0.2rem' }}>
                <span style={{ color: `var(--neon-${player.color})`, fontWeight: '500' }}>
                  {player.username}
                </span>
                <span style={{ fontFamily: 'var(--font-display)', color: 'var(--neon-blue)' }}>
                  {player.score.toLocaleString()} pts
                </span>
              </div>
            ))}
          </div>
        )}

        <button className="btn btn-primary" onClick={handleReturn}>
          Return to Command Menu
        </button>
      </div>
    </div>
  );
}
