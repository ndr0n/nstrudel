const synths = (await import('https://cdn.jsdelivr.net/gh/ndr0n/nstrudel/synths/functions.js')).load();
const nrand = register('nrand', (min, max, seed) => rand.early(seed).range(min, max));
samples('github:ndr0n/nsamples')

setcps(0.5)

let nk = "[<t ~> ~ t?0.7 [<~ t> t?0.7] ~ ~ ~ ~]*1"
let ns = "[~ ~ ~ ~ t ~ ~ ~]*1?0.25"
let nh = "[t t t t]*[2]"

d1: stack(
stack(
s("nk:24").struct(nk).clip(6).note(31).cut(1).gain(0.9).nbpf(perlin.early(743).range(30,3000), 9, 6000),
s("ns:28").struct(ns).clip(1).note(36).cut(1).gain(0.3).nbpf(perlin.early(874).range(30,3000), 9, 6000),
).coarse(irand(9))
.delay(0.25).delayt(0.0325).delayfb(nrand(0,0.9,259))
,
s("nhh:0").struct(nh).clip(0.25).gain(0.5).nbpf(perlin.early(921).range(60,6000), 3, 9000),
).orbit(1)
// .room(0.25).size(3)

d2: stack(
note(25).struct(nk).s("saw").clip(8).gain(1.5).cut(2).coarse(irand(9))
.gain(0).nmod(nlfo(2).naddnote(19.1).naddfreq(nrand(0,0,683)))
.lpf(3).nmod(nenv(600).natt(1).nsync(1).ntype('exp')).lpq(6)
,
// note("[0]").trans(31).s("saw").gain(1.5).cut(4)
// .gain(0.01).nmod(nenv(3).natt(1).nsync(1).ntype("lin"))
// .gain(1).nmod(nlfo(1).naddnote(19).naddfreq(nrand(-3,3,879)).ntype("sawtooth"))
// .lpf(400).nmod(nlfo(200).naddnote(19+12).naddfreq(nrand(-6,6,745)).ntype("sawtooth"))
// .lpq(3).nmod(nlfo(nrand(0,3,423)).nfreq(1).naddfreq(nrand(-1,1,612)))
).orbit(2)
.room(0.25).size(9)
.delay(0.25).delayt(0.33).delayfb(nrand(0,0.5,953)).delaysync(1)

all(n => n
.sometimesBy(0.25, x=> x.scramble(16))
.sometimesBy(0.25, x=> x.ncps(nrand(0.125,0.625,646)))
.spectrum({speed:1})
.webdrone()
)