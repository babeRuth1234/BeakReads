let inputEl = document.getElementById("pt");
let slideBox = document.getElementById("books");
let scrollLeft = document.getElementById("left-scroll");
let scrollRight = document.getElementById("right-scroll");
let toggleBtn = document.getElementById("dpb") 
let toggedEl = document.getElementById("navi")


function updateText() {
    if(window.innerWidth <= 714){
        inputEl.placeholder = "Search for keyword, title, and more!";
    }else {
        inputEl.placeholder = "Search for a keyword, title, abstract, author, journal, ISSN, ISBN";
    }
}

window.addEventListener("load", updateText);
window.addEventListener("resize",updateText);

scrollLeft.addEventListener('click', () => {
    slideBox.scrollLeft -= 350;
})


scrollRight.addEventListener('click', () => {
    slideBox.scrollLeft += 350;
    
})

toggleBtn.addEventListener('click', function()  {
    toggedEl.classList.toggle('my-class')
    console.log("he clicked me")
})
const qaBtns = document.querySelectorAll('.btnPlus');
const qaAnswers = document.querySelectorAll('.ddText');

qaBtns.forEach(function (indBtn, index) {
    indBtn.addEventListener('click', function () {
        const isOpen = indBtn.classList.contains('my-dropDown');

        qaBtns.forEach(function (btn) {
            btn.classList.remove('my-dropDown');
            btn.innerHTML = '+'; // Reset all buttons to +
        });

        qaAnswers.forEach(function (qaAnswer) {
            qaAnswer.classList.remove('my-dropDown');
        });

        if (!isOpen) {
            indBtn.classList.add('my-dropDown');
            indBtn.innerHTML = '-'; // Change button to -
            qaAnswers[index].classList.add('my-dropDown');
        }
    });
});





