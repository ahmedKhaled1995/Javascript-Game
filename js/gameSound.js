const BTN_CLICK_AUDIO = document.querySelector('#btn-click');
const BTN_MOUSE_ENTER_AUDIO = document.querySelector('#btn-mouseenter');

function clickSound() {
    BTN_CLICK_AUDIO.play();
}

function mouseEnterSound() {
    BTN_MOUSE_ENTER_AUDIO.play();
}