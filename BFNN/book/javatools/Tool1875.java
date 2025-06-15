import java.io.BufferedReader;
import java.util.ArrayList;
import java.util.Date;
import static java.lang.System.out;

/**
 * For 海仁法師《大佛頂首楞嚴經講記》(1875~1884.htm) processing.
 */
// the source text file must be from Big5-to-Utf8 directly.
// Otherwise, manipulations may break this program.
public class Tool1875 extends BfnnCommon
{
  public static void main(String[] args) throws Exception {
    printTrimmedToJS(args);
    //printTrimmed(args);
    //extractVerses(args);
  }

  public static final String pat1 = "<p class=MsoPlainText style='text-indent:24.0pt;'><b><span style='color:teal'>";
  public static final String pat2 = "<p class=MsoPlainText style='text-indent:24.0pt;'><span style='color:#333399'>";
  public static final String pat3 = "<p class=MsoPlainText style='text-indent:24.0pt;'><span lang=EN-US>&nbsp;</span></p>";
  public static final String pat4 = "<p class=MsoPlainText align=center style='text-align:center'><span lang=EN-US>&nbsp;</span></p>";
  public static final String pat5 = "<p class=MsoPlainText style='text-indent:24.0pt;'>";

  public static final String MSO_PLAIN_TEXT = "margin:0cm; margin-bottom:.0001pt; font-size:12.0pt; font-family:細明體; ";

  static void extractVerses(String[] args) throws Exception {
    String volNum = args[1];
    try (BufferedReader br = openFile(args[0])) {
      String line;
      boolean inBody = false;
      int verseNum = 1;
      while ((line = br.readLine()) != null) {
        if (!inBody) {
          if (line.startsWith("<body"))
            inBody = true;
          continue;
        }

        // inBody == true
        int i = line.indexOf("<p ");
        if (i >= 0) {
          while (!line.endsWith("</p>")) {
            if (line.endsWith(">"))
              line += br.readLine();
            else
              line += " " + br.readLine();
          }
        }
        line = line.trim();
        if (line.startsWith(pat1)) {
          int start = pat1.length();
          int idx = line.indexOf("<", start);
          if (idx > 0)
            out.println("'" + volNum + digit3(verseNum++) + "': '" + line.substring(start, idx) + "',");
        }
      }
    }
  }

  static void printTrimmed(String[] args) throws Exception {
    try (BufferedReader br = openFile(args[0])) {
      String line;
      boolean inBody = false;
      int verseNum = 1;
      while ((line = br.readLine()) != null) {
        if (!inBody) {
          if (line.startsWith("<body"))
            inBody = true;
          out.println(line);
          continue;
        }

        // inBody == true
        int i = line.indexOf("<p ");
        if (i >= 0) {
          while (!line.endsWith("</p>")) {
            if (line.endsWith(">"))
              line += br.readLine();
            else
              line += " " + br.readLine();
          }
        }
        line = line.trim();
        if (line.startsWith(pat1)) {
          int start = pat1.length();
          int idx = line.indexOf("<", start);
          if (idx > 0)
            line = "<p class=VERSE>【" + digit3(verseNum++) + "】&nbsp;" + line.substring(start, idx) + "</p>";
        } else if (line.startsWith(pat2)) {
          int start = pat2.length();
          int idx = line.indexOf("<", start);
          if (idx > 0)
            line = "<p class=KEPAN>" + line.substring(start, idx) + "</p>";
        } else if (line.equals(pat3) || line.equals(pat4)) {
          line = "<p class=MsoPlainText lang=EN-US>&nbsp;</p>";
        } else if (line.startsWith(pat5)) {
          line = "<p class=TEXT>" + line.substring(pat5.length(), line.lastIndexOf("</p>"));
        }
        out.println(line);
      }
    }
  }

