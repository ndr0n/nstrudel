const synths = (await import('https://cdn.jsdelivr.net/gh/ndr0n/nstrudel/synths/functions.js')).load();
samples('github:ndr0n/nsamples')

setcps(170/60/4)

register('nbpf', (freq, q, bandsize, pat) => {
  return pat.lpf(freq + (bandsize/2)).lpq(q).hpf(freq - (bandsize/2)).hpq(q)
}); 

register('slows', (speed, seed, pat) => {
  return pat.late(seed).slow(speed)
});

register('slowf', function (speed, func, pat) {
  return func(pat.fast(speed)).slow(speed);
});

const nrand = register('nrand', (min, max, seed) => rand.range(min, max).late(seed));

d1: stack(
  stack(
    s("[namen:1|namen:7|namen:8]*16").loopAt(1).slice(8, "[0|1|2|3|4|5|6|7]*8").gain(1).cut(1).clip("[1|0.25|1]*32").coarse(irand(4))
    .nbpf(perlin.slows(6,861).rangex(1,10000),1,perlin.slows(3,136).range(1,10000))
    ,
  ).sometimesBy(0/8, x => x.shuffle(16))
  .delay(0.25).delayt(0.0325).delayfb(nrand(0,1,603))
  ,
  
  note("[0|2|3|5|12|14|15|17]*16?").trans(29).s("sawtooth").gain(1).clip(1).cut(6)
  .lpf(nrand(1,1000,876)).lpe(nrand(0,4,567)).lpq(nrand(10,20,638)).lpd(nrand(0,1,415))
  .hpf(perlin.slows(3,512).rangex(1,10000)).hpq(nrand(1,10,326))
  .fm(nrand(0,10,052)).fmh(1).fmwave("sawtooth")
  ,
  
  "[t t t t]*4".s("nhh:0").legato(nrand(0.125,0.375,739)).gain(0.5).nbpf(perlin.slows(6,991).rangex(1,10000),1,perlin.slows(3,668).range(1,10000)),
  
).orbit(1)

let nchords = "[[0|2|3|5|7|9|10|12|14|15|17|19|21|22|24],[0|2|3|5|7|9|10|12|14|15|17|19|21|22|24],[0|2|3|5|7|9|10|12|14|15|17|19|21|22|24]]"

d2: stack(
  note(nchords.slow(4)).trans(29).s("piano").gain(0.5).clip(1)
  .nbpf(perlin.slows(6,737).rangex(1,10000),1,perlin.slows(3,294).range(1,10000))
  ,
  s("nvox:3").slice(16, "[0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15]*16?0.7").note("[24|24|24|36]*32").gain(0.5).clip(irand(4).add(1)).cut(9)
  .nbpf(perlin.slows(6,231).rangex(1,10000),1,perlin.slows(3,632).range(1,10000))
  ,
).orbit(2).late(16)
.delay(0.25).delayt("[0.25|0.33|0.5|0.66]").delayfb(nrand(0,1,830))
.room(0.375).rsize(9)

all(x => x
.compressor("-8:8:8:0.001:0.001")
)