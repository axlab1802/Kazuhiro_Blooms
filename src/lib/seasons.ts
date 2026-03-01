import { format } from 'date-fns';
import blobs from './season_blobs.json';

export interface SeasonData {
    id: number;
    name: string;
    meaning: string;
    flower: string;
    period: string;
    startMonth: number;
    startDay: number;
}

// ... (Copy the SEASONS array again)
export const SEASONS: SeasonData[] = [
    { id: 1, name: "東風解凍", meaning: "東風が氷を解かし始める", flower: "ラナンキュラス", period: "2/4〜2/8", startMonth: 2, startDay: 4 },
    { id: 2, name: "黄鶯睍睆", meaning: "ウグイスが鳴き始める", flower: "梅", period: "2/9〜2/13", startMonth: 2, startDay: 9 },
    { id: 3, name: "魚上氷", meaning: "氷の割れ目から魚が飛び出す", flower: "チューリップ", period: "2/14〜2/18", startMonth: 2, startDay: 14 },
    { id: 4, name: "土脉潤起", meaning: "雨が大地を潤す", flower: "ストック", period: "2/19〜2/23", startMonth: 2, startDay: 19 },
    { id: 5, name: "霞始靆", meaning: "霞がたなびき始める", flower: "ラナンキュラス", period: "2/24〜2/28", startMonth: 2, startDay: 24 },
    { id: 6, name: "草木萌動", meaning: "草木が芽吹き始める", flower: "チューリップ", period: "3/1〜3/5", startMonth: 3, startDay: 1 },
    { id: 7, name: "蟄虫啓戸", meaning: "虫が穴から出始める", flower: "ムスカリ", period: "3/6〜3/10", startMonth: 3, startDay: 6 },
    { id: 8, name: "桃始笑", meaning: "桃の花が咲き始める", flower: "桃の花", period: "3/11〜3/15", startMonth: 3, startDay: 11 },
    { id: 9, name: "菜虫化蝶", meaning: "蝶が羽化する", flower: "菜の花", period: "3/16〜3/20", startMonth: 3, startDay: 16 },
    { id: 10, name: "雀始巣", meaning: "雀が巣を作り始める", flower: "チューリップ", period: "3/21〜3/25", startMonth: 3, startDay: 21 },
    { id: 11, name: "桜始開", meaning: "桜が咲き始める", flower: "桜", period: "3/26〜3/30", startMonth: 3, startDay: 26 },
    { id: 12, name: "雷乃発声", meaning: "遠雷が聞こえ始める", flower: "アイリス", period: "3/31〜4/4", startMonth: 3, startDay: 31 },
    { id: 13, name: "玄鳥至", meaning: "ツバメが渡ってくる", flower: "藤", period: "4/5〜4/9", startMonth: 4, startDay: 5 },
    { id: 14, name: "鴻雁北", meaning: "雁が北に帰る", flower: "ライラック", period: "4/10〜4/14", startMonth: 4, startDay: 10 },
    { id: 15, name: "虹始見", meaning: "虹が初めて見える", flower: "アネモネ", period: "4/15〜4/19", startMonth: 4, startDay: 15 },
    { id: 16, name: "葭始生", meaning: "葦が芽吹く", flower: "藤", period: "4/20〜4/24", startMonth: 4, startDay: 20 },
    { id: 17, name: "霜止出苗", meaning: "霜が止んで苗が育つ", flower: "芍薬", period: "4/25〜4/29", startMonth: 4, startDay: 25 },
    { id: 18, name: "牡丹華", meaning: "牡丹が咲く", flower: "牡丹", period: "4/30〜5/4", startMonth: 4, startDay: 30 },
    { id: 19, name: "蛙始鳴", meaning: "カエルが鳴き始める", flower: "アヤメ", period: "5/5〜5/9", startMonth: 5, startDay: 5 },
    { id: 20, name: "蚯蚓出", meaning: "ミミズが出てくる", flower: "バラ", period: "5/10〜5/14", startMonth: 5, startDay: 10 },
    { id: 21, name: "竹笋生", meaning: "タケノコが生える", flower: "クレマチス", period: "5/15〜5/19", startMonth: 5, startDay: 15 },
    { id: 22, name: "蚕起食桑", meaning: "蚕が桑を食べ始める", flower: "バラ", period: "5/20〜5/24", startMonth: 5, startDay: 20 },
    { id: 23, name: "紅花栄", meaning: "紅花が咲く", flower: "紅花", period: "5/25〜5/29", startMonth: 5, startDay: 25 },
    { id: 24, name: "麦秋至", meaning: "麦が熟す", flower: "バラ", period: "5/30〜6/4", startMonth: 5, startDay: 30 },
    { id: 25, name: "螳螂生", meaning: "カマキリが生まれる", flower: "アジサイ", period: "6/5〜6/9", startMonth: 6, startDay: 5 },
    { id: 26, name: "腐草為蛍", meaning: "蛍が飛び始める", flower: "アジサイ", period: "6/10〜6/14", startMonth: 6, startDay: 10 },
    { id: 27, name: "梅子黄", meaning: "梅の実が黄熟する", flower: "アジサイ", period: "6/15〜6/20", startMonth: 6, startDay: 15 },
    { id: 28, name: "乃東枯", meaning: "夏枯草が枯れ始める", flower: "ヒマワリ", period: "6/21〜6/25", startMonth: 6, startDay: 21 },
    { id: 29, name: "菖蒲華", meaning: "菖蒲が咲く", flower: "菖蒲", period: "6/26〜6/30", startMonth: 6, startDay: 26 },
    { id: 30, name: "半夏生", meaning: "半夏が生える", flower: "ユリ", period: "7/1〜7/6", startMonth: 7, startDay: 1 },
    { id: 31, name: "温風至", meaning: "温かい風が吹く", flower: "ヒマワリ", period: "7/7〜7/11", startMonth: 7, startDay: 7 },
    { id: 32, name: "蓮始開", meaning: "蓮が咲き始める", flower: "蓮", period: "7/12〜7/16", startMonth: 7, startDay: 12 },
    { id: 33, name: "鷹乃学習", meaning: "鷹の幼鳥が飛ぶ練習をする", flower: "グラジオラス", period: "7/17〜7/22", startMonth: 7, startDay: 17 },
    { id: 34, name: "桐始結花", meaning: "桐の花が実を結ぶ", flower: "ヒマワリ", period: "7/23〜7/27", startMonth: 7, startDay: 23 },
    { id: 35, name: "大雨時行", meaning: "夕立が降る", flower: "ヒマワリ", period: "7/28〜8/1", startMonth: 7, startDay: 28 },
    { id: 36, name: "涼風至", meaning: "涼しい風が吹き始める", flower: "向日葵", period: "8/2〜8/7", startMonth: 8, startDay: 2 },
    { id: 37, name: "寒蝉鳴", meaning: "ひぐらしが鳴く", flower: "ケイトウ", period: "8/8〜8/12", startMonth: 8, startDay: 8 },
    { id: 38, name: "蒙霧升降", meaning: "霧が立ち込める", flower: "ハゲイトウ", period: "8/13〜8/17", startMonth: 8, startDay: 13 },
    { id: 39, name: "綿柎開", meaning: "綿の実がはじける", flower: "アスター", period: "8/18〜8/22", startMonth: 8, startDay: 18 },
    { id: 40, name: "天地始粛", meaning: "天地の気が静まる", flower: "コスモス", period: "8/23〜8/27", startMonth: 8, startDay: 23 },
    { id: 41, name: "禾乃登", meaning: "稲が実る", flower: "コスモス", period: "8/28〜9/1", startMonth: 8, startDay: 28 },
    { id: 42, name: "草露白", meaning: "草に白露が宿る", flower: "リンドウ", period: "9/2〜9/6", startMonth: 9, startDay: 2 },
    { id: 43, name: "鶺鴒鳴", meaning: "セキレイが鳴く", flower: "ダリア", period: "9/7〜9/11", startMonth: 9, startDay: 7 },
    { id: 44, name: "玄鳥去", meaning: "ツバメが南へ帰る", flower: "萩", period: "9/12〜9/16", startMonth: 9, startDay: 12 },
    { id: 45, name: "雷乃収声", meaning: "雷が鳴らなくなる", flower: "秋明菊", period: "9/17〜9/21", startMonth: 9, startDay: 17 },
    { id: 46, name: "蟄虫坏戸", meaning: "虫が土に潜り始める", flower: "キンモクセイ", period: "9/22〜9/26", startMonth: 9, startDay: 22 },
    { id: 47, name: "水始涸", meaning: "田んぼの水が引く", flower: "菊", period: "9/27〜10/2", startMonth: 9, startDay: 27 },
    { id: 48, name: "鴻雁来", meaning: "雁が渡ってくる", flower: "菊", period: "10/3〜10/7", startMonth: 10, startDay: 3 },
    { id: 49, name: "菊花開", meaning: "菊の花が咲く", flower: "菊", period: "10/8〜10/12", startMonth: 10, startDay: 8 },
    { id: 50, name: "蟋蟀在戸", meaning: "コオロギが戸口で鳴く", flower: "菊", period: "10/13〜10/17", startMonth: 10, startDay: 13 },
    { id: 51, name: "霜始降", meaning: "霜が降り始める", flower: "秋バラ", period: "10/18〜10/22", startMonth: 10, startDay: 18 },
    { id: 52, name: "霎時施", meaning: "にわか雨が降る", flower: "ダリア", period: "10/23〜10/27", startMonth: 10, startDay: 23 },
    { id: 53, name: "楓蔦黄", meaning: "楓や蔦が黄葉する", flower: "秋色バラ", period: "10/28〜11/1", startMonth: 10, startDay: 28 },
    { id: 54, name: "山茶始開", meaning: "山茶花が咲き始める", flower: "山茶花", period: "11/2〜11/6", startMonth: 11, startDay: 2 },
    { id: 55, name: "地始凍", meaning: "大地が凍り始める", flower: "バラ", period: "11/7〜11/11", startMonth: 11, startDay: 7 },
    { id: 56, name: "金盞香", meaning: "水仙が咲く", flower: "水仙", period: "11/12〜11/16", startMonth: 11, startDay: 12 },
    { id: 57, name: "虹蔵不見", meaning: "虹が見られなくなる", flower: "バラ", period: "11/17〜11/21", startMonth: 11, startDay: 17 },
    { id: 58, name: "朔風払葉", meaning: "北風が木の葉を払う", flower: "シクラメン", period: "11/22〜11/26", startMonth: 11, startDay: 22 },
    { id: 59, name: "橘始黄", meaning: "橘が黄熟する", flower: "ストック", period: "11/27〜12/1", startMonth: 11, startDay: 27 },
    { id: 60, name: "閉塞成冬", meaning: "天地の気が塞がって冬になる", flower: "ポインセチア", period: "12/2〜12/6", startMonth: 12, startDay: 2 },
    { id: 61, name: "熊蟄穴", meaning: "熊が冬眠に入る", flower: "ポインセチア", period: "12/7〜12/11", startMonth: 12, startDay: 7 },
    { id: 62, name: "鱖魚群", meaning: "鮭が群れて川を上る", flower: "冬のバラ", period: "12/12〜12/16", startMonth: 12, startDay: 12 },
    { id: 63, name: "乃東生", meaning: "夏枯草が芽吹く", flower: "クリスマスローズ", period: "12/17〜12/21", startMonth: 12, startDay: 17 },
    { id: 64, name: "麋角解", meaning: "鹿の角が落ちる", flower: "ポインセチア", period: "12/22〜12/26", startMonth: 12, startDay: 22 },
    { id: 65, name: "雪下出麦", meaning: "雪の下で麦が芽吹く", flower: "冬のバラ", period: "12/27〜12/31", startMonth: 12, startDay: 27 },
    { id: 66, name: "芹乃栄", meaning: "芹が茂る", flower: "松", period: "1/1〜1/5", startMonth: 1, startDay: 1 },
    { id: 67, name: "水泉動", meaning: "地中で水が動き始める", flower: "水仙", period: "1/6〜1/10", startMonth: 1, startDay: 6 },
    { id: 68, name: "雉始雊", meaning: "雉が鳴き始める", flower: "スイートピー", period: "1/11〜1/15", startMonth: 1, startDay: 11 },
    { id: 69, name: "款冬華", meaning: "ふきのとうが咲く", flower: "ミモザ", period: "1/16〜1/20", startMonth: 1, startDay: 16 },
    { id: 70, name: "水沢腹堅", meaning: "沢の水が厚く凍る", flower: "チューリップ", period: "1/21〜1/25", startMonth: 1, startDay: 21 },
    { id: 71, name: "鶏始乳", meaning: "鶏が卵を産み始める", flower: "スイートピー", period: "1/26〜1/30", startMonth: 1, startDay: 26 },
    { id: 72, name: "東風解凍", meaning: "春の訪れの予感", flower: "梅", period: "1/31〜2/3", startMonth: 1, startDay: 31 },
];

export function getCurrentSeason(date: Date = new Date()): SeasonData {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const currentDateValue = month * 100 + day;
    let current = SEASONS[SEASONS.length - 1];
    for (let i = 0; i < SEASONS.length; i++) {
        const s = SEASONS[i];
        const sValue = s.startMonth * 100 + s.startDay;
        if (currentDateValue >= sValue) {
            current = s;
        } else {
            break;
        }
    }
    return current;
}

export function getSeasonImageAssetPath(season: SeasonData): string {
    // Try mapping first, then local fallback
    const url = (blobs as Record<string, string>)[season.id.toString()];
    if (url) return url;

    const fileName = `${String(season.id).padStart(2, '0')}_${season.name}.png`;
    return `/assets/flowers/${fileName}`;
}
