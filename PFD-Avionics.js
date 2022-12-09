"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ = exports.getCurrentUTCTime = exports.sign = exports.range = void 0;
function range(from, to) {
    // returns an array of numbers from 'from' to 'to' (inclusive)
    var range = [];
    for (var i = from; i < to + 1; i++) {
        range.push(i);
    }
    return (range);
}
exports.range = range;
var _heading = 0;
function sign(value) {
    if (Math.sign(value) == 1) {
        return "+" + value;
    }
    else {
        return value;
    }
}
exports.sign = sign;
function getCurrentUTCTime() {
    var currentDate = new Date();
    return currentDate.getUTCHours() + ':' + currentDate.getUTCMinutes();
}
exports.getCurrentUTCTime = getCurrentUTCTime;
function $(Id) {
    return document.getElementById(Id);
}
exports.$ = $;
//export default function updateAvionics(iPitch) {
var intervalId = window.setInterval(function () {
    _updateHorizon(0);
    _updateSpeedTape(270, 0.42);
    _updateHSI(false);
    _updateHSITextVals("2:54", 240, 244, 10, 4, 5, 7500, 7500, 35000);
    console.log(_heading);
}, 100);
//}
function _updateHSITextVals(elapsedTime, TAS, GS, TAT, SAT, ISA, FQ, FR, GW) {
    $("UTC").innerText = getCurrentUTCTime();
    $("ET").innerText = elapsedTime;
    $("tastxt").innerText = String(TAS);
    $("GS").innerText = String(GS);
    $("TAT").innerText = String(TAT);
    $("SAT").innerText = String(SAT);
    $("ISA").innerText = sign(ISA);
    $("FQ").innerText = String(FQ);
    $("FR").innerText = String(FR);
    $("GW").innerText = String(GW);
}
function _updateSpeedTape(IAS, mach) {
    $("mach").innerText = String(mach).substring(1);
    $("tas").innerText = String(IAS);
}
function _updateHSI(crsIsOn, crs) {
    $("hsi-compass").style.transform = "rotate(" + -_heading + "deg)";
    $("hsi-top-hdg").innerText = String(Math.round(_heading));
    var _newHeading = _heading + 0.2;
    _heading = _newHeading;
}
function _updateHorizon(pitch) {
    // Limit the pitch value to the range -30 to 30
    if (pitch in range(-30, 30)) {
        if (pitch < -30) {
            pitch = -30;
        }
        else if (pitch > 30) {
            pitch = 30;
        }
    }
    // Calculate the total vertical translation needed for the horizon image
    var totalTranslation = 0;
    var _translationFactor = 5.5;
    for (var i = 0; i < Math.abs(pitch); i++) {
        totalTranslation = totalTranslation + _translationFactor;
    }
    // If the pitch is negative, negate the total translation value
    if (Math.sign(pitch) == -1) {
        totalTranslation = -totalTranslation;
    }
    // Update the horizon image with the calculated translation
    $("horizon-image").style.transform = "translateY(" + totalTranslation + "px)";
    // Log the pitch and translation values for debugging purposes
    console.log("pitch " + pitch + " translated to " + totalTranslation);
}
$('sixth-menu-button').addEventListener("click", function () {
    var $6thMenu = $('sixth-menu');
    if ($6thMenu.style.visibility === 'hidden') {
        $6thMenu.style.visibility = 'visible';
    }
    else {
        $6thMenu.style.visibility = 'hidden';
    }
});
{
    var _$eng_1 = $('eng-window');
    var _$taws_1 = $('taws-window');
    var _$rad_1 = $('rad-window');
    var _$sens_1 = $('sens-window');
    $('s-eng-button').addEventListener("click", function () {
        _$eng_1.style.visibility = 'visible';
        _$taws_1.style.visibility = 'hidden';
        _$rad_1.style.visibility = 'hidden';
        _$sens_1.style.visibility = 'hidden';
    });
    $('s-rad-button').addEventListener("click", function () {
        _$eng_1.style.visibility = 'hidden';
        _$taws_1.style.visibility = 'hidden';
        _$rad_1.style.visibility = 'visible';
        _$sens_1.style.visibility = 'hidden';
    });
    $('s-taws-button').addEventListener("click", function () {
        _$eng_1.style.visibility = 'hidden';
        _$taws_1.style.visibility = 'visible';
        _$rad_1.style.visibility = 'hidden';
        _$sens_1.style.visibility = 'hidden';
    });
    $('s-sens-button').addEventListener("click", function () {
        _$eng_1.style.visibility = 'hidden';
        _$taws_1.style.visibility = 'hidden';
        _$rad_1.style.visibility = 'hidden';
        _$sens_1.style.visibility = 'visible';
    });
}
