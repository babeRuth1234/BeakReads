let toggleBtn = document.getElementById("dpb") 
let toggedEl = document.getElementById("navi")

toggleBtn.addEventListener('click', function()  {
    toggedEl.classList.toggle('my-class')
    console.log("he clicked me")
})