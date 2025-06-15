import java.io.BufferedReader;
import java.util.ArrayList;
import java.util.Date;
import static java.lang.System.out;

/**
 * For 王治平居士《大佛頂首楞嚴經譯解》(0145~0154.htm) processing.
 */
// the source text file must be from Big5-to-Utf8 directly.
// Otherwise, manipulations may break this program.
public class Tool0145 extends BfnnCommon
{
  public static void main(String[] args) throws Exception {
    extractVerses(args);
  }

  public static final String PREF1a = "<p class=MsoPlainText style='text-indent:24.0pt;mso-char-indent-count:1.5; mso-char-indent-size:12.0pt'>";
  public static final String PREF1b = "<p class=MsoPlainText style='text-indent:24.0pt;'>";
  public static final String PREF2  = "<span style='color:purple'>";
  public static final String SP = "<span lang=EN-US>&nbsp;</span>";

  static void extractVerses(String[] args) throws Exception {
    String volNum = args[1];
    out.println("const " + volNum + " = [");
    try (BufferedReader br = openFile(args[0])) {
      String line;
      while ((line = br.readLine()) != null) {
        int i = line.indexOf("<p ");
        if (i >= 0) {
          while (!line.endsWith("</p>")) {
            if (line.endsWith(">"))
              line += br.readLine();
            else
              line += " " + br.readLine();
          }
          line = line.trim();
          int preflen = 0;
          if (line.startsWith(PREF1a))
            preflen = PREF1a.length();
          else if (line.startsWith(PREF1b))
            preflen = PREF1b.length();
          if (preflen > 0) {
            line = line.substring(preflen, line.length()-4); // rid of <p> </p>
            if (SP.equals(line))
              continue;
            if (line.startsWith(PREF2)) {
              String type = line.substring(PREF2.length(), line.indexOf("</span>"));
              line = findLastWrappedZis(line);
              out.println("['" + line + "', '" + type + "'],");
            }
            else {
              line = findLastWrappedZis(line);
              if (line != null)
                out.println("['" + line + "'],");
            }
          }
        }
      }
    }
    out.println("];");
  }

} // end.

