// A simple sound service using the Web Audio API to avoid needing audio files.

class SoundService {
  private audioContext: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  
  private musicInterval: number | null = null;
  private currentMusicType: 'MENU' | 'LESSON' | 'NONE' = 'NONE';

  constructor() {
    // We will initialize on the first user gesture.
  }

  private initAudioContext() {
    if (this.audioContext && this.audioContext.state === 'running') return;
    
    if (this.audioContext && this.audioContext.state === 'suspended') {
        this.audioContext.resume();
    } else if (!this.audioContext) {
        try {
            this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            this.masterGain = this.audioContext.createGain();
            this.musicGain = this.audioContext.createGain();
            this.sfxGain = this.audioContext.createGain();
            
            this.musicGain.connect(this.masterGain);
            this.sfxGain.connect(this.masterGain);
            this.masterGain.connect(this.audioContext.destination);

        } catch(e) {
            console.error("Web Audio API is not supported in this browser");
        }
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.initAudioContext();
    } 
    
    if (this.masterGain) {
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 1, this.audioContext!.currentTime);
    }
    
    if (this.isMuted) {
        this.stopMusic();
    } else {
        this.playMusic(this.currentMusicType);
    }

    return this.isMuted;
  }

  getIsMuted() {
    return this.isMuted;
  }
  
  setMusicVolume(volume: number) {
      if (this.musicGain) {
          this.musicGain.gain.setValueAtTime(volume, this.audioContext!.currentTime);
      }
  }

  setSfxVolume(volume: number) {
      if (this.sfxGain) {
          this.sfxGain.gain.setValueAtTime(volume, this.audioContext!.currentTime);
      }
  }

  async playCustomSound(dataUrl: string) {
    this.initAudioContext();
    if (this.isMuted || !this.audioContext || !this.sfxGain) return;

    try {
        const response = await fetch(dataUrl);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
        
        const source = this.audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(this.sfxGain);
        source.start(0);
    } catch (error) {
        console.error("Error playing custom sound:", error);
    }
  }

  playSound(type: 'CLICK' | 'CORRECT' | 'INCORRECT' | 'REWARD') {
    this.initAudioContext();
    if (this.isMuted || !this.audioContext || !this.sfxGain) return;

    const now = this.audioContext.currentTime;
    
    switch (type) {
      case 'CLICK': {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
        break;
      }
      case 'CORRECT': {
        // Ascending arpeggio
        const notes = [659.25, 783.99, 987.77]; // E5, G5, B5
        notes.forEach((freq, i) => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            osc.connect(gain);
            gain.connect(this.sfxGain!);

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + i * 0.1);
            gain.gain.setValueAtTime(0.3, now + i * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.15);
            osc.start(now + i * 0.1);
            osc.stop(now + i * 0.1 + 0.15);
        });
        break;
      }
      case 'INCORRECT': {
         // Descending "womp"
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        osc.connect(gain);
        gain.connect(this.sfxGain);
        
        osc.type = 'sawtooth';
        gain.gain.setValueAtTime(0.4, now);
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

        osc.start(now);
        osc.stop(now + 0.3);
        break;
      }
      case 'REWARD': {
        // Triumphant Fanfare
        const notes = [
            { freq: 523.25, time: 0, dur: 0.15 },    // C5
            { freq: 523.25, time: 0.2, dur: 0.15 },   // C5
            { freq: 783.99, time: 0.4, dur: 0.3 },   // G5
            { freq: 659.25, time: 0.75, dur: 0.25 }, // E5
            { freq: 783.99, time: 1.05, dur: 0.4 }   // G5
        ];
        notes.forEach(note => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            osc.connect(gain);
            gain.connect(this.sfxGain!);
            
            osc.type = 'triangle';
            gain.gain.setValueAtTime(0.3, now + note.time);
            osc.frequency.setValueAtTime(note.freq, now + note.time);
            gain.gain.exponentialRampToValueAtTime(0.001, now + note.time + note.dur);

            osc.start(now + note.time);
            osc.stop(now + note.time + note.dur);
        });
        break;
      }
    }
  }

  playMusic(type: 'MENU' | 'LESSON' | 'NONE') {
    this.currentMusicType = type;
    this.stopMusic();
    if (this.isMuted || type === 'NONE' || !this.audioContext || !this.musicGain || this.audioContext.state !== 'running') return;
    
    // Note frequencies
    const C4 = 261.63, D4 = 293.66, E4 = 329.63, F4 = 349.23, G4 = 392.00, A4 = 440.00, B4 = 493.88;
    const C5 = 523.25;

    // "Playlist" of melodies
    const menuMelodies = [
        [G4, E4, C4, E4, G4, C5, A4, G4],
        [C4, D4, E4, C4, E4, F4, G4, E4]
    ];
    const lessonMelodies = [
        [A4, G4, F4, G4, E4, C4, D4, E4],
        [G4, A4, G4, F4, E4, F4, G4, D4]
    ];
    
    let melody: number[];
    let tempo: number;

    if (type === 'MENU') {
      melody = menuMelodies[Math.floor(Math.random() * menuMelodies.length)];
      tempo = 600;
    } else { // LESSON
      melody = lessonMelodies[Math.floor(Math.random() * lessonMelodies.length)];
      tempo = 500;
    }

    let noteIndex = 0;
    const playNote = () => {
      if (!this.audioContext || !this.musicGain) return;
      
      const now = this.audioContext.currentTime;
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      osc.connect(gain);
      gain.connect(this.musicGain);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(melody[noteIndex], now);
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.05); // Quick attack
      gain.gain.exponentialRampToValueAtTime(0.001, now + (tempo / 1000));

      osc.start(now);
      osc.stop(now + tempo / 1000);

      noteIndex = (noteIndex + 1) % melody.length;
    };

    playNote(); // Play first note immediately
    this.musicInterval = window.setInterval(playNote, tempo);
  }

  public stopMusic() {
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }
}

// Export a singleton instance.
export const soundService = new SoundService();