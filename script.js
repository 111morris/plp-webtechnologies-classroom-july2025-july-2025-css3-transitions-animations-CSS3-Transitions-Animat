let currentTheme = 'light'; // global variable showing global scope

// Helper: select elements once
const box = document.getElementById('box');
const animateBtn = document.getElementById('animateBtn');
const flipBtn = document.getElementById('flipBtn');
const flipCard = document.getElementById('flipCard');
const modal = document.getElementById('modal');
const modalBtn = document.getElementById('modalBtn');
const closeModal = document.getElementById('closeModal');
const loader = document.getElementById('loader');
const doneBtn = document.getElementById('doneBtn');
const status = document.getElementById('status');
const themeToggle = document.getElementById('themeToggle');

function animateElement(el, className, duration = 800) {
  let timerId = null;

  el.classList.add(className);

  return new Promise((resolve) => {
    function cleanup() {
      el.classList.remove(className);
      resolve(true); // return a value to the caller
    }

    timerId = setTimeout(cleanup, duration);
  });
}

function toggleTheme(preferred = null) {
  const html = document.documentElement;

  if(preferred === 'light' || preferred === 'dark'){
    currentTheme = preferred; // update the global variable
  } else {
    currentTheme = (currentTheme === 'light') ? 'dark' : 'light';
  }

  html.setAttribute('data-theme', currentTheme === 'dark' ? 'dark' : '');

  return currentTheme;
}


animateBtn.addEventListener('click', async () => {
  status.textContent = 'Animating box...';
  status.classList.add('pulse');

  await animateElement(box, 'animate', 1000);

  status.textContent = 'Done';
  status.classList.remove('pulse');
});

flipBtn.addEventListener('click', () => {
  const isNow = flipCard.classList.toggle('flipped');
  flipCard.setAttribute('aria-pressed', isNow);
});

flipCard.addEventListener('click', () => flipBtn.click());

modalBtn.addEventListener('click', () => {
  modal.setAttribute('aria-hidden', 'false');
  loader.setAttribute('aria-hidden', 'false');
  status.textContent = 'Modal open';

  const fakeDuration = 2000;
  const autoClose = setTimeout(() => {
    loader.setAttribute('aria-hidden', 'true');
    status.textContent = 'Modal task complete';
  }, fakeDuration);

  modal.dataset.timer = String(autoClose);
});

closeModal.addEventListener('click', () => {
  if(modal.dataset.timer){
    clearTimeout(Number(modal.dataset.timer));
    delete modal.dataset.timer;
  }
  modal.setAttribute('aria-hidden', 'true');
  status.textContent = 'Modal closed';
});

doneBtn.addEventListener('click', () => {
  if(modal.dataset.timer){
    clearTimeout(Number(modal.dataset.timer));
    delete modal.dataset.timer;
  }
  loader.setAttribute('aria-hidden', 'true');
  status.textContent = 'Forced finish';
});

themeToggle.addEventListener('click', () => {
  const newTheme = toggleTheme();
  themeToggle.textContent = newTheme === 'dark' ? 'Light theme' : 'Dark theme';
});

window.addEventListener('load', async () => {
  const welcome = 'Welcome — running intro animation';
  console.log(welcome);

  await animateElement(status, 'pulse', 900);
  status.textContent = 'Ready';
});

