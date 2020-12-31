/** Save the languages that are enabled/disabled to sync storage. */
function save_options() {
    document.querySelectorAll("input[type='checkbox']").forEach(
        e => {
            chrome.storage.sync.set({
                [e.id]: e.checked
            }, function(item) {
                var status = document.getElementById('status');
                status.textContent = 'Options saved.';
                setTimeout(function() {
                    status.textContent = '';
                }, 750);
            });
        })
}

/** Restore the languages that are enabled/disabled to sync storage for the options page. */
function restore_options() {
    Object.keys(supportedTranslations).forEach(e => {
        var table = document.getElementById('languages');
        var row = table.insertRow(-1);
        var cellLanguage = row.insertCell(0);
        var cellCheckBox = row.insertCell(1);
        var chk = document.createElement('input');
        chk.setAttribute('type', 'checkbox');
        chk.setAttribute('id', e);

        cellLanguage.textContent = e;
        cellCheckBox.className = "options";
        cellCheckBox.appendChild(chk);

        chrome.storage.sync.get({
                [e]: true
            },
            function(item) {
                document.getElementById(e).checked = item[e];
            });
    });
    // auto save when the user checks a box.
    document.querySelectorAll("input[type='checkbox']").forEach(e => { e.addEventListener('click', save_options); });
}
// Load the options on page load.
document.addEventListener('DOMContentLoaded', restore_options);