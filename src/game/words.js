// Space/Cyber themed word lists for difficulty scaling

export const WORDS_BY_LENGTH = {
  3: [
    'cmd', 'sys', 'net', 'cpu', 'gpu', 'ram', 'usb', 'bin', 'hex', 'bit', 'ion', 'ore', 'sun', 'sky', 'ray',
    'arc', 'pod', 'bot', 'hub', 'key', 'log', 'run', 'map', 'zip', 'fox', 'gas', 'fly', 'raw', 'war'
  ],
  4: [
    'core', 'code', 'data', 'grid', 'byte', 'node', 'link', 'port', 'host', 'sync', 'warp', 'flux', 'void', 'glow',
    'beam', 'star', 'nova', 'ship', 'laser', 'hull', 'fuel', 'orbit', 'dust', 'rock', 'wave', 'scan', 'ping', 'gate'
  ],
  5: [
    'cyber', 'pixel', 'micro', 'macro', 'input', 'logic', 'phase', 'solar', 'comet', 'radar', 'sonar', 'shield', 'armor',
    'array', 'probe', 'rover', 'cargo', 'laser', 'drone', 'plasma', 'vortex', 'nebula', 'matrix', 'space', 'orbit', 'cloud'
  ],
  6: [
    'system', 'server', 'client', 'engine', 'vector', 'binary', 'module', 'portal', 'galaxy', 'meteor', 'nebula', 'hazard',
    'beacon', 'rocket', 'sensor', 'plasma', 'magnet', 'shield', 'thrust', 'module', 'memory', 'buffer', 'signal', 'photon'
  ],
  7: [
    'network', 'program', 'console', 'process', 'quantum', 'storage', 'scanner', 'virtual', 'neutron', 'gravity', 'shuttle',
    'capsule', 'station', 'reactor', 'warhead', 'cruiser', 'circuit', 'payload', 'booster', 'horizon', 'command', 'android'
  ],
  8: [
    'compiler', 'database', 'protocol', 'terminal', 'security', 'firmware', 'software', 'asteroid', 'universe', 'teleport',
    'thruster', 'fuselage', 'satellite', 'analyzer', 'junction', 'telemetry', 'autonomy', 'infinite', 'starlight', 'guardian'
  ],
  9: [
    'processor', 'interface', 'algorithm', 'bandwidth', 'hologram', 'generator', 'separator', 'spaceship', 'warpdrive',
    'nanotech', 'propulsion', 'darkmatter', 'cosmology', 'spacetime', 'hyperdrive', 'interstellar', 'trajectory', 'spectrometer'
  ],
  10: [
    'mainframe', 'cybernetics', 'simulation', 'astronomy', 'multiverse', 'supernova', 'constellation', 'gravitation',
    'atmospheric', 'navigation', 'transporter', 'coordinate', 'combustion', 'calibration', 'singularity'
  ]
};

export function getRandomWord(length) {
  const len = Math.min(Math.max(length, 3), 10);
  const words = WORDS_BY_LENGTH[len];
  return words[Math.floor(Math.random() * words.length)];
}

export function getRandomWordForWave(waveNumber) {
  // Determine length based on wave number
  // Wave 1: 3-4 letters
  // Wave 2: 3-5 letters
  // Wave 3: 4-6 letters
  // Wave 4: 5-8 letters
  // Wave 5 (Boss): 3-5 letters for bullets, but boss has long phrases
  let minLen = 3;
  let maxLen = 4;
  
  if (waveNumber >= 2) {
    minLen = 3;
    maxLen = 5;
  }
  if (waveNumber >= 4) {
    minLen = 4;
    maxLen = 6;
  }
  if (waveNumber >= 7) {
    minLen = 5;
    maxLen = 8;
  }
  if (waveNumber >= 12) {
    minLen = 6;
    maxLen = 10;
  }
  
  const length = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
  return getRandomWord(length);
}
