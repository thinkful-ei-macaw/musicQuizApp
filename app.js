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
        'Andre 3000',
        'Dr. Dre',
        'T.I.',
        'Snoop Dog',
        'Nas'
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
  answerFeedback: false,
  correctResponse: ['Right on! Keep it up and we will get you backstage.', 'Yes! Killing it with your musical knowledge.', 'Groovy man! That was impressive.', 'It\'s all happening!'],
  incorrectResponse: ['Better call your mom to come and get you.', 'You do like music, right?', 'No worries, there is always accounting.', 'What\'s the opposite of encore?']
};


/********** TEMPLATE GENERATION FUNCTIONS **********/
// These functions return HTML templates

function generateStartPage() {
  return `
  <section class="page" id="startPage">
    <div>
      <h1 class="quizBegin">Flex Your Music Knowledge</h1>
      <h2>Ready to rock, juke, jump and jive?</h2>
    </div>
    <button id="startBtn">Start Music Quiz</button>
  </section>`;
}

function generateScoreboard() {
  return `
  <article class="scoreboard">
    <span>Question ${STORE.questionNumber + 1} Out Of 10</span>
    <span>Current Score: ${STORE.score} / 10</span>
  </article>
  `;
}

function generateAnswers() {
  let answersHtml = '';

  STORE.questions[STORE.questionNumber].answers.forEach((answer, i) => {    
    answersHtml += `
    <span>
      <input type="radio" id="answer${i}" name="radioAnswer" 
      value="${answer}" required>
      <label for="answer${i}">${answer}</label><br>
    </span>
    `;
  });

  return answersHtml;
}

function generateQuestionPage() {
  return `
  <section class="page" id="question-page">
      ${generateScoreboard()}
      <div>
        <h3 class="question">${STORE.questions[STORE.questionNumber].question}</h3>
        <form action="" class="answersForm">
          ${generateAnswers()}
          <button class="submitAnswer">SUBMIT ANSWER</button>
        </form>
      </div>
    </section>`;
}

function generateRandomResponse(quoteArr) {
  const index = Math.floor(Math.random() * 4);
  return quoteArr[index];
}

function generateCorrectAnswerPage() {
  return `
  <section class="page" id="correct-page">
    ${generateScoreboard()}
    <h2 class="rightAnswer">${generateRandomResponse(STORE.correctResponse)}</h2>
    ${generateNextBtn()}
  </section>
  `;
}

function generateIncorrectAnswerPage() {
  return `
  <section class="page" id="incorrect-page">
    ${generateScoreboard()}
    <h2 class="wrongAnswer">Wrong Answer. We were looking for "${STORE.questions[STORE.questionNumber].correctAnswer}". ${generateRandomResponse(STORE.incorrectResponse)}</h2>
    ${generateNextBtn()}
  </section>
  `;
}

function generateNextBtn() {
  if(STORE.questionNumber < 9) {
    return `
    <button id="nextBtn">Next Question</button>
    `;
  } else {
    return `
    <button id="resultsBtn">See Results</button>
    `;
  }
}

function generateResultsPage() {
  return `
  <section class="page" id="results-page">
      <h2 class="quizEnd">Shows Over!</h2>
      <article class="scoreboard">
        <span>Final Score: ${STORE.score}/10</span>
      </article>
      ${generateResultsStatement()}
        <button id="playAgainBtn">Play Again?</button>
    </section>
  `;
}

function generateResultsStatement() {
  if(STORE.score < 7) {
    return `
    <p class="finalResponse">Well Dang... Thanks for playing but we feel it would be best if you stick to knitting.</p>
    `;
  } else {
    return `
    <p class="finalResponse">Alright! Looks like you are quite the aficionado when it comes to music. Here is that backstage pass I promised.</p>
    `;
  }
}



/********** RENDER FUNCTION(S) **********/
// This function conditionally replaces the contents of the <main> tag based on the state of the store
function render() {
  // Conditionals to see what page to render
  if(STORE.quizStarted === false) {
    // display start page
    $( 'main' ).html(generateStartPage());
  } else if(STORE.questionNumber < STORE.questions.length) {
    // display question page
    $( 'main' ).html(generateQuestionPage());
    handleQuestionSubmitted();
  } else {
    // display results page
    $( 'main' ).html(generateResultsPage());
  }
}

function renderFeedback() {
  if(STORE.answerFeedback === true) {
    $( 'main' ).html(generateCorrectAnswerPage());
  } else if (STORE.answerFeedback === false) {
    $( 'main' ).html(generateIncorrectAnswerPage());
  }
} 

/********** EVENT HANDLER FUNCTIONS **********/
// These functions handle events (submit, click, etc)

function handleStartQuiz() {
  // add an event listener to start Music Quiz button
  $( 'main' ).on('click', '#startBtn', function() {
    STORE.quizStarted = true;
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
  if (userAnswer === STORE.questions[STORE.questionNumber].correctAnswer) {
    STORE.answerFeedback = true;
    // Add point to score
    STORE.score += 1;
  } else {
    STORE.answerFeedback = false;
  }
  renderFeedback();
}

function handleNextQuestion() {
  $( 'main' ).on('click', '#nextBtn', function() {
    // Increment questionNumber by 1
    STORE.questionNumber++;
    render();
  });
}

function handleResults() {
  $( 'main' ).on('click', '#resultsBtn', function() {
    STORE.questionNumber++;
    render();
  });
}

function handlePlayAgain() {
  $( 'main' ).on('click', '#playAgainBtn', function() {
    STORE.questionNumber = 0;
    STORE.score = 0;
    STORE.quizStarted = false;
    render();
  });
}

function handleQuizApp() {
  handleStartQuiz();
  handleNextQuestion();
  handleResults();
  handlePlayAgain();
  render();
}

$(handleQuizApp());