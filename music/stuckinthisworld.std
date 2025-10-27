const synths = (await import('https://cdn.jsdelivr.net/gh/ndr0n/nstrudel/synths/functions.js')).load();

await initHydra({detectAudio:true})
solid(0,0,0).out()

setcpm (90/4)

d1: mondo ` 
[
$ (def rslice [0..15])
$ (s namen:24) # splice 16 rslice # legato [1] # gain 0.7 # cut 3
// $ [t ~ ~ t ~ ~ ~ ~]*1 # s sbd # clip 1 # gain 1 # cut 1 # coarse (irand 8)
// $ [~ ~ ~ ~ t ~ ~ ~]*1 # s sd:2 # clip 0.5 # gain 0.7 # cut 1 # bank spacedrum
// $ [~ ~ t ~ ~ ~ t ~]*4 # s oh:2 # clip 0.25 # gain 0.7 # bank spacedrum
$ [t t t t t t t t]*1 # s hh:3 # clip 0.25 # gain 0.5 # bank spacedrum
] # orbit 1 # compressor -8:8:8:0.01:0.01
# delay 0.25 # delayt 0.0275 # delayfb rand
`

d2: mondo ` 
[
$ (note [0 0 0 5]/4) # s sawtooth # trans 31 # trans [0,0.025,-0.025] # trans [0] # gain 1 # n 4
// $ (note [0]) # trans 
] # orbit 2 # compressor -8:8:8:0.01:0.01
# delay 0.25 # delayt 0.33 # delayfb rand 
# room 0.5 # roomsize 9 
`

d4: note("[0|3|5|7|12|15|17|19|24]*16?0.7").trans(31,31.025).trans(12).s("triangle").gain(1).adsr("0:1:0:0")
.delay(0.25).delayt(0.33).delayfb(rand)
.room(0.5).size(9)
.orbit(4)


// hush()

// Anywhere we go
// we're stuck with these
// Psychopatic people
// Theres nothing you can do