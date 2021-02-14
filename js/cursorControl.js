const CURSOR = document.querySelector(".cursor");
const BTNS = document.querySelectorAll(".btn");
const TITLE = document.querySelector('.title');

document.addEventListener("mousemove", (e) => {
    let x = e.pageX;
    let y = e.pageY;

    CURSOR.style.top = y + 30 + "px";     //adding an offset to accuratley position the cursor over the rocket
    CURSOR.style.left = x + "px";
    CURSOR.style.display = "block";
});

document.addEventListener("mouseout", () => {
    CURSOR.style.display = "none";
});


BTNS.forEach((eachBtn) => {
    eachBtn.addEventListener('mouseenter', () => {
        eachBtn.style.cursor = "none";
        eachBtn.style.color = "white";
        eachBtn.style.fontWeight = "bold";
        CURSOR.classList.add("over-btn");
    });
    // eachBtn.addEventListener('mousemove', () => eachBtn.style.cursor = "none");
    eachBtn.addEventListener('mouseleave', () => {
        eachBtn.style.color = "aquamarine";
        eachBtn.style.fontWeight = "normal";
        CURSOR.classList.remove("over-btn");
    });
});

TITLE.addEventListener('mouseover', () => TITLE.classList.add("title-grow"));
TITLE.addEventListener('mouseleave', () => TITLE.classList.remove("title-grow"));