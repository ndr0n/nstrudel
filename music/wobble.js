await initHydra({feedStrudel: 1, detectAudio: true});
const synths = (await import('https://cdn.jsdelivr.net/gh/ndr0n/nstrudel/synths/functions.js')).load();
register('randslice', (val, pat) => pat.slice(val, "[0]".add(irand(val))) );
samples('github:ndr0n/nsamples')

setcps(0.5)
webdrone(true)
let nk = "[t t t t ~ t t t]*2?0.875"
let ns = "[~ ~ ~ ~ t ~ ~ ~]*[1?0.5|2?0.75]"
d1:stack(
stack(
// s("npiano:9").loopAt(16).randslice(64).fast(8).degradeBy(0.7).early(96).gain(0.3).clip(2).cut(21)
// .lpf(6000).lpq(6)
// ,
// nc.s("supersaw").detune(1/16).note(31).trans(0).trans("[0,7]").gain(1).clip(1).cut(22)
// .nfm(nlfo(100).naddnote(0).naddfreq(rand.slow(4).range(-1/3,1/3)))
// .ndjf(0.1).nmod(nenv(0.25).natt(1).nsync(1).ntype('exp')).ndjfq(0.125)
// ,
).orbit(2)
.delay(1/9).delayt(1/3).delayfb(rand.range(0,1/6))
.room(1/6).size(9)
,
stack(
stack(
nk.s("nk:21").note(37).clip(1).gain(1).cut(1)
.gain(1).nmod(nlfo(1).naddnote(-6+0).naddfreq(rand.range(-1/9,1/9).early(348)))
.lpf(perlin.range(300,9000).early(503)).lpq(9)
,
nk.s("saw").detune(1/16).note(31).gain(1).clip(16).cut(1)
.gain(1).nmod(nlfo(2).naddnote("[12|19|24|31|36|43|48]".late(359)))
.ndjf(0.1).nmod(nenv(0.15).natt(1).nsync(1).ntype('exp')).ndjfq(0.2)
,
ns.s("ns:26").clip("[0.5|0.75|1|1.5|2]*32").gain(1).cut(1)
.coarse(irand(9))
.lpf(perlin.fast(2).rangex(900,9000).early(346)).lpq(3)
,
).sometimesBy(0,x=>x.shuffle(16))
,
"[t*16?0.7]".s("hh:0").bank("spacedrum").clip(rand.range(0.125,0.125).late(853)).cut(4).late(948)
.gain(0.3)
.lpf(perlin.slow(3).range(600,9000)).lpq(3)
// ,
).orbit(1)
// .delay(1/3).delayt(1/70).delayfb(rand.range(8/9,8/9))
,
).gain(1).mlimiter(9)
.scope({pos: 0, scale: 0.25, color: 'white'})
// .mcompressor("-6:9:3")

solid(0,0,0).layer(src(s0),1)
.kaleid(2).scroll(-1/6,0)
.out()