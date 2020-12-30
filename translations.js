/**
 * This provides the functionality for capturing friendly names of languages as well as attaching them to language codes.
 * 
 * Note: Ideally, all we would use is the lang code indicated in the input box, but currently, DuoLingo may only utilize
 * a placeholder "Type in xxxxxx" to indicate the language.  Would like to not need to depend on a placeholder text.
 */


/*
 ***********SUPPORTED TRANSLATIONS WITH FRIENDLY NAMES***********
 */
var supportedTranslations = {
    Greek: 'el',
    Hebrew: 'he',
    Russian: 'ru',
}


/*
 ***********KEYBOARD TRANSLATION OBJECTS***********
 */

var el = {
    KeyQ: [';', ';'],
    KeyW: ['ς', 'ς'],
    KeyE: ['Ε', 'ε'],
    KeyR: ['Ρ', 'ρ'],
    KeyT: ['Τ', 'τ'],
    KeyY: ['Υ', 'υ'],
    KeyU: ['Θ', 'θ'],
    KeyI: ['Ι', 'ι'],
    KeyO: ['Ο', 'ο'],
    KeyP: ['Π', 'π'],
    KeyA: ['Α', 'α'],
    KeyS: ['Σ', 'σ'],
    KeyD: ['Δ', 'δ'],
    KeyF: ['Φ', 'φ'],
    KeyG: ['Γ', 'γ'],
    KeyH: ['Η', 'η'],
    KeyJ: ['Ξ', 'ξ'],
    KeyK: ['Κ', 'κ'],
    KeyL: ['Λ', 'λ'],
    KeyZ: ['Ζ', 'ζ'],
    KeyX: ['Χ', 'χ'],
    KeyC: ['Ψ', 'ψ'],
    KeyV: ['Ω', 'ω'],
    KeyB: ['Β', 'β'],
    KeyN: ['Ν', 'ν'],
    KeyM: ['Μ', 'μ'],
};

var he = {
    Backquote: ['~', ';'],
    KeyQ: ['Q', '/'],
    KeyW: ['W', '\''],
    KeyE: ['E', 'ק'],
    KeyR: ['R', 'ר'],
    KeyT: ['T', 'א'],
    KeyY: ['Y', 'ט'],
    KeyU: ['U', 'ו'],
    KeyI: ['I', 'ן'],
    KeyO: ['O', 'ם'],
    KeyP: ['P', 'פ'],
    KeyA: ['A', 'ש'],
    KeyS: ['S', 'ד'],
    KeyD: ['D', 'ג'],
    KeyF: ['F', 'כ'],
    KeyG: ['G', 'ע'],
    KeyH: ['H', 'י'],
    KeyJ: ['J', 'ח'],
    KeyK: ['K', 'ל'],
    KeyL: ['L', 'ך'],
    Semicolon: [':', 'ף'],
    Quote: ['"', ','],
    KeyZ: ['Z', 'ז'],
    KeyX: ['X', 'ס'],
    KeyC: ['C', 'ב'],
    KeyV: ['V', 'ה'],
    KeyB: ['B', 'נ'],
    KeyN: ['N', 'מ'],
    KeyM: ['M', 'צ'],
    Comma: ['>', 'ת'],
    Period: ['<', 'ץ'],
    Slash: ['?', '.'],
};

var ru = {
    Backquote: ['~', 'ё'],
    Digit1: ['!', '1'],
    Digit2: ['"', '2'],
    Digit3: ['№', '3'],
    Digit4: [';', '4'],
    Digit5: ['%', '5'],
    Digit6: [':', '6'],
    Digit7: ['?', '7'],
    Digit8: ['*', '8'],
    Digit9: ['(', '9'],
    Digit0: [')', '0'],
    KeyQ: ['Й', 'й'],
    KeyW: ['Ц', 'ц'],
    KeyE: ['У', 'у'],
    KeyR: ['К', 'к'],
    KeyT: ['Е', 'е'],
    KeyY: ['Н', 'н'],
    KeyU: ['Г', 'г'],
    KeyI: ['Ш', 'ш'],
    KeyO: ['Щ', 'щ'],
    KeyP: ['З', 'з'],
    BracketLeft: ['Х', 'х'],
    BracketRight: ['Ъ', 'ъ'],
    Backslash: ['/', '\\'],
    KeyA: ['Ф', 'ф'],
    KeyS: ['Ы', 'ы'],
    KeyD: ['В', 'в'],
    KeyF: ['А', 'а'],
    KeyG: ['П', 'п'],
    KeyH: ['Р', 'р'],
    KeyJ: ['О', 'о'],
    KeyK: ['Л', 'л'],
    KeyL: ['Д', 'д'],
    Semicolon: ['Ж', 'ж'],
    Quote: ['Э', 'э'],
    KeyZ: ['Я', 'я'],
    KeyX: ['Ч', 'ч'],
    KeyC: ['С', 'с'],
    KeyV: ['М', 'м'],
    KeyB: ['И', 'и'],
    KeyN: ['Т', 'т'],
    KeyM: ['Ь', 'ь'],
    Comma: ['Б', 'б'],
    Period: ['Ю', 'ю'],
    Slash: [',', '.'],
}