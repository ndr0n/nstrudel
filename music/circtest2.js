const synths = (await import('https://cdn.jsdelivr.net/gh/ndr0n/nstrudel/synths/functions.js')).load();
register('randslice', (val, pat) => { return pat.slice(val, "[0]".add(irand(val))) } );
await initHydra({feedStrudel: 1, detectAudio: true});
samples('github:ndr0n/nsamples')
webdrone(true)
setcps(0.5)
d2:stack(
s("ncircuit:0").randslice(16).fast("[16]*32").degradeBy(0.625).clip(irand(3).add(1)).clip(1).cut(1)
.slowf(2,x=>x.repeatCycles(4))
.gain(0.3).lpf(3000).lpq(6)
,
).orbit(2).scope({pos: 0, scale: 0.25})
.room(1/9).size(6)
.delay(1/9).delayt(1/3).delayfb(rand.range(0,1/6)).delaysync(1)
let nk = "[<t ~> ~ t?0.7 <~ t> ~ ~ ~ ~]*1?0.25"
let ns = "[~ ~ ~ ~ t ~ ~ ~]*1?0.25"
let nh = "[t*[<[2|4|8|16]>/3]]"
d1:stack(
stack(
s("nk:24").struct(nk).note(36).clip(3).gain(1).cut(1).coarse(3)
.distort(1).nmod(nenv(1).natt(0.25).nsus(1).nsync(1).ntype('exp')).distortvol(0.25).distorttype('sinefold')
,
s("ns:30").struct(ns).clip(irand(9).div(2)).gain(0.7).cut(1).lpf(perlin.slow(1.5).range(900,9000)).lpq(3),
),
).orbit(1).scope({pos: 0, scale: 0.5})
.delay(1/3).delayt("1".div(perlin.slow(3).range(70,80))).delayfb(rand.range(0,8/9))

solid(0,0,0).layer(src(s0),1)
.kaleid(2)
.out()