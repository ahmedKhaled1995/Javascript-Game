document.addEventListener("mousemove", parallax);
function parallax(e) {
    document.querySelectorAll(".planets").forEach(function (planet) {

        var relativeValue = planet.getAttribute("relative");
        var x = (e.clientX * relativeValue) / 250;
        var y = (e.clientY * relativeValue) / 250;

        planet.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";
    });
}