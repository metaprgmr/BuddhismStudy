import java.io.*;
import java.util.regex.*;
import java.util.*;
//import org.json.JSONObject;
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
      else if ("sutra".equalsIgnoreCase(mode))
        markSutraSastra(br, false);
      else if ("checksutra".equalsIgnoreCase(mode))
        markSutraSastra(br, true);
      else
        for (; (ln=br.readLine()) != null; out.println(ln));
    }
  }

  static void markSutraSastra(BufferedReader br, boolean checkOnly) throws Exception {
    HashSet<String> all = new HashSet<>();
    HashSet<String> toskip = new HashSet<>();
    String[] sa = SUTRA_SASTRA.split(" ");
    for (int i=0; i<sa.length; ++i) all.add(sa[i]);
    sa = SS_SKIP.split(" ");
    for (int i=0; i<sa.length; ++i) { all.add(sa[i]); toskip.add(sa[i]); }
    Pattern pat = Pattern.compile(String.join("|", all));
    all.clear();
    String ln;
    while ((ln = br.readLine()) != null) {
      Matcher m = pat.matcher(ln);
      int lastStart = 0;
      while (m.find()) {
        int start = m.start(), end = m.end();
        if (start > 0 && ln.charAt(start-1) == '[') // already processed
          continue;
        if (checkOnly) {
          String g = m.group();
          if (!toskip.contains(g)) all.add(g);
        } else {
          if (start > lastStart)
            out.print(ln.substring(lastStart, start));
          out.print('['); // surround with []
          out.print(m.group());
          out.print(']');
        }
        lastStart = end;
      }
      if (!checkOnly) {
        if (lastStart < ln.length())
          out.println(ln.substring(lastStart));
        else
          out.println();
      }
    }

    if (checkOnly && !all.isEmpty())
      out.println(String.join(" ", all));
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


  static final String SS_SKIP = "就智論之 故三無性論。 五百論師 并五蘊論釋。";


  static final String SUTRA_SASTRA = "梵王所問經 般若波羅蜜經 提謂經 涅槃論 三身本有契經 中實契經 道智契經 自體契經 金剛三昧契經 一地契經 順理契經 無始契經 如如契經 本性智契經 攝無量契經 實際契經 楞伽契經 真如法界契經 一心法契經 本覺契經 大無量契經 諸法同體契經 阿賴耶識契經 顯了契經 七化契經 四種契經 慈雲契經 無相契經 四聖諦契經 法門契經 法界法輪契經 本智契經 諸佛無盡藏契經 真修契經 勝鬘契經 不增不減契經 三昧契經 俱舍論 成實論 瑜伽論 大智度論 智度論 大乘起信論 起信論 唯識論 二十唯識頌 三十唯識頌 阿彌陀經 無量壽經 金剛般若波羅蜜經 金剛般若經 金剛經 正法華經 大方廣佛華嚴經 華嚴經 大方等大集經 大集經 妙法蓮華經 法華經 法華三昧經 法華三昧觀經 首楞嚴經 楞嚴經 首楞嚴三昧經 入楞伽經 楞伽經 大寶積經 寶積經 寶篋經 維摩詰經 維摩經 大涅槃經 涅槃經 解深密經 深密經 深密解脫經 勝天王般若經 天王般若經 大般若經 般若經 遺教經 般舟三昧經 般舟經 諸法無行經 無行經 阿含經 長阿含經 中阿含經 增一阿含經 增一經 圓覺經 梵網經 勝鬘經 金光明經 法句經 十善業道經 四十二章經 阿毘達磨經 悲華經 八大人覺經 大方廣入如來智德不思議經 大方廣如來祕密藏經 大方廣師子吼經 大乘流轉諸有經 大乘千鉢大教王經 摩訶衍寶嚴經 大乘本生心地觀經 大乘理趣經 大方等修多羅王經 大方等陀羅尼經 守護國主陀羅尼經 守護國界主陀羅尼經 金剛場陀羅尼經 佛昇忉利天為母說經 如來興顯經 如來示教勝軍王經 菩薩行方便經 菩薩念佛三昧經 菩薩地經 菩薩處胎經 菩薩瓔珞本業經 菩薩本緣經 文殊菩薩問法身經 文殊師利問經 文殊問經 文殊師利所問經 文殊悔過經 文殊般若經 文殊般泥洹經 文殊師利巡行經 文殊道行經 文殊師利行經 彌勒成佛經 商主天子所問經 大樹緊那羅王所問經 舍利弗陀羅尼經 不思議光菩薩經 大虛空藏菩薩所問經 師子莊嚴王菩薩請問經 虛空孕菩薩經 勝跡菩薩所解諸法經 金剛王菩薩祕密念誦儀軌經 淨名經 大品經 觀法經 大法炬經 大法炬陀羅尼經 十地經 佛地經 佛藏經 密嚴經 月上經 月上女經 金剛三昧經 鴦崛摩羅經 菴提遮女經 海龍王經 勝天王經 淨業障經 思益經 因果經 像法決疑經 出曜經 修行慈分經 仁王經 大法鼓經 寶頂經 度一切諸佛境界經 勝思惟梵天所問經 現寶藏經 寂照神變三摩地經 寶雨經 賢劫定意經 弘道廣顯定意經 老姥經 雜藏經 轉女身經 大灌頂經 集福德三昧經 不空羂索經 法集經 寶雲經 賢護經 寶星經 入法界體性經 法界體性經 不增不減經 十住斷結經 須真天子經 普超三昧經 無涯際總持經 法輪經 持世經 瓔珞經 無量義經 寶網經 禪要經 華手經 演道俗業經 善夜經 入一切佛境界經 那先經 先佛經 正法念處經 淨度三昧經 堅固女經 大莊嚴法門經 象腋經 廣博嚴淨經 成具光明定意經 觀佛三昧海經 無所希望經 寂調音所問經 月藏經 佛語經 持地經 闍那大悲處胎經 大師恒引如來藏經 轉有經 智嚴經 莊嚴菩提心經 大毘盧遮那成佛經 大莊嚴法門經 最勝王經 不思議佛境界經 阿差末經 付法藏經 正法念經 陀羅尼經 如幻三昧經 勝天王般若波羅蜜經 進趣大乘方便經 全同華嚴出現品經 法華首經 大乘千鉢經 普賢觀經 魔逆經 法王經 雁腋經 如來藏經 無言菩薩經 大方等無想經 觀佛三昧經 密跡經 不思議經 入佛境界經 請觀音經 大報恩經 三摩地經 雜寶藏經 大虛空藏所問經 超日三昧經 無盡意菩薩經 總持經 無垢稱經 月燈三昧經 如來不思議境界經 觀普賢菩薩行法經 甚深大迴向經 每聞諸經 進趣大乘方便經 惑人聞經 五十校計經 賢愚經 略說教誡經 無上依經 寶梁經 瑞應經 佛話經 大法鏡經 解節經 金光女經 佛母經 菴提遮女師子吼了義經 庵提遮女經 溫室經 顯識經 大乘同性經 毘耶娑問經 正法念經 稻稈經 德女所問大乘經 無所有菩薩經 持心梵天所問經 進趣大乘方便經 梵王問經 如來密藏經 法王經 如來不思議境界經 十住經 無常經 無言說經 涅槃疏 清涼疏 華嚴疏 首楞嚴疏 唯識疏 維摩疏 淨名疏 金光明經疏 文句疏 崇福疏 慤疏 法華玄贊疏 釋摩訶衍論 摩訶衍論 法華論疏 法華疏 天台疏 天台涅槃疏 天台淨名疏 天台無量壽佛疏 大乘起信論疏 起信論疏 起信疏 圓覺疏 中觀論疏 中論疏 通心論 釋論 入大乘論 無性攝論 般若燈論 般若假名論 顯性論 顯宗論 發菩提心論 般若論 佛遺教經論疏節要 十二門論疏 大乘百法明門論疏 大智度論疏 大乘法界無差別論疏 顯揚論 觀心論疏 百論疏 俱舍論疏 肇論疏 因明入正理論疏 廣百門論 廣百論 毘婆沙論 涅槃無名論 識論 準識論 成業論 攝論 大乘攝論 攝大乘論 准攝論 集量論 因明正理門論 因明論 佛地論 寶性論 寶藏論 肇論 華嚴論 莊嚴論 中論 中觀論 金剛三昧論 能斷金剛般若論 華嚴探玄記 十二門論 寶生論 寶行王正論 觀所緣緣論 智者觀心論 金剛般若論 大乘莊嚴經論 內德論 大乘阿毘達磨雜集論 分別功德論 思益論 金剛論 顯正論 歸心論 緣生論 中邊分別論 雜集論 對法論 佛性論 准佛性論 莊嚴經論 分別功德論 辯中邊論 成唯識寶生論 因緣無性論 婆沙論 不真空論 才命論 李長者論 智論 心王論 雜華嚴飾論 般若不壞假名論 善見律論 不遷論 三無性論 方便心論 般若無知論 十八空論 百法論 地持論 五蘊論 雜集論 阿毘達磨論 百論 金剛般若不壞假名論 三無性論 財命論 十地論 持地論 沈約均聖論 大丈夫論 命大師融心論 法性論 道德經 莊子南華經 慈恩疏 天台無量壽疏 楞嚴疏 因明疏 准因明疏 論語疏 起信鈔釋疏 薦福疏";

} // end of Cat.
