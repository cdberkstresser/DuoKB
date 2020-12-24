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
}


/*
 ***********KEYBOARD TRANSLATION OBJECTS***********
 The first element is when shift is pressed with the character, and the second element is unshifted.
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