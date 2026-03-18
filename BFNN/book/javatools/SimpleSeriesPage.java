import java.io.BufferedReader;
import java.io.PrintWriter;
import static java.lang.System.out;
import static java.lang.System.err;

/**
 * Has become a misnomer. It also does simple processing other than series pages.
 */
public class SimpleSeriesPage extends BfnnCommon {

  public static boolean needVolTitle = false;
  public static int     pageNumLen   = 2;
  public static String  jsFilePrefix = "";
  public static String  parenProc = null;
  public static String  varName;

  public static void leave(String args) {
    final String msg =
      "FAILED TO RUN: java " + myClassName() + " " + args + '\n' +
      "Usage: java " + myClassName() + '\n' +
      "            -DneedVolTitle=[t/f]    -- default: false\n" +
      "            -DpageNumLen=[int]      -- default: 2\n" +
      "            -DjsFilePrefix=[string] -- default: empty\n" +
      "            -Dparen = [ail|cil|dil|AIL|CIL|DIL|<any>]\n" +
      "            -DvarName (string)      -- if none, simply write as-is\n" +
      "            infile [volNum|outfile] -- varName is set, is volNum and required;\n" +
      "                                    -- otherwise, is outfile and optional.\n";
    err.println(msg);
    System.exit(0);
  }

  public static void readProperties() {
    String x;
    x = System.getProperty("varName");      if (x!=null) varName = x;
    x = System.getProperty("jsFilePrefix"); if (x!=null) jsFilePrefix = x;
    x = System.getProperty("pageNumLen");   if (x!=null) pageNumLen = Integer.parseInt(x);
    x = System.getProperty("needVolTitle"); if (x!=null) needVolTitle = x.toLowerCase().startsWith("t");
    x = System.getProperty("paren");        if (x!=null) parenProc = x;
  }

  public static PrintWriter getOutput(String fname) throws Exception {
    return (fname != null) ? openFileToWrite(fname) : new PrintWriter(System.out, true);
  }

  public static void main(String[] args) throws Exception {
    readProperties();
    if (args.length < 1 || (varName != null && args.length < 2))
      leave(String.join(" ", args));

    int volNum = -1;
    String fname = null;
    if (varName == null) {
      if (args.length > 1)
        fname = args[1];
    } else {
      volNum = Integer.parseInt(args[1]);
      fname = String.valueOf(volNum);
      while (fname.length() < pageNumLen) fname = "0" + fname;
      fname = jsFilePrefix + fname + ".js";
    }

    try (BufferedReader br = openFile(args[0])) {
      try (PrintWriter pw = getOutput(fname)) {
        if (volNum >= 0) {
          pw.println(varName + ".volNum = " + volNum + ';');
          if (needVolTitle)
            pw.println(varName + ".volTitle = '';");
          pw.println(varName + ".text = `");
        }
        // Write the content from input
        String ln;
        while ((ln = br.readLine()) != null) {
          ln = trimBrackets(ln);
          if (parenProc == null)
            pw.println(ln);
          else
            switch (parenProc) {
            case "ail": pw.println(parenToTag(ln, "<ail>（", "）</ail>")); break;
            case "cil": pw.println(parenToTag(ln, "<cil>（", "）</cil>")); break;
            case "dil": pw.println(parenToTag(ln, "<dil>（", "）</dil>")); break;
            case "AIL": pw.println(parenToTag(ln, "<ail>", "</ail>")); break;
            case "CIL": pw.println(parenToTag(ln, "<cil>", "</cil>")); break;
            case "DIL": pw.println(parenToTag(ln, "<dil>", "</dil>")); break;
            default:    pw.println(parenToTag(ln, "<"+parenProc+">", "</"+parenProc+">")); break;
            }
        }
        if (volNum >= 0)
          pw.println("`;");
        pw.flush();
        if (fname != null)
          err.println("Written to " + fname);
      }
    }
  }

  public static class TangGSZ extends SimpleSeriesPage {
    public static void main(String[] args) throws Exception {
      if (args.length < 1)
        fail("Usage: java " + myClassName() + " infile");

      SimpleSeriesPage.needVolTitle = true;
      SimpleSeriesPage.jsFilePrefix = "B";
      SimpleSeriesPage.varName      = "TangGSZ";

      SimpleSeriesPage.main(args);
    }
  }

} // end of SimpleSeriesPage.
