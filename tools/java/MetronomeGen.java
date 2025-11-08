import javax.sound.sampled.*;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;

public class MetronomeGen {

  public static void _main(String[] args) throws Exception {
    double[] envSegs = { 0.5, 1.0, 1.0, 0.5 };
    double[] env = getEnvelope(envSegs, 39);
    for (int i=0; i<env.length; ++i)
      System.out.println("[" + (i+1) + "] " + env[i]);
  }

  static double beatDur = 0.05; // in seconds

  static class SoundInfo {
    AudioFormat format;
    byte[] data;

    SoundInfo(AudioFormat f) { this.format = f; }
    SoundInfo(AudioFormat f, byte[] data) { this.format = f; this.data = data; }

    int getFrameCount() { return (int)(this.data.length / this.format.getFrameSize()); }
    int getDataSize() { return this.data.length; }
    double getSampleRate() { return this.format.getSampleRate(); }
    double getBytesPerSec() { return this.format.getSampleRate() * this.format.getSampleSizeInBits() / 8; }
    AudioInputStream toAudioInputStream() {
      ByteArrayInputStream bais = new ByteArrayInputStream(this.data);
      return new AudioInputStream(bais, this.format, this.getFrameCount());
    }
  }

  static void help() {
    System.err.println(
      "Usage: java MetronomeGen outFile bpm dur beat\n" +
      "  where: outFile is the output WAV file name\n" +
      "         bpm     is an integer for beats-per-minute\n" +
      "         dur     is duration; can end with 's' (seconds) or 'm' (minutes)\n" +
      "         beat    can be a file name, or a note frequency such as 440\n" +
      "A few examples:\n" +
      "    java MetronomeGen metron-120-5mins.wav 120 5m ../images/metrobeat.wav\n" +
      "or: java MetronomeGen metronA4-125-30secs.wav 125 30 440\n" +
      "or: java MetronomeGen metronA3-140-30secs.wav 140 30s 220\n" +
      "\n" +
      "For your quick reference, the frequencies of musical notes are:\n" +
      "  C4=261.6 D4=293.7 E4=329.6 F4=349.2 G4=392 A4=440 B4=493.9\n" +
      "");
  }

  public static void main(String[] args) throws Exception {
    if (args.length < 4) { help(); System.exit(0); }

    String outFile = args[0];
    int    bpm  = Integer.parseInt(args[1]);
    String dur  = args[2]; // e.g. "30", "30s", or "15m"
    String beat = args[3]; // e.g. "metrobeat.wav" or 440

    int durSecs = 1, last = dur.length()-1;
    if (dur.charAt(last) == 's')
      dur = dur.substring(0, last);
    else if (dur.charAt(last) == 'm') {
      durSecs = 60;
      dur = dur.substring(0, last);
    }
    durSecs *= Integer.parseInt(dur);

    double noteFreq = 0;
    try {
      noteFreq = Double.parseDouble(beat);
    } catch(Exception e) {
      noteFreq = -1;
    }
    if (noteFreq > 0)
      createMetronome(outFile, bpm, durSecs, noteFreq);
    else
      createMetronome(outFile, bpm, durSecs, beat);
  }

  public static void createMetronome(String outFile, int bpm, double durSecs, String beatFile)
                                    throws IOException, UnsupportedAudioFileException {
    genMetronome(outFile, readMonoWAV(beatFile), bpm, durSecs);
  }

  public static void createMetronome(String outFile, int bpm, double durSecs, double noteFreqHz) throws IOException {
    double[] envSegs = { 0.2, 0.5, 0.8, 1.0, 1.0, 1.0, 1.0, 1.0, 0.8, 0.5, 0.2 };
    genMetronome(outFile, createPureSoundData(noteFreqHz, beatDur, 44100, envSegs), bpm, durSecs);
  }

