await initHydra({feedStrudel: 1});
register('ncps', (v, pat) => { return pat.cpm(v*60) });
register('nbpm', (v, pat) => { return pat.cpm(v/4) });
const synths = (await import('https://cdn.jsdelivr.net/gh/ndr0n/nstrudel/synths/functions.js')).load();
const nrand = register('nrand', (min, max, seed) => rand.range(min, max).early(seed));
samples('github:ndr0n/nsamples')

setcps(0.5)

d1: stack(
  "[<t ~> ~ ~ <~ t> ~ ~ ~ ~]*1?0.25".s("nk:24").cut(1).clip(1).gain(.875),
  "[~ ~ ~ ~ t ~ ~ ~]*1?0.25".s("ns:8").cut(1).clip(1).gain(0.5).bpf(1000).nmod(nlfo(rand.range(-900,900)).nfreq(irand(100))),
  "[t t t t]*1".s("nhh:0").clip(.125).gain(.375),
  note("[0|2|3|5]").fast(irand(6).slow(irand(6))).trans(29).s("saw").gain(1).cut(2)
  .gain(0.5).nmod(nlfo(3))
  .lpf(20).nmod(nenv(2000).natt(1).ndec(0).nsus(0).nsync(1))
  .lpq(6).nmod(nlfo(irand(18)).nfreq(rand.range(0,200)))
).orbit(1)
.sometimesBy(0.125, x=>x.scramble(16))
.sometimesBy(0.25, x=>x.ncps(nrand(0.125,0.675,632)))