samples('github:ndr0n/nsamples')

// samples('shabda/speech/en-GB/m:fuck_,you_')

// register

setcps(170/60/4)

register('nbpf', (freq, bandsize, q, pat) => {
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
    s("[bd|sd|hh:1|hh:3]*16?0.25").gain(0.5).cut(1)
    .nbpf(perlin.slows(3,205).rangex(1,10000),3000,3)
    .delay(0.25).delayt(0.0325).delayfb(nrand(0,1,603))
    ,
  )
  ,
  
  note("[0|2|3|5|12|14|15|17]*16?").trans(29).s("saw").gain(1).clip(1).cut(6)
    .lpf(nrand(1,1000,876)).lpe(nrand(0,4,567)).lpq(nrand(10,20,638)).lpd(nrand(0,1,415))
    // .fm(nrand(0,10,052)).fmh(0.5).fmwave("sawtooth")
    // .hpf(perlin.slows(3,512).rangex(1,10000)).hpq(3)
    ,
  
  "[t t t t]*4".s("nhh:0").legato(nrand(0.125,0.375,739)).gain(0.5).nbpf(perlin.slows(6,991).rangex(9,9000),3000,3),
).orbit(1)

d2: stack(
  // s("npiano:9").slice(16, "[0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15]*16?0.7").note(31).gain(0.5).clip(irand(4).add(1)).cut(9)
  // .nbpf(perlin.slows(6,743).rangex(9,9000), 6000, 3)
  // ,
  // s("ndrone:3").slice(16, "[0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15]*16?0.7").note(36).gain(0.5).clip(irand(4).add(1)).cut(8)
  // .nbpf(perlin.slows(6,231).rangex(9,9000),6000,3)
  // .jux(rev)
  // ,
  
  // s("nrise:11").slice(16, "[0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15]*4?0.5").note(36).gain(0.25).clip(4).cut(7)
  // .nbpf(perlin.slows(6,231).rangex(30,3000), 3000, 3)
  // .jux(rev)
  // ,  
).orbit(2).late(16)
.delay(0.25).delayt("[0.25|0.33|0.5|0.66]").delayfb(nrand(0,1,830))
.room(0.375).rsize(6)

all(x => x
.compressor("-8:8:8:0.01:0.01")
// .cps(nrand(0.125,0.875,951)) 
.slowf(2, x => x.repeatCycles(4))
)