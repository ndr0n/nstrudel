await initHydra({feedStrudel: 1, detectAudio: true});
const synths = (await import('https://cdn.jsdelivr.net/gh/ndr0n/nstrudel/synths/functions.js')).load();
samples('github:ndr0n/nsamples')

webdrone(true)
setcps(0.5)
let nk = "[<t ~> ~ t?0.7 <~ <t [~ t]>> [~ t?0.7] ~ ~ ~]*1?0.25"
let ns = "[~ ~ ~ ~ t ~ ~ ~]*1?0.25"
let nb = "[t]*[[8|16]*16?0.875]"
d1:stack(
stack(
// nb.note(24).s("sine").gain(1).clip(irand(6)).cut(2).fm(3).fmh(1)
// .gain(0.2).nmod(nenv(0.8).natt(1).nsync(1))
// .distort("3:0.25:sinefold")
// .coarse(irand(9))
// .outside(2,x=>x.repeatCycles(4))
// ,
// s("npad:20").note(24).slice(8, "[0]".add(irand(8))).slow(3).gain(0.5).clip(1).cut(7)
// .bpf(9).nmod(nenv(900).natt(1).nsync(1)).bpq(0.75)
// ,
).orbit(5)
// .delay(rand.late(753).range(0,0.25)).delayt(1/3).delayfb(0.5).delaysync(1)
// .room(1/6).size(7)
,
stack(
nk.s("sbd").psustain(0.5).note(24).dec(1).gain(0.5).clip(8).cut(1).coarse(irand(9)),
ns.s("white").gain(0.35).clip(0.5).cut([1,2]).coarse(irand(9)),
s("nhh:0*[2|4|8|8?|16|16?]").clip(0.25).gain(0.3).ndjf(perlin.slow(3)).cut(9),
note("[0|2|3|5]*16?").trans(24)
// .s("supersaw").detune(1/9).gain(0.7).clip(irand(6)).cut(4)
.s("pulse").pw(0.5).pwrate(rand.late(327)).gain(1).clip(irand(6)).cut(4)
.fm(irand(3).late(731)).fmh(irand(6).late(471))
// .gain(0).nmod(nlfo(2).naddnote(0).naddfreq(perlin.slow(6).range(-0.125,0.125)).ntype('sawtooth'))
.lpf(perlin.slow(2).range(3,300)).lpq(12).lpe(rand.late(893).range(-3,6)).lpd(rand.late(737).range(0,2)).lps(rand.late(647).range(0,0.5))
.lpf(6030).nmod(nlfo(6000).naddnote(31).naddfreq(perlin.slow(5).range(-1/3,1/3))).lpq(rand.late(954).range(3,9))
.lpf(6030).nmod(nlfo(6000).naddnote(19).naddfreq(perlin.slow(7).range(-1/3,1/3))).lpq(rand.late(236).range(3,9))
// .outside(2,x=>x.repeatCycles(4))
,
).orbit(4)
// .delay(0.25).delayt(1/40).delayfb(rand.range(0.875,0.875))
,
).scope({pos:0, scale: 0.25})
.mlimiter(3)
// .sometimesBy(1/1,x=>x.ncps(rand.range(0.25,0.25)))

solid(0,0,0).layer(src(s0),1)
.kaleid(2).scroll(-1/4,0)
.modulate(src(o1),1000)
.modulateHue(src(o1).invert(),1000)
.out(o0)