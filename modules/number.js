/**
 * split時の整数部
 */
export const INT_INDEX = 0;
/**
 * split時の小数部
 */
export const DECIMAL_INDEX = 1;

/**
 * 小数点以下の桁数を取得
 * @param {string} numberStr 数字の文字列
 * @returns なければ0
 */
export function getDecimalDigits(numberStr) {
    const nums = numberStr.split(".");
    return nums.length > DECIMAL_INDEX ? nums[DECIMAL_INDEX].length : 0;
}
