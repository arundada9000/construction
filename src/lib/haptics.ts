export function hapticTap() {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(8);
  }
}

export function hapticSuccess() {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate([10, 30, 15]);
  }
}

export function hapticError() {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(40);
  }
}

let audioCtx: AudioContext | null = null;

function getAudioCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    try {
      audioCtx = new AudioContext();
    } catch {
      return null;
    }
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function isSoundEnabled(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const stored = localStorage.getItem('sajilo-settings');
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.sound !== false;
    }
  } catch {}
  return true;
}

export function playTap() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.frequency.value = 1200;
  gain.gain.value = 0.05;
  osc.start(ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
  osc.stop(ctx.currentTime + 0.06);
}

export function playSuccess() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioCtx();
  if (!ctx) return;
  const notes = [659.25, 783.99];
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = freq;
    osc.type = 'sine';
    gain.gain.value = 0.06;
    osc.start(ctx.currentTime + i * 0.12);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.2);
    osc.stop(ctx.currentTime + i * 0.12 + 0.2);
  });
}

export function playNav() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.frequency.value = 800;
  osc.type = 'sine';
  gain.gain.value = 0.04;
  osc.start(ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
  osc.stop(ctx.currentTime + 0.08);
}

export function playClink() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioCtx();
  if (!ctx) return;
  [2400, 3200].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = freq;
    osc.type = 'sine';
    gain.gain.value = 0.03;
    osc.start(ctx.currentTime + i * 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.01 + 0.08);
    osc.stop(ctx.currentTime + i * 0.01 + 0.08);
  });
}

export function playRumble() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.frequency.value = 80;
  osc.type = 'sine';
  gain.gain.value = 0.04;
  osc.start(ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
  osc.stop(ctx.currentTime + 0.15);
}

export function handlePress(feedback: 'tap' | 'nav' | 'success' = 'tap') {
  hapticTap();
  if (feedback === 'tap') playTap();
  else if (feedback === 'nav') playNav();
  else if (feedback === 'success') playSuccess();
}
