  // Define initial/constant variables

const counterDiv = document.querySelector('h1#counter');

const minus = document.querySelector('button#minus');
const plus = document.querySelector('button#plus');
const heart = document.querySelector('button#heart');
const pause = document.querySelector('button#pause');
const resetBtn = document.querySelector('button#reset');

const likeList = document.querySelector('ul.likes');
let likedNums = {};

const form = document.querySelector('form');
const commentInput = document.querySelector('input#comment-input');
const commentList = document.querySelector('div#list');

let currentCount = parseInt(counterDiv.textContent);
let intervalId = null;

// Run after DOM loads

document.addEventListener('DOMContentLoaded', () => {
  counterInterval();

  minus.addEventListener('click', counterDecrement);
  plus.addEventListener('click', counterIncrement);
  heart.addEventListener('click', likeNumber)
  pause.addEventListener('click', counterPause)
  resetBtn.addEventListener('click', reset);

  form.addEventListener('submit', e => {
    e.preventDefault();
    const commentValue = commentInput.value.trim();
    if (commentValue !== "") {
      addComment(commentValue);
    } else {
      console.log(`Empty comment`);
    }
    form.reset();
  })

  

});

// Functions
function addComment(commentValue) {
  const p = document.createElement('p');
  p.textContent = commentValue;
  commentList.append(p);
}

function likeNumber() {
  if (!(currentCount in likedNums)) {
    console.log(`Not liked yet, liking '${currentCount}'now...`);
    likedNums[currentCount] = 1;
  } else {
    likedNums[currentCount]++;
    console.log(likedNums[currentCount]);
  }
  renderLikes(currentCount, likedNums[currentCount]);
}

function renderLikes(likedNumber, likeCount) {
  const preText = `${likedNumber} has been liked `;
  if (likeCount === 1) {
    const li = document.createElement('li');
    li.textContent = `${preText + likeCount} time`;
    li.setAttribute("id", `num-${likedNumber}`)
    likeList.appendChild(li);
  } else {
    const li = document.querySelector(`li#num-${likedNumber}`);
    li.textContent = `${preText + likeCount} times`;
  }
}

function counterIncrement() {
  currentCount++;
  counterDiv.textContent = currentCount;
  console.log(`Appended to DOM: ${currentCount}`)

}

function reset() {
  toggleDisabled('reset');
  likedNums = {};
  console.log('Reset');
  likeList.textContent = '';
  clearInterval(intervalId);
  currentCount = 0;
  counterDiv.textContent = 0;
  counterInterval();
}

function counterDecrement() {
  currentCount--;
  counterDiv.textContent = currentCount;
}

function counterInterval() {
  intervalId = setInterval(counterIncrement, 1000)
}



function toggleDisabled(reset = false) {
  minus.disabled = reset? false : !minus.disabled;
  plus.disabled = reset? false : !plus.disabled;
  heart.disabled = reset? false : !heart.disabled;
  pause.textContent = reset? 'pause' : pause.textContent;
}

function counterPause() {

    if (intervalId) {
      console.log(`Paused at ${currentCount}.`);
      pause.textContent = 'resume';
      clearInterval(intervalId);
      intervalId = null;
      toggleDisabled();      
    } else {
      pause.textContent = 'pause';
      console.log(`Resumed.`);
      counterInterval();
      toggleDisabled();
    }
}
