function range(from, to) {
    var range = [];
    for (var i = from; i < to + 1; i++) {
        range.push(i);
    }
    return (range);
}
var inputpitch = 5;
var intervalId = window.setInterval(function () {
    updateHorizon(inputpitch);
}, 50);
function updateHorizon(pitch) {
    if (pitch in range(-30, 30)) {
        if (pitch < -30) {
            pitch = -30;
        }
        else if (pitch > 30) {
            pitch = 30;
        }
    }
    var totalTranslation = 0;
    for (var i = 0; i < Math.abs(pitch); i++) {
        totalTranslation = totalTranslation + 5;
    }
    if (Math.sign(pitch) == -1) {
        totalTranslation = -totalTranslation;
    }
    document.getElementById("horizon-image").style.transform = "translateY(" + totalTranslation + "px)";
    console.log("translated to: " + totalTranslation);
}
