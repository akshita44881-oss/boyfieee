/* ==================== PAGE NAVIGATION ==================== */

let currentPage = 1;
let noCount = 0;
let heartsStarted = false;
let finalHeartStarted = false;


/* ==================== GO TO PAGE ==================== */

function goToPage(pageNumber) {

  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  const nextPage = document.getElementById(`page${pageNumber}`);

  if (nextPage) {
    nextPage.classList.add("active");
    nextPage.scrollTop = 0;
    currentPage = pageNumber;
  }

  if (pageNumber === 2) {
    startBoyfriendHearts();
  }

  if (pageNumber === 4) {
    questionIndex = 0;
    updateQuestionCard(false);
  }

  if (pageNumber === 6) {
    startFinalHearts();
  }
}


/* ==================== PAGE 1 — YES ==================== */

function sayYes() {

  const reaction = document.getElementById("reaction");
  const yesButton = document.querySelector(".yes-btn");
  const noButton = document.querySelector(".no-btn");
  const heart = document.querySelector(".heart");

  reaction.textContent = "heheee I knew you'd say yes 🥹💗";

  yesButton.style.transform = "scale(1)";
  noButton.style.transform = "scale(1)";
  noButton.style.position = "relative";
  noButton.style.left = "0";
  noButton.style.top = "0";

  if (heart) {
    heart.style.transform = "scale(1.3)";
    heart.style.filter = "brightness(1.3)";

    setTimeout(() => {
      heart.style.transform = "";
      heart.style.filter = "";
    }, 500);
  }

  createMiniHeart();

  setTimeout(() => {
    goToPage(2);
  }, 900);
}


/* ==================== PAGE 1 — NO ==================== */

function sayNo() {

  noCount++;

  const reaction = document.getElementById("reaction");
  const yesButton = document.querySelector(".yes-btn");
  const noButton = document.querySelector(".no-btn");
  const heart = document.querySelector(".heart");

  const reactions = [
    "hmmm are you sure? 🥺",
    "reallyyy? think again 😭",
    "ummm I don't think that's the right answer 😭",
    "okayyy stop playing 😭💗",
    "you really wanna say no to me? 🥹",
    "NO IS NOT AN OPTION NOW hehe 😭💕",
    "sirrr please choose wisely 😭"
  ];

  reaction.textContent =
    reactions[Math.min(noCount - 1, reactions.length - 1)];


  /* YES button gets bigger */

  const yesScale = Math.min(1 + noCount * 0.22, 3.5);

  yesButton.style.transform = `scale(${yesScale})`;


  /* NO button gets smaller */

  const noScale = Math.max(1 - noCount * 0.09, 0.45);

  noButton.style.transform = `scale(${noScale})`;


  /* Heart reacts */

  if (heart) {

    const heartScale = 1 + Math.min(noCount * 0.05, 0.4);

    heart.style.transform = `scale(${heartScale})`;
    heart.style.filter = `brightness(${1 + noCount * 0.05})`;

  }


  /* After a few NOs, button starts moving */

  if (noCount >= 3) {

    noButton.style.position = "relative";

    const moveX = Math.floor(Math.random() * 140) - 70;
    const moveY = Math.floor(Math.random() * 100) - 50;

    noButton.style.left = `${moveX}px`;
    noButton.style.top = `${moveY}px`;
  }


  createMiniHeart();
}


/* ==================== MINI HEARTS ==================== */

function createMiniHeart() {

  const heart = document.createElement("div");

  heart.innerHTML = "♥";

  heart.style.position = "fixed";
  heart.style.left = `${Math.random() * 90 + 5}%`;
  heart.style.bottom = "15%";
  heart.style.zIndex = "100";
  heart.style.pointerEvents = "none";
  heart.style.color = "#ff70dc";
  heart.style.fontSize = `${Math.random() * 15 + 15}px`;
  heart.style.textShadow =
    "0 0 8px #ff70dc, 0 0 18px #b82cff";
  heart.style.animation = "miniHeartFloat 2s ease-out forwards";

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 2000);
}


/* ==================== BOYFRIEND DAY HEARTS ==================== */

function startBoyfriendHearts() {

  if (heartsStarted) return;

  heartsStarted = true;

  const container = document.getElementById("floatingHearts");

  if (!container) return;

  setInterval(() => {

    if (currentPage !== 2) return;

    createBoyfriendHeart(container);

  }, 900);
}


function createBoyfriendHeart(container) {

  const heart = document.createElement("div");

  heart.className = "background-heart";
  heart.innerHTML = "♥";

  heart.style.left = `${Math.random() * 100}%`;

  heart.style.fontSize =
    `${Math.random() * 18 + 12}px`;

  heart.style.animationDuration =
    `${Math.random() * 3 + 4}s`;

  container.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 7000);
}


/* ==================== PAGE 4 — QUESTIONS ==================== */

const questions = [

  {
    icon: "🍕",
    text: "your favourite food?"
  },

  {
    icon: "📍",
    text: "your favourite place?"
  },

  {
    icon: "🎵",
    text: "your favourite song?"
  },

  {
    icon: "🎬",
    text: "favourite movie / show?"
  },

  {
    icon: "🧸",
    text: "your favourite thing?"
  },

  {
    icon: "✨",
    text: "something that always makes you happy?"
  },

  {
    icon: "🌷",
    text: "something you've always wanted to do?"
  },

  {
    icon: "💭",
    text: "anything else you wanna tell me?"
  }

];

