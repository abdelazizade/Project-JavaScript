
let span = document.querySelectorAll("span");


var reaponse = JSON.parse(localStorage.getItem("userInfo"));

for (let i = 0; i < reaponse.length; i++){

    if (reaponse[i].tokeExam == true) {
        
        span[0].textContent = reaponse[0].fristName;
        span[1].textContent = reaponse[0].lastName;
        span[2].textContent = `your result is ${reaponse[0].rightAnswers *10}`;
    }
}


