/**
 * Procedural Web Audio engine: card-swipe SFX, one-shot low-gauge warning,
 * and a 32-step bossa/corporate-elevator jazz sequencer with adaptive
 * tempo + filter (standard ~96 BPM, crisis muffled ~400Hz, overdrive bright ~112 BPM).
 */

type AmbientMood = 'standard' | 'crisis' | 'overdrive';

interface MoodProfile {
  bpm: number;
  filterHz: number;
  /** Global pitch multiplier (crisis sags slightly). */
  pitch: number;
  gain: number;
}

const MOODS: Record<AmbientMood, MoodProfile> = {
  standard: { bpm: 96, filterHz: 1200, pitch: 1, gain: 0.9 },
  crisis: { bpm: 84, filterHz: 400, pitch: 0.94, gain: 0.75 },
  overdrive: { bpm: 112, filterHz: 2500, pitch: 1.03, gain: 1 },
};

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let ambientBus: GainNode | null = null;
let ambientFilter: BiquadFilterNode | null = null;
let schedulerTimer: ReturnType<typeof setTimeout> | null = null;
let currentMood: AmbientMood | null = null;
let nextStepTime = 0;
let step = 0;
let muted = false;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = muted ? 0 : 1;
    master.connect(ctx.destination);
    ambientBus = ctx.createGain();
    ambientBus.gain.value = 0;
    ambientFilter = ctx.createBiquadFilter();
    ambientFilter.type = 'lowpass';
    ambientFilter.frequency.value = MOODS.standard.filterHz;
    ambientFilter.Q.value = 0.7;
    ambientBus.connect(ambientFilter).connect(master);
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

/* --------------------------------- SFX layer --------------------------------- */

interface ToneOptions {
  freq: number;
  duration?: number;
  type?: OscillatorType;
  gain?: number;
  delay?: number;
  sweepTo?: number;
}

function tone({ freq, duration = 0.18, type = 'sine', gain = 0.08, delay = 0, sweepTo }: ToneOptions) {
  const audio = getCtx();
  if (!audio || !master) return;
  const t0 = audio.currentTime + delay;
  const osc = audio.createOscillator();
  const vol = audio.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (sweepTo) osc.frequency.exponentialRampToValueAtTime(sweepTo, t0 + duration);
  vol.gain.setValueAtTime(0, t0);
  vol.gain.linearRampToValueAtTime(gain, t0 + 0.015);
  vol.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(vol).connect(master);
  osc.start(t0);
  osc.stop(t0 + duration + 0.05);
}

/** Filtered noise burst — soft card-slide friction. */
function swipeNoise() {
  const audio = getCtx();
  if (!audio || !master) return;
  const t0 = audio.currentTime;
  const length = Math.floor(audio.sampleRate * 0.22);
  const buffer = audio.createBuffer(1, length, audio.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length);
  const src = audio.createBufferSource();
  src.buffer = buffer;
  const filter = audio.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(1400, t0);
  filter.frequency.exponentialRampToValueAtTime(500, t0 + 0.2);
  filter.Q.value = 0.8;
  const vol = audio.createGain();
  vol.gain.setValueAtTime(0.05, t0);
  vol.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.22);
  src.connect(filter).connect(vol).connect(master);
  src.start(t0);
}

/** Soft, silky slide sound for every committed card swipe. */
export function playSwipe() {
  swipeNoise();
  tone({ freq: 520, sweepTo: 260, duration: 0.18, type: 'sine', gain: 0.03 });
}

/** One-shot muffled low-pitch pulse when a gauge crosses strictly below 25%. */
export function playLowGaugeWarning() {
  tone({ freq: 110, duration: 0.35, type: 'sine', gain: 0.1 });
  tone({ freq: 82, duration: 0.5, type: 'triangle', gain: 0.08, delay: 0.12 });
}

/** Kept from the earlier chime set for UI confirmations outside the card flow. */
export function chimePositive() {
  tone({ freq: 880, duration: 0.14, type: 'triangle', gain: 0.06 });
  tone({ freq: 1320, duration: 0.2, type: 'triangle', gain: 0.05, delay: 0.07 });
}

/* ------------------------- 32-step Bossa Jazz sequencer ------------------------ */

