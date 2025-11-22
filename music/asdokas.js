await initHydra({feedStrudel: 1, detectAudio: true});
const synths = (await import('https://cdn.jsdelivr.net/gh/ndr0n/nstrudel/synths/functions.js')).load();
samples('github:ndr0n/nsamples')

webdrone(true)
setcps(0.5)
let nk = "[<t ~> ~ t?0.7 <~ <t [~ t]>> [~ t?0.7] ~ ~ ~]*[1]?0.25"
let ns = "[~ ~ ~ ~ t ~ ~ ~]*1?0.25"
let nb = "[t]*[[8|16]*16?0.7]"
d1:stack(
stack(
nb.note(24).s("sine").gain(1).clip(irand(6)).cut(2)
.gain(0.2).nmod(nenv(0.8).natt(1).nsync(1)).ndjfq(0)
.fm(3).fmh(1)
.distort("3:0.25:sinefold")
.coarse(irand(9))
// .gain(1).nmod(nlfo(0.5).naddnote(31))
// .ndjf(0.39).nmod(nlfo(0.1).naddnote(0).naddfreq(rand.range(-0.125,0.125))).ndjfq(0)
// .lpf(3000).lpq(12)
.outside(2,x=>x.repeatCycles(4))
).orbit(5)
.delay(rand.range(0,0.25)).delayt(1/3).delayfb(0.5).delaysync(1)
.room(1/6).size(7)
,
stack(
nk.s("sbd").psustain(0.5).note(24).dec(1).gain(0.5).clip(8).cut(1).coarse(irand(9)),
ns.s("white").gain(0.35).clip(0.5).cut([1,2]).coarse(irand(9)),
s("nhh:0*[2|4|8|8?|16|16?]").clip(0.25).gain(0.3).ndjf(perlin.slow(3)),
).orbit(4)
// .delay(0.25).delayt(1/34).delayfb(rand.range(0.875,0.875))
,
).scope({pos:0, scale: 0.25})
.mlimiter(3)
// .sometimesBy(1/1,x=>x.ncps(rand.range(0.25,0.25)))

solid(0,0,0).layer(src(s0),1)
.kaleid(2).scroll(-1/4,0)
.modulate(src(o1),1000)
.modulateHue(src(o1).invert(),1000)
.out(o0)