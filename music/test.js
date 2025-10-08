const synths = (await import('https://cdn.jsdelivr.net/gh/ndr0n/nstrudel/synths/synths.js'));
synths.loadSynths();

await initHydra({detectAudio:true})
solid(0,0,0).out()

setcpm (120/4)

d1: mondo ` 
[
$ [t ~ ~ ~ t ~ ~ ~]*0 # s bd:4 # clip 1 # gain 1 # cut 1
$ [~ ~ ~ ~ t ~ ~ ~]*0 # s sd:1 # clip 0.5 # gain 0.7 # cut 1 # bank spacedrum
$ [~ ~ t ~ ~ ~ t ~]*<0 0 2 2> # s oh:2 # clip 0.25 # gain 0.7 # bank spacedrum
$ [t t t t t t t t]*1 # s hh:3 # clip 0.25 # gain 0.5 # bank spacedrum
] # orbit 1 # compressor -8:8:8:0.01:0.01
// # delay 0.25 # delayt 0.0275 # delayfb rand
`

// d2: mondo ` 
// [
// $ (note [0 3 5 7 12 15 17 19 24]*2) # trans 48 # s mysaw # legato 1 # gain 0.8 
// // $ [t] # s chill:0 # legato 1 # gain 1
// ] # amp 1 # orbit 2
// // # delay 0.25 # delayt 0.33 # delayfb rand 
// // # room 0.5 # roomsize 9 
// // # jux rev
// `

d4: 
note("[0|3|5|7|12|15|17|19|24]*16?0.7").trans(48).trans("[0,5]").s("nsaw").gain(0.7).adsr("0:0.5:0:0")
.delay(0.25).delayt(0.33).delayfb(rand)
.room(0.5).size(9)
.orbit(4)

hush()
