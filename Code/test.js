await initHydra({detectAudio:true})
solid(0,0,0).out()

setcpm(170/4)

d1$: 
stack(
  s("bd:4").struct("[t ~ ~ t ~ ~ t ~]*1?").legato(1.00).gain(1.0).cut(1).coarse(8).late(4),
  s("sd:2").struct("[~ ~ ~ ~ t ~ ~ ~]*1?").legato(1.00).gain(0.7).cut(1).coarse(4).late(8),
  s("hh:2").struct("[t t t t t t t t]*0.5").legato(0.25).gain(0.5).cut(2).coarse(2).late(12),
  // s("oh:1").struct("[~ ~ t ~ ~ ~ t ~]*1?").legato(0.25).gain(0.5).cut(2).coarse(4).late(16),
)
.delay(0.25).dt(0.02).dfb(rand.range(0,1))
// .fastGap(irand(2))
// .fast(irand(3))
// .fit()

d2$:
stack(
  // s("sawtooth").struct("[t t t t]*2?").note("[0|2|3|5|12|14|15|17]*12").transpose(36).legato(1).gain(1).cut(4).lpf(rand.rangex(50,10000)).late(32).fast(2).repeatCycles(4).slow(2)
)

all(x => x
  // .lastOf(4, x=>x.rev())
  .compressor("-8:8:0:0:0")
  // .wordfall({vertical: 1})
  // .scope()
)

// hush()