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

let nchords = "[[0|2|3|5|7|9|10|12|14|15|17|19|21|22|24],[0|2|3|5|7|9|10|12|14|15|17|19|21|22|24],[0|2|3|5|7|9|10|12|14|15|17|19|21|22|24]]"

d1: stack(
  stack(
    "[t ~ t ~ ~ t ~ ~]*2".s("nk:27").gain(0.5).clip(4).cut(1).dist("2:0.5:sinefold")
    .nbpf(perlin.slows(3,487).rangex(1,10000),1,perlin.slows(3,512).range(1,10000))
    ,
    "[~ ~ ~ ~ t ~ ~ ~]*2".s("ns:23").gain(0.5).clip(1).cut(2).dist("2:0.5:diode")
    .nbpf(perlin.slows(3,862).rangex(1,10000),1,perlin.slows(3,945).range(1,10000))
    ,
  ).sometimesBy(1/8, x => x.shuffle(16))
  ,
  note("[0|2|3|5|12|14|15|17]*16?").trans(26).s("sawtooth").gain(0.5).clip(1).cut(6).dist("2:0.5:sinefold")
  .lpf(nrand(1,1000,876)).lpe(nrand(0,4,567)).lpq(nrand(10,20,638)).lpd(nrand(0,1,415))
  .hpf(perlin.slows(6,512).rangex(1,10000)).hpq(nrand(1,10,326))
  .fm(nrand(0,10,052)).fmh(1).fmwave("sawtooth")
  ,
  // s("[ncircuit:11]").loopAt("[2]").slice(8, "[0|1|2|3|4|5|6|7]*16?0.75").gain(0.875).clip("[2|4|6|8]*32").cut(5)
  // .nbpf(perlin.slows(3,612).rangex(1,10000),1,perlin.slows(3,026).range(1,10000))
  // , 
  // "[t t t t]*4".s("hh:3").bank("spacedrum").legato(nrand(0.125,0.375,739)).gain(0.5).nbpf(perlin.slows(6,991).rangex(1,10000),3,perlin.slows(3,668).range(1,10000)),
  // "[~ ~ t ~]*4".s("oh:0").legato(nrand(0.125,0.375,739)).gain(0.5).nbpf(perlin.slows(6,326).rangex(1,10000),3,perlin.slows(3,956).range(1,10000)),
).orbit(1)

d2: stack(  
  // s("nrise:0").loopAt(8).gain(0.5).clip(1).cut(9).nbpf(perlin.slows(3,374).rangex(1,10000),1,perlin.slows(3,469).range(1,10000))
).orbit(2).late(16)
.delay(0.25).delayt("[0.25|0.33|0.5|0.66]").delayfb(nrand(0,1,830))
.room(0.375).rsize(9)

all(x => x
// .compressor("-8:8:8:0.001:0.001")
// .cps(nrand(0.125,0.875,681))
// .slowf(2, x => x.repeatCycles(4))
)