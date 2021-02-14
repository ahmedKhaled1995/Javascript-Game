function redirectBtn(btnId) {
    switch (btnId) {
        case 'game-mode':
            redirectGameMode();
            break;
        case 'how-to-play':
            redirectHowToPlay();
            break;
        case 'credits':
            redirectCredits();
            break;
        case 'back':
            redirectBack();
            break;
        case 'easy-level':
            redirectEasyLevel();
            break;
        case 'intermediate-level':
            redirectIntermediateLevel();
            break;
        case 'hard-level':
            redirectHardLevel();
            break;
        case 'arcade-mode':
            redirectArcadeMode();
            break;
        default:
            console.log("Button Not Registered");
            break;
    }
}