// Hz helpers per octave offsets from A4=440.
const N = (semitonesFromA4: number) => 440 * Math.pow(2, semitonesFromA4 / 12);
// Bar 1: Dm9 — D3 F3 A3 C4 E4
const DM9 = [N(-19), N(-16), N(-12), N(-9), N(-5)];
// Bar 2: G13 — G2 F3 B3 E4
const G13 = [N(-26), N(-16), N(-10), N(-5)];
// Bar 3: Cmaj9 — C3 E3 G3 B3 D4
const CMAJ9 = [N(-21), N(-17), N(-14), N(-10), N(-7)];
// Bar 4: A7alt — A2 G3 C#4 F4
const A7ALT = [N(-24), N(-14), N(-8), N(-4)];
const CHORD_BARS = [DM9, G13, CMAJ9, A7ALT];

/** Walking bass roots per half-bar: D2 A2 G2 D2 | C2 G2 A2 E2. */
const BASS_LINE = [N(-31), N(-24), N(-26), N(-31), N(-33), N(-26), N(-24), N(-29)];

/** Bossa syncopation pattern (16th-grid steps within each 8-step bar). */
const CHORD_HITS = new Set([0, 3, 6, 2, 5, 7]); // per-bar offsets, clipped below.

/** Breezy flute melody: 32 steps, sparse rests (null = rest). */
const MELODY: (number | null)[] = [
  N(-5), null, N(-2), null, N(0), null, null, N(3),
  N(2), null, null, N(-5), null, N(-7), null, null,
  N(-7), null, N(-3), null, N(0), null, N(2), null,
  N(4), null, N(3), null, N(-1), null, null, null,
];

const STEPS = 32;
/** Seconds per 16th-note step at a given BPM. */
const stepDur = (bpm: number) => 60 / bpm / 4;

function playChordStep(freqs: number[], t0: number, mood: MoodProfile) {
  const audio = ctx!;
  for (const [i, f] of freqs.entries()) {
    const osc = audio.createOscillator();
    const vol = audio.createGain();
    osc.type = i % 2 === 0 ? 'triangle' : 'sine';
    osc.frequency.value = f * mood.pitch;
    vol.gain.setValueAtTime(0, t0);
    vol.gain.linearRampToValueAtTime(0.014 - i * 0.001, t0 + 0.03);
    vol.gain.exponentialRampToValueAtTime(0.0001, t0 + stepDur(mood.bpm) * 3);
    osc.connect(vol).connect(ambientBus!);
    osc.start(t0);
    osc.stop(t0 + stepDur(mood.bpm) * 3.2);
  }
}

function playBass(freq: number, t0: number, mood: MoodProfile) {
  const audio = ctx!;
  const osc = audio.createOscillator();
  const vol = audio.createGain();
  osc.type = 'triangle';
  osc.frequency.value = freq * mood.pitch;
  const dur = stepDur(mood.bpm) * 6;
  vol.gain.setValueAtTime(0, t0);
  vol.gain.linearRampToValueAtTime(0.05, t0 + 0.02);
  vol.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(vol).connect(ambientBus!);
  osc.start(t0);
  osc.stop(t0 + dur + 0.05);
}

function playFlute(freq: number, t0: number, mood: MoodProfile) {
  const audio = ctx!;
  const osc = audio.createOscillator();
  const vibrato = audio.createOscillator();
  const vibGain = audio.createGain();
  const vol = audio.createGain();
  osc.type = 'sine';
  osc.frequency.value = freq * mood.pitch;
  vibrato.frequency.value = 5.5;
  vibGain.gain.value = 3.5;
  vibrato.connect(vibGain).connect(osc.frequency);
  const dur = stepDur(mood.bpm) * 3.5;
  vol.gain.setValueAtTime(0, t0);
  vol.gain.linearRampToValueAtTime(0.02, t0 + 0.04);
  vol.gain.setValueAtTime(0.02, t0 + dur * 0.7);
  vol.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(vol).connect(ambientBus!);
  osc.start(t0);
  vibrato.start(t0);
  osc.stop(t0 + dur + 0.05);
  vibrato.stop(t0 + dur + 0.05);
}

