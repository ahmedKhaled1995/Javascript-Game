const CURSOR = document.querySelector(".cursor");
const BTNS = document.querySelectorAll(".btn");
// var timeOut;

document.addEventListener("mousemove", (e) => {
    let x = e.pageX;
    let y = e.pageY;

    CURSOR.style.top = y + "px";
    CURSOR.style.left = x + "px";
    CURSOR.style.display = "block";

    //cursor effects when mouse stopped
    function mouseStopped() {
        CURSOR.style.display = "none";
    }
    // clearTimeout(timeout);
    // timeout = setTimeout(mouseStopped, 1000);
});

BTNS.forEach((eachBtn) => {
    eachBtn.addEventListener('mouseenter',  () => eachBtn.style.cursor = "none");
    eachBtn.addEventListener('mousemove', () => eachBtn.style.cursor = "none");
});

document.addEventListener("mouseout", () => {
    CURSOR.style.display = "none";
});