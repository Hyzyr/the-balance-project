const menu = document.getElementById("menu");
const menuBtn = document.getElementById("menuBtn");
const closeMenuBtn = document.getElementById("closeMenuBtn");
const continueBtn = document.getElementById("continueBtn");
const resetBtn = document.getElementById("resetBtn");

const closeMenu = () => {
  document.body.classList.remove("active");
  menu.classList.remove("active");
  menuBtn.classList.remove("active");
};
menuBtn.onclick = () => {
  document.body.classList.add("active");
  menu.classList.add("active");
  menuBtn.classList.add("active");
};
closeMenuBtn.onclick = closeMenu;
continueBtn.onclick = closeMenu;
menu.onclick = (e) => {
  if (e.currentTarget === e.srcElement) {
    closeMenu();
  }
};
const preloader = document.getElementById("preloader");
const preloaderRemove = (animationDuration = 0.2, delay = 0.3) => {
  setTimeout(() => {
    preloader.style = ` opacity: 0; transition: opacity ${animationDuration}s ease-out 0s;`;
    setTimeout(() => preloader.remove(), animationDuration * 1000);
  }, delay * 1000);
};

const checkiOS = () => {
  return ["iPhone Simulator", "iPod Simulator", "iPhone", "iPod"].includes(
    navigator?.platform
  );
};

// generate main functionality of questions
const questionBox = document.querySelector(".questions__message");
const questionBoxQuestion = questionBox.querySelector(
  ".questions__message-content > h3"
);
const questionBoxAnswer = questionBox.querySelector(
  ".questions__message-footer > h2"
);
const categoryHeaders = document.querySelectorAll(".questions__header");
const questionCards = document.querySelectorAll(".questions__item");

const showAnswerButton = document.querySelector("#showAnswer");
const closeQuestionButton = document.querySelector("#closeQuestion");
const showAnswerButton2 = document.querySelector("#showAnswer2");
const closeQuestionButton2 = document.querySelector("#closeQuestion2");

if (checkiOS()) {
  questionBox.classList.add("simple");
  // let dv = document.createElement("div");
  // dv.innerText = "ios";
  // dv.classList.add("version");
  // menu.appendChild(dv);
}

let questionsActions = questionsGenerator({
  questionBox,
  questionBoxQuestion,
  questionBoxAnswer,
  categoryHeaders,
  questionCards,
});

showAnswerButton.onclick = questionsActions.setAnswered;
closeQuestionButton.onclick = questionsActions.close;
showAnswerButton2.onclick = questionsActions.setAnswered;
closeQuestionButton2.onclick = questionsActions.close;

// teams cards functionality
const teamsCount = document.getElementById("teamsCount");

const generateTeamCardFunctionality = () => {
  const activeTeams = parseInt(teamsCount.value);

  document.querySelectorAll(".teams__card").forEach((item, index) => {
    const valueBox = item.querySelector("label");
    const removeBtn = item.querySelector("._remove");
    const addBtn = item.querySelector("._add");

    if (index >= activeTeams) {
      item.style.display = "none";
    } else item.style.display = "";

    const setDisabled = (isTrue = true) => {
      if (isTrue) item.classList.add("disabled");
      else item.classList.remove("disabled");
    };

    valueBox.innerText = 0.0;
    setDisabled();

    removeBtn.onclick = () => {
      let value =
        parseInt(valueBox.innerText) -
        questionsActions.getActiveQuestion().points;
      valueBox.innerText = value;
      setDisabled(value === 0);
    };
    addBtn.onclick = () => {
      let value =
        parseInt(valueBox.innerText) +
        questionsActions.getActiveQuestion().points;
      valueBox.innerText = value;
      setDisabled(value === 0);
    };
  });
};

const initAll = (data) => {
  questionsActions.init(data);
  generateTeamCardFunctionality();
};
// fetch json data
fetch("./assets/data/questions-data.json")
  .then(async (response) => {
    let data = await response.json();
    setTimeout(() => {
      initAll(data);
      teamsCount.onchange = () => initAll(data);
      resetBtn.onclick = () => initAll(data);
      preloaderRemove(0.3);
    }, 1000);
  })
  .catch((error) => console.log(error));