  static void genMetronome(String outFile, SoundInfo si, int bpm, double durSecs) throws IOException {
    int beatlen = si.getDataSize();
    double bytesPerSec = si.getBytesPerSec();
    double beatDist = bytesPerSec * 60 / bpm;
    byte[] buf = new byte[(int)(bytesPerSec * durSecs)+2];
    int len = buf.length, ptr = (int)Math.max((beatDist-beatlen)/2, 0.0);
    for (int p1=ptr; p1<len; ptr=(int)(ptr+beatDist)) {
      if ((ptr & 0x1) == 1)
        ++ptr;
      for (int j=0; j<beatlen; j++) { // copy the beat data at intervals
        p1 = ptr + j;
        if (p1 >= len) break;
        buf[p1] = si.data[j];
      }
    }

    writeWAV(outFile, new SoundInfo(si.format, buf));
  }

  static SoundInfo createPureSoundData(double freqHz, double durSecs, float sampleRate, double[] envSegs) {
    AudioFormat format = new AudioFormat(sampleRate, 16, 1, true, false); // 16-bit, mono, signed, l.e.
    byte[] data = createSinusoidalData(freqHz, durSecs, sampleRate, envSegs);
    return new SoundInfo(format, data);
  }

  static byte[] createSinusoidalData(double freqHz, double durSecs, float sampleRate) {
    return createSinusoidalData(freqHz, durSecs, sampleRate, null);
  }

  static double[] getEnvelope(double[] envSegs, int datalen) {
    if (envSegs == null || envSegs.length <= 1)
      return null;
    double[] env = new double[datalen];
    int segCnt = envSegs.length-1, envDist = (int)(datalen/segCnt);
    for (int seg=0; seg<segCnt; ++seg) {
      double envStart = envSegs[seg], envEnd = envSegs[seg+1],
             e = envStart, envInc = (envEnd-envStart) / envDist;
      int curTP = seg * envDist, nextTP = curTP + envDist;
      for (int i=curTP; i<nextTP; ++i) {
        env[i] = e;
        e += envInc;
      }
    }
    env[datalen-1] = envSegs[segCnt];
    return env;
  }

  static byte[] createSinusoidalData(double freqHz, double durSecs, float sampleRate, double[] envSegs) {
    ByteArrayOutputStream baos = new ByteArrayOutputStream();
    int i, len = (int)(sampleRate * durSecs);
    double angle = 2 * Math.PI * freqHz / sampleRate;
    double[] env = getEnvelope(envSegs, len);
    if (env == null) { // no envelope
      for (i=0; i < len; i++) {
        short sample = (short) (Short.MAX_VALUE * Math.sin(i * angle));
        baos.write(sample & 0xFF);        // sample bytes
        baos.write((sample >> 8) & 0xFF); // little-endian
      }
    } else {
      for (i=0; i<len; i++) {
        short sample = (short) (Short.MAX_VALUE * Math.sin(i * angle) * env[i]);
        baos.write(sample & 0xFF);        // sample bytes
        baos.write((sample >> 8) & 0xFF); // little-endian
      }
    }
    return baos.toByteArray();
  }

  static void writeWAV(String fname, SoundInfo si) throws IOException {
    try (AudioInputStream ais = si.toAudioInputStream()) {
      File wavFile = new File(fname);
      AudioSystem.write(ais, AudioFileFormat.Type.WAVE, wavFile);
      System.out.println("WAV file created: " + wavFile.getAbsolutePath());
    }
  }

  static SoundInfo readMonoWAV(String filePath) throws IOException, UnsupportedAudioFileException {
    try (AudioInputStream audioIS = AudioSystem.getAudioInputStream(new File(filePath))) {
      // Get the AudioFormat of the stream
      AudioFormat format = audioIS.getFormat();
               // encoding         - audio encoding technique
               // sampleRate       - number of samples per second
               // sampleSizeInBits - number of bits in each sample
               // channels         - number of channels (1 mono, 2 stereo)
               // frameSize        - number of bytes in each frame
               // frameRate        - number of frames per second
               // bigEndian        - byte order (false is little-endian)
      // TODO: check for valid file data format for us

      byte[] buf = new byte[2048];
      int len;
      ByteArrayOutputStream baos = new ByteArrayOutputStream();
      while ((len = audioIS.read(buf)) != -1)
        baos.write(buf, 0, len);
      return new SoundInfo(format, baos.toByteArray());
    }
  }

  public static void createPureNote(String outFile, double freqHz, double durSecs) throws IOException {
    writeWAV(outFile, createPureSoundData(freqHz, durSecs, 44100, null));
  }

} // end of MetronomeGen.
