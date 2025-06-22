import java.io.*;
import static java.lang.System.out;
import static java.lang.System.err;

public class Cat {
  public static final String DEFAULT_CSET = "utf-8";
  public static final String SP = "<LNSP></LNSP>";

  public static BufferedReader open(String file) throws IOException {
    return open(new File(file));
  }
  public static BufferedReader open(File file) throws IOException {
    String charset = System.getProperty("charset");
    if (charset == null) charset = DEFAULT_CSET;
    if (!charset.toLowerCase().equals(DEFAULT_CSET))
      err.println(file.getName() + "charset: " + charset);
    return new BufferedReader(new InputStreamReader(new FileInputStream(file), charset));
  }

  public static void main(String args[]) throws Exception {
    if (args.length <= 0) return;
    String ln, mode = System.getProperty("mode");
    try (BufferedReader br = open(args[0])) {
      if ("writedoc".equalsIgnoreCase(mode))
        toWriteDoc(br);
      else
        for (; (ln=br.readLine()) != null; out.println(ln));
    }
  }

  static void toWriteDoc(BufferedReader br) throws Exception {
    err.println("Working on writeDoc() conversion");
    String ln="", cls;
    boolean started = false;
    boolean isStart9999 = false;
    boolean inHTML = false;
    boolean inBody = false;
    int idx, idx1;
    while ((ln = br.readLine()) != null) {
      String ln0 = ln.trim();
      if (ln0.length() == 0) continue;
      if (inHTML) {
        inHTML = !ln0.endsWith("</html>");
        out.println(ln);
        continue;
      }
      if (!started) {
        idx = ln.indexOf("writeBfnnStart(");
        if (idx >= 0) {
          if (!ln0.startsWith("<script>") || !ln0.endsWith("</script>"))
            throw new Exception("MAKE A SINGLE LINE OF FIRST: <script> ... writeBfnnStart(...); </script>");
          ln = ln.substring("<script>".length(), ln.length()-"</script>".length()).trim();
          idx = ln.indexOf("writeBfnnStart(");
          cls = ln.substring(0, idx).trim();
          idx1 = ln.lastIndexOf(");");
          out.println("\n<script>");
          if (cls.length() > 0) out.println(cls); // for series' setDocInfo().
          out.println("docInfo.writeDoc(" + ln.substring(idx + "writeBfnnStart(".length(), idx1) + ",");

          out.println("`");
          started = true;
          continue;
        }
        idx = ln.indexOf("start");
        if (idx >= 0) {
          char c = ln.charAt(idx+5);
          if (c == '0' || c == '1' || c == '2') {
            if (!ln0.startsWith("<script>") || !ln0.endsWith("</script>"))
              throw new Exception("MAKE A SINGLE LINE OF FIRST: <script> start9999(...); </script>");
            isStart9999 = true;
            idx1 = ln.lastIndexOf(");");
            out.println("\n<script>");
            out.println(ln.substring(idx, idx1+2));
            out.println("docInfo.writeBody(`");
            started = true;
          }
          continue;
        }
        // or else, continue
      }

      if (SP.equals(ln0)) { out.println(); continue; }

      if (ln0.contains("writeBfnnEnd")) {
        if (!ln0.startsWith("<script>") || !ln0.endsWith("</script>"))
          throw new Exception("MAKE A SINGLE LINE OF FIRST: <script> writeBfnnEnd(); </script>");
        out.println(isStart9999 ? "`).writeEnd();" : "`);");
        out.println("</script>");
        continue;
      }

      // <p ...> . . . </p>
      if (ln0.startsWith("<p ")) {
        String tmp = ln0;
        while (!endsWithAllowWhite(ln0, "</p>")) {
          ln0 = br.readLine();
          if (ln0 == null)
            throw new Exception("UNCLOSED <p>: " + ln);
          tmp += " " + ln0;
        }
        ln = tmp;
        ln0 = tmp.trim();
      }
      if (ln0.startsWith("<p ") && ln0.endsWith("</p>")) {
        idx = ln0.indexOf('>');
        cls = dequote(ln0.substring(ln0.indexOf("class=")+6, idx));
        ln = ln0.substring(idx+1, ln0.length()-"</p>".length());
        if (cls.startsWith("TEXT ") && cls.endsWith("align=right")) {
          cls = "TEXTR";
          for (; ln.endsWith("　"); ln=ln.substring(0,ln.length()-1));
        }
        // <a name></a>
        if (ln.startsWith("<a name")) {
          idx = ln.lastIndexOf("></a>");
          if (idx < 0)
            throw new Exception("ERROR: " + ln);
          cls += ":" + dequote(ln.substring("<a name=".length(), idx));
          ln = ln.substring(idx + "></a>".length());
        }
        if (ln.endsWith("　") || ln.endsWith(" "))
          ln += '|';
        if (!"TEXT".equals(cls)) {
          out.print("/");
          out.print(cls);
          out.print("/");
        }
        out.println(ln);
        continue;
      }

      out.println(ln);
      if (!inBody)
        inBody = ln0.equals("</head>");
      else if (ln0.startsWith("<html>"))
        inHTML = true;
      else if (!inHTML)
        err.println("  ASIS: " + ln);
    }
  }

  static String dequote(String s) {
    if (s.length() <= 2) return s;
    char c = s.charAt(0);
    return (c=='"' || c=='\'') ? s.substring(1, s.length()-1) : s;
  }

  static boolean endsWithAllowWhite(String s, String pattern) {
    int idx = s.lastIndexOf(pattern); 
    if (idx < 0) return false;
    return s.substring(idx).trim().length() == pattern.length();
  }

} // end of Cat.
