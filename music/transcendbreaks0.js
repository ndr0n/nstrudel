await initHydra({feedStrudel: 1, detectAudio: true});
const synths = (await import('https://cdn.jsdelivr.net/gh/ndr0n/nstrudel/synths/functions.js')).load();
register('randslice', (val, pat) => pat.slice(val, "[0]".add(irand(val))) );
samples('github:ndr0n/nsamples')

// setcps(0.5)
webdrone(true)
let nk = "[t t t t ~ t t t]*2?0.875"
let ns = "[~ ~ ~ ~ t ~ ~ ~]*[[2]*32?0.5]"
d1:stack(
stack(
// s("supersaw").slow(irand(9).add(3)).detune(1/9).note(31).trans(0).trans("[0,7,12]").gain(1).clip(1).cut(22)
// .nfm(nlfo(100).naddnote(0).naddfreq(rand.slow(4).range(-1/3,1/3)))
// .ndjf(0).nmod(nenv(0.25).ndec(1).nsus(1/6).nsync(1)).ndjfq(0.2)
// ,
).orbit(2)
.delay(1/9).delayt(1/3).delayfb(rand.range(1/6,1/6))
.room(1/6).size(9)
,
stack(
s("namen:3").loopAt("[2]").randslice(16).fast(8).degradeBy(1/9).late(238).gain(1/3).clip(wchoose([1,1],[0.25,0.5])).cut(3)
.ndjf(perlin.late(583).range(0.1,0.3)).ndjfq(1/6)
,
stack(
s("nk:21").struct(nk).note(37).clip(1).gain(1).cut(1)
.gain(1).nmod(nlfo(1).naddnote(-6+0).naddfreq(rand.range(-1/9,1/9).early(348)))
.lpf(perlin.range(300,9000).early(503)).lpq(9)
.sometimesBy(1/3,x=>x.cps(rand.early(237).range(0.25,0.625)))
.slowf(2,x=>x.repeatCycles(4))
,
nk.s("saw").detune(1/16).note(31).gain(1).clip(16).cut(2)
.gain(1).nmod(nlfo(2).naddnote("[12|19|24|31|36|43]".late(359)))
.ndjf(0.1).nmod(nenv(0.2).natt(1).nsync(1).ntype('exp')).ndjfq(0.2)
,
s("ns:28").struct(ns).clip("[0.75|1|1.5]*32").gain(0.5).cut([1,2,3])
.coarse(irand(9))
.lpf(perlin.fast(2).rangex(900,9000).early(346)).lpq(3)
,
).coarse(irand(0))
.sometimesBy(1/6,x=>x.shuffle(16))
,
"[t]*[2|3|4|6|8|12|16|24]".s("nhh:0").clip(rand.range(0.125,0.125).late(853)).gain(0.5).cut(4).late(948)
.lpf(perlin.late(482).slow(2).range(600,9000)).lpq(3)
,
).orbit(1)
.delay(1/3).delayt(1/70).delayfb(rand.range(0,8/9)
,
).mlimiter(10)
.scope({pos: 0, scale: 0.25, color: 'white'}))

solid(0,0,0).layer(src(s0),1)
.kaleid(2).scroll(-1/6,0)
.out()