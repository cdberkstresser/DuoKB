/**
 * This will add the ability to change keyboard input to the target type of duolingo's input boxes.
 */

window.onload = function() {
    setInterval(load, 200);
}

function load() {
    var inputBoxes = document.querySelectorAll("textarea");
    inputBoxes.forEach(e => {
        if (e.getAttribute('lang') == 'he') {
            e.addEventListener("keydown", processKey);
            e.addEventListener("change", addSpace);
        }
    });

}

function addSpace() {
    this.value = this.value + ' ';
    console.log("space added");
}

function processKey(e) {
    if (e.code == 'Enter') {
        this.blur();
        return;
    }
    if (he && e.code in he) {
        e.preventDefault();
        var startIndex = this.selectionStart;
        var endIndex = this.selectionEnd;
        this.value = this.value.substring(0, startIndex) + he[e.code] + this.value.substring(endIndex);
    }
}