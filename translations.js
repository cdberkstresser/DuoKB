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
 */

var el = {
    KeyQ: ';',
    KeyW: 'ς',
    KeyE: 'ε',
    KeyR: 'ρ',
    KeyT: 'τ',
    KeyY: 'υ',
    KeyU: 'θ',
    KeyI: 'ι',
    KeyO: 'ο',
    KeyP: 'π',
    KeyA: 'α',
    KeyS: 'σ',
    KeyD: 'δ',
    KeyF: 'φ',
    KeyG: 'γ',
    KeyH: 'η',
    KeyJ: 'ξ',
    KeyK: 'κ',
    KeyL: 'λ',
    KeyZ: 'ζ',
    KeyX: 'χ',
    KeyC: 'ψ',
    KeyV: 'ω',
    KeyB: 'β',
    KeyN: 'ν',
    KeyM: 'μ',
};

var he = {
    Backquote: ';',
    KeyQ: '/',
    KeyW: '\'',
    KeyE: 'ק',
    KeyR: 'ר',
    KeyT: 'א',
    KeyY: 'ט',
    KeyU: 'ו',
    KeyI: 'ן',
    KeyO: 'ם',
    KeyP: 'פ',
    KeyA: 'ש',
    KeyS: 'ד',
    KeyD: 'ג',
    KeyF: 'כ',
    KeyG: 'ע',
    KeyH: 'י',
    KeyJ: 'ח',
    KeyK: 'ל',
    KeyL: 'ך',
    Semicolon: 'ף',
    Quote: ',',
    KeyZ: 'ז',
    KeyX: 'ס',
    KeyC: 'ב',
    KeyV: 'ה',
    KeyB: 'נ',
    KeyN: 'מ',
    KeyM: 'צ',
    Comma: 'ת',
    Period: 'ץ',
    Slash: '.',
};