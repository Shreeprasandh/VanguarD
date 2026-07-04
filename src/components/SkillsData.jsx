export const SKILLS_DB = [
  {
    id: 'emp_discharge',
    name: 'EMP Discharge',
    cost: 40,
    cooldown: 12,
    color: '#06b6d4', // Electric Teal
    description: 'Deploys a localized electromagnetic pulse. Freezes all active enemies (Drone: 4s, Interceptor: 3s, Cruiser: 2s, Boss: 1s).',
    svgIcon: (color) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="10" strokeDasharray="4 4" />
        <circle cx="12" cy="12" r="5" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      </svg>
    )
  },
  {
    id: 'overclock',
    name: 'Overclock',
    cost: 50,
    cooldown: 15,
    color: '#d97706', // Bright Amber
    description: 'Overrides ship firing rate. Double typing damage (clears 2 letters per keystroke) for 5 seconds.',
    svgIcon: (color) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    )
  },
  {
    id: 'decoy_probe',
    name: 'Decoy Probe',
    cost: 30,
    cooldown: 10,
    color: '#fda4af', // Faint Rose
    description: 'Launches a holographic projection ship that draws all active letter-bullets away from your ship for 6 seconds.',
    svgIcon: (color) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <polygon points="12 2 2 22 12 17 22 22 12 2" strokeDasharray="3 3" />
      </svg>
    )
  },
  {
    id: 'nebula_veil',
    name: 'Nebula Veil',
    cost: 35,
    cooldown: 12,
    color: '#c084fc', // Slate Purple
    description: 'Releases dense dust clouds. Slows enemy descent speed (Drone: 50%, Interceptor: 37%, Cruiser: 25%, Boss: 12%) for 6s.',
    svgIcon: (color) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M12 3a9 9 0 1 0 9 9" />
        <path d="M12 8a4 4 0 1 0 4 4" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
      </svg>
    )
  },
  {
    id: 'tactical_shield',
    name: 'Tactical Shield',
    cost: 60,
    cooldown: 20,
    color: '#a3e635', // Mint Lime
    description: 'Deploys a defensive barrier that absorbs the next keyboard typo or bullet collision without penalty.',
    svgIcon: (color) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    )
  },
  {
    id: 'laser_sweep',
    name: 'Laser Sweep',
    cost: 25,
    cooldown: 8,
    color: '#cbd5e1', // Faint Platinum
    description: 'Fires a horizontal beam. Instantly clears the first letter of all active words on the screen.',
    svgIcon: (color) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="6" y1="8" x2="18" y2="16" />
      </svg>
    )
  },
  {
    id: 'quantum_warp',
    name: 'Quantum Warp',
    cost: 30,
    cooldown: 10,
    color: '#2dd4bf', // Turquoise
    description: 'Performs a spatial leap. Warps ship forward and vaporizes all active bullets on screen.',
    svgIcon: (color) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M13 17l5-5-5-5M6 17l5-5-5-5" />
      </svg>
    )
  },
  {
    id: 'chronos_drive',
    name: 'Chronos Drive',
    cost: 40,
    cooldown: 15,
    color: '#38bdf8', // Sky Cyan
    description: 'Slows down the descending speed of letter-bullets by 70% for 8 seconds.',
    svgIcon: (color) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M12 2v20M17 5H7M17 19H7" />
        <circle cx="12" cy="12" r="6" />
      </svg>
    )
  },
  {
    id: 'auto_scribe',
    name: 'Auto-Scribe',
    cost: 45,
    cooldown: 12,
    color: '#f472b6', // Peach Rose
    description: 'AI-assisted interface. Instantly types letters of the active target (Drone: 8, Interceptor: 6, Cruiser: 4, Boss: 2).',
    svgIcon: (color) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    )
  },
  {
    id: 'multiplier_surge',
    name: 'Multiplier Surge',
    cost: 50,
    cooldown: 18,
    color: '#fbbf24', // Solar Gold
    description: 'Instantly doubles your current score multiplier combo index.',
    svgIcon: (color) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M17 11l-5-5-5 5M17 18l-5-5-5 5" />
      </svg>
    )
  },
  {
    id: 'nano_repair',
    name: 'Nano-Repair',
    cost: 70,
    cooldown: 25,
    color: '#34d399', // Sea Emerald
    description: 'Dispatches microscopic repair drones. Restores 15% of your ship hull integrity (HP).',
    svgIcon: (color) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M12 5v14M5 12h14" />
        <rect x="3" y="3" width="18" height="18" rx="2" strokeDasharray="3 3" />
      </svg>
    )
  },
  {
    id: 'singularity_pin',
    name: 'Singularity Pin',
    cost: 30,
    cooldown: 10,
    color: '#818cf8', // Indigo
    description: 'Fires an gravitational anchor. Pinpoints the highest descending enemy, locking its position for 8 seconds.',
    svgIcon: (color) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2a10 10 0 1 0 10 10" />
      </svg>
    )
  },
  {
    id: 'data_purge',
    name: 'Data Purge',
    cost: 35,
    cooldown: 9,
    color: '#fda4af', // Rust Pink
    description: 'Purges data streams. Instantly destroys the lowest-health non-boss enemy on screen.',
    svgIcon: (color) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7M10 11v6M14 11v6M4 7h16M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
      </svg>
    )
  },
  {
    id: 'reflector_shield',
    name: 'Reflector Shield',
    cost: 55,
    cooldown: 16,
    color: '#22d3ee', // Chrome Cyan
    description: 'Constructs a mirror grid. Reflects all incoming bullets back at their launchers for 5 seconds.',
    svgIcon: (color) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M12 22L2 12 12 2l10 10-10 10z" />
        <line x1="2" y1="12" x2="22" y2="12" />
      </svg>
    )
  },
  {
    id: 'chain_strike',
    name: 'Chain Strike',
    cost: 30,
    cooldown: 10,
    color: '#a78bfa', // Violet Light
    description: 'Releases electric currents. Strikes 3 random enemies, instantly typing 2 characters of their words.',
    svgIcon: (color) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M5 3h4L7 11h4L9 21l8-10h-4l3-8" />
      </svg>
    )
  },
  {
    id: 'shatter_code',
    name: 'Shatter Code',
    cost: 80,
    cooldown: 30,
    color: '#fb923c', // Flame Orange
    description: 'Tactical decryptor. Instantly clears 25% of any active Boss shield word, or 1 complete shield line.',
    svgIcon: (color) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M4 22V4c0-.5.2-1 .6-1.4C5 2.2 5.5 2 6 2h12c.5 0 1 .2 1.4.6.4.4.6.9.6 1.4v18l-5-4-5 4-5-4z" />
      </svg>
    )
  },
  {
    id: 'combo_stabilizer',
    name: 'Combo Stabilizer',
    cost: 40,
    cooldown: 14,
    color: '#94a3b8', // Faint Silver
    description: 'Locks multiplier registers. Key typos do not reset your score multiplier combo chain for 8 seconds.',
    svgIcon: (color) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    )
  },
  {
    id: 'overdrive_thruster',
    name: 'Overdrive Thruster',
    cost: 20,
    cooldown: 7,
    color: '#f87171', // Coral Light
    description: 'Augments lateral boosters. Speeds up ship movement and laser visual fire rates for 6 seconds.',
    svgIcon: (color) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M17 11l-5-5-5 5M17 18l-5-5-5 5" />
      </svg>
    )
  },
  {
    id: 'hologram_decoy',
    name: 'Hologram Decoy',
    cost: 50,
    cooldown: 18,
    color: '#6ee7b7', // Light Mint
    description: 'Projects 2 mirror decoy wings. Confuses enemy targeting coordinates, splitting firing vectors for 6s.',
    svgIcon: (color) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M4.5 16.5v-9M19.5 16.5v-9" strokeDasharray="2 2" />
        <path d="M12 2a3 3 0 0 0-3 3v11a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
      </svg>
    )
  },
  {
    id: 'gravity_rewind',
    name: 'Gravity Rewind',
    cost: 60,
    cooldown: 20,
    color: '#60a5fa', // Deep Sapphire
    description: 'Reverses localized gravity fields. Repels all descending enemies back up screen by 150px.',
    svgIcon: (color) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l.73-.73" />
      </svg>
    )
  }
];
