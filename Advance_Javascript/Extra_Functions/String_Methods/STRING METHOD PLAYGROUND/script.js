const input = document.getElementById("textInput");
const result = document.getElementById("result");

function displayOutput(text) {
    result.innerHTML = `<pre>${text}</pre>`;
}

function getText() {
    return input.value || "";
}

/* ---------- BASIC METHODS ---------- */
function toUpper() { displayOutput(getText().toUpperCase()); }
function toLower() { displayOutput(getText().toLowerCase()); }
function showLength() { displayOutput("Length: " + getText().length); }

/* ---------- EXTRACT METHODS ---------- */
function sliceText() {
    const start = prompt("Start index:");
    const end = prompt("End index:");
    displayOutput(getText().slice(start, end));
}

function substringText() {
    const start = prompt("Start index:");
    const end = prompt("End index:");
    displayOutput(getText().substring(start, end));
}

function substrText() {
    const start = prompt("Start index:");
    const length = prompt("Length:");
    displayOutput(getText().substr(start, length));
}

/* ---------- TRIM & PAD ---------- */
function trimText() { displayOutput(getText().trim()); }
function trimStartText() { displayOutput(getText().trimStart()); }
function trimEndText() { displayOutput(getText().trimEnd()); }

function padStartText() {
    const len = prompt("Pad to total length:");
    const char = prompt("Padding character:");
    displayOutput(getText().padStart(len, char));
}

function padEndText() {
    const len = prompt("Pad to total length:");
    const char = prompt("Padding character:");
    displayOutput(getText().padEnd(len, char));
}

/* ---------- SEARCH ---------- */
function includesText() {
    const word = prompt("Enter text to check:");
    displayOutput(`Includes("${word}"): ${getText().includes(word)}`);
}

function indexOfText() {
    const word = prompt("Find index of:");
    displayOutput("Index: " + getText().indexOf(word));
}

function lastIndexOfText() {
    const word = prompt("Find last index of:");
    displayOutput("Last Index: " + getText().lastIndexOf(word));
}

function startsWithText() {
    const word = prompt("Check startsWith:");
    displayOutput(`Starts With("${word}"): ${getText().startsWith(word)}`);
}

function endsWithText() {
    const word = prompt("Check endsWith:");
    displayOutput(`Ends With("${word}"): ${getText().endsWith(word)}`);
}

function searchText() {
    const regex = prompt("Enter regex pattern:");
    const r = new RegExp(regex);
    displayOutput("Search index: " + getText().search(r));
}

/* ---------- MODIFY ---------- */
function concatText() {
    const extra = prompt("Enter text to concatenate:");
    displayOutput(getText().concat(" ", extra));
}

function replaceText() {
    const find = prompt("Word to replace:");
    const rep = prompt("Replace with:");
    displayOutput(getText().replace(find, rep));
}

function replaceAllText() {
    const find = prompt("Word to replace:");
    const rep = prompt("Replace all with:");
    displayOutput(getText().replaceAll(find, rep));
}

function repeatText() {
    const times = prompt("Repeat how many times?");
    displayOutput(getText().repeat(times));
}

/* ---------- REGEX & MATCH ---------- */
function matchText() {
    const regex = prompt("Enter regex pattern:");
    const r = new RegExp(regex, "g");
    displayOutput(JSON.stringify(getText().match(r), null, 2));
}

function matchAllText() {
    const regex = prompt("Enter regex pattern:");
    const r = new RegExp(regex, "g");
    displayOutput(JSON.stringify([...getText().matchAll(r)], null, 2));
}

function highlightMatches() {
    const word = prompt("Enter word to highlight:");
    const regex = new RegExp(word, "gi");
    const highlighted = getText().replace(regex, (match) => `<mark>${match}</mark>`);
    result.innerHTML = highlighted;
}

/* ---------- CONVERT & LOCALE ---------- */
function toStringText() { displayOutput(getText().toString()); }
function valueOfText() { displayOutput(getText().valueOf()); }

function localeCompareText() {
    const compare = prompt("Enter string to compare:");
    displayOutput("Locale Compare Result: " + getText().localeCompare(compare));
}

function toLocaleUpper() { displayOutput(getText().toLocaleUpperCase()); }
function toLocaleLower() { displayOutput(getText().toLocaleLowerCase()); }
