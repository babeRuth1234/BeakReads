let def = document.getElementById("pt");


function updateText() {
    if(window.innerWidth <= 714){
        def.placeholder = "Search for keyword, title, and more!";
    }else {
        def.placeholder = "Search for a keyword, title, abstract, author, journal, ISSN, ISBN";
    }
}

window.addEventListener("load", updateText);
window.addEventListener("resize",updateText);

let toggleBtn = document.getElementById("dpb") 
let toggedEl = document.getElementById("navi")


toggleBtn.addEventListener('click', function()  {
    toggedEl.classList.toggle('my-class')
    console.log("he clicked me")
})