  static void printTrimmedToJS(String[] args) throws Exception {
    String volNum = args[1];
    StringBuffer BEFORE = new StringBuffer(), AFTER  = new StringBuffer(), cur = BEFORE;
    ArrayList<String[]> content = new ArrayList<>();
    try (BufferedReader br = openFile(args[0])) {
      String line;
      boolean inText = false, inBody = false;
      int verseNum = 1;
      while ((line = br.readLine()) != null) {
        if (!inBody) {
          if (line.startsWith("<body"))
            inBody = true;
          cur.append(line).append('\n');
          continue;
        }

        // inBody == true
        int i = line.indexOf("<p ");
        if (i >= 0) {
          while (!line.endsWith("</p>")) {
            if (line.endsWith(">"))
              line += br.readLine();
            else
              line += " " + br.readLine();
          }
        }
        line = line.trim();
        String type = null;
        if (line.startsWith(pat1)) {
          int start = pat1.length();
          int idx = line.indexOf("<", start);
          if (idx > 0) {
            type = "VERSE";
            line = line.substring(start, idx);
          }
        } else if (line.startsWith(pat2)) {
          type = "KEPAN";
          int start = pat2.length();
          int idx = line.indexOf("<", start);
          if (idx > 0)
            line = line.substring(start, idx);
        } else if (line.equals(pat3) || line.equals(pat4)) {
          type = "SPACE";
          line = ""; // <p class=MsoPlainText lang=EN-US>&nbsp;</p>
        } else if (line.startsWith(pat5)) {
          type = "TEXT";
          line = line.substring(pat5.length(), line.lastIndexOf("</p>"));
        }

        if (!inText) {
          if ("VERSE".equals(type) || "KEPAN".equals(type)) {
            if (!"A".equals(volNum) || line.indexOf("如是我聞") >= 0) {
              inText = true;
              content.add(new String[]{ type, line });
            } else {
              cur.append("<p class=").append(type).append(">").append(line).append("</p>\n");
            }
          } else if ("SPACE".equals(type)) {
            cur.append("<p class=MsoPlainText lang=EN-US>&nbsp;</p>\n");
          } else {
            cur.append(line).append('\n');
          }
        } else {
          if (line.startsWith("</div>")) {
            inText = false;
            cur = AFTER;
            cur.append(line).append('\n');
          } else {
            if ("SPACE".equals(type))
              ;
            else if (type == null)
              cur.append(line).append('\n');
            else
              content.add(new String[]{ type, line });
          }
        }
      }
    }

    out.println(BEFORE);

    // write JS code
    out.println("<script>");
    out.println("const verses = { // these are scraped from the original.");
    int i, verseNum = 1;
    for (i=0; i<content.size(); ++i) {
      String[] sa = content.get(i);
      if ("VERSE".equals(sa[0]))
        out.println("'" + volNum + digit3(verseNum++) + "': '" + sa[1] + "',");
    }
    out.println("};");

    verseNum = 1;
    out.println("(function() {");
    out.println("  var VERSES = verses; // this can be replaced by external ones!");
    out.println("  if (verses != VERSES) console.log('Using external verses.');");
    out.println("  var volNum = '" + volNum + "';");
    out.println("  const SP = '<p class=MsoPlainText lang=EN-US>&nbsp;</p>\\n';");
    out.println("  function w() { for(var i in arguments)document.write(arguments[i]) }");
    out.println("  function wVerse(num) { w('<p class=VERSE>【', num, '】&nbsp;', VERSES[volNum+num], '</p>', SP); }");
    out.println("  function wLine(ln,type) { w('<p class=', type || 'TEXT', '>', ln, '</p>', SP); }");
    for (i=0; i<content.size(); ++i) {
      String[] sa = content.get(i);
      if ("VERSE".equals(sa[0])) {
        String id = digit3(verseNum++);
        out.println("wVerse('" + id + "');");
      } else if ("TEXT".equals(sa[0])) {
        out.println("wLine('" + sa[1] + "');");
      } else {
        out.println("wLine('" + sa[1] + "', '" + sa[0] + "');");
      }
    }
    out.println("}());");
    out.println("</script>");

    out.println(AFTER);
    out.println("<!-- Generated by " + Tool1875.class.getName()+ " from " + args[0] + " at " + new Date() + ". -->");
  }

} // end.

