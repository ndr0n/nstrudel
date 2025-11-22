await initHydra({feedStrudel: 1, detectAudio: true});
const synths = (await import('https://cdn.jsdelivr.net/gh/ndr0n/nstrudel/synths/functions.js')).load();
register('randslice', (val, pat) => pat.slice(val, "[0]".add(irand(val))) );
samples('github:ndr0n/nsamples')

setcps(0.5)
webdrone(true)
let nk = "[<t ~> ~ ~ <~ t> ~ ~ ~ ~]*[1|2]"
let ns = "[~ ~ ~ ~ t ~ ~ ~]*1"
d1:stack(
stack(
s("namen:1").loopAt(1).randslice(8).fast(8).degradeBy(0.25).late(238).clip(1)
.gain(0.125)
.bpf(perlin.slow(3).rangex(90,9000)).bpq(0.25)
,
nk.s("nk:21").note(30).clip(4).gain(0.7).cut(1),
ns.s("ns:29").clip(0.5).gain(0.3).cut(1),
"t*8".s("nhh:0").clip(rand.late(753).range(0.125,0.375)).gain(0.2),
).orbit(1)
.nbpf(perlin.slow(3).range(300,3000),9,6000)
.delay(0.25).delayt("0".add(perlin.range(70,90))).delayfb(rand.range(0.1,0.9))
,
stack(
nk.s("saw").note(24).clip(8).gain(0.3)
.ndjf(0.1).nmod(nenv(0.1).natt(1).nsync(1)).cut(2).ndjfq(0.2)
,
s("supersaw").detune(1/9).note("[0|2|3|5]").fast(8).degradeBy(0.25).trans(24).gain(0.3)
// .gain(1).nmod(nlfo(2).naddnote(19).ntype('sine'))
.lpf(30).lpe(rand.range(-3,6).late(231)).lpq(9).lps(perlin.slow(7).range(0,0.5)).lpd(rand.late(371))
,
// .nbpf(perlin.slow(3).range(300,3000),9,6000)
// s("ncircuit:16").loopAt(4).randslice(16).fast(16).degradeBy(0.25).late(249).clip(1)
// .gain(0.3)
// .lpf(perlin.range(900,3000)).lpq(6)
// ,
// .gain(1).nmod(nlfo(1).naddnote("[12|19|24|31|36|43]").ntype('square'))
// s("nvox:6").loopAt(32).note(36).randslice(32).fast(irand(9).add(6)).degradeBy(0.8).cut(5).clip(rand.range(1/3,3)).gain(0.3)
// .sometimesBy(1/1,x=>x.gain(0.5).nmod(nlfo(2).nnote(36).ntype('square')))
// .ndjf(rand.range(1/8,1/4).late(395)).ndjfq(0)
// ,
).orbit(2)
.delay(0.25).delayt(1/3).delayfb(rand.late(739).range(0,0.25)).delaysync(1)
.room(0.25).size(6)
,
).scope({pos:0, scale:0.25})
.mlimiter(3)
.sometimesBy(1/9,x=>x.shuffle(16))
// .cps(rand.range(0.25,0.75))
// .slowf(2,x=>x.repeatCycles(4))

solid(0,0,0).layer(src(s0),1)
.kaleid(2).scroll(-1/6,0)
.out()

