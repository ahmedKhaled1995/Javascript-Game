const BTN_CLICK_AUDIO = document.querySelector('#btn-click');
const BTN_MOUSE_ENTER_AUDIO = document.querySelector('#btn-mouseenter');

function clickSound(e) {
    BTN_CLICK_AUDIO.play();
    
    setTimeout(function () {
        redirectBtn(e.target.id);
        e.target.click();
    }, 150);
}

function mouseEnterSound() {
    BTN_MOUSE_ENTER_AUDIO.play();
}