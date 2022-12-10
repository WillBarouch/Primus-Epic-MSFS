export function range(from:number, to:number) {
	// returns an array of numbers from 'from' to 'to' (inclusive)
    let range = [];
    for (let i = from; i < to+1; i++) {
        range.push(i)
    }
    return(range);
}

let _heading = 0

export function sign(value) {
    if (Math.sign(value) == 1) {
        return `+${value}`
    } else {
        return value
    }
}

export function getCurrentUTCTime() {
    const currentDate = new Date();
    return currentDate.getUTCHours() + ':' + currentDate.getUTCMinutes()
}

export function $(Id:string) {
    return document.getElementById(Id);
}

//export default function updateAvionics(iPitch) {
    let intervalId = window.setInterval(function(){
        _updateHorizon(0);
        _updateSpeedTape(270,0.42);
        _updateHSI(false);
        _updateHSITextVals("2:54", 240,244,10,4,5,7500,7500,35000);
        console.log(_heading)
    }, 100);
//}


function _updateHSITextVals(elapsedTime,TAS,GS,TAT,SAT,ISA,FQ,FR,GW){
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

function _updateSpeedTape(IAS:number,mach:number) {
    $("mach").innerText = String(mach).substring(1)
    $("tas").innerText = String(IAS)
}

function _updateHSI(crsIsOn:boolean, crs?:number) {
    $("hsi-compass").style.transform = `rotate(${-_heading}deg)`
    $("hsi-top-hdg").innerText = String(Math.round(_heading))
    let _newHeading = _heading + 0.2
    _heading = _newHeading
}

function _updateHorizon(pitch:number) {
    // Limit the pitch value to the range -30 to 30
    if (pitch !in range(-30,30)) {
        if (pitch < -30) {
            pitch = -30
        } else if (pitch > 30) {
            pitch = 30
        }
    }
    
    // Calculate the total vertical translation needed for the horizon image
    let totalTranslation = 0;
    const _translationFactor = 5.5;
    for (let i=0;i < Math.abs(pitch) ;i++) {
        totalTranslation = totalTranslation + _translationFactor
    }
    
    // If the pitch is negative, negate the total translation value
    if (Math.sign(pitch) == -1) {
        totalTranslation = -totalTranslation
    }
    
    // Update the horizon image with the calculated translation
    $("horizon-image").style.transform = `translateY(${totalTranslation}px)`
    
    // Log the pitch and translation values for debugging purposes
    console.log(`pitch ${pitch} translated to ${totalTranslation}`);
}

$('sixth-menu-button').addEventListener("click", function(){
    const $6thMenu = $('sixth-menu')
    if ($6thMenu.style.display === 'none') {
        $6thMenu.style.display = 'flex';
    } else {
        $6thMenu.style.display = 'none';
    }
})
{
    const _$eng = $('eng-window');
    const _$taws = $('taws-window');
    const _$rad = $('rad-window');
    const _$sens = $('sens-window');
    $('s-eng-button').addEventListener("click", function () {
        _$eng.style.display = 'inline';
        _$taws.style.display = 'none';
        _$rad.style.display = 'none';
        _$sens.style.display = 'none';
    })
    $('s-radio-button').addEventListener("click", function () {
        _$eng.style.display = 'none';
        _$taws.style.display = 'none';
        _$rad.style.display = 'inline';
        _$sens.style.display = 'none';
    })
    $('s-taws-button').addEventListener("click", function () {
        _$eng.style.display = 'none';
        _$taws.style.display = 'inline';
        _$rad.style.display = 'none';
        _$sens.style.display = 'none';
    })
    $('s-sens-button').addEventListener("click", function () {
        _$eng.style.display = 'none';
        _$taws.style.display = 'none';
        _$rad.style.display = 'none';
        _$sens.style.display = 'inline';
    })

}