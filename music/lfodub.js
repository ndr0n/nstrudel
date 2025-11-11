// @title LFO Example

setcpm(120 / 4)

d1: stack(
  stack(
    "[<t ~> ~ ~ <~ t> ~ ~ ~ ~]".s("bd:1").gain(1).clip(1).cut(1),
    "[~ ~ ~ ~ t ~ ~ ~]".s("sd:2").gain(0.5).clip(1).cut(1),
    "[t t t t]*1".s("hh:1").gain(1).clip(0.125),
  ).sometimesBy(0.125, x=>x.shuffle(16))
  .coarse(irand(9)).delay(0.25).delayt(0.0325).delayfb(rand),
  note("0").trans("[24]").sound("tri").gain(3).detune(1/8).coarse(irand(16).late(8)).fm(12).fmh(1).fmwave("sawtooth")
  .lpf(30).lpq(3)
  .lfoDepth("300").lfoTarget("lpf").lfoParam("frequency").lfoShape("1").lfoRate(irand(16).late(16).add(1).div(3)).lfoNum("3").lfoDCOffset("0").lfoSynced(1)
).orbit(1)

d2: stack(
  
).orbit(2)
.room(0.25).size(9)