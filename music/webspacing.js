await initHydra({feedStrudel: 1, detectAudio: true});
webdrone(true)
samples('github:ndr0n/nsamples')
setcps(0.5)
let nk = "[<t ~> ~ t?0.7 <~ t> ~ ~ ~ ~]*1"
let ns = "[~ ~ ~ ~ t ~ ~ ~]*1"
let nh = "[t*[<[2|4|8|16]>/3]]"
d1:stack(
stack(
s("nk:9").struct(nk).clip(irand(6)).gain(0.7).cut(1),
s("ns:11").struct(ns).clip(0.375).gain(0.375).cut(1),
).coarse(irand(9))
.lpf(perlin.slow(2).range(300,9000)).lpq(3),
s("nhh:0").struct(nh).clip(0.125).gain(0.25).cut(4).lpf(perlin.slow(3).range(300,9000)).lpq(3)
).orbit(1)
.sometimesBy(1/9, x=>x.scramble(16))
.sometimesBy(1/9, x=>x.cps(rand.range(0.125,0.75).early(125))).early(16)
// .slowf(2,x=>))
d2:stack(
s("nchords:0").fast(irand(9).add(9)).degradeBy(0.25).att(1).rel(1/16).note(24).begin(perlin.slow(3).range(0.1,0.2)).clip(9).cut(3)
.lpf(perlin.slow(2).range(2000,2000)).nmod(nlfo(perlin.slow(7).range(90,900)).nnote(50).naddfreq(perlin.slow(8).range(-0.125,0.125))).lpq(6)
.lpf(perlin.slow(3).range(2000,4000).early(457)).lpq(6)
,
).orbit(2).room(1/9).size(6)
.scope({pos: 0, scale: 0.5})

solid(0,0,0).layer(
src(s0)
.kaleid(2)
,1)
.out()