const sentences = [
  'Ich gehe heute ins Kino',
  'Wir fahren morgen nach Berlin',
  'Das Wetter ist heute sehr schön'
];

let currentSentence = '';
let correctWords = [];
const container = document.getElementById('word-container');
const resultEl = document.getElementById('result');
const checkBtn = document.getElementById('check-button');
const nextBtn = document.getElementById('next-button');
let dragged;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function loadSentence() {
  resultEl.textContent = '';
  currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
  correctWords = currentSentence.split(' ');
  const shuffled = shuffle([...correctWords]);
  container.innerHTML = '';
  shuffled.forEach(word => {
    const span = document.createElement('span');
    span.className = 'word';
    span.draggable = true;
    span.textContent = word;
    container.appendChild(span);

    span.addEventListener('dragstart', dragStart);
    span.addEventListener('dragend', dragEnd);
    span.addEventListener('dragover', dragOver);
    span.addEventListener('drop', drop);
  });
}

function dragStart(e) {
  dragged = e.target;
  e.target.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
}

function dragEnd(e) {
  e.target.classList.remove('dragging');
}

function dragOver(e) {
  e.preventDefault();
  const target = e.target;
  if (target.classList.contains('word') && target !== dragged) {
    const nodes = Array.from(container.children);
    const draggedIndex = nodes.indexOf(dragged);
    const targetIndex = nodes.indexOf(target);
    if (draggedIndex < targetIndex) {
      container.insertBefore(dragged, target.nextSibling);
    } else {
      container.insertBefore(dragged, target);
    }
  }
}

function drop(e) {
  e.preventDefault();
}

function checkOrder() {
  const arranged = Array.from(container.children).map(span => span.textContent);
  if (arranged.join(' ') === correctWords.join(' ')) {
    resultEl.textContent = 'Super!';
    resultEl.style.color = 'green';
  } else {
    resultEl.textContent = 'Essaie encore';
    resultEl.style.color = 'red';
  }
}

checkBtn.addEventListener('click', checkOrder);
nextBtn.addEventListener('click', loadSentence);
document.addEventListener('DOMContentLoaded', loadSentence);
