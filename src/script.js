hideAllScreens();

const start = document.getElementById("start");
const game = document.getElementById("game");
const score = document.getElementById("score");

let questions = [];

// const questions = [
//       {
//         text: "Which is the biggest continent?",
//         answers: ["Africa", "Asia", "Europe", "North America"],
//         correct: 1 // Índice de la respuesta correct
//       },
//       {
//         text: "When we walk on the moon for first time?",
//         answers: ["1969", "1972", "1965", "1975"],
//         correct: 0 // Índice de la respuesta correct
//       },
//       {
//         text: "Who painted the Mona Lisa?",
//         answers: ["Pablo Picasso", "Vincent van Gogh", "Leonardo da Vinci", "Rembrandt"],
//         correct: 2 // Índice de la respuesta correct
//       }
// ];

fetch('./src/questions.json')
  .then(response => response.json())
  .then(data => {
    questions = data;
  })
  .catch(error => console.error('Error al cargar el archivo JSON:', error));

console.log(questions[0]);


let index;
let rightAnswers;
let actualQuestion;

showScreen(start);

function showScreen(screen){
    screen.style.display = "flex"
}

function hideAllScreens() {
    let screens = document.querySelectorAll('.screen');
    screens.forEach(function(screen) {
      screen.style.display = 'none';
    });
}

function startGame(){
    hideAllScreens();
    index = 0;
    rightAnswers = 0;
    loadQuestion();
    showScreen(game);
}

function loadQuestion(){

    if(index >= questions.length){
        endGame();
    } else{
        game.innerHTML = "";

        actualQuestion = questions[index];

        game.innerHTML = `
        <p class="message">Question ${index + 1} out of ${questions.length}</p>
        <h2 class="question">${actualQuestion.text}</h2>
        <div class="option-group">
            <div class="option semi-bold" onclick=checkAnswer(0) id="0">${actualQuestion.answers[0]}</div>
            <div class="option semi-bold" onclick=checkAnswer(1) id="1">${actualQuestion.answers[1]}</div>
            <div class="option semi-bold" onclick=checkAnswer(2) id="2">${actualQuestion.answers[2]}</div>
            <div class="option semi-bold" onclick=checkAnswer(3) id="3">${actualQuestion.answers[3]}</div>
        </div>
        `
    }

}

function checkAnswer(n){
    document.querySelectorAll('.option').forEach(option => {
        option.onclick= null;
    });

    if(actualQuestion.correct == n){
        document.getElementById(`${n}`).classList.add("correct");
        rightAnswers++;
    } else{
        document.getElementById(`${n}`).classList.add("incorrect");
        document.getElementById(`${actualQuestion.correct}`).classList.add("correct");
    }
    index++;

    
    setTimeout(loadQuestion,1000);
}



function endGame(){
    hideAllScreens();

    const img = rightAnswers >= 2 ? "win.png" : "lose.png";

    document.getElementById("score-number").innerText = `${rightAnswers} of ${questions.length}`
    document.getElementById("score-img").src = `./img/${img}`;
    showScreen(score);
}