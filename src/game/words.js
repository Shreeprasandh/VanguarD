// Space and cyber-themed vocabulary sorted by difficulty

export const WORDS_SIMPLE = [
  'cat', 'fog', 'sky', 'sun', 'run', 'net', 'cpu', 'gpu', 'ram', 'usb', 'bot', 'hub', 'key', 'log', 'zip', 'raw',
  'fly', 'ion', 'ore', 'arc', 'pod', 'bit', 'hex', 'bin', 'cmd', 'sys', 'fox', 'gas', 'war', 'map', 'ice', 'gem'
];

export const WORDS_MEDIUM = [
  'core', 'code', 'data', 'grid', 'byte', 'node', 'link', 'port', 'host', 'sync', 'warp', 'flux', 'void', 'glow',
  'beam', 'star', 'nova', 'ship', 'laser', 'hull', 'fuel', 'orbit', 'dust', 'rock', 'wave', 'scan', 'ping', 'gate',
  'cyber', 'pixel', 'micro', 'macro', 'input', 'logic', 'phase', 'solar', 'comet', 'radar', 'sonar', 'shield', 'armor',
  'array', 'probe', 'rover', 'cargo', 'drone', 'plasma', 'vortex', 'nebula', 'matrix', 'space', 'cloud', 'thrust'
];

export const WORDS_HARD = [
  'system', 'server', 'client', 'engine', 'vector', 'binary', 'module', 'portal', 'galaxy', 'meteor', 'nebula', 'hazard',
  'beacon', 'rocket', 'sensor', 'plasma', 'magnet', 'thrust', 'memory', 'buffer', 'signal', 'photon', 'network', 'program',
  'console', 'process', 'quantum', 'storage', 'scanner', 'virtual', 'neutron', 'gravity', 'shuttle', 'capsule', 'station',
  'reactor', 'warhead', 'cruiser', 'circuit', 'payload', 'booster', 'horizon', 'command', 'android'
];

export const WORDS_EXPERT = [
  'compiler', 'database', 'protocol', 'terminal', 'security', 'firmware', 'software', 'asteroid', 'universe', 'teleport',
  'thruster', 'fuselage', 'satellite', 'analyzer', 'junction', 'telemetry', 'autonomy', 'infinite', 'starlight', 'guardian',
  'mainframe', 'cybernetics', 'simulation', 'astronomy', 'multiverse', 'supernova', 'constellation', 'gravitation',
  'atmospheric', 'navigation', 'transporter', 'coordinate', 'combustion', 'calibration', 'singularity'
];

export function getWordForEnemy(type, waveNumber) {
  // Scales word lengths and complexities logic
  if (type === 'drone') {
    // Wave 1-3 drones get simple words (cat, fog). Later waves get medium words.
    if (waveNumber <= 3) {
      return WORDS_SIMPLE[Math.floor(Math.random() * WORDS_SIMPLE.length)];
    } else {
      return WORDS_MEDIUM[Math.floor(Math.random() * WORDS_MEDIUM.length)];
    }
  }

  if (type === 'interceptor') {
    // Elites get medium words early, hard words later
    if (waveNumber <= 5) {
      return WORDS_MEDIUM[Math.floor(Math.random() * WORDS_MEDIUM.length)];
    } else {
      return WORDS_HARD[Math.floor(Math.random() * WORDS_HARD.length)];
    }
  }

  if (type === 'cruiser') {
    // Generals get hard words early, expert words later
    if (waveNumber <= 7) {
      return WORDS_HARD[Math.floor(Math.random() * WORDS_HARD.length)];
    } else {
      return WORDS_EXPERT[Math.floor(Math.random() * WORDS_EXPERT.length)];
    }
  }

  // Boss shield words are always expert
  return WORDS_EXPERT[Math.floor(Math.random() * WORDS_EXPERT.length)];
}
