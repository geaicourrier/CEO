let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

interface ToneOptions {
  freq: number;
  duration?: number;
  type?: OscillatorType;
  gain?: number;
  delay?: number;
}

function tone({ freq, duration = 0.18, type = 'sine', gain = 0.08, delay = 0 }: ToneOptions) {
  const audio = getCtx();
  if (!audio) return;
  const t0 = audio.currentTime + delay;
  const osc = audio.createOscillator();
  const vol = audio.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  vol.gain.setValueAtTime(0, t0);
  vol.gain.linearRampToValueAtTime(gain, t0 + 0.015);
  vol.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(vol).connect(audio.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.05);
}

/** Crisp affirmative chime for positive / light impacts. */
export function chimePositive() {
  tone({ freq: 880, duration: 0.14, type: 'triangle', gain: 0.06 });
  tone({ freq: 1320, duration: 0.2, type: 'triangle', gain: 0.05, delay: 0.07 });
}

/** Neutral register for mixed or mild impacts. */
export function chimeNeutral() {
  tone({ freq: 520, duration: 0.16, type: 'sine', gain: 0.05 });
  tone({ freq: 660, duration: 0.16, type: 'sine', gain: 0.04, delay: 0.06 });
}

/** Low-frequency alert for severe drops (major gauge loss ≥ 20%). */
export function alertLow() {
  tone({ freq: 180, duration: 0.3, type: 'sawtooth', gain: 0.07 });
  tone({ freq: 120, duration: 0.4, type: 'sine', gain: 0.09, delay: 0.08 });
}
