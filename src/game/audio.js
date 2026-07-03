// Sound effects and background music controller

class AudioManager {
  constructor() {
    this.sounds = {};
    this.music = null;
    this.muted = false;
    this.initialized = false;
    this.musicPlaying = false;
    
    // File paths relative to public directory
    this.soundPaths = {
      hit: 'media/sounds/hit.ogg',
      target: 'media/sounds/target.ogg',
      explosionSmall: 'media/sounds/explosion-small.ogg',
      explosion: 'media/sounds/explosion.ogg',
      explosionLarge: 'media/sounds/explosion-large.ogg',
      emp: 'media/sounds/emp.ogg',
      plasma: 'media/sounds/plasma.ogg',
      click: 'media/sounds/click.ogg',
      explosionPlayer: 'media/sounds/explosion-player.ogg',
      multi2: 'media/sounds/multi-2.ogg',
      multi3: 'media/sounds/multi-3.ogg'
    };

    this.musicPaths = {
      endure: 'media/music/endure.ogg',
      orientation: 'media/music/orientation.ogg'
    };
  }

  init() {
    if (this.initialized) return;
    
    // Preload sound effects using standard Audio elements
    Object.entries(this.soundPaths).forEach(([key, path]) => {
      this.sounds[key] = new Audio(path);
      this.sounds[key].preload = 'auto';
    });

    this.initialized = true;
  }

  play(soundName) {
    if (!this.initialized) this.init();
    if (this.muted) return;

    const audio = this.sounds[soundName];
    if (audio) {
      // Clone audio node to allow playing multiple instances concurrently
      const playClone = audio.cloneNode();
      playClone.volume = soundName === 'plasma' ? 0.3 : 0.6;
      playClone.play().catch(err => {
        // Silently catch browser autoplay prevention errors
      });
    }
  }

  playMusic(trackName = 'endure') {
    if (!this.initialized) this.init();
    
    // Stop active music first
    this.stopMusic();

    const trackPath = this.musicPaths[trackName];
    if (trackPath) {
      this.music = new Audio(trackPath);
      this.music.loop = true;
      this.music.volume = 0.4;
      this.musicPlaying = true;
      
      if (!this.muted) {
        this.music.play().catch(err => {
          // Handled via user interaction resume
        });
      }
    }
  }

  stopMusic() {
    if (this.music) {
      this.music.pause();
      this.music.currentTime = 0;
      this.music = null;
      this.musicPlaying = false;
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.muted) {
      if (this.music) this.music.pause();
    } else {
      if (this.music && this.musicPlaying) {
        this.music.play().catch(e => {});
      }
    }
    return this.muted;
  }
}

export const GameAudio = new AudioManager();
