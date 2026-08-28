import {INT_INDEX, DECIMAL_INDEX, getDecimalDigits} from "../modules/number.js"
import {addLine, clearTbody} from "../modules/table.js"
import {CENT, toPercentage, BigFraction} from "../modules/probability.js"


const MAX_LINE = 100;

const COUNT_INDEX = 0;
const PROBABILITY_INDEX = 1;


const percentInput = document.getElementById("percent");
const gachaTable = document.getElementById("gacha");
let tbody = gachaTable.getElementsByTagName("tbody")[0];


function calc() {
    if(!percentInput.value) {
        return;
    }
    // 小数点以下桁数の取得
    const digit = getDecimalDigits(percentInput.value);


    // %を分数にする
    const probability = BigFraction.parsePercentStr(percentInput.value);

    // 1行目は確率そのまま
    const line = [0, 0];
    line[COUNT_INDEX] = 1;
    line[PROBABILITY_INDEX] = probability.toPercent(digit).toFixed(digit);
    addLine(tbody, line);



    {
        // 余事象の確率
        const complementProbability = probability.clone();
        complementProbability.toComplement();
        // 現在の余事象の確率
        const currentComplementProbability = complementProbability.clone();

        // ガチャが1回以上出る確率を追加していく
        for(let i = 2; i <= MAX_LINE; ++i) {
            currentComplementProbability.multiply(complementProbability);
            line[COUNT_INDEX] = i;
            line[PROBABILITY_INDEX] = currentComplementProbability.toComplementPercent(digit).toFixed(digit);
            addLine(tbody, line);
        }
    }
}

// moduleを使うと、なぜかhtmlからイベントを追加できない
percent.oninput = () => {
    // 前の内容を消す
    tbody =  clearTbody(gachaTable);

    // 表を作成
    calc();
};


