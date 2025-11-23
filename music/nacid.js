await initHydra({feedStrudel: 1, detectAudio: true});
const functions = (await import('https://cdn.jsdelivr.net/gh/ndr0n/nstrudel/synths/functions.js')).load();
samples('github:ndr0n/nsamples')

webdrone(true)
setcps(0.5)
let nk = "[t*8?0.7]*1"
let ns = "[~ ~ ~ ~ t ~ ~ ~]*2"
let nh = "[t*8]"
let na = "[0|2|3|5|12|14|15|17]*16?0.25"
d1: stack(
stack(
nk.s("sbd").sus(1).note(29).gain(1).clip(8).cut(1),
ns.s("ns:7").gain(0.4).clip(1).cut(1).coarse(nirand(0,9)),
nh.s("pulse").note(5).fm(nrand(30,90)).fmh(12).gain(0.5).clip(0.125).cut(5),
note(na).trans(29).s("pulse").pw(nrand(0.2,0.8)).pwrate(nrand(0,1)).pwsweep(nrand(0,1)).gain(3).clip(1).cut(4)
.lpf(nperlin(30,300,1/3)).lpe(nrand(-3,9)).lpq(nrand(12,18)),
).orbit(6)
// .delay(nrand(0,0.25)).delayt(1/50).delayfb(0.9)
,
stack(
// s("npad:1").loopAt(8).fast(8*8).att(0.125).rel(0.125).begin(saw.slow(8)).gain(0.2).clip(2),
).orbit(7)
.delay(nrand(0,0.25)).delayt(0.33).delayfb(0.5)
.room(1/6).size(9)  
.dat(1)
,
).scope({pos:0.5, scale: 0.25})

solid(0,0,0).layer(src(s0),1)
.kaleid(2).scroll(1/3,0)
.out(o0)