const synths = (await import('https://cdn.jsdelivr.net/gh/ndr0n/nstrudel/synths/functions.js')).load();
samples('github:ndr0n/nsamples')

const nrand = register('nrand', (min, max, seed) => rand.range(min, max).early(seed));

setcps(0.5)
  
d1: stack(
 stack(
    "[<t ~> ~ ~ <~ t> ~ ~ ~ ~]".s("bd:1").gain(1).clip(1).cut(1).stretch(nrand(0,2,624)),
    "[~ ~ ~ ~ t ~ ~ ~]".s("sd:2").gain(0.7).clip(1).cut(1).stretch(nrand(0,2,136)),
    "[t t t t]*1".s("hh:1").gain(1).clip(0.125),
    // "[~ ~ t ~]*2".s("oh:3").gain(1).clip(0.125),
  ).sometimesBy(0.125, x=>x.shuffle(16)).coarse(irand(9)),
).orbit(1).gain(1)
.delay(0.25).delayt(0.0325).delayfb(nrand(0,0.975,621))

d2: stack(
  s("nchords:2/2").note(24).gain(1)
  // .djf(nmod("lfos:sine:9:0.125:0.375"))
  .gain(nmod("lfos:sine:9:1:0.5"))
  ,
  note("[0|2|3|5|12|14|15|17]*[[8|16]*16?0.25]").trans("32").s("saw").clip(1).gain(1)
  .lpf(nmod("adsrs:[exp|lin]:0:[1|0.875|0.75|0.625|0.5]:[0.25|0.125]:0:[4000|2000]:20")).lpq(nrand(8,24,943))
  .sometimesBy(0.25, x=>x.distort("2:0.25:sinefold"))
  // .gain(nmod("lfo:sine:n32:1:0.5"))
  ,
  // s("bd"),
  // s("supersaw").freq("[40,120]").detune(1/8).gain(2)
  // .lpf(100).lpq(1)
  // .gain(nmod("lfo:sine:40.125:1:0"))
  // .gain(nmod("lfo:sine:119.875:1:0"))
  // .distort(nmod("lfo:sine:39.25:2:0")).distortvol(nmod("lfo:sine:119.375:0.5:0")).distorttype("hard")
  // .lpf(nmod("lfo:sawtooth:39.375:4000:4000")).lpq(1)
  // .hpf(nmod("lfo:sine:119.75:2000:1020")).hpq(1)
  // .djf(nmod("lfo:sine:1:0.2:0.2"))
  // .lpf(nmod("lfos:sawtooth:1:4000:2000")).lpq(1)
  // .crush(nmod("lfo:sine:1:8:8"))
  // .coarse(nmod("lfos:sine:0.125:4:3"))
  // .gain(1)
).orbit(2)
// .room(0.375).size(9)
// .delay(0.25).delayt(0.33).delayfb(0.5).delaysync(1)

all(x => x.color('purple').compressor("-8:8:8:0.001:0.001"))



