import java.io.*;
import java.util.regex.Pattern;
import java.nio.charset.StandardCharsets;
import static java.lang.System.out;
import static java.lang.System.err;

public class BfnnCommon {

  public static interface StateMachine {
    String proc(String line);
    default void println(String ln) { out.println(ln); }
  }

  public static void main(String[] args) throws Exception {
    concatParaTag(args, null);
  }

  public static BufferedReader openFile(String name) throws IOException {
    return new BufferedReader(new InputStreamReader(new FileInputStream(name), "utf-8"));
  }

  public static PrintWriter openFileToWrite(String name) throws IOException {
    return new PrintWriter(new BufferedWriter(
      new OutputStreamWriter(new FileOutputStream(name), StandardCharsets.UTF_8)));
  }

  public static String digitN(int i, int n) {
    String x = String.valueOf(i);
    while (x.length() < n) x = "0" + x;
    return x;
  }
  public static String digit2(int i) { return digitN(i, 2); }
  public static String digit3(int i) { return digitN(i, 3); }

  static String findLastWrappedZis(String line) {
    int end = line.length()-1, start, c;
    for (; end >= 0; end--) {
      c = line.charAt(end);
      if (c < 0 || c >= 255) {
        ++end;
        break;
      }
    }
    for (start = end-1; start >= 0; start--) {
      c = line.charAt(start);
      if (c > 0 && c < 255) {
        ++start;
        break;
      }
    }
    if (end <= 0)
      return null;
    if (start >= 0 && start < end)
      return line.substring(start, end);
    return line;
  }

  private static final String END_REACHED = "!END!FIN!";

  // first makes <p></p> on a single line, then delegate to a StateMachine.
  public static void concatParaTag(String[] args, StateMachine sm) throws Exception {
    if (sm == null)
      sm = new BasicStateMachine();

    try (BufferedReader br = openFile(args[0])) {
      String line;
      boolean inStyle = false;
      while ((line = br.readLine()) != null) {
        int i;
        if (!inStyle) {
          if (line.startsWith("<style>")) {
            inStyle = true;
            err.println("IGNORED: " + line);
            continue;
          }
        } else {
          if (line.startsWith("</style>")) inStyle = false;
          err.println("IGNORED: " + line);
          continue;
        }
        i = line.indexOf("<p ");
        if (i >= 0) {
          while (!line.endsWith("</p>")) {
            if (!line.endsWith(">"))
              line += ' ';
            String tmp = br.readLine();
            if (tmp == null) break;
            line += tmp;
          }
          line = line.trim();
        }

        line = sm.proc(line);
        if (END_REACHED.equals(line)) {
          sm.println("\n<script> writeBfnnEnd(); </script>");
          break;
        }
        if ((line != null) && !line.equals("<script language=\"JavaScript\" src=\"\"></script>"))
          sm.println(line);
      }
    }
  }

  public static class BasicStateMachine implements StateMachine {
    public final String SPACE = "<LNSP></LNSP>";
    public final String _span_p = "</span></p>";

    boolean doneBig5 = false;
    boolean inBody = false;
    boolean hasEndImage = false;
    PrintWriter pw;

    public BasicStateMachine() {
      this.pw = null;
    }

    public BasicStateMachine(PrintWriter w) {
      this.pw = w;
    }

    public void println(String ln) {
     if (pw == null)
       out.println(ln);
     else
       pw.println(ln);
    }

    public static String getFirstTag(String ln) {
      int idx = ln.indexOf('>');
      if (idx > 0) return ln.substring(0, idx+1).trim();
      return "";
    }
    public static String getLastTag(String ln) {
      int idx = ln.lastIndexOf("</");
      if (idx > 0) return ln.substring(idx).trim();
      return "";
    }
    public static boolean isSP(String ln) {
      ln = ln.trim();
      while (true) {
        if (ln.equals("&nbsp;")) return true;
        String first = getFirstTag(ln);
        String last  = getLastTag(ln);
        if (first.length() == 0 || last.length() == 0 || !first.startsWith("<" + last.substring(2, last.length()-1)))
          break;
        ln = ln.substring(first.length(), ln.length() - last.length()).trim();
      }
      return false;
    }
    public static String changeParaClass(String ln, String start, String end, String cls) {
      if (ln.endsWith(end) && ln.startsWith(start))
        return "<p class=" + cls + ">" + ln.substring(start.length(), ln.length() - end.length()) + "</p>";
      else
        return null;
    }
    public static String getTitle(String ln) {
      String fs36 = "style='font-size:36.0pt;font-family:標楷體;color:#FF6600'>";
      int idx = ln.indexOf(fs36);
      return idx < 0 ? null : ln.substring(idx+fs36.length()).replaceAll("<[^>]*>", "");
    }

