// dri mag kuha og mga words nga gamiton para mahimong sentence
const wordBank = [
    "apple","banana","cat","dog","quick","brown","fox","jumps","lazy","river",
    "mountain","sky","happy","coding","javascript","practice","perfect","keyboard",
    "speed","accuracy","light","shadow","music","piano","forest","train","travel",
    "future","bright","computer","screen","window","dream","running","slowly",
    "teacher","student","write","read","program","build","simple","design",
    "create","focus","energy","calm","green","yellow"
];
// dri ga generate ang mga words nga mo balik2 50 times
function generateRandomSentence() {
    let words = [];
    for (let i = 0; i < 50; i++) {
        const randomWord = wordBank[Math.floor(Math.random() * wordBank.length)];
        words.push(randomWord);
    }
    return words.join(" ");
}
const quoteEl = document.getElementById("quote");
const inputEl = document.getElementById("input");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const startBtn = document.getElementById("startBtn");
let timeLeft = 180;
let timer = null;
function startTest() {
    // mag start og og generate para ma join together
    const randomSentence = generateRandomSentence();
    quoteEl.textContent = randomSentence;
    // Reset interface
    inputEl.value = "";
    inputEl.disabled = false;
    inputEl.focus();
    timeLeft = 180;
    const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};
timeEl.textContent = formatTime(timeLeft); //
    wpmEl.textContent = 0;
    accuracyEl.textContent = "0%";
    if (timer) clearInterval(timer);
    // Start countdown timer
    timer = setInterval(() => {
        timeLeft--;
        timeEl.textContent = formatTime(timeLeft); //
        if (timeLeft <= 0) finishTest();
    }, 1000);
}
function finishTest() {
    clearInterval(timer);
    inputEl.disabled = true;
    const typed = inputEl.value;
    const original = quoteEl.textContent;
    // Accuracy calculation
    let correct = 0;
    for (let i = 0; i < typed.length; i++) {
        if (typed[i] === original[i]) {
            correct++;
        }
    }
    let accuracy = typed.length > 0
        ? Math.round((correct / typed.length) * 100)
        : 0;
    accuracyEl.textContent = accuracy + "%";
    // WPM calculation
    let wordsTyped = typed.trim().split(/\s+/).length;
    if (typed.length === 0) wordsTyped = 0;
    
    const elapsedTimeInSeconds = 180 - timeLeft;
    
     const wpm = elapsedTimeInSeconds > 0 ? (wordsTyped / (elapsedTimeInSeconds / 60)) : 0;
    wpmEl.textContent = Math.round(wpm);
}
startBtn.addEventListener("click", startTest);


