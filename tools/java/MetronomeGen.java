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
    int getSampleSizeInBits() { return this.format.getSampleSizeInBits(); } // pratically always 2
    double getBytesPerSec() { return this.format.getSampleRate() * this.getSampleSizeInBits() / 8; }
    AudioInputStream toAudioInputStream() {
      ByteArrayInputStream bais = new ByteArrayInputStream(this.data);
      return new AudioInputStream(bais, this.format, this.getFrameCount());
    }
  }

  static void help() {
    String txt =
      "Usage: java MetronomeGen outFile bpm dur beat\n" +
      "  where: outFile is the output WAV file name.\n" +
      "         bpm     is an integer for beats-per-minute.\n" +
      "         dur     is duration; can end with 's' (seconds) or 'm' (minutes).\n" +
      "                 Further, if ends with '_', the last 20 beats will be softer.\n" +
      "         beat    can be a file name, or a note frequency such as 440.\n" +
      "A few examples:\n" +
      "    java MetronomeGen metron-120-5m.wav    120 5m  ../images/metrobeat.wav\n" +
      "or: java MetronomeGen metronA4-125-5m_.wav 125 5m_ 440\n" +
      "or: java MetronomeGen metronA4-125-30.wav  125 30  440\n" +
      "or: java MetronomeGen metronA3-140-30.wav  140 30s 220\n" +
      "\n" +
      "For your quick reference, the frequencies of musical notes are:\n" +
      "  C4=261.6 D4=293.7 E4=329.6 F4=349.2 G4=392 A4=440 B4=493.9\n";
    if (System.getProperty("cemoi") != null)
      txt = txt.replaceAll("java MetronomeGen", "gen-metronome.sh");
    System.err.println(txt);
  }

  public static void main(String[] args) throws Exception {
    if (args.length < 4) { help(); System.exit(0); }

    String outFile = args[0];
    int    bpm  = Integer.parseInt(args[1]);
    String dur  = args[2]; // e.g. "30", "30s", "15m" or "15m_"
    String beat = args[3]; // e.g. "metrobeat.wav" or 440
    boolean endTaper = false;

    int durSecs = 1, last = dur.length()-1;
    if (dur.charAt(last) == '_') {
      endTaper = true;
      dur = dur.substring(0, last--);
    }
    if (dur.charAt(last) == 's')
      dur = dur.substring(0, last);
    else if (dur.charAt(last) == 'm') {
      durSecs = 60;
      dur = dur.substring(0, last);
    }
    durSecs *= Integer.parseInt(dur);

    Object beatOpt;
    try {
      beatOpt = Double.valueOf(beat);
    } catch(Exception e) {
      beatOpt = beat;
    }
    createMetronome(outFile, bpm, durSecs, endTaper, beatOpt);
  }

  public static void createMetronome(String outFile, int bpm, double durSecs, boolean endTaper, Object beat)
                                    throws IOException, UnsupportedAudioFileException {
    SoundInfo si = null;
    if (beat instanceof String)
      si = readMonoWAV((String)beat);
    else if (beat instanceof Number) {
      double noteFreqHz = ((Number)beat).doubleValue();
      double[] envSegs = { 0.2, 0.5, 0.8, 1.0, 1.0, 1.0, 1.0, 1.0, 0.8, 0.5, 0.2 };
      si = createPureSoundData(noteFreqHz, beatDur, 44100, envSegs);
    }
    genMetronome(outFile, si, bpm, durSecs, endTaper);
  }

  static int ensureEven(int i) {
    return ((i & 0x1) == 1) ? (i+1) : i;
  }

  static void genMetronome(String outFile, SoundInfo si, int bpm, double durSecs, boolean endTaper)
                          throws IOException
  {
    int beatlen = si.getDataSize();
    double bytesPerSec = si.getBytesPerSec();
    double beatDist = bytesPerSec * 60 / bpm;
    int len = (int)(bytesPerSec * durSecs);
    // make multiples of beats, and even
    len = ensureEven((int)( (1+(int)(len / beatDist)) * beatDist ) + 1);
    byte[] buf = new byte[len];
    int p1, ptr = (int)Math.max((beatDist-beatlen)/2, 0.0);
    for (p1=ptr; p1<len; ptr=(int)(ptr+beatDist)) {
      ptr = ensureEven(ptr);
      for (int j=0; j<beatlen; j++) { // copy the beat data at intervals
        p1 = ptr + j;
        if (p1 >= len) break;
        buf[p1] = si.data[j];
      }
    }
    if (endTaper) {
      int t1 = (int)(len-beatDist*20), t2 = (int)(len-beatDist*10);
      for (p1=t1; p1<t2; ++p1)
        buf[p1] = (byte)(buf[p1] * 6 / 10);
      double morphz = 0.06, morphR = 0.3-morphz, dist = len-t2;
      for (p1=t2; p1<len-2; p1+=2) {
        double morph = (1-(p1-t2)/dist) * morphR + morphz;
        buf[p1  ] = (byte)((int)(buf[p1  ] * morph) & 0xFF);
        buf[p1+1] = (byte)((int)(buf[p1+1] * morph) & 0xFF);
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
