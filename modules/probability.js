import {getDecimalDigits} from "./number.js"

/**
 * 小数点の桁数のデフォルト
 */
const DEFAULT_DECIMAL_DIGIT = 1;

/**
 * %の計算に必要な100
 */
export const CENT = 100;

/**
 * 四捨五入用のシフト
 */
const FOR_ROUND_SHIFT = 10;

/**
 * 小数点を出力するために必要なシフトを計算する
 * （例：1桁なら10）
 * @param {number} digit 小数点の桁数
 * @returns シフト用の値
 */
export function calcDigitShift(digit) {
  // 桁数がなければデフォルト
  if (digit == null) {
    digit = DEFAULT_DECIMAL_DIGIT;
  }

  // 桁数に応じたシフト用の値
  return 10 ** digit;
}

/**
 * 
 * @param {number} probablity 確率（1以下の少数） 
 * @param {number} digit 桁数
 * @returns 四捨五入された%
 */
export function toPercentage(probablity, digit) {
  // 桁数に応じた%の四捨五入
  const digitShift = calcDigitShift(digit);
  return Math.round(probablity * CENT * digitShift) / digitShift;
}

export class BigFraction {
  /**
   * 
   * @param {number} numerator 
   * @param {number} denominator 
   */
  constructor(numerator, denominator) {
    if(numerator != null) {
      this.numerator = BigInt(numerator);
    }
    
    if(denominator != null) {
      this.denominator = BigInt(denominator);  
    }
  }

  clone() {
    const instance =  new BigFraction();
    instance.numerator = this.numerator;
    instance.denominator = this.denominator;
    return instance;
  }

  /**
   * 
   * @param {BigFraction} other 
   */
  multiply(other) {
    this.numerator *= other.numerator;
    this.denominator *= other.denominator;
  }

  /**
   * 
   * @param {number} digit 小数点以下の桁数
   */
  toPercent(digit) {
    const digitShift = calcDigitShift(digit);

    const percent = Math.round(
        Number(
          BigInt(CENT * FOR_ROUND_SHIFT * digitShift) * this.numerator
          / this.denominator
        )
        / FOR_ROUND_SHIFT
      )

      // 最終的な小数点の位置へ
      / digitShift
    ;

    // なぜか1度変数にいれないとundefinedになったので
    return percent;
  }

  /**
   * 余事象にする
   * 分子 = 分母 - 分子
   */
  toComplement() {
    this.numerator = this.denominator - this.numerator;
  }


  /**
   * 余事象の確率（%）
   *  @param {number} digit 小数点以下の桁数
   * @returns (1 - this) （%）
   */
  toComplementPercent(digit) {
    // 1度値を退避しておく
    const originalNumerator = this.numerator;

    // 余事象の確率
    this.toComplement();
    const complementPercent = this.toPercent(digit);

    // 値を元に戻す
    this.numerator = originalNumerator;

    return complementPercent;
  }

  /**
   * 
   * @param {string} decimalStr
   */
  static parseDecimalStr(decimalStr) {
    if (decimalStr == null) {
      return new BigFraction(0, 0);
    }

    const digit = getDecimalDigits(decimalStr);

    
    const instance = new BigFraction();

    // 小数点を削除した文字列から分子
    const decimalNums = decimalStr.split(".");
    decimalNums.push(""); // 番兵
    instance.numerator = BigInt(decimalNums[0] + decimalNums[1]);

    // 10^(分子の桁数)が分母
    instance.denominator = BigInt("1" + decimalNums[1].replaceAll(/\d/g, "0"));
    return instance;
  }

  /**
   * 
   * @param {string} percentStr
   */
  static parsePercentStr(percentStr) {
    // %の調整をして読み込み
    const instance = this.parseDecimalStr(percentStr);
    instance.denominator *= BigInt(CENT);
    return instance;
  }
}