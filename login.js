const loginForm = document.getElementById("loginForm");
const loginMail = document.getElementById("loginMail");
const loginPassword = document.getElementById("loginPassword");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let spans = document.getElementsByTagName("span");
let flag = true;

loginForm.addEventListener("submit", function (e) {
  //   e.preventDefault();
  var userData = JSON.parse(localStorage.getItem("userInfo"));

  if (!emailRegex.test(loginMail.value)) {
    e.preventDefault();
    spans[0].style.display = "block";
    flag = false;
  } else {
    spans[0].style.display = "none";
  }

  if (loginPassword.value === "") {
    e.preventDefault();
    spans[2].style.display = "block";
    flag = false;
  } else {
    spans[2].style.display = "none";
  }

  let emailExists = false;

  for (let i = 0; i < userData.length; i++) {
    if (loginMail.value === userData[i].email) {
      emailExists = true;

      if (loginPassword.value !== userData[i].password) {
        e.preventDefault();
        spans[1].style.display = "block";
        flag = false;
      } else {
        spans[1].style.display = "none";
      }

      //   break; // No need to continue looping once email is found
    }
  }

  if (!emailExists) {
    e.preventDefault();
    spans[1].style.display = "block";
    flag = false;
  }

  if (flag) {
    window.location.replace("./examination.html");
  }
});

// /////////////
// ////loginForm
// const loginForm = document.getElementById("loginForm");
// const loginMail = document.getElementById("loginMail");
// const loginPassword = document.getElementById("loginPassword");

// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// let spans = document.getElementsByTagName("span");
// let flag = true;

// loginForm.addEventListener("submit", function (e) {
//   e.preventDefault();
//   var userData = JSON.parse(localStorage.getItem("userInfo"));
//   console.log(userData[1].email);

//   if (!emailRegex.test(loginMail.value)) {
//     e.preventDefault();
//     spans[0].style.display = "block";
//     flag = false;
//   }

//   loginMail.addEventListener("keydown", function () {
//     spans[0].style.display = "none";
//   });

//   if (loginPassword.value == "") {
//     e.preventDefault();
//     spans[2].style.display = "block";
//     flag = false;
//   }

//   loginMail.addEventListener("keydown", function () {
//     spans[2].style.display = "none";
//   });

//   for (let i = 0; i < userData.length; i++) {
//     if (loginMail.value !== userData[i].email) {
//       if (loginPassword.value !== userData[i].password) {
//         e.preventDefault();
//         spans[1].style.display = "block";
//         flag = false;
//       }
//     }
//   }

//   loginPassword.addEventListener("keydown", function () {
//     spans[1].style.display = "none";
//   });

//   if (flag) {
//     window.location.replace("./examination.html");
//   }
// });
