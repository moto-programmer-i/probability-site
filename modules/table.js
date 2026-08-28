import {createChild} from "./elements.js"

/**
 * 
 * @param {HTMLTableElement} tbody 
 * @param {Array<string | number>} contents 
 */
export function addLine(tbody, contents) {
    const tr = createChild(tbody, "tr");
    for(let content of contents) {
        createChild(tr, "td").textContent = content;
    }
}

/**
 * 
 * @param {HTMLTableElement} table 
 * @returns 新しいtbody
 */
export function clearTbody(table) {
    // 前の表の内容を消す
    table.removeChild(table.tBodies[0])

    // 新しくtbodyを追加
    return createChild(table, "tbody");
}