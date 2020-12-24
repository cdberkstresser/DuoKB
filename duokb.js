/**
 * This will add the ability to change keyboard input to the target type of duolingo's input boxes.
 */

/** The friendly name of the language that DuoLingo uses in the "Type in" placeholders. */
var language = "";
/** The language code of the language being used.  Ideally we would only use this, but "lang ="" isn't always set. */
var languageCode = "";
/** The language code from the URL.  Some boxes don't tell you the language in which to type, and this helps us provide an override. */
var urlLanguageCodeGuess = "";
/** The language from the URL.  Some boxes don't tell you the language in which to type, and this helps us provide an override. */
var urlLanguageGuess = "";
/** Duolingo seems to be manipulating the same box rather than reloading, so watch it for changes. */
window.onload = function() {
    getLanguageCodeFromUrlIfSupported();

    setInterval(load, 200);
}
var isShiftDown = false;

/** Set the input correctly as the input boxes change. */
function load() {
    // see if any text boxes or text areas have appeared that we want to translate
    document.querySelectorAll("textarea, input[type='text']").forEach(e => {
        language = e.getAttribute('placeholder') && e.getAttribute('placeholder').startsWith('Type in ') ? e.getAttribute('placeholder').replace('Type in ', '') : '';
        //if so and we support the language, set the language code
        if (supportedTranslations[language]) {
            languageCode = supportedTranslations[language];
            e.addEventListener("keydown", processKey);
            e.addEventListener("keyup", handleShiftUp);
        } else if (e.getAttribute('data-test') && e.getAttribute('data-test') == "challenge-text-input") {
            languageCode = urlLanguageCodeGuess;
            e.addEventListener("keydown", processKey);
            e.addEventListener("keyup", handleShiftUp);
        }
    });
}

/** Set up an event to prevent the last word typed from being overwritten on submit and show DuoLingo that we have typed something in the box since we are suppressing normal behavior of input keys. */
var showBoxHasBeenTypedInEvent = new Event('input', {
    bubbles: true,
    cancelable: true,
});

/** Replace keys with the correct layout if we are set to actively utilize that layout. */
function processKey(e) {
    try {
        if (e.code == 'ShiftLeft' || e.code == 'ShiftRight' || e.code == 'CapsLock') {
            isShiftDown = !isShiftDown;
        }
        // if that translation table exists and if that key is set to be replaced in that translation table, change it.
        if (window[languageCode] && e.code in window[languageCode]) {
            // stop this key from doing what it usually does
            e.preventDefault();
            // see where the cursor is at so we can preserve cursor position
            var startIndex = this.selectionStart;
            var endIndex = this.selectionEnd;
            // do the replacement in the box
            this.value = this.value.substring(0, startIndex) + window[languageCode][e.code][isShiftDown ? 0 : 1] + this.value.substring(endIndex);
            // let DuoLingo know we have typed in the box 
            this.dispatchEvent(showBoxHasBeenTypedInEvent);
            // move the cursor forward
            this.selectionStart = startIndex + 1;
            this.selectionEnd = endIndex + 1;
        }
    } catch (ex) {
        console.log(ex.message);
    }
}

/** Keep track of shift so we can do upper case or lower case entries.  */
function handleShiftUp(e) {
    if (e.code == 'ShiftLeft' || e.code == 'ShiftRight') {
        isShiftDown = !isShiftDown;
    }
}

/** Try to extract if a language code is indicated in the url that we support. */
function getLanguageCodeFromUrlIfSupported() {
    for (const [key, value] of Object.entries(supportedTranslations)) {
        if (window.location.toString().includes('\/' + value + '\/')) {
            urlLanguageCodeGuess = value;
            urlLanguageGuess = key;
        }
    }
}