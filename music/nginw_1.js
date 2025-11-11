const synths = (await import('https://cdn.jsdelivr.net/gh/ndr0n/nstrudel/synths/functions.js')).load();
samples('github:ndr0n/nsamples')

const nrand = register('nrand', (min, max, seed) => rand.range(min, max).early(seed));

setcps(120/60/4)
  
d1: stack(
 stack(
    "[<t ~> ~ ~ <~ t> ~ ~ ~ ~]".s("bd:1").gain(1).clip(1).cut(1),
    "[~ ~ ~ ~ t ~ ~ ~]".s("sd:2").gain(0.7).clip(1).cut(1),
    "[t t t t]*1".s("hh:1").gain(1).clip(0.125),
    // "[~ ~ t ~]*2".s("oh:3").gain(1).clip(0.125),
  ).sometimesBy(0.125, x=>x.shuffle(16))
  .coarse(irand(9)),
).orbit(1)
.gain(0.7)
.delay(0.25).delayt(0.0325).delayfb(nrand(0,0.975,621))

d2: stack(
  // note("[0 3 5 7 12 15 19 24 27 31 36]*2").trans(32).s("saw").clip(1).lpf(800).gain(1),
  s("nchords:2/2").note(24).gain(1).lpf(nmod("lfo:sine:10:4000:8020")).lpq(1),
  s("supersaw").freq("[40,120]").detune(1/8).gain(2)
  .lpf(100).lpq(1)
  .distort(nmod("lfo:sine:0.25:0.25:0")).distortvol(nmod("lfo:sine:119.375:1:0")).distorttype("hard")
  .gain(nmod("lfo:sine:39.675:1:0"))
  .gain(nmod("lfo:sine:119.875:1:0"))
  .lpf(nmod("lfo:sine:39.5:2000:3020")).lpq(1)
  .hpf(nmod("lfo:sine:119.75:2000:2020")).hpq(1)
  .crush(nmod("lfo:sine:39.9:8:12"))
  .coarse(irand(16))
  .gain(1)
  
)  
.room(0.375).size(9)
.delay(0.25).delayt(0.33).delayfb(0.5)

all(x => x.compressor("-8:8:8:0.001:0.001"))