function playBrush(t0: number, mood: MoodProfile) {
  const audio = ctx!;
  const length = Math.floor(audio.sampleRate * 0.04);
  const buffer = audio.createBuffer(1, length, audio.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length);
  const src = audio.createBufferSource();
  src.buffer = buffer;
  const hp = audio.createBiquadFilter();
  hp.type = 'highpass';
  hp.frequency.value = 6000;
  const vol = audio.createGain();
  vol.gain.setValueAtTime(0.005, t0);
  vol.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.04);
  src.connect(hp).connect(vol).connect(ambientBus!);
  src.start(t0);
}

/** True when the given 16th step carries a bossa chord syncopation hit. */
function isChordStep(globalStep: number): boolean {
  const barStep = globalStep % 8;
  const barHits = CHORD_HITS;
  // Bossa clave-ish accents mapped across the 8-step bar:
  return [0, 3, 6].includes(barStep) || (barStep === 2 && globalStep % 16 >= 8) || barHits.has(barStep) && globalStep % 4 === 0;
}

function scheduleStep(globalStep: number, t0: number) {
  const mood = MOODS[currentMood ?? 'standard'];
  const bar = Math.floor(globalStep / 8) % 4;

  // Chords on syncopated steps.
  if (isChordStep(globalStep)) playChordStep(CHORD_BARS[bar], t0, mood);

  // Walking bass on beats 1 and 3 of each bar (steps 0 and 4 within a bar).
  const barStep = globalStep % 8;
  if (barStep === 0 || barStep === 4) {
    const bassIdx = bar * 2 + (barStep === 4 ? 1 : 0);
    playBass(BASS_LINE[bassIdx % BASS_LINE.length], t0, mood);
  }

  // Flute melody line.
  const mel = MELODY[globalStep % STEPS];
  if (mel !== null) playFlute(mel, t0, mood);

  // Brushed swing hats on offbeats.
  if (barStep === 2 || barStep === 6) playBrush(t0, mood);
}

function scheduler() {
  if (!ctx) return;
  const mood = MOODS[currentMood ?? 'standard'];
  while (nextStepTime < ctx.currentTime + 0.15) {
    scheduleStep(step, nextStepTime);
    nextStepTime += stepDur(mood.bpm);
    step = (step + 1) % STEPS;
  }
  schedulerTimer = setTimeout(scheduler, 50);
}

/** Smoothly glides filter/tempo into the given mood (1.5s feel). */
export function setAmbientMood(mood: AmbientMood) {
  if (mood === currentMood) return;
  const audio = getCtx();
  if (!audio || !ambientBus || !ambientFilter) return;
  currentMood = mood;
  const profile = MOODS[mood];
  const t = audio.currentTime;
  ambientBus.gain.cancelScheduledValues(t);
  ambientBus.gain.setValueAtTime(ambientBus.gain.value, t);
  ambientBus.gain.linearRampToValueAtTime(0.5 * profile.gain, t + 1.5);
  ambientFilter.frequency.cancelScheduledValues(t);
  ambientFilter.frequency.setValueAtTime(ambientFilter.frequency.value, t);
  ambientFilter.frequency.exponentialRampToValueAtTime(profile.filterHz, t + 1.5);
  if (!schedulerTimer) {
    nextStepTime = audio.currentTime + 0.1;
    scheduler();
  }
}

export function stopAmbient() {
  if (schedulerTimer) {
    clearTimeout(schedulerTimer);
    schedulerTimer = null;
  }
  if (ctx && ambientBus) {
    const t = ctx.currentTime;
    ambientBus.gain.cancelScheduledValues(t);
    ambientBus.gain.setValueAtTime(ambientBus.gain.value, t);
    ambientBus.gain.linearRampToValueAtTime(0, t + 0.4);
  }
  currentMood = null;
  step = 0;
}

/* --------------------------------- Mute toggle -------------------------------- */

export function setMuted(value: boolean) {
  muted = value;
  if (master && ctx) {
    const t = ctx.currentTime;
    master.gain.cancelScheduledValues(t);
    master.gain.setValueAtTime(master.gain.value, t);
    master.gain.linearRampToValueAtTime(value ? 0 : 1, t + 0.3);
  }
}

export function isMuted() {
  return muted;
}
