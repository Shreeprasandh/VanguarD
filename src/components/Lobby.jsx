import React from 'react';
import { GameAudio } from '../game/audio';

export default function Lobby({ roomCode, players, localPlayerId, onSelectColor, onStartGame, onLeaveRoom }) {
  const localPlayerInRoom = players.find(p => p.socketId === localPlayerId);
  const isHost = localPlayerInRoom?.isHost || false;
  const localPlayerColor = localPlayerInRoom?.color || null;

  // Track taken colors
  const takenColors = players.map(p => p.color).filter(Boolean);

  // Position slots
  const slots = [
    { position: 'center', label: 'Host (Center)' },
    { position: 'right', label: 'Player 2 (Right)' },
    { position: 'left', label: 'Player 3 (Left)' }
  ];

  const getPlayerInPosition = (pos) => {
    return players.find(p => p.position === pos);
  };

  const handleColorClick = (color) => {
    if (takenColors.includes(color) && localPlayerColor !== color) return;
    GameAudio.play('click');
    onSelectColor(color);
  };

  const handleStart = () => {
    GameAudio.play('click');
    onStartGame();
  };

  const handleLeave = () => {
    GameAudio.play('click');
    onLeaveRoom();
  };

  // Enable start button only when lobby has exactly 3 players and all selected colors
  const isLobbyFull = players.length === 3;
  const allPickedColors = players.every(p => p.color);
  const canStart = isHost && isLobbyFull && allPickedColors;

  const getShipSvg = (color) => {
    let strokeColor = 'rgba(255, 255, 255, 0.2)';
    if (color === 'red') strokeColor = 'var(--neon-red)';
    if (color === 'blue') strokeColor = 'var(--neon-blue)';
    if (color === 'green') strokeColor = 'var(--neon-green)';

    return (
      <svg width="32" height="32" viewBox="0 0 40 40" style={{ filter: color ? `drop-shadow(0 0 5px ${strokeColor})` : 'none', margin: '1rem 0' }}>
        <path
          d="M 20 5 L 32 30 L 20 23 L 8 30 Z"
          fill="none"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  return (
    <div className="glass-panel" style={{ maxWidth: '640px', animation: 'fadeIn 0.5s ease-out' }}>
      <div className="lobby-title">CO-OP LOBBY</div>
      <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.8rem' }}>Share code with teammates:</div>
      <div className="room-code-display">{roomCode}</div>

      <div className="lobby-players">
        {slots.map((slot) => {
          const player = getPlayerInPosition(slot.position);
          return (
            <div key={slot.position} className={`lobby-player-slot ${player ? `active ${player.color || ''}` : ''}`}>
              <div className="slot-label">{slot.label}</div>
              
              {player ? (
                <>
                  <div className="player-name">{player.username}</div>
                  <div style={{ display: 'flex', gap: '0.2rem', alignItems: 'center' }}>
                    {player.isHost && <span className="player-role-badge">Host</span>}
                    {player.socketId === localPlayerId && <span className="player-role-badge" style={{ background: 'rgba(51, 204, 255, 0.1)', borderColor: 'var(--neon-blue)', color: 'var(--neon-blue)' }}>You</span>}
                  </div>
                  {getShipSvg(player.color)}
                  {player.color ? (
                    <span style={{ fontSize: '0.8rem', color: `var(--neon-${player.color})`, textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.5px' }}>
                      {player.color} Ready
                    </span>
                  ) : (
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                      Picking color...
                    </span>
                  )}
                </>
              ) : (
                <div style={{ margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--text-secondary)', animation: 'ping 1.5s infinite', marginBottom: '0.8rem' }} />
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                    Waiting...
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {localPlayerInRoom && (
        <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', padding: '1.2rem', marginBottom: '2rem' }}>
          <div style={{ fontSize: '0.9rem', marginBottom: '0.8rem', fontWeight: 600, letterSpacing: '0.5px' }}>
            {localPlayerColor ? 'YOUR SHIP COLOR SELECTED' : 'PICK YOUR SHIP COLOR'}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
            {['red', 'blue', 'green'].map((color) => {
              const isTakenByOther = takenColors.includes(color) && localPlayerColor !== color;
              return (
                <button
                  key={color}
                  className={`color-choice-btn ${color} ${localPlayerColor === color ? 'selected' : ''} ${isTakenByOther ? 'disabled' : ''}`}
                  onClick={() => handleColorClick(color)}
                  disabled={isTakenByOther}
                  title={isTakenByOther ? 'Already taken' : `Select ${color}`}
                />
              );
            })}
          </div>
        </div>
      )}

      {isHost ? (
        <div style={{ marginBottom: '1rem' }}>
          <button 
            className="btn btn-primary" 
            disabled={!canStart}
            onClick={handleStart}
          >
            {!isLobbyFull ? 'Waiting for 3 Players' : !allPickedColors ? 'Waiting for Colors' : 'Start Co-op Battle'}
          </button>
          {!isLobbyFull && (
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              Co-op multiplayer requires exactly 3 players to begin.
            </p>
          )}
        </div>
      ) : (
        <div style={{ marginBottom: '1.5rem', fontStyle: 'italic', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Waiting for Host to start the battle...
        </div>
      )}

      <button className="btn" onClick={handleLeave} style={{ background: 'rgba(255,51,102,0.05)', borderColor: 'rgba(255,51,102,0.15)', color: 'var(--neon-red)' }}>
        Leave Lobby
      </button>
    </div>
  );
}
