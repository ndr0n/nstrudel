await initHydra({feedStrudel: 1, detectAudio: true});
const synths = (await import('https://cdn.jsdelivr.net/gh/ndr0n/nstrudel/synths/functions.js')).load();
samples('github:ndr0n/nsamples')

webdrone(true)
setcps(0.5)
let nk = "[<t ~> ~ ~ <~ t> ~ ~ ~ ~]*1"
let ns = "[~ ~ ~ ~ t ~ ~ ~]*1"
d1:stack(
stack(
nk.s("bd:2").gain(0.5).lpf(900),
ns.s("sd:2").gain(0.2),
).orbit(1)
,
stack(
s("saw").note(31).gain(1)
.lpf(320).nmod(nlfo(300).nfreq(irand(6))).lpq(3)
.abus([1,6])
.gain(0).nmod(nlfo(1).naddnote(24))
.gain(0).nmod(nabus(1))
.ndjf(0.1).nmod(nenv(0.2).natt(1).nsync(1)).ndjfq(0.1)
,
).orbit(2)
.delay(0.25).delayt(1/3).delayfb(rand.range(0,0.5)).delaysync(1)
,
)
// .mlimiter(9)
.scope({pos:0, scale: 0.25})

solid(0,0,0).layer(src(s0),1)
.kaleid(2).scroll(-1/6,0)
.out()

