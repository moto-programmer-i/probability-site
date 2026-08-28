/**
 * 
 * @param {HTMLElement} parent 
 * @param {string} tagName 
 * @returns child element
 */
export function createChild(parent, tagName) {
    const child = document.createElement(tagName);
    parent.appendChild(child);
    return child;
}