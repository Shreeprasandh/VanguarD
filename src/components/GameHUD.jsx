import React from 'react';

export default function GameHUD({ score, multiplier, wave, isMultiplayer, teamPlayers, health = 100, localPlayerId, localPlayerColor }) {
  // Filter out teammates and get local player color
  const teammates = isMultiplayer && teamPlayers ? teamPlayers.filter(p => p.socketId !== localPlayerId) : [];
  const localPlayer = isMultiplayer && teamPlayers ? teamPlayers.find(p => p.socketId === localPlayerId) : null;
  const localColor = localPlayer?.color || localPlayerColor || 'blue';

  // Sort players: Host first, then guests sorted alphabetically by socketId
  const sortedPlayers = isMultiplayer && teamPlayers ? [...teamPlayers].sort((a, b) => {
    if (a.isHost && !b.isHost) return -1;
    if (!a.isHost && b.isHost) return 1;
    return (a.socketId || '').localeCompare(b.socketId || '');
  }) : [];

  const getRgbColor = (color) => {
    if (color === 'red') return '207, 64, 66';
    if (color === 'green') return '46, 189, 89';
    return '74, 144, 226'; // blue / default
  };

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
            {isMultiplayer ? (
              // Multiplayer: Render exactly 3 slots to prevent alignment shifts
              [0, 1, 2].map((index) => {
                const player = sortedPlayers[index];
                if (player) {
                  const isSelf = player.socketId === localPlayerId;
                  const pHealth = isSelf ? health : (player.health !== undefined ? player.health : 100);
                  const pColor = player.color || 'blue';
                  const resolvedRgb = getRgbColor(pColor);
                  const opacityVal = isSelf ? 0.9 : 0.85;
                  const glowVal = isSelf ? 5 : 4;
                  return (
                    <div 
                      key={player.socketId} 
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem', width: '36px' }} 
                    >
                      <div 
                        style={{
                          width: '8px',
                          height: '112px',
                          border: `1px solid rgba(${resolvedRgb}, ${isSelf ? 0.55 : 0.35})`,
                          background: 'rgba(255, 255, 255, 0.03)',
                          borderRadius: '4px',
                          position: 'relative',
                          overflow: 'hidden',
                          opacity: opacityVal,
                          boxShadow: `0 0 ${glowVal}px rgba(${resolvedRgb}, ${isSelf ? 0.25 : 0.15})`
                        }}
                      >
                        <div 
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            height: `${Math.max(0, Math.min(100, pHealth))}%`,
                            background: `rgba(${resolvedRgb}, ${isSelf ? 0.45 : 0.35})`,
                            transition: 'height 0.15s ease'
                          }}
                        />
                      </div>
                      <span 
                        style={{ 
                          fontSize: '8px', 
                          fontFamily: 'var(--font-display)', 
                          color: `var(--neon-${pColor})`, 
                          letterSpacing: '0.5px',
                          fontWeight: 'bold',
                          opacity: isSelf ? 0.8 : 0.65
                        }}
                      >
                        {Math.max(0, Math.round(pHealth))}%
                      </span>
                    </div>
                  );
                } else {
                  // Render empty dashed slot placeholder to maintain fixed alignment
                  return (
                    <div 
                      key={`empty-slot-${index}`} 
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem', width: '36px' }} 
                    >
                      <div 
                        style={{
                          width: '8px',
                          height: '112px',
                          border: '1px dashed rgba(255, 255, 255, 0.12)',
                          background: 'rgba(255, 255, 255, 0.01)',
                          borderRadius: '4px',
                          position: 'relative'
                        }}
                      />
                      <span 
                        style={{ 
                          fontSize: '8px', 
                          fontFamily: 'var(--font-display)', 
                          color: 'rgba(255, 255, 255, 0.15)', 
                          letterSpacing: '0.5px',
                          fontWeight: 'bold'
                        }}
                      >
                        -
                      </span>
                    </div>
                  );
                }
              })
            ) : (
              // Single-player: Render only local player health
              (() => {
                const safeHealth = (typeof health === 'number' && !isNaN(health)) ? health : 100;
                const resolvedRgb = getRgbColor(localColor);
                return (
                  <div 
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem', width: '36px' }} 
                  >
                    <div 
                      style={{
                        width: '8px',
                        height: '112px',
                        border: `1px solid rgba(${resolvedRgb}, 0.45)`,
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '4px',
                        position: 'relative',
                        overflow: 'hidden',
                        opacity: 0.9,
                        boxShadow: `0 0 5px rgba(${resolvedRgb}, 0.2)`
                      }}
                    >
                      <div 
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          width: '100%',
                          height: `${Math.max(0, Math.min(100, safeHealth))}%`,
                          background: `rgba(${resolvedRgb}, 0.35)`,
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
                        opacity: 0.8
                      }}
                    >
                      {Math.max(0, Math.round(safeHealth))}%
                    </span>
                  </div>
                );
              })()
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
