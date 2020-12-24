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
    // We can get the language code from the url early.  It doesn't change.
    getLanguageCodeFromUrlIfSupported();
    // Keep checking if the box has changed.
    setInterval(load, 200);
    this
}
var isShiftDown = false;

/** Set the input correctly as the input boxes change. */
function load() {
    // see if any text boxes or text areas have appeared that we want to translate
    document.querySelectorAll("textarea, input[type='text']").forEach(e => {
        language = e.getAttribute('placeholder') && e.getAttribute('placeholder').startsWith('Type in ') ? e.getAttribute('placeholder').replace('Type in ', '') : '';
        //if so and we support the language, set the language code and provide an override box with it in case we don't detect the language at all.
        if (document.getElementById("duoKBDiv") == null) {
            // add a container div for keeping things pretty
            addDiv(e);
            // set the language we know from the input box from what it indicates.
            languageCode = supportedTranslations[language];
            e.addEventListener("keydown", processKey);
            e.addEventListener("keyup", handleShiftUp);
            // put the cursor in the box.
            e.focus();
        }

        if (e.getAttribute('placeholder')) {
            // hide the overrides if the box is clear about the intended input language.
            document.getElementById("lblOverrideLanguage").style.visibility = "hidden";
            document.getElementById("chkOverrideLanguage").style.visibility = "hidden";
        } else {
            // show the overrides if the box is not clear about the intended input language.
            document.getElementById("lblOverrideLanguage").style.visibility = "visible";
            document.getElementById("chkOverrideLanguage").style.visibility = "visible";
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
        // keep track of shift so we can do upper case or lower case entries.
        if (e.code == 'ShiftLeft' || e.code == 'ShiftRight' || e.code == 'CapsLock') {
            isShiftDown = !isShiftDown;
        }
        // if that translation table exists and if that key is set to be replaced in that translation table, change it.
        if (window[languageCode] && e.code in window[languageCode]) {
            replaceCharacter(this, e, languageCode)
        }
        // if the user has chosen to override the input language, go with that.
        if (document.getElementById('chkOverrideLanguage').checked && e.code in window[urlLanguageCodeGuess]) {
            replaceCharacter(this, e, urlLanguageCodeGuess);
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

/** Add a div to surround the input box and our overrides options. */
function addDiv(inputBox) {
    // make wrapper div
    var wrapper = document.createElement("div");
    wrapper.id = "duoKBDiv";
    // attach the box to this as a parent
    inputBox.parentNode.appendChild(wrapper);
    // make the box a child of this div
    wrapper.appendChild(inputBox);
    // now add a checkbox with label for overriding the input language
    var lblOverrideLanguage = document.createElement("label");
    lblOverrideLanguage.id = "lblOverrideLanguage";
    lblOverrideLanguage.textContent = "Input in " + urlLanguageGuess + "? ";
    var chkOverrideLanguage = document.createElement("input");
    chkOverrideLanguage.type = "checkbox";
    chkOverrideLanguage.id = "chkOverrideLanguage";
    chkOverrideLanguage.name = "chkOverrideLanguage";
    lblOverrideLanguage.htmlFor = 'chkOverrideLanguage';
    wrapper.appendChild(lblOverrideLanguage);
    wrapper.appendChild(chkOverrideLanguage);
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

/** Replace input with the desired language if applicable . */
function replaceCharacter(source, e, langCode) {
    // stop this key from doing what it usually does
    e.preventDefault();
    // see where the cursor is at so we can preserve cursor position
    var startIndex = source.selectionStart;
    var endIndex = source.selectionEnd;
    // do the replacement in the box
    source.value = source.value.substring(0, startIndex) + window[langCode][e.code][isShiftDown ? 0 : 1] + source.value.substring(endIndex);
    // let DuoLingo know we have typed in the box 
    source.dispatchEvent(showBoxHasBeenTypedInEvent);
    // move the cursor forward
    source.selectionStart = startIndex + 1;
    source.selectionEnd = endIndex + 1;

}