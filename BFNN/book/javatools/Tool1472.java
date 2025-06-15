/**
 * For 圓瑛大師《大佛頂首楞嚴經講義》(1472~1495.htm) processing.
 */
// Inserts sequences to text fragments, for KePan to reference.
public class Tool1472 extends BfnnCommon.BasicStateMachine
{
  static final String letters = "abcdefghijklmnopqrstuvwxyz";
  static String volPrefix; 

  public static void main(String[] args) throws Exception {
    // get volPrefix. 1472 is volume 1.
    String fileName = args[0];
    int idx = fileName.lastIndexOf('.');
    volPrefix = BfnnCommon.digit2(Integer.parseInt(fileName.substring(idx-4, idx)) - 1472 + 1);

    BfnnCommon.concatParaTag(args, new Tool1472());
  }

  int seqNum = 1;
  int subNum = 0;
  boolean inVERSE = false;

  public String proc(String line) {
    String lineOrig = line;
    line = super.proc(line);
    if (line == null)
      return null;

    if (line.startsWith("<p class=KEPAN>")) {
      if (inVERSE) {
        inVERSE = false;
        ++seqNum;
        subNum = 0; 
      }
    } else if (line.startsWith("<p class=VERSE>")) {
      line = line.substring("<p class=VERSE>".length());
      if (line.startsWith("<verseNum")) // already processed!
        return lineOrig;
      if (inVERSE) {
        ++subNum; 
      } else {
        inVERSE = true;
        subNum = 0; 
      }
      if (subNum >= letters.length()) {
        ++seqNum; 
        subNum = 0; 
      }
      String localId = BfnnCommon.digit3(seqNum) + letters.charAt(subNum);
      line = "<p class=VERSE><verseNum id='" + volPrefix + localId + "'>" + localId + "</verseNum>" + line;
    }
    return line;
  }

} // end.

/*
 For each of 圓瑛大師《大佛頂首楞嚴經講義》's 24 volumes in 1472~1495.htm,
 follow these steps:
  1. cp 1472.htm 1472big5.htm (as usual)
  2. Open 1472big5.htm in Firefox and copy source (as usual)
  3. Paste into 1472.htm-save, and ":w ++enc=utf-8 1472.htm", without editing anything.
  4. Run
       %java BfnnCommon 1472.htm-save > 1472.htm
     This will produce the original utf-8 version, normalize <p></p> lines,
     using CSS more as well as some cleansing.
  5. Manually clean up as much as possible, e.g.:
       A. :1,$s/<span style='color:#333399'>/<span class=kepan>/g
       B. For more "#333399", manually edit.
       C. Remove erroneous extra spaces by looking for "<span>&nbsp; </span>"; and remove.
       D. (*) :1,$s/<span style='font-size:10.0pt;'>/<span class=inlineAnno>/g
       E. (*) Add <span class=kepanDone> to "竟。"-endings. (This is a lot!)
       F. (*) Add "<span class=volend>" to "大佛頂首楞嚴經正文卷第.終", for the sutra!
          (*): this series specific.
  6. Finally, run 
       %java Tool1472 1479.htm > 1479ext.htm
     to insert fragment numbering, for KePan to reference, at least.

     NOTE: future edits to *ext.htm are better synck'ed to the original .htm files.
*/
