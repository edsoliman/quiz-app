//global variables
let questionNumber = 1;
let score = 0;
let currentQuestion = whichQuestion(QUESTIONOBJ);


function handleStartButton() {
  $('#container').on('click', '#js-start-button', function(event) {
    renderQuestion();
  });
}

function whichQuestion(questArray) {
  let question = questArray.find(question => 
    question.number === questionNumber);
  return question;
}

//helper function - append HTML to DOM
function renderQuestion() {
  $('#container').html("<p role='score' class='score'>Score: " + score + "</p><p role='question number' class='question'>Question: " + questionNumber + "/10</p><form><fieldset><legend>" + currentQuestion.question + "</legend><input type='radio' id='ans-1' value=0 name='IIFYM' required><label for='ans-1'>" + currentQuestion.answers.a + "</label><br><input type='radio' id='ans-2' value=1 name='IIFYM' required><label for='ans-2'>" + currentQuestion.answers.b + "</label><br><input type='radio'id='ans-3' value=2 name='IIFYM' required><label for='ans-3'>" + currentQuestion.answers.c + "</label><br><input type='radio' id='ans-4' value=3 name='IIFYM' required><label for='ans-4'>" + currentQuestion.answers.d + "</label><button id='submit-button' class='button' type='button'>Submit Answer</button></fieldset></form>");
};

function handleSubmitButton() {
  $('#container').on('click', '#submit-button', function(event) {
    questionNumber++;
    let userAnswer = $("input[name='IIFYM']:checked").val();
    if (questionNumber === 11 && userAnswer == currentQuestion.value) {
      score++;
      corrFeedbckFinQuesTemplate();
    } else if (questionNumber === 11 && userAnswer != currentQuestion.value) {
      incorrectFeebckFinQuesTemplate();
    } else if (questionNumber < 11 && userAnswer == currentQuestion.value) {
      score++;
      corrFeedbckNotFinQuesTemplate();
    } else if (questionNumber < 11 && userAnswer != currentQuestion.value) {
      incorrFeebckNotFinQuesTemplate();
    }
  });
};  

// helper function - correct feedback template - final question
function corrFeedbckFinQuesTemplate() {
$('#container').html(
  "<section role='feedback main' class='correct-feedback'><h2>Congrats, you got it right!</h2><button id='see-results-button' class='button'type='button'>See Results</button></section>");
};

//helper function - correct feedback template - not final question
function corrFeedbckNotFinQuesTemplate() {
  $('#container').html(
  "<section role='feedback main' class='correct-feedback'><h2>Congrats, you got it right!</h2><button id='next-question-button' class='button'type='button'>Next Question</button></section>");
};

//helper function - incorrect feedback template - not final question
function incorrFeebckNotFinQuesTemplate() {
  $('#container').html(
  "<section role='feedback main' class='incorrect-feedback'><h2>Sorry, that's not quite right...</h2><p>The correct answer is"+ currentQuestion.correctAnswer + "</p><button id='next-question-button' class='button'type='button'>Next Question</button>");
};

//helper function - incorrect feedback - final question
function incorrectFeebckFinQuesTemplate() {
  $('#container').html(
  "<section role='feedback main' class='incorrect-feedback'><h2>Sorry, that's not quite right...!</h2><p>The correct answer is" + currentQuestion.correctAnswer + "</p><button id='see-results-button' class='button'type='button'>See Results</button>");
};

function handleSeeResultsButton() {
  $('#container').on('click', '#see-results-button',function(event) {
    console.log('submitToScore is linked');
    $('#container').html("<section role='results main' class='results-page'><h2>Congrats, you've completed the quiz!</h2><p>You received a " + score + "/10.</p><button id='reset-button' class='button' type='reset'>Restart Quiz</button><section>");
  });
};

function handleNextQuestionButton() {
  $('#container').on('click', '#next-question-button', function(event) {
    currentQuestion = whichQuestion(QUESTIONOBJ);
    renderQuestion();
  });
};

function handleResetButton() {
  $('#container').on('click', '#reset-button', function(event) {
    resetCounters();
    currentQuestion = whichQuestion(QUESTIONOBJ);
    location.reload();
  });
};

//helper function - reset global counters
function resetCounters() {
  questionNumber = 1;
  score = 0;
};

function handleQuizApp() {

  handleStartButton();
  handleSubmitButton();
  handleNextQuestionButton();
  handleSeeResultsButton();
  handleResetButton();
}

$(handleQuizApp);