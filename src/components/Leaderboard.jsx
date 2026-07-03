import React from 'react';

export default function Leaderboard({ leaderboard, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="glass-panel modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Online Leaderboard</h2>
          <button className="modal-close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem', textAlign: 'left' }}>
          Showing players currently online. Score and level reset when the browser tab is closed.
        </p>

        {leaderboard.length === 0 ? (
          <p style={{ padding: '2rem 0', color: 'var(--text-secondary)' }}>No other players online.</p>
        ) : (
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>Rank</th>
                <th>Player</th>
                <th style={{ textAlign: 'right' }}>Score</th>
                <th style={{ textAlign: 'right' }}>Level</th>
                <th style={{ textAlign: 'center' }}>State</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((player, index) => (
                <tr key={index}>
                  <td className="rank">{index + 1}</td>
                  <td style={{ fontWeight: '500' }}>{player.username}</td>
                  <td style={{ textAlign: 'right', fontFamily: 'var(--font-display)', color: 'var(--neon-blue)' }}>
                    {player.score.toLocaleString()}
                  </td>
                  <td style={{ textAlign: 'right', fontFamily: 'var(--font-display)' }}>
                    {player.level}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span className={`status-badge ${player.state}`}>
                      {player.state}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <button className="btn btn-primary" style={{ marginTop: '1.5rem' }} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
