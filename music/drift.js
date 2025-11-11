await initHydra({feedStrudel: 1});
const synths = (await import('https://cdn.jsdelivr.net/gh/ndr0n/nstrudel/synths/functions.js')).load();
const nrand = register('nrand', (min, max, seed) => rand.range(min, max).early(seed));
samples('github:ndr0n/nsamples')

let nk = "[<1 0> 0 0 <0 1> 0 0 0 0]*1"
let ns = "[0 0 0 0 1 0 0 0]*1"
let nh = "[1 1 1 1]*[1]"
let nacid = "[0|2|3|5|12|14|15|17]*[[8|16]*16?0.25]";
let nslice = "[0|1|2|3|4|5|6|7]*16?0.7";
let nnotes = "[0|3|5|7|12|15|17|19]*[[8|16]*16?0.5]"
let nchords = "[[0|3|5|7|12|15|17|19],[0|3|5|7|12|15|17|19],[0|3|5|7|12|15|17|19]]/3"

d1: stack(
  stack(
    s("nk:24").struct(nk).clip(3).cut(1).gain(0.75).nbpf(nrand(300,3000,316),3,3000),
    s("saw").struct(nk).clip(8).cut(2).gain(0.875).note(30).lpf(nadsr("exp",1,0,0,0,9000,90,1)).lpq(3),
    s("ns:8").struct(ns).clip(0.5).cut(2).gain(0.5).nbpf(nrand(600,6000,126),3,6000).stretch(nrand(0,2,632)),
  ).coarse(irand(6)),
  s("nhh:0").struct(nh).clip(nrand(0.125,0.5,363)).gain(0.5).nbpf(nrand(900,9000,369),3,9000),
  note(nacid).trans(30).s("saw").gain(0.75).lpf(nrand(30,300,548)).lpe(nrand(0,6,478)).lpd(nrand(0,0.25,046)).lps(nrand(0,0.25,875)).lpq(nrand(12,24,754)),
).orbit(1).dat(1)
.delay(0.25).delayt(0.0325).delayfb(nrand(0,0.975,974))
.sometimesBy(0.125,x=>x.scramble(16))
.spectrum({speed: 1})

d2: stack(
  // s("npad:1").fast(9).degradeBy(0.125).note(24).clip(1).begin(perlin.slow(3).early(361).range(0,0.33)).nbpf(nrand(600,6000,126),3,6000)
  // s("natmos:6").slice(8,nslice).clip(2).cut(6).nbpf(nrand(600,6000,126),3,6000)
  note(nchords).trans(30).s("piano").clip(1).gain(0.5).nbpf(nrand(300,3000,746),3,6000),
  note(nnotes).trans(6).s("casio").n(irand(2)).clip(3).gain(0.25).nbpf(nrand(300,3000,746),3,6000),
).orbit(2).dat(1)
.room(0.375).size(9)
.delay(0.25).delayt(0.33).delayfb(nrand(0,0.75,136))

solid(0,0,0)
.layer(src(s0),1)
.color(H(nchords.div(9)),1/2,H(ns.add(1).mul(nrand(1,3,167))))
.modulateKaleid(osc(1/8,1/8,1/8),H(nk.mul(nrand(0,3,561)).add(0.375)))
.invert(0)
.out()