import React from 'react';

export default function GameHUD({ score, multiplier, wave, isMultiplayer, teamPlayers }) {
  return (
    <div className="hud-container">
      <div className="hud-top">
        {/* Left Side: Score & Multiplier */}
        <div className="hud-group">
          <span className="hud-label">Score</span>
          <span className="hud-value" style={{ color: 'var(--neon-blue)', textShadow: 'var(--shadow-blue)' }}>
            {score.toLocaleString()}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.2rem' }}>
            <span className="hud-label" style={{ marginRight: '0.4rem' }}>Multiplier</span>
            <span className="hud-value" style={{ fontSize: '1.1rem', color: multiplier > 1 ? 'var(--neon-yellow)' : 'var(--text-primary)' }}>
              x{multiplier}
            </span>
          </div>
        </div>

        {/* Right Side: Wave */}
        <div className="hud-group" style={{ alignItems: 'flex-end' }}>
          <span className="hud-label">Wave</span>
          <span className="hud-value" style={{ fontFamily: 'var(--font-display)', letterSpacing: '1px' }}>
            {wave}
          </span>
        </div>
      </div>

      {/* Bottom Side: Team Stats (Only in co-op mode) */}
      {isMultiplayer && teamPlayers && teamPlayers.length > 0 && (
        <div className="multi-player-health-bars">
          <span className="hud-label" style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Teammates</span>
          {teamPlayers.map((player) => {
            const health = player.health !== undefined ? player.health : 100;
            return (
              <div key={player.socketId} className="teammate-health-row">
                <span className="teammate-name" style={{ color: `var(--neon-${player.color})` }}>
                  {player.username}
                </span>
                <div className="health-bar-container">
                  <div 
                    className={`health-bar-fill ${player.color}`} 
                    style={{ width: `${Math.max(0, health)}%` }}
                  />
                </div>
                <span style={{ fontSize: '0.75rem', marginLeft: '0.5rem', fontFamily: 'var(--font-display)', width: '35px', textAlign: 'right' }}>
                  {Math.max(0, Math.round(health))}%
                </span>
                <span style={{ fontSize: '0.75rem', marginLeft: '0.8rem', color: 'var(--neon-blue)', width: '60px', textAlign: 'right' }}>
                  {player.score.toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
