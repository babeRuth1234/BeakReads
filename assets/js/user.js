// let hours = document.getElementById('hours');
// let hh = document.getElementById('hh');
// let hour_dot = document.querySelector('.hr_dot');


// let endDate = '10/31/2023 23:30:00';
// // date format mm/dd/yyyy

// let x = setInterval(function(){
//     let now = new Date(endDate).getTime();
//     let countDown = new Date().getTime();
//     let distance = now - countDown;



//     // time calculation , hours
//     let h = Math.floor((distance % (1000 * 60 * 60 *24)) / (1000 * 60 * 60));
//     // output the result in element with id
//     hours.innerHTML = h + "<br><span>Hours spent</span>";

//     // animate stroke
//     hh.style.strokeDashoffset = 440 - (440 * h) / 24;
//     // animate circle dots
//     hour_dot.style.transform = `rotateZ(${h * 15}deg)`;


//     if(distance < 0){
//         clearInterval(x);
//     }
// })

// // Get the HTML elements
// const showButton = document.getElementById("showButton");
// const hideButton = document.getElementById("hideButton");
// const myDiv = document.getElementById("myDiv");

// // Function to show the div
// function showDiv() {
//     myDiv.style.display = "flex";
// }

// // Function to hide the div
// function hideDiv() {
//     myDiv.style.display = "none";
// }

// // Event listener to show the div when "Show Div" button is clicked
// showButton.addEventListener("click", showDiv);

// // Event listener to hide the div when "Hide Div" button is clicked
// hideButton.addEventListener("click", hideDiv);

// // Event listener to hide the div when clicking outside of it
// document.addEventListener("click", function (event) {
//     if (event.target !== myDiv && event.target !== showButton) {
//         hideDiv();
//     }
// });
