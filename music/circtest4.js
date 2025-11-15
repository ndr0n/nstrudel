await initHydra({feedStrudel: 1, detectAudio: true});
const synths = (await import('https://cdn.jsdelivr.net/gh/ndr0n/nstrudel/synths/functions.js')).load();
register('randslice', (val, pat) => pat.slice(val, "[0]".add(irand(val))) );
samples('github:ndr0n/nsamples')

setcps(0.5)
webdrone(true)

// d2:stack(
// s("nbreaks:6").randslice(16).fast(8).early(30).degradeBy(0.7).note(36).clip("[0.25|0.5|1]*32").cut(1).gain(0.25).lpf(3000).lpq(3).late(32),
// ).orbit(2).scope({pos: 0, scale: 0.25})
// .room(1/9).size(6)
// .delay(1/9).delayt(1/3).delayfb(rand.range(0,1/6)).delaysync(1)

let nk = "[<t ~> ~ t?0.7 <~ t> ~ ~ ~ ~]*1?0.25"
let ns = "[~ ~ ~ ~ t ~ ~ ~]*1?0.25"
let nh = "[t*[<[2|4|8|16]>/3]]"
d1:stack(
s("ncircuit:9").loopAt(4).randslice(8).fast("[16]*32").degradeBy(0.7).clip(irand(2).add(1)).clip(1).cut(1)
// .gain(1).nmod(nlfo(1).nnote(33))
.gain(0.3).lpf(3000).lpq(6)
.slowf(2,x=>x.repeatCycles(4))
,
stack(
s("nk:23").struct(nk).note(29).clip(4).gain(1).cut(1)
.distort(1).nmod(nenv(1).natt(0.25).nsus(1).nsync(1).ntype('exp')).distortvol(0.25).distorttype('sinefold')
,
s("ns:26").struct(ns).clip(irand(8).div(2)).gain(0.7).cut(1).lpf(perlin.slow(1.5).range(900,9000)).lpq(3),
).coarse(irand(6))
.sometimesBy(1/9,x=>x.scramble(16))
.lpf(perlin.slow(1).range(300,9000)).lpq(9)
,
s("nhh:0").struct(nh).clip(0.125).gain(0.25).cut(4).lpf(perlin.slow(3).range(300,9000)).lpq(3),
).orbit(1).scope({pos: 0, scale: 0.5})
.delay(1/3).delayt("1".div(perlin.slow(3).range(70,80))).delayfb(rand.range(0,8/9))
// .sometimesBy(1/1,x=>x.cps(rand.fast(5).range(0.25,0.5)))
// .slowf(2,x=>x.repeatCycles(4))
  
solid(0,0,0).layer(src(s0),1)
.kaleid(2)
.out()