function range(from:number, to:number) {
    let range = [];
    for (let i = from; i < to+1; i++) {
        range.push(i)
    }
    return(range);
}
let inputpitch = 5
let intervalId = window.setInterval(function(){
    updateHorizon(inputpitch);
}, 50);

function updateHorizon(pitch:number) {
    if (pitch !in range(-30,30)) {
        if (pitch < -30) {
            pitch = -30
        } else if (pitch > 30) {
            pitch = 30
        }
    }
    let totalTranslation = 0;
    for (let i=0;i < Math.abs(pitch) ;i++) {
        totalTranslation = totalTranslation + 5
    }
    if (Math.sign(pitch) == -1) {
        totalTranslation = -totalTranslation
    }
    document.getElementById("horizon-image").style.transform = "translateY(" + totalTranslation +"px)"
    console.log("translated to: " + totalTranslation);
}
