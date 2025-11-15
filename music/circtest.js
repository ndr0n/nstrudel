// const synths = (await import('https://cdn.jsdelivr.net/gh/ndr0n/nstrudel/synths/functions.js')).load();
await initHydra({feedStrudel: 1, detectAudio: true});
samples('github:ndr0n/nsamples')
webdrone(true)
// setcps(0.5)
let nk = "[<t ~> ~ t?0.7 <~ t> ~ ~ ~ ~]*1?0.25"
let ns = "[~ ~ ~ ~ t ~ ~ ~]*1?0.25"
let nh = "[t*[<[2|4|8|16]>/3]]"
d1:stack(
stack(
// s("nk:0").fast(16).degradeBy(0.875).clip(irand(9).add(1).div(2)).cut(1).gain(1/4),
s("nk:24").struct(nk).clip(3).gain(0.6).cut(1),
s("ns:11").struct(ns).clip(0.375).gain(0.375).cut(1),
).coarse(irand(6))
.sometimesBy(1/3,x=>x.scramble(16))
.sometimesBy(1/6,x=>x.stretch(rand.range(0,1)))
.sometimesBy(1/9,x=>x.cps(rand.range(0.25,0.625)))
.lpf(perlin.slow(2).range(300,9000)).lpq(3),
s("nhh:0").struct(nh).clip(0.125).gain(0.25).cut(4).lpf(perlin.slow(3).range(300,9000)).lpq(3),
).orbit(1).scope({pos: 0, scale: 0.5})
.delay(0.25).delayt("1".div(80)).delayfb(rand.range(0,8/9))
d2:stack(
s("ncircuit:0").slice(16,"[0]*8".add(irand(16).slow(8))).note(32).clip(1).cut(7)
.gain(0.5)
// .gain(1).nmod(nlfo(1).nnote(35+12).naddfreq(perlin.range(-0.125,0.125)))
.lpf(300).lpq(3)
// .slowf(2, x=>x.repeatCycles(4))
,
// s("nchords:2").struct(nk).note(wchoose([24,1],[21,1/9])).clip(rand.fast(3).range(1/2,2)).cut(5).gain(0.4)
// .bpf(perlin.slow(3).range(30,300)).bpq(0.25)
// .sometimesBy(1/3,x=>x.gain(1).nmod(nlfo(1).naddnote(31).ntype('triangle'))
// .sometimesBy(1/3,y=>y.nmod(nlfo(100).naddnote(48).ntype('triangle'))).early(90))
// ,
).orbit(2).scope({pos: 0, scale: 0.25})
.room(1/9).size(6)
.delay(1/9).delayt(1/3).delayfb(rand.range(0,1/6)).delaysync(1)

solid(0,0,0).layer(src(s0),1)
.kaleid(2)
.out()