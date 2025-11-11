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
    s("[bd|sd|hh:1|hh:3]*16?0.25").gain(0.625).cut(1)
    .nbpf(perlin.slows(3,861).rangex(1,10000),1,perlin.slows(3,136).range(1,10000))
    ,
    s("[ncircuit:9]").loopAt("[8]").slice(8, "[0|1|2|3|4|5|6|7]*16?0.875").gain(0.875).clip("[2|4|6|8]*32").cut(5)
    .nbpf(perlin.slows(3,612).rangex(2,2000),1,perlin.slows(3,026).range(1,10000))
    , 
  ).sometimesBy(0/8, x => x.shuffle(16))
  ,
  note("[0|2|3|5|12|14|15|17]*16?").trans(26).s("sawtooth").gain(1).clip(1).cut(6)
  .lpf(nrand(1,1000,876)).lpe(nrand(0,4,567)).lpq(nrand(10,20,638)).lpd(nrand(0,1,415))
  .hpf(perlin.slows(6,512).rangex(1,10000)).hpq(nrand(1,10,326))
  .fm(nrand(0,10,052)).fmh(1).fmwave("sawtooth")
  ,
  "[t t t t]*4".s("nhh:0").legato(nrand(0.125,0.375,739)).gain(0.5).nbpf(perlin.slows(6,991).rangex(1,10000),3,perlin.slows(3,668).range(1,10000)),
).orbit(1)

let nchords = "[[0|2|3|5|7|9|10|12|14|15|17|19|21|22|24],[0|2|3|5|7|9|10|12|14|15|17|19|21|22|24],[0|2|3|5|7|9|10|12|14|15|17|19|21|22|24]]"

d2: stack(  
  s("nrise:11").slice(16, "[0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15]*4?0.5").note(36).gain(0.25).clip(4).cut(7)
  .nbpf(perlin.slows(1,497).rangex(1,10000),1,perlin.slows(3,561).range(1,10000))
  ,
).orbit(2).late(16)
.delay(0.25).delayt("[0.25|0.33|0.5|0.66]").delayfb(nrand(0,1,830))
.room(0.375).rsize(9)

all(x => x
.compressor("-8:8:8:0.001:0.001")
// .cps(nrand(0.125,0.875,681))
.slowf(2, x => x.repeatCycles(4))
)