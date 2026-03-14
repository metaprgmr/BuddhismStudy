import java.io.*;
import java.util.List;
import java.util.ArrayList;
import java.util.regex.Pattern;
import java.nio.charset.StandardCharsets;
import static java.lang.System.out;
import static java.lang.System.err;

/**
 * Processing text for 唐高僧傳 (for "9071.htm" et al.)
 * This is to extract sangha info from TangGSZ.text field,
 * add them to the fields beginning, and replace with ":::_12" in place.
 * At the same time, create alfa.${volNum} for B.js to directly adopt.
 * This is to make them useful enough, before manual editing commences.
 */
public class TangGSZProc extends BfnnCommon {

  public static void main(String[] args) throws Exception {
    if (args.length != 2)
      fail("Usage: java " + myClassName() + " infile outfile");

    String infile = args[0], outfile = args[1],
           volNum = null, volTtl = null, ln;
    List<String> leading = new ArrayList<>(),
                 content = new ArrayList<>(),
                 toc     = new ArrayList<>(),
                 alfa    = new ArrayList<>();

    int personCnt = 0, idx;
    boolean inTxt = false;
    try (BufferedReader br = openFile(infile)) {
      // The TangGSZ.volNum line
      leading.add( ln = br.readLine() );
      idx = ln.lastIndexOf('=');
      volNum = ln.substring(idx+1, ln.length()-1).trim();
      // The TangGSZ.volTitle line, if any
      leading.add( ln = br.readLine() );
      if (ln.contains(".volTitle"))
        volTtl = ln.substring(ln.indexOf('\'')+1, ln.lastIndexOf("';"));

      while ((ln = br.readLine()) != null) {
        if (!inTxt) {
          leading.add(ln);
          inTxt = ln.contains(".text");
          continue;
        }

        boolean isInfo = ln.endsWith(")");
        if (!isInfo && (ln.length()<50)) // further check
          isInfo = ln.lastIndexOf('傳') > 0;

        if (isInfo) {
          String[] info = guessSanghaNameInfo(ln);
          if (info[1] != null) { // detected
            String others = info[2];
            if (others == null) others = "";
            else others = '；' + others;
            alfa.add(info[0] + '|' + info[1] + others); // to be in B.js
            toc.add(info[1]);            // to the top of TangGSZ.text
            ln = ":::_" + (++personCnt); // replaces the current line
          }
        }
        content.add(ln);
      }
    }
    writeOutfile(outfile, leading, content, toc);
    writeAlfa(volNum, volTtl, alfa);
  }

  private static void writeAlfa(String volNum, String volTtl, List<String> alfa) throws Exception {
    try (PrintWriter pw = openFileToWrite("alfa." + volNum)) {
      if (volTtl == null) volTtl = "";
      pw.println("        .addVol(new VolList(" + volNum + ", '" + volTtl + "', `");
      int len = alfa.size();
      for (int i=0; i<len; ++i) {
        pw.print("          ");
        pw.print(alfa.get(i));
        if (i == len-1)
          pw.println("`))");
        else
          pw.println();
      }
      pw.flush();
    }
  }

  private static void writeOutfile(String outfile,
                                   List<String> leading,
                                   List<String> content,
                                   List<String> toc)
    throws Exception
  {
    try (PrintWriter pw = openFileToWrite(outfile)) {
      int i;

      for (i=0; i<leading.size(); ++i)
        pw.println(leading.get(i));

      pw.println("${COL_START}");
      pw.println("${COL_DIV15}");
      for (i=0; i<toc.size(); ++i)
        pw.println("<a#_" + (i+1) + ">" + toc.get(i) + "</a><ord>" + zNum(i+1) + "</ord>");
      pw.println("${COL_END}\n");

      for (i=0; i<content.size(); ++i)
        pw.println(content.get(i));
    }
  }

} // la Fin.
