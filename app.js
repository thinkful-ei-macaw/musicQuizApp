'use strict';
/*eslint-env jquery*/
/**
 * Example store structure
 */
const STORE = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What color is broccoli?',
      answers: [
        'red',
        'orange',
        'pink',
        'green'
      ],
      correctAnswer: 'green'
    },
    {
      question: 'What is the current year?',
      answers: [
        '1970',
        '2015',
        '2019',
        '2005'
      ],
      correctAnswer: '2019'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};

/**
 *
 * Your app should include a render() function, that regenerates
 * the view each time the store is updated. See your course
 * material, consult your instructor, and reference the slides
 * for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/
// These functions return HTML templates

function generateStartPage() {
  // return start page html
  return `
  <section class="page" id="startPage">
    <div>
      <h1>Flex Your Music Knowledge</h1>
      <h2>Are you ready to rock, juke, jump and jive?</h2>
    </div>
    <button id="startBtn">Start Music Quiz</button>
  </section>`;
}

function generateAnswers() {
  let answersHtml = '';
  STORE.questions[STORE.questionNumber].answers.forEach((answer, i) => {
    answersHtml += `
    <span>
      <input type="radio" id="answer${i}" name="answer${i}" value=${answer}>
      <label for="answer${i}">${answer}</label><br>
    </span>
    `;
  });
  return answersHtml;
}

function generateQuestionPage() {
  return `
  <section id="question-page">
      <article class="status">
        <span>Question #:</span>
        <span>Current Score</span>
      </article>
      <h3 class="question">${STORE.questions[STORE.questionNumber].question}</h3>
      <form action="" class="answers">
        ${generateAnswers()}
        <button class="submit">SUBMIT</button>
      </form>
    </section>`;
}


/********** RENDER FUNCTION(S) **********/
// This function conditionally replaces the contents of the <main> tag based on the state of the store
function render() {
  // if STORE.quizStarted === false then call generateStartPage();
  if(STORE.quizStarted === false) {
    $( 'main' ).html(generateStartPage());
    handleStartQuiz();
  } else if(STORE.quizStarted === true) {
    // display question page
    $( 'main' ).html(generateQuestionPage());
  }

}


/********** EVENT HANDLER FUNCTIONS **********/
// These functions handle events (submit, click, etc)

function handleStartQuiz() {
  // add an event listener to start Music Quiz button
  $( 'main' ).on('click', '#startBtn', function(e) {
    // change quizStarted to true
    STORE.quizStarted = true;
    // --> call render function
    render();
  });
}




$(render());