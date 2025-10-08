export function load() {

  // lpf between 0 and 1
  register('rlpf', (x,pat) => {return pat.lpf(pure(x).mul(12).pow(4))});

  //hpf between 0 and 1
  register('rhpf', (x,pat) => {return pat.hpf(pure(x).mul(12).pow(4))});

  // SOUNDS
  registerSound
  (
    'nsaw',
    (t, value, onended) => 
    {
      // Sound
      const saw = getOscillator('sawtooth', t, value);
      const sawGain = gainNode(0.5);
      
      const tri = getOscillator('sawtooth', t, value);
      const triGain = gainNode(0.5);

      const mix = gainNode(0.25);
      
      const master = gainNode(1);
      const env = gainNode(1);

      const node = saw.node.connect(sawGain).connect(mix).connect(master).connect(env);
      tri.node.connect(triGain).connect(mix);

      // Cleanup
      saw.node.onended = () => 
      {
        saw.node.disconnect();
        sawGain.disconnect();
        tri.node.disconnect();
        triGain.disconnect();
        mix.disconnect();
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
      saw.triggerRelease?.(envEnd);
      saw.stop(envEnd);

      return {node, stop: (endTime) => {stop(endTime);}};
    },
    { type: 'synth', prebake: true },
  );

}