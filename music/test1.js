await initHydra({feedStrudel: 1, detectAudio: true});
const synths = (await import('https://cdn.jsdelivr.net/gh/ndr0n/nstrudel/synths/functions.js')).load();
register('randslice', (val, pat) => pat.slice(val, "[0]".add(irand(val))) );
samples('github:ndr0n/nsamples')

setcps(0.5)
webdrone(true)
let nk = "[<t ~ t ~> ~ <~ t ~ ~> <~ ~ ~ t> ~ ~ ~ ~]*1?0.5"
let ns = "[~ ~ ~ ~ t ~ ~ ~]*1?0.25"
let nh = "[t*[<[2|4|8|16]>/3]]"
let nb = "[t*8?0.7]"

d1:stack(
stack(
s("npiano:9").loopAt(16).randslice(64).fast(8).degradeBy(0.7).early(96).clip(2).cut(1).gain(0.3)
.lpf(6000).lpq(6)
,
).orbit(2)
.delay(1/9).delayt(1/3).delayfb(rand.range(0,1/6))
.room(1/6).size(9)
,
stack(
s("nk:21").struct(nb).note(37).clip(1).gain(1).cut(1)
.gain(1).nmod(nlfo(1).naddnote(-6+0).naddfreq(rand.range(-1/9,1/9).early(348)))
.lpf(perlin.range(900,9000).early(503)).lpq(9)
,
s("saw").note("[31]").struct(nb).clip(8).cut(2).gain(1)
.gain(1).nmod(nlfo(1).naddnote(12).naddfreq(perlin.slow(2).range(-0.125,0.125)))
.ndjf(0.1).nmod(nenv(0.2).natt(1).nsync(1).ntype('lin')).ndjfq(0.2)
,
s("ns:26").struct(ns).clip(0.75).gain(1).cut([1,2])
.lpf(perlin.range(300,9000).early(346)).lpq(9)
,
s("nhh:0").struct(nh).clip(rand.range(0.125,0.125).early(853)).cut(4)
.gain(0.3)
.lpf(perlin.slow(3).range(300,9000)).lpq(3)
,
).orbit(1)
.delay(1/3).delayt("1".div(perlin.slow(3).range(70,80))).delayfb(rand.range(0,8/9))
,
).scope({pos: 0, scale: 0.25, color: 'white'})

solid(0,0,0).layer(src(s0),1)
.kaleid(2).scroll(-1/6,0)
.out()