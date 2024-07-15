
let question = document.getElementById("question");

let numberOfQuist = document.getElementById("numberOfQuist");
let inswer = document.getElementsByClassName("inswer");

let answers = document.getElementsByClassName("answers");

let btnNext = document.getElementById("next");
let btnPrevious = document.getElementById("previous");
let btnSubmit = document.getElementById("submit");
let btnMark = document.getElementById("mark");
let markButton = document.getElementById("markButton");

let sideMark = document.getElementById("sideMark");
////timer
let timer = document.getElementById("countdown");

let rusltPage = document.getElementById("rusltPage");

let counterQuestion = 0;
let questionsData;
let _questionsData;
let arrChoosedAnswer = [];
let showQuestionFromSide = [];
let duration = 10000 * 60;
let rightAnswer = 0;

// mark button
let newDiv;
let markElemnt = [];
let existingDiv;
var qst = [];
let Marked = [];
////////classn question

function Question(a, d, c){
    this.questions = a,
    this.answers = d,
    this.trueAnswers = c
}

function Answers(a){
    this.answer = a
}


////Shuffle funtion
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    while (currentIndex > 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

function displayQuestion(element) {

    question.innerHTML = element.questions;
    inswer[0].innerHTML = element.answers[0].answer;
    inswer[1].innerHTML = element.answers[1].answer
    inswer[2].innerHTML = element.answers[2].answer
    inswer[3].innerHTML = element.answers[3].answer
    
}

async function getData() {
    let reaponse = await fetch("./json/questions.json");
    _questionsData = await reaponse.json();
    
    questionsData = shuffle(_questionsData);
    
    for (let i = 0; i < questionsData.length; i++){
        
        var ans = [
            
            new Answers(questionsData[i].A),
            new Answers(questionsData[i].B),
            new Answers(questionsData[i].C),
            new Answers(questionsData[i].D)
        ]
        
        qst[i] = new Question(questionsData[i].question,ans,questionsData[i].answer)
    }
    displayQuestion(qst[0]);
    
}

getData();

btnNext.addEventListener("click", function () {
    //to return mark btn
    if (existingDiv) { 
        markButton.textContent = "NUMARK";
    } else {
        markButton.textContent = "MARK";
    }
    //
    if (counterQuestion < 9) {
        counterQuestion++;
        displayQuestion(qst[counterQuestion])
    } else {
        displayQuestion(qst[counterQuestion])
        
    }
    for (let i = 0; i < 4; i++){
        inswer[i].classList.remove("choosed");
        if (arrChoosedAnswer[counterQuestion] == inswer[i].id) {
            
            inswer[i].classList.add("choosed");
        } else {
            inswer[i].classList.remove("choosed");
        }
    }
    ////numberOfQuist
    numberOfQuist.innerHTML = "#" + (counterQuestion+1); 
    
    //display submit 
    if (counterQuestion == 9) {
        btnSubmit.style.display = 'inline-block'
    }

    for (let i = 0; i < Marked.length; i++){

        if (Marked[i] == numberOfQuist.innerHTML) {

            markButton.textContent = "UNMARK";
        }
    }

})


////previous button
btnPrevious.addEventListener("click", function () {

    ////to return mark btn
    if (existingDiv) { 
    } else {
        markButton.textContent = "MARK";
    }

    if (counterQuestion > 0) {
        counterQuestion--;
        displayQuestion(qst[counterQuestion])
    } else {
        displayQuestion(qst[counterQuestion])
    }
    
    ////numberOfQuist
    numberOfQuist.innerHTML = "#" + (counterQuestion + 1);
    
    //to select the choosed answer
    for (let i = 0; i < 4; i++){
        inswer[i].classList.remove("choosed");

        if (arrChoosedAnswer[counterQuestion] == inswer[i].id) {
            
            inswer[i].classList.add("choosed");
        }
    }
     //hidden submit 
    if (counterQuestion != 5) {
        btnSubmit.style.display = 'none'
    }

    for (let i = 0; i < Marked.length; i++){
        console.log(Marked);
        if (Marked[i] == numberOfQuist.innerHTML) {

            markButton.textContent = "UNMARK";
        }
    }
})

let choosedAnswer;
////to select only the choosed anwsers
for (let i = 0; i < 4; i++){
    inswer[i].addEventListener("click", choosedAnwer);
}

///select
function choosedAnwer() {
    for (let i = 0; i < 4; i++){
        
        inswer[i].classList.remove("choosed");
    }
    event.target.classList.add("choosed");

    //store data in array
    arrChoosedAnswer[counterQuestion] = event.target.id;
}

//mark button
btnMark.addEventListener("click", function () {
    
    existingDiv = document.querySelector('.newDiv[target="' + counterQuestion + '"]');

    if (!existingDiv) {    
        newDiv = document.createElement("div");
        newDiv.setAttribute("target", counterQuestion);
        newDiv.innerHTML = "#" + (counterQuestion + 1);
        newDiv.classList.add("newDiv");
        sideMark.append(newDiv);

        Marked.push(newDiv.innerHTML);

        markButton.textContent = "UNMARK";
    } else {
        markButton.textContent = "MARK";
        existingDiv.remove();
        markElemnt = markElemnt.filter(element=>element!==existingDiv)
    }

    if (newDiv) {
        document.querySelectorAll(".newDiv").forEach((ele) => {
            ele.addEventListener("click", function () {
                
                if (ele) {
                    markButton.textContent = "UNMARK";
                } 
                    let target = this.getAttribute("target");
                    counterQuestion = +target;
                    displayQuestion(qst[counterQuestion]);
                    numberOfQuist.innerHTML = "#" + (counterQuestion + 1);
                
                    //to select choosed answer
                    for (let i = 0; i < 4; i++){
                        inswer[i].classList.remove("choosed");
                        if (arrChoosedAnswer[counterQuestion] == inswer[i].id) {
                            inswer[i].classList.add("choosed");
                        } else {
                            inswer[i].classList.remove("choosed");
                        }
                    }
                })
            
        })
    }

})

////timer
function countdown() {
    setInterval(function () {
        duration -= 1000;
        let minutes, seconds;

        minutes = Math.floor(duration % (1000 * 60 * 60) / (1000 *60));
        seconds = Math.floor(duration % (1000 * 60) / 1000);


        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;

        timer.innerHTML = `${minutes} : ${seconds}`

        if (duration < 0) {
            window.location.replace("./timeOut.html")
        }
    
    }, 1000);
}
countdown();


/////sunmit button
btnSubmit.addEventListener("click", function () {
    choosedAnwer();
    filterAnswer();
    window.location.replace("./ruslt.html");
})


//////correct selections
function filterAnswer() {
    for (let i = 0; i < 10; i++){
        if (arrChoosedAnswer[i] == questionsData[i].answer) {
            rightAnswer++;
        }
    }
    result(rightAnswer);
}

//////////////
// put result in obj

function result(e) {
    var emailCurrentUSer = location.search.split("&")[0].split("=")[1].replace("%40", "@");

    var userData = JSON.parse(localStorage.getItem("userInfo"));

    console.log();
    if (userData) {
        
        for (let i = 0; i < userData.length; i++){
            if (userData[i].email == emailCurrentUSer) {
                userData[i].tokeExam = true;
                userData[i].rightAnswers = e;
            }
        }
    
        localStorage.setItem(`userInfo`, JSON.stringify(userData));
    
        console.log(localStorage.getItem("userInfo"));
    }

};

