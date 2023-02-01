/**
 * This will add the ability to change keyboard input to the target type of duolingo's input boxes.
 */

/** The friendly name of the language that DuoLingo uses in the "Type in" placeholders. */
var language = "";
/** The language code of the language being used.  Ideally we would only use this, but "lang ="" isn't always set. */
var languageCode = "";
/** The language code from the URL or title.  Some boxes don't tell you the language in which to type, and this helps us provide an override. */
var languageCodeGuess = "";
/** The language from the URL or title.  Some boxes don't tell you the language in which to type, and this helps us provide an override. */
var languageGuess = "";
/** Keep track of whether the user wants to have a language enabled or not.  This allows the user to turn off character replacement for a language while DuoKB is still installed. */
var languagesEnabled = {};
/** Duolingo seems to be manipulating the same box rather than reloading, so watch it for changes. */
window.onload = function () {
    // load settings
    loadSettings();
    // also load settings if the user changes them.
    chrome.storage.onChanged.addListener(loadSettings);
    setInterval(load, 200);
}
var isShiftDown = false;

/** Set the input correctly as the input boxes change. */
function load() {
    // capture the input box so that we can replace characters
    let inputText = document.querySelector("textarea[placeholder], input[type='text'][placeholder]");
    
    if (!getLanguageCodeFromUrlIfSupported()) {
        getLanguageCodeFromTitleElement();
    }
    
    // see if any text boxes or text areas have appeared that we want to translate
    language = inputText?.getAttribute('placeholder').replace('Type in ', '') ?? '';
    // if so and we support the language, set the language code
    if (supportedTranslations[language]) {
        languageCode = supportedTranslations[language];
        inputText.addEventListener("keydown", processKey);
        inputText.addEventListener("keyup", handleShiftUp);
    } else if (inputText && inputText.getAttribute('data-test') && inputText.getAttribute('data-test') == "challenge-text-input") {
        languageCode = languageCodeGuess;
        language = Object.keys(supportedTranslations).find(key => supportedTranslations[key] == languageCode);
        inputText.addEventListener("keydown", processKey);
        inputText.addEventListener("keyup", handleShiftUp);
    }
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
        if (window[languageCode] && e.code in window[languageCode] && languagesEnabled[language]) {
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
            languageCodeGuess = value;
            languageGuess = key;
            return true;
        }
    }
    return false;
}

/** Try to extract if a language code is indicated in the country flag. */
function getLanguageCodeFromTitleElement() {
    let title = document.querySelector("title");
    if (title != null) {
        for (const [key, value] of Object.entries(supportedTranslations)) {
            if (title.textContent.includes(key)) {
                languageCodeGuess = value;
                languageGuess = key;
                return true;
            }
        }
    }
    return false;
}

/** Get the settings from sync storage for DuoKB. */
function loadSettings() {
    Object.keys(supportedTranslations).forEach(e => {
        chrome.storage.sync.get({
            [e]: true
        },
            function (item) {
                Object.assign(languagesEnabled, item);
            });
    });
}