let questionIndex = 0;

let touchStartX = 0;
let touchStartY = 0;

let isQuestionAnimating = false;


/* ==================== UPDATE POSTCARD ==================== */

function updateQuestionCard(animate = true, direction = "left") {

  const postcard = document.getElementById("questionPostcard");
  const questionText = document.getElementById("postcardQuestion");
  const questionIcon = document.getElementById("questionIcon");
  const counter = document.getElementById("cardCounter");
  const hint = document.getElementById("swipeHint");

  const screenshotNote =
    document.getElementById("screenshotNote");

  const nextButton =
    document.querySelector(".questions-next");

  const leftArrow =
    document.querySelector(".left-arrow");

  const rightArrow =
    document.querySelector(".right-arrow");


  if (!postcard || !questionText) return;


  function changeContent() {

    const question = questions[questionIndex];

    questionIcon.textContent = question.icon;

    questionText.textContent = question.text;

    counter.textContent =
      `${questionIndex + 1} / ${questions.length}`;


    /* First-card swipe hint */

    if (questionIndex === 0) {
      hint.textContent = "swipe to see the next one →";
      hint.style.display = "block";
    } else {
      hint.style.display = "block";
      hint.textContent = "swipe for another one →";
    }


    /* Disable arrows at ends */

    leftArrow.disabled = questionIndex === 0;

    rightArrow.disabled =
      questionIndex === questions.length - 1;


    /* Show final note + button only on last card */

    if (questionIndex === questions.length - 1) {

      screenshotNote.classList.add("show");
      nextButton.classList.add("show");

      hint.textContent = "that's all... for now hehe 💗";

    } else {

      screenshotNote.classList.remove("show");
      nextButton.classList.remove("show");

    }
  }


  if (!animate) {
    changeContent();
    return;
  }


  if (isQuestionAnimating) return;

  isQuestionAnimating = true;


  postcard.classList.remove(
    "postcard-slide-left",
    "postcard-slide-right"
  );

  void postcard.offsetWidth;


  if (direction === "left") {
    postcard.classList.add("postcard-slide-left");
  } else {
    postcard.classList.add("postcard-slide-right");
  }


  setTimeout(() => {

    changeContent();

    postcard.classList.remove(
      "postcard-slide-left",
      "postcard-slide-right"
    );

    isQuestionAnimating = false;

  }, 180);
}


/* ==================== NEXT QUESTION ==================== */

function nextQuestion() {

  if (questionIndex >= questions.length - 1) {
    return;
  }

  questionIndex++;

  updateQuestionCard(true, "left");
}


/* ==================== PREVIOUS QUESTION ==================== */

function previousQuestion() {

  if (questionIndex <= 0) {
    return;
  }

  questionIndex--;

  updateQuestionCard(true, "right");
}


/* ==================== MOBILE SWIPE ==================== */

function setupQuestionSwipe() {

  const postcard =
    document.getElementById("questionPostcard");

  if (!postcard) return;


  postcard.addEventListener(
    "touchstart",
    function(event) {

      touchStartX =
        event.changedTouches[0].screenX;

      touchStartY =
        event.changedTouches[0].screenY;

    },
    { passive: true }
  );


  postcard.addEventListener(
    "touchend",
    function(event) {

      const touchEndX =
        event.changedTouches[0].screenX;

      const touchEndY =
        event.changedTouches[0].screenY;


      const differenceX =
        touchEndX - touchStartX;

      const differenceY =
        touchEndY - touchStartY;


      /* Ignore mostly vertical swipes */

      if (Math.abs(differenceY) > Math.abs(differenceX)) {
        return;
      }


      /* Minimum swipe distance */

      if (Math.abs(differenceX) < 50) {
        return;
      }


      if (differenceX < 0) {

        /* Swipe LEFT = next card */

        nextQuestion();

      } else {

        /* Swipe RIGHT = previous card */

        previousQuestion();

      }

    },
    { passive: true }
  );
}


/* ==================== PAGE 6 — FINAL HEARTS ==================== */

function startFinalHearts() {

  if (finalHeartStarted) return;

  finalHeartStarted = true;

  setInterval(() => {

    if (currentPage !== 6) return;

    createFinalHeart();

  }, 500);
}


function createFinalHeart() {

  const container =
    document.getElementById("heartContainer");

  if (!container) return;

  const heart =
    document.createElement("div");

  heart.className = "floating-heart";

  heart.innerHTML = "♥";

  heart.style.left =
    `${Math.random() * 100}%`;

  heart.style.fontSize =
    `${Math.random() * 18 + 12}px`;

  heart.style.animationDuration =
    `${Math.random() * 3 + 4}s`;

  container.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 7000);
}


/* ==================== EXTRA HEART ANIMATION ==================== */

const extraStyle = document.createElement("style");

extraStyle.innerHTML = `

@keyframes miniHeartFloat {

  0% {
    transform: translateY(0) scale(0.5);
    opacity: 0;
  }

  20% {
    opacity: 1;
  }

  100% {
    transform: translateY(-180px) scale(1.2);
    opacity: 0;
  }

}

`;

document.head.appendChild(extraStyle);


/* ==================== START EVERYTHING ==================== */

document.addEventListener("DOMContentLoaded", () => {

  setupQuestionSwipe();

  updateQuestionCard(false);

  console.log("website ready 💗");

});
