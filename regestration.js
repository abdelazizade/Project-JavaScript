"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const regesterform = document.getElementById("regesterform");
  const fristName = document.getElementById("fristName");
  const lastName = document.getElementById("lastName");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const machPasword = document.getElementById("machPasword");

  const rxgName = /^[A-Za-z]+$/;
  const rxgEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const rxgPassword = /^.{8,}$/;

  const spanFristName = document.getElementById("sfristName");
  const spanLastName = document.getElementById("slastName");
  const spanEmail = document.getElementById("sEmail");
  const usedEmail = document.getElementById("usedEmail");
  const spanPassword = document.getElementById("sPassword");
  const spanMachPasword = document.getElementById("sMachPasword");

  regesterform.addEventListener("submit", function (e) {
    e.preventDefault();

    let flag = true;

    // Validation for firstName
    if (!rxgName.test(fristName.value)) {
      e.preventDefault();
      spanFristName.style.display = "block";
      flag = false;
    } else {
      spanFristName.style.display = "none";
    }

    // Validation for lastName
    if (!rxgName.test(lastName.value)) {
      e.preventDefault();
      spanLastName.style.display = "block";
      flag = false;
    } else {
      spanLastName.style.display = "none";
    }

    // Validation for Email
    if (!rxgEmail.test(email.value)) {
      e.preventDefault();
      spanEmail.style.display = "block";
      flag = false;
    } else {
      spanEmail.style.display = "none";
    }

    // Validation for Password
    if (!rxgPassword.test(password.value)) {
      e.preventDefault();
      spanPassword.style.display = "block";
      flag = false;
    } else {
      spanPassword.style.display = "none";
    }

    // Validation for MatchPassword
    if (machPasword.value !== password.value) {
      e.preventDefault();
      spanMachPasword.style.display = "block";
      flag = false;
    } else {
      spanMachPasword.style.display = "none";
    }

    if (flag) {
      const userInfo = localStorage.getItem("userInfo");
      let users = userInfo ? JSON.parse(userInfo) : [];

      // Check for existing email
      const existingUser = users.find((user) => user.email === email.value);
      if (existingUser) {
        alert("Email already exists");
        return;
      }

      const newUser = {
        rightAnswers: 0,
        password: password.value,
        fristName: fristName.value,
        lastName: lastName.value,
        email: email.value,
        tokeExam: false,
      };

      users.push(newUser);
      localStorage.setItem("userInfo", JSON.stringify(users));
      window.location.replace("./loginPage.html");
    }
  });
});

// // "use strict";

// const regesterform = document.getElementById("regesterform");
// const fristName = document.getElementById("fristName");
// const lastName = document.getElementById("lastName");
// const email = document.getElementById("email");
// const password = document.getElementById("password");
// const machPasword = document.getElementById("machPasword");

// const rxgName = /^[A-Za-z]+$/;
// const rxgEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// const rxgPassword = /^.{3,}$/;

// const spanFristName = document.getElementById("sfristName");
// const spanLastName = document.getElementById("slastName");
// const spanEmail = document.getElementById("sEmail");
// const usedEmail = document.getElementById("usedEmail");
// const spanPassword = document.getElementById("sPassword");
// const spanMachPasword = document.getElementById("sMachPasword");
// regesterform.addEventListener("submit", function (e) {
//   var flag = true;
//   e.preventDefault();
//   if (localStorage.userInfo) {
//     let userData = JSON.parse(localStorage.userInfo);

//     for (let i = 0; i < userData.length; i++) {
//       if (email.value == userData[i].email) {
//         e.preventDefault();
//         alert("Exist");
//       } else {
//         var users = [];

//         if (localStorage.userInfo) {
//           users = JSON.parse(localStorage.getItem("userInfo"));
//           flag = false;
//         } else {
//           flag = true;
//         }

//         //validation for fristName
//         if (!rxgName.test(fristName.value)) {
//           console.log("first");
//           e.preventDefault();
//           spanFristName.style.display = "block";
//           flag = false;
//         } else {
//           flag = true;
//         }

//         fristName.addEventListener("keydown", function () {
//           spanFristName.style.display = "none";
//         });

//         //validation for lastname
//         if (!rxgName.test(lastName.value)) {
//           e.preventDefault();
//           spanLastName.style.display = "block";
//         } else {
//           flag = true;
//         }
//         lastName.addEventListener("keydown", function () {
//           spanLastName.style.display = "none";
//         });

//         //validation for Email
//         if (!rxgEmail.test(email.value)) {
//           e.preventDefault();
//           spanEmail.style.display = "block";
//           flag = false;
//         } else {
//           flag = true;
//         }

//         email.addEventListener("keydown", function () {
//           spanEmail.style.display = "none";
//         });

//         ///////////////////////////////////////////////////////////////////////////////////////

//         //validation for Password
//         if (!rxgPassword.test(password.value)) {
//           e.preventDefault();
//           spanPassword.style.display = "block";
//           flag = false;
//         } else {
//           flag = true;
//         }

//         password.addEventListener("keydown", function () {
//           spanPassword.style.display = "none";
//         });

//         //validation for MachPassword
//         if (machPasword.value !== password.value) {
//           e.preventDefault();
//           console.log(machPasword.value);
//           spanMachPasword.style.display = "block";
//           flag = false;
//         } else {
//           flag = true;
//         }

//         machPasword.addEventListener("keydown", function () {
//           spanMachPasword.style.display = "none";
//         });

//         ///user data
//         if (flag) {
//           const obj = {
//             rightAnswers: 0,
//             password: password.value,
//             fristName: fristName.value,
//             lastName: lastName.value,
//             email: email.value,
//             tokeExam: false,
//           };
//           users.push(obj);
//           localStorage.setItem("userInfo", JSON.stringify(users));
//           window.location.replace("./loginPage.html");
//         }
//       }
//     }
//   }
// });

// if (localStorage.userInfo) {
//     var users = JSON.parse(localStorage.getItem("userInfo"));
//     if (users.length > 0) {
//         for (let i = 0; i < users.length; i++){
//             if (users[i].tokeExam === true) {
//                 e.preventDefault();
//                 usedEmail.style.display = "block";
//                 console.log("mmmmmmm");
//                 }
//         }

//     }
// }
