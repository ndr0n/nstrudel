const synths = (await import('https://cdn.jsdelivr.net/gh/ndr0n/nstrudel/synths/functions.js')).load();
samples('github:ndr0n/nsamples')

const nrand = register('nrand', (min, max, seed) => rand.range(min, max).late(seed));

setcps(120/60/4)

d1: stack(
  // s("[bd|sd|hh|oh]*16?0.25").n(1).gain(0.5).clip(nrand(0.5,1,126)).cut(1),
  "[t|~|~|~]*16?0.25".s("nk:0").gain(0.5).clip(nrand(0.5,1,126)).cut(1).coarse(irand(9)),
  "[t|~|~|~]*16?0.25".s("saw").note(29).gain(2).clip(16).cut(2).lpq(9).lpf(60).lpa(3).lpe(9),
).orbit(1).late(8)
// .coarse(irand(16))
// .delay(0.25).delayt(0.025).delayfb(nrand(0,0.975,733))

d2: stack(
  // note("[12|17|24|29]*16?0.5").s("[nchords:2]").gain(0.5).clip(nrand(0.5,1,126)).cut(6).lpf(nrand(10,1000,161)).lpe(nrand(0,4,832)),
).orbit(2).late(16)
.delay(0.25).delayt(0.33).delayfb(nrand(0,0.975,962))
.room(0.375).size(9)


all(x => x
  .compressor("-8:8:8:0.01:0.01")
  .slowf(2, x => x.repeatCycles(4))
)
