import React from 'react';

export default function GameHUD({ score, multiplier, wave, isMultiplayer, teamPlayers, health = 100, localPlayerId, localPlayerColor }) {
  // Filter out teammates and get local player color
  const teammates = isMultiplayer && teamPlayers ? teamPlayers.filter(p => p.socketId !== localPlayerId) : [];
  const localPlayer = isMultiplayer && teamPlayers ? teamPlayers.find(p => p.socketId === localPlayerId) : null;
  const localColor = localPlayer?.color || localPlayerColor || 'blue';

  return (
    <div className="hud-container">
      <div className="hud-top">
        {/* Left Side: Score & Multiplier */}
        <div className="hud-group" style={{ opacity: 0.75 }}>
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

        {/* Right Side: Wave & Health Bar */}
        <div className="hud-group" style={{ alignItems: 'flex-end', gap: '0.4rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', opacity: 0.75 }}>
            <span className="hud-label">Wave</span>
            <span className="hud-value" style={{ fontFamily: 'var(--font-display)', letterSpacing: '1px' }}>
              {wave}
            </span>
          </div>

          {/* Vertical Health Bars container */}
          <div style={{ display: 'flex', flexDirection: 'row', gap: '0.6rem', alignItems: 'flex-end', marginTop: '1.6rem' }}>
            {/* Teammates' Health Bars (drawn on the left) */}
            {isMultiplayer && teammates.map((mate) => {
              const mateHealth = mate.health !== undefined ? mate.health : 100;
              const mateColor = mate.color || 'blue';
              return (
                <div 
                  key={mate.socketId} 
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }} 
                  title={`${mate.username}'s Integrity: ${Math.round(mateHealth)}%`}
                >
                  <div 
                    style={{
                      width: '8px',
                      height: '112px',
                      border: `1px solid var(--neon-${mateColor})`,
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: '4px',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: `0 0 5px rgba(${mateColor === 'red' ? '207, 64, 66' : mateColor === 'green' ? '46, 189, 89' : '74, 144, 226'}, 0.25)`
                    }}
                  >
                    <div 
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: `${Math.max(0, Math.min(100, mateHealth))}%`,
                        background: `var(--neon-${mateColor})`,
                        transition: 'height 0.15s ease'
                      }}
                    />
                  </div>
                  <span 
                    style={{ 
                      fontSize: '8px', 
                      fontFamily: 'var(--font-display)', 
                      color: `var(--neon-${mateColor})`, 
                      letterSpacing: '0.5px',
                      fontWeight: 'bold',
                      opacity: 0.75
                    }}
                  >
                    {Math.max(0, Math.round(mateHealth))}%
                  </span>
                </div>
              );
            })}

            {/* Local Player's Health Bar (drawn on the right) */}
            {(() => {
              const safeHealth = (typeof health === 'number' && !isNaN(health)) ? health : 100;
              return (
                <div 
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }} 
                  title={`Your Integrity: ${Math.round(safeHealth)}%`}
                >
                  <div 
                    style={{
                      width: '8px',
                      height: '112px',
                      border: `1px solid var(--neon-${localColor})`,
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: '4px',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: `0 0 5px rgba(${localColor === 'red' ? '207, 64, 66' : localColor === 'green' ? '46, 189, 89' : '74, 144, 226'}, 0.25)`
                    }}
                  >
                    <div 
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: `${Math.max(0, Math.min(100, safeHealth))}%`,
                        background: `var(--neon-${localColor})`,
                        transition: 'height 0.15s ease'
                      }}
                    />
                  </div>
                  <span 
                    style={{ 
                      fontSize: '8px', 
                      fontFamily: 'var(--font-display)', 
                      color: `var(--neon-${localColor})`, 
                      letterSpacing: '0.5px',
                      fontWeight: 'bold',
                      opacity: 0.95
                    }}
                  >
                    {Math.max(0, Math.round(safeHealth))}%
                  </span>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
