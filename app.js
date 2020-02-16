'use strict';
/*eslint-env jquery*/
/**
 * Example store structure
 */
const STORE = {
  // 5 or more questions are required
  questions: [
    {
      question: 'At what age did Janis Joplin, Jimi Hendrix and Kurt Cobain die at?',
      answers: [
        '19',
        '23',
        '27',
        '30',
        '28'
      ],
      correctAnswer: '27'
    },
    {
      question: 'Who insisted throughout the 80s that "Girls just wanna have fun?',
      answers: [
        'Madonna',
        'Tiffany',
        'Whitney Houston',
        'Cyndi Lauper',
        'Blondie'
      ],
      correctAnswer: 'Cyndi Lauper'
    },
    {
      question: 'Which regal-sounding band topped the charts in 2008 with "Sex on Fire"?',
      answers: [
        'Lords of Acid',
        'The Gypsy Kings',
        'Kings of Leon',
        'Prince',
        'Queen'
      ],
      correctAnswer: 'Kings of Leon'
    },
    {
      question: 'Which couple released the song "Crazy In Love"?',
      answers: [
        'Sonny and Cher',
        'Britney and Kevin Federline ',
        'Thurston Moore and Kim Gordon',
        'Miranda Lambert and Blake Shelton',
        'Beyonce and Jay-Z'
      ],
      correctAnswer: 'Beyonce and Jay-Z'
    },
    {
      question: 'Which band who had hits spanning 5 decades, used to be known as The Rattlesnakes?',
      answers: [
        'The Beatles',
        'The Bee Gees',
        'The Rolling Stones',
        'Parliament',
        'The Grateful Dead'
      ],
      correctAnswer: 'The Bee Gees'
    },
    {
      question: 'Who topped the charts in 2014 with "Happy"?',
      answers: [
        'John Legend',
        'Katy Perry',
        'One Direction',
        'Pharrell Williams',
        'Chris Brown'
      ],
      correctAnswer: 'Pharrell Williams'
    },
    {
      question: 'Andre Young is better known as which rapper?',
      answers: [
        'Nas',
        'Dr. Dre',
        'T.I.',
        'Snoop Dog',
        'Andre 3000'
      ],
      correctAnswer: 'Dr. Dre'
    },
    {
      question: 'Who performed "Wildflowers" at the 2018 Grammy Awards with Chris Stapleton?',
      answers: [
        'Emmylou Harris',
        'Taylor Swift',
        'Rihanna',
        'Lady Gaga',
        'Shakira'
      ],
      correctAnswer: 'Emmylou Harris'
    },
    {
      question: 'What band from Issaquah, Washington includes lead singer, Isaac Brock?',
      answers: [
        'Death Cab For Cutie',
        'Mudhoney',
        'Alice In Chains',
        'Modest Mouse',
        'Band of Horses'
      ],
      correctAnswer: 'Modest Mouse'
    },
    {
      question: 'What name did Nicki Minaj choose for her first studio album?',
      answers: [
        'Pink Friday',
        'The Pinkprint',
        'Queen',
        'Yellow Submarine',
        'Pink Friday: Roman Reloaded'
      ],
      correctAnswer: 'Pink Friday'
    },
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  answerFeedback: false
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
  STORE.questions[STORE.questionNumber - 1].answers.forEach((answer, i) => {    
    answersHtml += `
    <span>
      <input type="radio" id="answer${i}" name="radioAnswer" 
      value="${answer}">
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
        <span>Question #:${STORE.questionNumber}</span>
        <span>Current Score:${STORE.score}</span>
      </article>
      <h3 class="question">${STORE.questions[STORE.questionNumber - 1].question}</h3>
      <form action="" class="answersForm">
        ${generateAnswers()}
        <button class="submitAnswer">SUBMIT ANSWER</button>
      </form>
    </section>`;
}

function generateCorrectAnswerPage() {
  return `
  <section class="page" id="correct-page">
      <article class="status">
        <span>Question #: ${STORE.questionNumber}</span>
        <span>Current Score: ${STORE.score}</span>
      </article>
      <h2 class="rightAnswer">Good Job! Why don't we go meet the band?</h2>

      <button id="nextBtn">Next Question</button>
    </section>
  `;
}

function generateIncorrectAnswerPage() {
  return `
  <section class="page" id="incorrect-page">
      <article class="status">
        <span>Question #: ${STORE.questionNumber}</span>
        <span>Current Score: ${STORE.score}</span>
      </article>
      <h2 class="wrongAnswer">Wrong Answer. We were looking for "${STORE.questions[STORE.questionNumber - 1].correctAnswer}". I'm going to need that backstage pass back!</h2>
      
      <button id="nextBtn">Next Question</button>
    </section>
  `;
}


/********** RENDER FUNCTION(S) **********/
// This function conditionally replaces the contents of the <main> tag based on the state of the store
function render() {
  // Conditionals to see what page to render
  if(STORE.quizStarted === false) {
    // display start page
    $( 'main' ).html(generateStartPage());
    handleStartQuiz();
  } else if(STORE.questionNumber <= STORE.questions.length) {
    // display question page
    $( 'main' ).html(generateQuestionPage());
    handleQuestionSubmitted();
  } else if(STORE.questionNumber === 10) {
    // display results page
  }
}

function renderFeedback() {
  if(STORE.answerFeedback === true) {
    $( 'main' ).html(generateCorrectAnswerPage());
    handleNextQuestion();
    
  } else if (STORE.answerFeedback === false) {
    $( 'main' ).html(generateIncorrectAnswerPage());
    handleNextQuestion();
    
  }
} 

/********** EVENT HANDLER FUNCTIONS **********/
// These functions handle events (submit, click, etc)

function handleStartQuiz() {
  // add an event listener to start Music Quiz button
  $( 'main' ).on('click', '#startBtn', function(e) {
    console.log('startBtn');
    
    // change quizStarted to true
    STORE.quizStarted = true;
    STORE.questionNumber++;
    // --> call render function
    render();
  });
}

function handleQuestionSubmitted() {
  // add event listener to form
  $( 'form' ).submit(e => {
    e.preventDefault();
    // Get value from form submit
    const userAnswer = $( 'input[name=radioAnswer]:checked', '.answersForm' ).val();    
    // check if user is right
    handleCheckAnswer(userAnswer);
  });
}

function handleCheckAnswer(userAnswer) {
  // Compare user answer with correct answer
  if (userAnswer === STORE.questions[STORE.questionNumber - 1].correctAnswer) {
    // Display correct answer page
    STORE.answerFeedback = true;
    // Add point to score
    STORE.score += 1;
    renderFeedback();
  } else {
    // generate wrong answer page
    STORE.answerFeedback = false;
    renderFeedback();
  }
}

function handleNextQuestion() {
  $( 'main' ).on('click', '#nextBtn', function(e) {
    console.log('nextBtn');
    // Increment questionNumber by 1
    STORE.questionNumber++;
    render();
  });
}



$(render());