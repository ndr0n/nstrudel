export function load() {
  register('randslice', (val, pat) => pat.slice(val, "[0]".add(irand(val))) );
  register('rlpf', (x,pat) => {return pat.lpf(pure(x).mul(12).pow(4))});
  register('rhpf', (x,pat) => {return pat.hpf(pure(x).mul(12).pow(4))});
  register('ncps', (v, pat) => { return pat.cpm(v*60) });
  register('nbpm', (v, pat) => { return pat.cpm(v/4) });
  register('nbpf', (freq, q, bandsize, pat) => { return pat.lpf(freq + (bandsize/2)).lpq(q).hpf(freq - (bandsize/2)).hpq(q) }); 
  register('slows', (speed, seed, pat) => { return pat.late(seed).slow(speed) });
  register('slowf', function (speed, func, pat) { return func(pat.fast(speed)).slow(speed) });
  const nrand = register('nrand', (min, max, seed) => rand.late(seed).range(min, max));

  // SOUNDS
  registerSound
  (
    'nsaw',
    (t, value, onended) => 
    {
      // Sound
      const v1 = value;
      v1.note = v1.note;
      const o1 = getOscillator('sawtooth', t, v1);
      const o1Gain = gainNode(1);

      const v2 = value;
      v2.note = v2.note + v2.detune;
      const o2 = getOscillator('sawtooth', t, v2);
      const o2Gain = gainNode(1);

      const am = gainNode(1);
      
      const master = gainNode(0.5);
      
      const env = gainNode(1);

      const node = o1.node.connect(o1Gain).connect(am).connect(master).connect(env);
      o2.node.connect(o2Gain).connect(am.gain);

      // Cleanup
      o1.node.onended = () => 
      {
        o1.node.disconnect();
        o1Gain.disconnect();
        
        o2.node.disconnect();
        o2Gain.disconnect();
        
        am.disconnect();
        
        master.disconnect();
        env.disconnect();
        
        onended();
      };

      // Envelope
      const [attack, decay, sustain, release] = getADSRValues
      (
          [value.attack, value.decay, value.sustain, value.release],
          'linear',
          [0.001, 0.0, 1.0, 0.001],
      );
      
      const holdEnd = t + value.duration;
      getParamADSR(node.gain, attack, decay, sustain, release, 0, 1, t, holdEnd, 'linear');
      const envEnd = holdEnd + release + 0.001;
      o1.triggerRelease?.(envEnd);
      o1.stop(envEnd);

      return {node, stop: (endTime) => {stop(endTime);}};
    },
    { type: 'synth', prebake: true },
  );

  registerSound
  (
    'nsawfilt',
    (t, value, onended) => 
    {
      // Sound
      const v1 = value;
      v1.note = v1.note;
      const o1 = getOscillator('sawtooth', t, v1);
      const o1Gain = gainNode(1);
      
      const master = gainNode(0.25);
      const env = gainNode(1);

      let filter = getAudioContext().createBiquadFilter();
      filter.type = 'lowpass';
      filter.Q.value = 16;
      filter.frequency.value = 0;
      filter.frequency.setValueAtTime(0, t);
      filter.frequency.linearRampToValueAtTime(1000, t+value.duration)
      const node = o1.node.connect(o1Gain).connect(filter).connect(master).connect(env);

      // Cleanup
      o1.node.onended = () => 
      {
        o1.node.disconnect();
        o1Gain.disconnect();
        filter.disconnect();
        master.disconnect();
        env.disconnect();
        onended();
      };

      // Envelope
      const [attack, decay, sustain, release] = getADSRValues
      (
          [value.attack, value.decay, value.sustain, value.release],
          'linear',
          [0.001, 0.0, 1.0, 0.001],
      );
      
      const holdEnd = t + value.duration;
      getParamADSR(node.gain, attack, decay, sustain, release, 0, 1, t, holdEnd, 'linear');
      const envEnd = holdEnd + release + 0.001;
      
      o1.triggerRelease?.(envEnd);
      o1.stop(envEnd);

      return {node, stop: (endTime) => {stop(endTime);}};
    },
    { type: 'synth', prebake: true },
  );


}