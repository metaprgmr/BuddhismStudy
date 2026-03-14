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

  public static void fail(String msg) {
    throw new RuntimeException(msg);
  }

  public static void main(String[] args) throws Exception {
    String s = "如是修[A20]已，[＊]詣彼佛所[1]，(之後略)";
    out.println(s);
    s = trimBrackets(s);
    out.println(s);
    out.println(parenToTag(s, "<cil>（", "）</cil>"));
  }

  public static BufferedReader openFile(String name) throws IOException {
    return new BufferedReader(new InputStreamReader(new FileInputStream(name), "utf-8"));
  }

  public static PrintWriter openFileToWrite(String name) throws IOException {
    return new PrintWriter(new BufferedWriter(
      new OutputStreamWriter(new FileOutputStream(name), StandardCharsets.UTF_8)));
  }

  public static String myClassName() {
    StackTraceElement[] st = Thread.currentThread().getStackTrace();
    return st[st.length-1].getClassName();
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

  private static final String[] ZH_DIGITS = {"〇","一","二","三","四","五","六","七","八","九"};
  private static final String[] ZH_UNITS = {"","十","百","千"};
  private static final String[] ZH_LARGE_UNITS = {"","万","亿","兆"};

  public static String zNum(int number) {
    if (number == 0)
      return ZH_DIGITS[0]; // "〇"

    StringBuilder sb = new StringBuilder();
    String s = String.valueOf(number); // Convert the number to a string
    int len = s.length();
    int unitIndex = 0;

    for (int i = len - 1; i >= 0; i--) {
      int digit = Character.getNumericValue(s.charAt(i));
      String digitChar = ZH_DIGITS[digit];
      String unitChar = ZH_UNITS[unitIndex % 4];

      if (digit != 0) // Handle the combination of digit and unit
        sb.insert(0, digitChar + unitChar);
      else // Handle zeros to avoid "零零"
        if (i < len - 1 && Character.getNumericValue(s.charAt(i + 1)) != 0 && !sb.toString().startsWith("零"))
          sb.insert(0, ZH_DIGITS[0]);

      // Add large units (万, 亿, etc.) at appropriate positions
      if (unitIndex % 4 == 3) // Adjust index for large units
        sb.insert(0, ZH_LARGE_UNITS[unitIndex / 4]);
      unitIndex++;
    }

    // Handle the special case for "十" at the beginning for numbers 10-19
    s = sb.toString();
    return s.startsWith("一十") ? s.substring(1) : s;
  }

  /**
   * @return { info, name, others }, where name/others can be null.
   */
  public static String[] guessSanghaNameInfo(String ln) {
    String[] ret = { ln, null, null };
    int idx;
    if (ln.endsWith(")")) {
      idx = ln.lastIndexOf('(');
      ret[2] = ln.substring(idx+1, ln.length()-1).trim().replaceAll("　", "•");
      ln = ln.substring(0, idx).trim();
    }
    String[] keys = { 
      "上座", "沙門", "梵僧", "天竺僧", "僧統", "大僧正", "大律都", "逸僧",
      "院", "寺", "蘭若", "道場", "精舍", "庵", "宮", 
      "峯", "峰", "巖", "嶽", "溪", "山",
      "縣", "國", "州", "府", "鄉", "京師", "隋", "唐", "宋", "今", "齊",
      "西域", "京兆", "長水", "洛陽", "洛京", "晉陽", "巴東", "河東", "南瓦窰",
      "鄴都", "鄴上", "鄴中", "鄴下", "吳興", "嘉禾", "吳郡", "觀音臺"
    };
    for (int i=0; i<keys.length; ++i) {
      String k = keys[i];
      idx = ln.lastIndexOf(k);
      if (idx > 0) {
        idx += k.length();
        ret[0] = ln.substring(0, idx);
        ret[1] = ln.substring(idx);
        idx = ret[1].lastIndexOf('傳');
        if (idx > 0) ret[1] = ret[1].substring(0, idx);
        break;
      }
    }
    return ret;
  }

  /**
   * For use of naive optimization: betting on
   *   1. indexOf/lastIndexOf() faster than regexp, and
   *   2. usually the pattern occurs sparsely.
   *
   * @param start retained in result
   * @param end   retained in result
   * @return { head, <start>...<end>, tail }
   */
  public static String[] toThreeParts(String s, String start, String end) {
    String orig = s;
    String[] ret = { "", orig, "" };
    int idx = s.indexOf(start);
    if (idx < 0) return ret;

    ret[0] = s.substring(0, idx);
    s = s.substring(idx);
    idx = s.lastIndexOf(']');
    if (idx >= 0) {
      ret[2] = s.substring(idx+1);
      ret[1] = s.substring(0, idx+1);
    } else { // ignore
      ret[1] = ret[1];
      ret[0] = ret[2] = "";
    }
    return ret;
  }

  public static String trimBrackets(String s) {
    String[] a = toThreeParts(s, "[", "]");
    Pattern pattern = Pattern.compile("\\[(A*\\d+|＊)]");
    s = pattern.matcher(a[1]).replaceAll("");
    return a[0] + s + a[2];
  }

  public static String parenToTag(String s, String openTag, String closeTag) {
    String[] a = toThreeParts(s, "(", ")");
    Pattern pattern = Pattern.compile("(\\()|(\\))");
    s = pattern.matcher(a[1]).replaceAll(match -> {
          if (match.group(1) != null) return openTag;
          if (match.group(2) != null) return closeTag;
          return match.group(); // Should not happen
        });
    return a[0] + s + a[2];
  }

  private static boolean _okToDel(char c) {
    switch(c) {
    case '0': case '1': case '2': case '3': case '4':
    case '5': case '6': case '7': case '8': case '9':
    case 'A': case 'B': case '＊': return true;
    }
    return false;
  }

} // la Fin.
