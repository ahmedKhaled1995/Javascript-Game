function selectAvatar(avatarName) {
    const urlParams = new URLSearchParams( window.location.search);
    const level = urlParams.get('level');
    if(level === "arcade"){
        location.replace(`../levels/arcade.html?avatar=${avatarName}`);
    }else{
        location.replace(`../levels/level1.html?level=${level}&avatar=${avatarName}`);
    }
}