    public String proc(String line) {
      if (!inBody) {
        if (!doneBig5) {
          int idx = line.indexOf("Big5");
          if (idx < 0)
            idx = line.indexOf("big5");
          if (idx > 0) {
            doneBig5 = true;
            return line.substring(0, idx) + "utf-8" + line.substring(idx+4);
          }
        }
        if (line.startsWith("<link") && line.endsWith(".mso\">"))
          return null;
        if (line.startsWith("</head>"))
          return "<script src=\"../mybfnn.js\"></script>\n</head>";
        if (line.startsWith("<title>"))
          return null;
        if (line.startsWith("<body")) {
          inBody = true;
          return null; // "\n<script> writeBfnnStart(); </script>";
        }
        return line;
      }
      if (line.startsWith("</html>")) {
        inBody = false; // print as-is, again.
        return line;
      }
      if (line.startsWith("<div class=book"))
        return "";
      if (line.startsWith("<font color=\"#FFFFFF\" size=\"2\"><font color=\"#FFFFFF\" size=\"2\">") ||
          line.startsWith("<img src=\"../books/sign.gif\"") ||
          line.contains("Begin of Hotrank"))
        return END_REACHED;
      if (!hasEndImage && line.startsWith("<div class=endImage "))
        hasEndImage = true;

      String ln;
      ln = getTitle(line);
      if (ln != null) return "\n<script> writeBfnnStart('" + ln + "'); </script>";

      // moderate post-processing before sending to the StateMachine, if any.
      line = line.replace("<span lang=EN-US></span>", "")
                 .replace("<span>&nbsp; </span>", "");
      ln = changeParaClass(line,
                           "<p class=MsoPlainText style='text-indent:24.0pt;'><b><span style='color:teal'>",
                           "</span></b></p>", "VERSE");
      if (ln != null) return ln;
      ln = changeParaClass(line, "<p class=MsoPlainText style='text-indent:24.0pt;'><span class=kepan>", _span_p, "KEPAN");
      if (ln != null) return ln;
      ln = changeParaClass(line, "<p class=MsoPlainText style='text-indent:24.0pt;'><span style='color:#333399'>", _span_p, "KEPAN");
      if (ln != null) return ln;
      ln = changeParaClass(line, "<p class=TEXT><font color=\"#333399\">", _span_p, "KEPAN");
      if (ln != null) return ln;
      line = line.replace("<p class=MsoPlainText style='text-indent:24.0pt;'>",
                          "<p class=TEXT>")
                 .replace("<p class=MsoPlainText style='text-indent:24.0pt;' align='center'>",
                          "<p class=TEXT align=center>")
                 .replace("<p class=MsoPlainText align=right style='text-align:right;text-indent:24.0pt; word-break:break-all'>",
                          "<p class=TEXT align=right>")
                 .replaceAll("<span style='font-size: *10.0pt; *'>", "<ail>");
      if (line.contains("<span style='color:#333399'>") && line.endsWith(_span_p)) {
        line = line.replace("<span style='color:#333399'>", "")
                   .replace("<p class=TEXT>", "<p class=TEXT339>")
                   .replace(_span_p, "</p>");
      } else {
        String pat8  = "<p class=MsoPlainText align=center style='text-align:center'><span lang=EN-US>";
        String pat9  = "<p class=MsoPlainText align=center style='text-align:center'><span style='color:#003300'>";
        if (line.startsWith(pat8) && line.endsWith(_span_p))
          line = "<p class=TEXTC>" + line.substring(pat8.length(), line.length() - _span_p.length()) + "</p>";
        else if (line.startsWith(pat9) && line.endsWith(_span_p))
          line = "<p class=TEXT030C>" + line.substring(pat9.length(), line.length() - _span_p.length()) + "</p>";
      }
      line = line.replaceAll("<p class=MsoPlainText align=center style='text-align:center; ?color:#003300'>", "<p class=TEXT030C>")
                 .replaceAll("<p class=MsoPlainText align=center style='text-align:center; ?color:#333399'>", "<p class=TEXT339C>");
      if (line.endsWith("</body>"))
        return "<div class=endImage title=\"UTF-8 encoded\"></div>\n</body>";
      return isSP(line) ? SPACE : line;
    }
  }

} // end.
