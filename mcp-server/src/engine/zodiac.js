// 生肖查询 — 干支/生肖/纳音经 lunar-javascript 计算，六合三合六冲六害为传统固定关系。
// 年份查询在春节/立春附近为近似值；传入完整出生日期更准确。
import { Solar } from "lunar-javascript";

const ZHI_ORDER = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
const ZHI_TO_ANIMAL = { 子: "鼠", 丑: "牛", 寅: "虎", 卯: "兔", 辰: "龙", 巳: "蛇", 午: "马", 未: "羊", 申: "猴", 酉: "鸡", 戌: "狗", 亥: "猪" };
const ANIMAL_TO_ZHI = Object.fromEntries(Object.entries(ZHI_TO_ANIMAL).map(([z, a]) => [a, z]));
const ZHI_ELEMENT = { 子: "水", 丑: "土", 寅: "木", 卯: "木", 辰: "土", 巳: "火", 午: "火", 未: "土", 申: "金", 酉: "金", 戌: "土", 亥: "水" };

const LIUHE = { 子: "丑", 丑: "子", 寅: "亥", 亥: "寅", 卯: "戌", 戌: "卯", 辰: "酉", 酉: "辰", 巳: "申", 申: "巳", 午: "未", 未: "午" };
const SANHE = [["申", "子", "辰"], ["巳", "酉", "丑"], ["寅", "午", "戌"], ["亥", "卯", "未"]];
const LIUCHONG = { 子: "午", 午: "子", 丑: "未", 未: "丑", 寅: "申", 申: "寅", 卯: "酉", 酉: "卯", 辰: "戌", 戌: "辰", 巳: "亥", 亥: "巳" };
const LIUHAI = { 子: "未", 未: "子", 丑: "午", 午: "丑", 寅: "巳", 巳: "寅", 卯: "辰", 辰: "卯", 申: "亥", 亥: "申", 酉: "戌", 戌: "酉" };

const animals = (zhis) => zhis.map((z) => ZHI_TO_ANIMAL[z]);

export function lookupZodiac({ year, birthDate }) {
  let solar;
  if (birthDate && /^\d{4}-\d{1,2}-\d{1,2}$/.test(birthDate)) {
    const [y, m, d] = birthDate.split("-").map(Number);
    solar = Solar.fromYmd(y, m, d);
  } else if (year) {
    solar = Solar.fromYmd(Number(year), 6, 1); // 年中取样，避开春节边界
  } else {
    throw new Error("请输入年份(year)或完整出生日期(birthDate)。");
  }
  const lunar = solar.getLunar();
  const ganZhi = lunar.getYearInGanZhiExact ? lunar.getYearInGanZhiExact() : lunar.getYearInGanZhi();
  const animal = lunar.getYearShengXiaoExact ? lunar.getYearShengXiaoExact() : lunar.getYearShengXiao();
  const zhi = ANIMAL_TO_ZHI[animal];
  const gan = Array.from(ganZhi)[0];
  const GAN_ELEMENT = { 甲: "木", 乙: "木", 丙: "火", 丁: "火", 戊: "土", 己: "土", 庚: "金", 辛: "金", 壬: "水", 癸: "水" };
  const sanheGroup = SANHE.find((g) => g.includes(zhi)) || [];
  return {
    input: { year: year ?? null, birthDate: birthDate ?? null },
    animal,
    branch: zhi,
    ganZhi,
    element: { 天干: GAN_ELEMENT[gan], 地支: ZHI_ELEMENT[zhi] },
    nayin: lunar.getYearNaYin(),
    relations: {
      六合: ZHI_TO_ANIMAL[LIUHE[zhi]],
      三合: animals(sanheGroup.filter((z) => z !== zhi)),
      六冲: ZHI_TO_ANIMAL[LIUCHONG[zhi]],
      六害: ZHI_TO_ANIMAL[LIUHAI[zhi]],
    },
    note: birthDate ? "按完整出生日期计算。" : "按年份年中取样，春节/立春附近请用完整出生日期复核。",
    disclaimer: "生肖关系为传统民俗参考。",
  };
}

export { ZHI_ORDER, ZHI_TO_ANIMAL };
