registerSound('nacid',
  (time, value, onended) => {
    let { freq } = value; // destructure control params
    const ctx = getAudioContext();
    // create oscillator
    const o = new OscillatorNode(ctx, { type: 'sawtooth', frequency: Number(freq) });
    o.start(time);
    // add gain node to level down osc
    const g = new GainNode(ctx, { gain: 0.3 });
    // connect osc to gain
    const node = o.connect(g);
    // this function can be called from outside to stop the sound
    const stop = (time) => o.stop(time);
    // ended will be fired when stop has been fired
    o.addEventListener('ended', () => {
      o.disconnect();
      g.disconnect();
      onended();
    });
    return { node, stop };
  },
  { type: 'synth' },
); 

