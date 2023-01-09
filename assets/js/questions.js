const questionsGenerator = ({
  questionBox,
  questionBoxQuestion,
  questionBoxAnswer,
  questionCards,
  categoryHeaders,
}) => {
  var activeQuestion = null;
  var keyListener = null;

  const setActiveCategory = (category = null) => {
    categoryHeaders.forEach((header) => {
      let isActive = header.getAttribute("data-category") === category;
      if (!category || isActive) header.classList.remove("muted");
      else header.classList.add("muted");
    });
  };
  const createKeyListener = () => (e) => {
    if (e.key == " " || e.code == "Space" || e.keyCode == 32) {
      e.preventDefault();
      setAnswered();
    } else if (e.keyCode === 27 || e.code == "Escape" || e.key === "Escape") {
      e.preventDefault();
      close();
    }
  };
  const setQuestionBoxVisible = (isVisible = true) => {
    if (!isVisible) {
      questionBox.style.display = "none";
      document.removeEventListener("keydown", keyListener);
    } else {
      questionBox.style.display = "";
      keyListener = createKeyListener();
      document.addEventListener("keydown", keyListener);
    }
  };

  const setAnswered = (isActive = true) => {
    if (isActive) questionBox.classList.add("answered");
    else questionBox.classList.remove("answered");
  };
  const close = () => {
    setQuestionBoxVisible(false);
    setActiveCategory(null);
    setAnswered(false);
  };

  const setQuestion = (question = null) => {
    activeQuestion = question;
    if (!question) {
      close();
    } else {
      setQuestionBoxVisible();
      setActiveCategory(question.category);
      questionBoxQuestion.innerText = question.question;
      questionBoxAnswer.innerText = question.answer;
    }
  };
  const setHeaders = (data) => {
    categoryHeaders.forEach((headerElement, index) => {
      let title = data[index].title;
      headerElement.innerText = title;
      headerElement.setAttribute("data-category", title);
    });
  };
  const setCards = (data) => {
    let cardIndex = 0;
    for (let questIndex = 0; questIndex < 5; questIndex++) {
      for (let catIndex = 0; catIndex < 5; catIndex++) {
        const card = questionCards[cardIndex];
        let questionOfCard = data[catIndex].questions[questIndex];
        card.innerText = questionOfCard.points;
        card.classList.remove("disabled");

        card.onclick = () => {
          questionsActions.setQuestion(questionOfCard);
          card.classList.add("disabled");
          card.onclick = null;
        };
        cardIndex++;
      }
    }
    questionCards.forEach((card, index) => {});
  };

  const init = (data) => {
    setHeaders(data);
    setCards(data);
  };

  return {
    setQuestionBoxVisible, // shoulde be removed
    setQuestion,
    setAnswered,
    close,
    init,
    getActiveQuestion: () => activeQuestion,
  };
};
