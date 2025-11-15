await initHydra({feedStrudel: 1, detectAudio: true});
samples('github:ndr0n/nsamples')
webdrone(true)
setcps(0.5)
let nk = "[<t ~> ~ t?0.7 <~ t> ~ ~ ~ ~]*2?0.25"
let ns = "[~ ~ ~ ~ t ~ ~ ~]*2?0.25"
let nh = "[t*[<[2|4|8|16]>/3]]"
d1:stack(
stack(
s("nk:0").fast(16).degradeBy(0.875).clip(irand(9).add(1).div(2)).cut(1).gain(1/4),
s("nk:9").struct(nk).clip(2).gain(0.8).cut(1),
s("ns:11").struct(ns).clip(0.375).gain(0.375).cut(1),
).coarse(irand(9))
.lpf(perlin.slow(2).range(300,9000)).lpq(3),
s("nhh:0").struct(nh).clip(0.125).gain(0.25).cut(4)
.lpf(perlin.slow(3).range(300,9000)).lpq(3)
).orbit(1).scope({pos: 0, scale: 0.5})
.sometimesBy(1/6,x=>x.scramble(16))
.sometimesBy(1/6,x=>x.cpm(rand.range(0.25,0.625).mul(60)))
// .sometimesBy(1/9, x=>x.cps(rand.range(0.25,0.5).early(125))).early(16)
d2:stack(
s("nchords:2").struct(nk).note(wchoose([24,1],[21,0.25]).slow(9)).gain(0.4).clip(rand.fast(3).range(1/2,2)).cut(5)
.bpf(perlin.slow(2).range(30,300)).bpq(0.25)
,
// s("saw").note(25).clip(1).gain(0.5)
// .nfm(nlfo(300).naddnote(0).naddfreq(perlin.slow(3).range(-1/9,1/9)))
// .nmod(nlfo(300).naddnote(12).naddfreq(perlin.slow(4).range(-1/9,1/9)))
// .bpf(perlin.rangex(220,2000)).nmod(nlfo(200).naddnote(24)).bpq(1/4)
// .gain(1).nmod(nlfo(2).naddnote("[19|24|31]/3").naddfreq(perlin.slow(2).range(-1/3,1/3)))
// .lpf(900).lpq(9)
).orbit(2).scope({pos: 0, scale: 0.25})
.room(1/9).size(6)
// .delay(1/6).delayt.
solid(0,0,0).layer(src(s0).kaleid(2),1)
.out()