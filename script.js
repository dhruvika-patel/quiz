const questions = [
    {
        question: "which is largest animal in the world?",
        answer: [
            { text: "shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },

        ]
    },
    {
        question: "which is smallest country in the world?",
        answer: [
            { text: "vatican city", correct: true},
            { text: "Bhutan", correct: false },
            { text: "nepal", correct: false },
            { text: "shri lanka", correct: false },

        ]
    },
    {
        question: "which is the largest desert in the world?",
        answer: [
            { text: "kalahari", correct: false },
            { text: "Gobi", correct: false },
            { text: "sahara", correct: false },
            { text: "Antarctica", correct: true },

        ]
    },
    {
        question: "which is smallst continent in the world?",
        answer: [
            { text: "Asia", correct: false },
            { text: "Australia", correct: true },
            { text: "Arctic", correct: false },
            { text: "Africa", correct: false },

        ]
    }
    
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currentquestionindex = 0;
let score = 0;

function startquiz() {
    currentquestionindex = 0;
    score = 0;
    nextButton.innerHTML = "next";
    Showquestion();
}


function Showquestion() {
    resetstate();
    let currentquestion = questions[currentquestionindex];
    let questionno = currentquestionindex + 1;
    questionElement.innerHTML = questionno +  "." + currentquestion.question;

    currentquestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectanswer);
    });
}


  function resetstate() {
      nextButton.style.display = "none";
     while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
      }
 }


function selectanswer(e) {
     const selectedbtn = e.target;
     const iscorrect = selectedbtn.dataset.correct === "true";
    if(iscorrect){
         selectedbtn.classList.add("correct");
         score++;
    }
     else{
         selectedbtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled = "true";
    });
    nextButton.style.display = "block";
}
function showscore(){
    resetstate();
    questionElement.innerHTML =`you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play again";
    nextButton.style.display = "block";
}
function handlenextbutton(){
    currentquestionindex++;
    if(currentquestionindex < questions.length){
        Showquestion();
    }else{
        showscore();
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentquestionindex < questions.length){
        handlenextbutton();
    }else{
        startquiz();
    }
});

startquiz();