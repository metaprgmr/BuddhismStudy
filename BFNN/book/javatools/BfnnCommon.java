import java.io.*;
import static java.lang.System.out;

public class BfnnCommon {

  public static interface StateMachine {
    String proc(String line);
  }

  public static void main(String[] args) throws Exception {
    concatParaTag(args, null);
  }

  public static BufferedReader openFile(String name) throws IOException {
    return new BufferedReader(new InputStreamReader(new FileInputStream(name), "utf-8"));
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

  // first makes <p></p> on a single line, then delegate to a StateMachine.
  public static void concatParaTag(String[] args, StateMachine sm) throws Exception {
    if (sm == null)
      sm = new BasicStateMachine();

    try (BufferedReader br = openFile(args[0])) {
      String line;
      boolean inStyle = false;
      boolean inEndBlock = false;
      while ((line = br.readLine()) != null) {
        int i;
        if (!inStyle) {
          if (line.startsWith("<style>")) {
            inStyle = true;
            System.err.println("IGNORED: " + line);
            continue;
          }
        } else {
          if (line.startsWith("</style>")) inStyle = false;
          System.err.println("IGNORED: " + line);
          continue;
        }
        i = line.indexOf("<p ");
        if (i >= 0) {
          while (!line.endsWith("</p>")) {
            if (!line.endsWith(">"))
              line += ' ';
            line += br.readLine();
          }
          line = line.trim();
        }

        if (inEndBlock) {
          if (line.endsWith("</body>")) {
            out.println("<div class=endImage title=\"UTF-8 encoded\"></div>\n</body>");
            inEndBlock = false;
          }
          continue;
        }
        if ((line != null) && (line.indexOf("DO NOT MODIFY") > 0)) {
          if (line.contains("Hotrank")) {
            inEndBlock = true;
            continue;
          }
        }
        line = sm.proc(line);
        if ((line != null) && !line.equals("<script language=\"JavaScript\" src=\"\"></script>"))
          out.println(line);
      }
    }
  }

  public static class BasicStateMachine implements StateMachine {
    public final String SPACE = "<LNSP></LNSP>";
    public final String pat1  = "<p class=MsoPlainText style='text-indent:24.0pt;' align='center'>";
    public final String pat2  = "<font color=\"#FFFFFF\" size=\"2\"><font color=\"#FFFFFF\" size=\"2\"><font color=\"#FFFFFF\" size=\"2\">";
    public final String pat5  = "<p class=MsoPlainText style='text-indent:24.0pt;'>";
    public final String pat3  = pat5 + "<b><span style='color:teal'>";
    public final String pat3_ = "</span></b></p>";
    public final String pat4a = pat5 + "<span class=kepan>";
    public final String pat4b = pat5 + "<span style='color:#333399'>";
    public final String pat4c = "<p class=TEXT><font color=\"#333399\">";
    public final String pat4c_ = "</font></p>";
    public final String pat4_ = "</span></p>";
    public final String pat6  = "style='font-size:36.0pt;font-family:標楷體;color:#FF6600'"; // into "class=caption"
    public final String pat7  = "<b><span lang=EN-US style='font-size:36.0pt;font-family:\"Times New Roman\"; color:#FF6600'></span></b>"; // into ""
    public final String pat8  = "<p class=MsoPlainText align=center style='text-align:center'><span lang=EN-US>";
    public final String pat9  = "<p class=MsoPlainText align=center style='text-align:center'><span style='color:#003300'>";
    public final String pat10 = "<p class=MsoPlainText align=center style='text-align:center'><b><span class=caption>";
    public final String pat10_= "</span></b></p>";
    public final String pat11 = "<p class=MsoPlainText align=right style='text-align:right;text-indent:24.0pt; word-break:break-all'>";

    boolean doneBig5 = false;
    boolean doneBookClean = false;
    boolean inEndSection = false;
    boolean inBody = false;
    boolean hasEndImage = false;

    public static String getFirstTag(String ln) {
      int idx = ln.indexOf('>');
      if (idx > 0) return ln.substring(0, idx+1);
      return "";
    }
    public static String getLastTag(String ln) {
      int idx = ln.lastIndexOf("</");
      if (idx > 0) return ln.substring(idx);
      return "";
    }
    public static boolean isSP(String ln) {
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

    public String proc(String line) {
      if (!doneBig5) {
        int idx = line.indexOf("Big5");
        if (idx < 0)
          idx = line.indexOf("big5");
        if (idx > 0)
          line = line.substring(0, idx) + "utf-8" + line.substring(idx+4);
        else if (line.indexOf("utf-8") > 0) { // already done.
          doneBig5 = true;
          doneBookClean = true;
        }
      }
      if (!doneBookClean) {
        int idx = line.indexOf("class=book ");
        if (idx > 0)
          line = line.substring(0, idx) + "class=bookClean " + line.substring(idx+"class=book ".length());
      }
      if (!inEndSection) {
        if (line.startsWith(pat2) || line.indexOf("Begin of Hotrank") > 0) {
          inEndSection = true;
          return null;
        }
      } else if (!hasEndImage) {
        if (line.startsWith("<div class=endImage "))
          hasEndImage = true;
      }

      if (!inBody) {
        line = line.replace(pat6, "class=caption");
        if (line.startsWith("<body"))
          inBody = true;
        return line;
      } else if (line.startsWith("</html>")) {
        inBody = false; // print as-is, again.
        return line;
      } else {
        // moderate post-processing before sending to the StateMachine, if any.
        String ln;
        ln = changeParaClass(line, pat3,  pat3_, "VERSE"); if (ln != null) return ln;
        ln = changeParaClass(line, pat4a, pat4_, "KEPAN"); if (ln != null) return ln;
        ln = changeParaClass(line, pat4b, pat4_, "KEPAN"); if (ln != null) return ln;
        ln = changeParaClass(line, pat4c, pat4_, "KEPAN"); if (ln != null) return ln;
        line = line.replace(pat6, "class=caption")
                   .replace(pat5, "<p class=TEXT>")
                   .replace(pat1, "<p class=TEXT align=center>")
                   .replace(pat11, "<p class=TEXT align=right>")
                   .replaceAll("<span style='font-size: *10.0pt; *'>", "<span class=inlineAnno>");
        ln = changeParaClass(line, pat10, pat10_,"TITLE"); if (ln != null) return ln;
        if (line.contains("<span style='color:#333399'>") && line.endsWith(pat4_)) {
          line = line.replace("<span style='color:#333399'>", "")
                     .replace("<p class=TEXT>", "<p class=TEXT339>")
                     .replace(pat4_, "</p>");
        } else if (line.startsWith(pat8) && line.endsWith(pat4_)) {
          line = "<p class=TEXTC>" + line.substring(pat8.length(), line.length() - pat4_.length()) + "</p>";
        } else if (line.startsWith(pat9) && line.endsWith(pat4_)) {
          line = "<p class=TEXT030C>" + line.substring(pat9.length(), line.length() - pat4_.length()) + "</p>";
        }
        line = line.replaceAll("<p class=MsoPlainText align=center style='text-align:center; ?color:#003300'>", "<p class=TEXT030C>")
                   .replaceAll("<p class=MsoPlainText align=center style='text-align:center; ?color:#333399'>", "<p class=TEXT339C>")
//                 .replaceAll("<span lang=EN-US></span>|<span>&nbsp; *</span>|" + pat7, "");
                   .replace("<span lang=EN-US></span>", "");
        if (line.endsWith("</body>"))
          return "<div class=endImage title=\"UTF-8 encoded\"></div>\n</body>";
        return isSP(line) ? SPACE : line;
      }
    }
  }

} // end.
