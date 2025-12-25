C4=261.6
D4=293.7
E4=329.6
F4=349.2
G4=392
A4=440
B4=493.9
C3=130.8
D3=146.8
E3=164.8
F3=174.6
G3=196
A3=220
B3=246.9

BPM=90
DUR=5m_

gen-metronome.sh metron-$BPM-$DUR.wav $BPM $DUR ../images/metrobeat.wav
to-mp3.sh metron-$BPM-$DUR.wav metron-$BPM-$DUR.mp3
gen-metronome.sh metronA3-$BPM-$DUR.wav $BPM $DUR $A3
to-mp3.sh metronA3-$BPM-$DUR.wav metronA3-$BPM-$DUR.mp3
gen-metronome.sh metronA4-$BPM-$DUR.wav $BPM $DUR $A4
to-mp3.sh metronA4-$BPM-$DUR.wav metronA4-$BPM-$DUR.mp3

#gen-metronome.sh metronC3-$BPM-$DUR.wav $BPM $DUR $C3
#gen-metronome.sh metronD3-$BPM-$DUR.wav $BPM $DUR $D3
#gen-metronome.sh metronE3-$BPM-$DUR.wav $BPM $DUR $E3
#gen-metronome.sh metronF3-$BPM-$DUR.wav $BPM $DUR $F3
#gen-metronome.sh metronG3-$BPM-$DUR.wav $BPM $DUR $G3
#gen-metronome.sh metronB3-$BPM-$DUR.wav $BPM $DUR $B3
#to-mp3.sh metronC3-$BPM-$DUR.wav metronC3-$BPM-$DUR.mp3
#to-mp3.sh metronD3-$BPM-$DUR.wav metronD3-$BPM-$DUR.mp3
#to-mp3.sh metronE3-$BPM-$DUR.wav metronE3-$BPM-$DUR.mp3
#to-mp3.sh metronF3-$BPM-$DUR.wav metronF3-$BPM-$DUR.mp3
#to-mp3.sh metronG3-$BPM-$DUR.wav metronG3-$BPM-$DUR.mp3
#to-mp3.sh metronB3-$BPM-$DUR.wav metronB3-$BPM-$DUR.mp3

#gen-metronome.sh metronC4-$BPM-$DUR.wav $BPM $DUR $C4
#gen-metronome.sh metronD4-$BPM-$DUR.wav $BPM $DUR $D4
#gen-metronome.sh metronE4-$BPM-$DUR.wav $BPM $DUR $E4
#gen-metronome.sh metronF4-$BPM-$DUR.wav $BPM $DUR $F4
#gen-metronome.sh metronG4-$BPM-$DUR.wav $BPM $DUR $G4
#gen-metronome.sh metronB4-$BPM-$DUR.wav $BPM $DUR $B4
#to-mp3.sh metronC4-$BPM-$DUR.wav metronC4-$BPM-$DUR.mp3
#to-mp3.sh metronD4-$BPM-$DUR.wav metronD4-$BPM-$DUR.mp3
#to-mp3.sh metronE4-$BPM-$DUR.wav metronE4-$BPM-$DUR.mp3
#to-mp3.sh metronF4-$BPM-$DUR.wav metronF4-$BPM-$DUR.mp3
#to-mp3.sh metronG4-$BPM-$DUR.wav metronG4-$BPM-$DUR.mp3
#to-mp3.sh metronB4-$BPM-$DUR.wav metronB4-$BPM-$DUR.mp3
