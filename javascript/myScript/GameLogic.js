//VERY IMPORTANT $(document).ready have to be the first block in order to work!
$(document).ready(() => {
    document.addEventListener('diceAnimFinished', () => {
        AreAllAnimFinished();
    });
    document.addEventListener('diceAnimStarted', () => {
        StartedAnim++;
    });
    $('#ShakeBtn').val("Commencer");
    
});
//VERY IMPORTANT to be accessible from another .js file 
//the function need to be outside $(document).ready. 
//Also need to be after $(document).ready block because everything inside 
//the $(document).ready block won't work.
let ptsRemovalChk = false;
var gameCnt = 0;
let goalScore2bChk = false;
var pointsToSteel = 0;
var shotCnt = 0;
var totalKept = 0;
var pts = 30; //points start at 30.
var gameOver = false;
var shakeBag = []; //Bag That contains the dices to be shaken.
var toBeFrozed = []; //contains the dices to be saved.
var frozenBag = []; //contains saved dices.
var turnStart = true; //first shot of this round.
var dices = [];
dices = document.getElementsByClassName("cube");
let finishedAnim = 0;
let StartedAnim = 0;


function AreAllAnimFinished() {
    //-----------------------------------------MAYBE PUT A TIMEOUT HERE------------------------------------------------
    if (++finishedAnim == StartedAnim) {
        finishedAnim = 0;
        StartedAnim = 0;
        DiceAnimOver();
        console.log("All Anim Finished.");
    }
    console.log("StartedAnim : " + StartedAnim);
    console.log("finishedAnim : " + finishedAnim);
}

function FillShakeBag() { /////////////////////////-------------------------vvvvvvvvvv
    shakeBag = [];
    toBeFrozed = [];
    frozenBag = [];
    for (dice of dices) {
        shakeBag.push(dice);
    }
}

function ReFillShakeBag() {
    FillShakeBag();
    for (dice of shakeBag) {
        dice.setAttribute("data-frozen", false);
        ShowUnFrozen(dice);
    }
} ////////////////////////////-------------------------------------------^^^^^^^^^^^^^^^^

function addToShakeBag(cubeId) { //...id is received...object is pushed...
    let cube = (document.getElementById(cubeId));
    let index = toBeFrozed.findIndex(cubeX => cubeX === cube);
    if (index >= 0) {
        shakeBag.push((toBeFrozed.splice(index, 1))[0]);
        RemoveFromTotalKept(cube);
        if (toBeFrozed.length < dices.length) { //if all dices are selected...
            $('#ShakeBtn').val("Brasser");
        }
        return true;
    } else {
        alert("Already gone from ToBeFrozenBag !");
        return false;
    }
}

function removeFromShakeBag(cubeId) { //...id is received...object is spliced...
    if (shotCnt > 0) { //no right to keep dice before first draw.
        let cube = (document.getElementById(cubeId));
        let index = shakeBag.findIndex(cubeX => cubeX === cube);
        if (index >= 0) {
            toBeFrozed.push((shakeBag.splice(index, 1))[0]);
            AddToTotalKept(cube);
            if ((toBeFrozed.length+frozenBag.length) == dices.length) { //if all dices are selected...
                $('#ShakeBtn').val("Terminer");
            }
            return true;
        } else {
            alert("Already gone from shakeBag !");
            return false;
        }
    } else {
        if (!turnStart) {//--the order of else if does matter !
            Notice("removedPts_notice");
        } else if (gameCnt < 1) {
            Notice("pressStart_notice");
        } else if (pts < 1) {
            Notice("pressRestart_notice");
        } else if (turnStart && !ptsRemovalChk) {
            Notice("pressContinue_notice");
        } else {
            Notice("shakeAllDices_notice"); //never the case!
        }
        return false;
    }
}

function AddToTotalKept(cube) {
    totalKept += parseInt($(cube).attr("data-value"));
    $("#TotalKept").text(totalKept);
}

function RemoveFromTotalKept(cube) {
    totalKept -= parseInt($(cube).attr("data-value"));
    $("#TotalKept").text(totalKept);
}

function Freeze() {
    if (toBeFrozed.length > 0) {
        for (cube of toBeFrozed) {
            frozenBag.push(cube);
            cube.setAttribute("data-frozen", true);
            ShowFrozen(cube);
        }
        toBeFrozed = [];
        return true;
    } else {
        return false;
    }
}

function ShowFrozen(cube) {
    let face = cube.getElementsByClassName("face"); //to show that its frozen.
    $(face).css("background", "rgb(197, 197, 178)"); //addClass() don't work...

    let cubeId = $(cube).attr("id");
    let cubeNbr = cubeId.substr(cubeId.length - 1);
    $("#Btn_" + cubeNbr).addClass('dicesBtnsDisable');

}

function ShowUnFrozen(cube) {
    let face = dice.getElementsByClassName("face"); //to show that its Un-frozen.
    $(face).css("background", "hsla(58, 38%, 92%, 1)"); //removeClass() don't work...

    let cubeId = $(cube).attr("id");
    let cubeNbr = cubeId.substr(cubeId.length - 1);
    $("#Btn_" + cubeNbr).removeClass('dicesBtnsDisable');
}

function Shake() { //The one button do-it-all.....maybe a bad idea but challenging.

    if (gameOver) {
        pts = 30;
        $('#Pts').text(pts);
        $("#Total").text("?");
        gameOver = false;
    }
    if (!turnStart) {
        if (!ptsRemovalChk) {
            ValidatePtsToRemove();
            if (!gameOver) {
                Shake();
            }
            return;
        }
        if (goalScore2bChk) {
            if ($("#Goalscore").attr("data-value") == 0) {
                Notice("lastCall_notice");
                return;
            } else goalScore2bChk = false;
        }

        if (Freeze() || shotCnt < 1) { //if you have 1 or more dices to freeze else you should be at your first shot.

            $(".dicesBtns").attr("data-frozen", true); //to freeze the Keep buttons while dices are animated. 

            if (shakeBag.length > 0) { //if there are dices to be shaken...
                console.clear(); //to clear confusion,because all dices event are shown in console (transition start/end).
                for (cube of shakeBag) {
                    Shaker(cube); //shaking to dice cube return it's value.       
                }

                $("#Total").text("?"); //no total value when dices are shaking...

                if (shotCnt == 0) { //after the first time dice are mixed   
                    Msg("lastCall_msg"); //setTimeout(function ()...enlevé
                    goalScore2bChk = true
                } else if (frozenBag.length != (dices.length - 1)) {
                    Msg("keepOneAndGo_msg"); //setTimeout(function ()...enlevé                                   
                }

                shotCnt++;

                $('#ShakeBtn').val("Brasser");

            } else { //all dices are frozed 
                DiceAnimOver();
            }
        } else {
            Notice("keepOneDice_notice");
        }
    } else {
        Msg("removedPts_msg");
        $('#ShakeBtn').val("Entrer");
        turnStart = false //have to update comments..
        ResetGoalScore();
        $("#Total").text("?");
        $("#TotalKept").text("?"); //
        totalKept = 0; //
    }
}

function ValidatePtsToRemove() {
    var valToCheck = $("#ptsToRemove_box").val()
    if (valToCheck > 36 || valToCheck < 0 || valToCheck == null) {
        ptsRemovalChk = false;
        turnStart = true;
    } else {
        ptsRemovalChk = true;
        RemovedPts($("#ptsToRemove_box").val())
    }
}

function RemovedPts(ptsToRemove) {
    pts = (pts - ptsToRemove);
    $('#Pts').text(pts);
    if (pts < 0) {
        Msg("gameOverAndPtsToSteel_msg");
        Reset();
        gameOver = true;
        $('#ShakeBtn').val("Recommencer");
    } else if (pts == 0) {
        Msg("gameOver_msg");
        Reset();
        gameOver = true;
        $('#ShakeBtn').val("Recommencer");
    }
}

function Reset() {
    ResetButtons();
    ReFillShakeBag(); //Fully refill the shakeBag after a single shake.......
    shotCnt = 0;
    ptsRemovalChk = false;
    goalScore2bChk = false;
    turnStart = true;
    gameCnt++;
    $('#ShakeBtn').val("Continuer");

}

function FinalMove() {
    var message = "shit";
    let dicesTotal = $("#Total").text();
    let goalScore = $("#Goalscore").attr("data-value");
    switch ((parseInt(goalScore))) {
        case 12:
            if (dicesTotal >= 12) {
                pts = (pts - (dicesTotal - 12));
                $('#Pts').text(pts);
                message = "endOfTurn_msg";//------------Replace with variable assignment
            } else if (dicesTotal < 12) {
                //Expanssion of bonus game here...
                pointsToSteel = 12 - dicesTotal;
                message = "pointsToSteel_msg";//------------Replace with variable assignment
            }
            break;
        case 30:
            if (dicesTotal <= 30) {
                pts = (pts - (30 - dicesTotal));
                $('#Pts').text(pts);
                message = "endOfTurn_msg";//------------Replace with variable assignment
            } else if (dicesTotal > 30) {
                //Expanssion of bonus game here...
                pointsToSteel = dicesTotal - 30;
                message = "pointsToSteel_msg";//------------Replace with variable assignment
            }
            break;
        default:
            console.log("goalScore not valid in FinalMove()")
            break;
    }
    
    Reset();

    if (pts < 1) {
        message = "gameOver_msg";//------------Replace with variable assignment
        gameOver = true;
        $('#ShakeBtn').val("Recommencer");
    }
    
    Msg(message);
}

function DiceAnimOver() {
    DisplayValues();
    if (frozenBag.length == (dices.length - 1) || (shakeBag.length < 1)) { //there to wait the animation.
        FinalMove();
        $("#TotalKept").text($("#Total").text()); //all dices should be kept at this point.(same total)
    }
    $(".dicesBtns").attr("data-frozen", false);
}

function DisplayValues() { //calculate the sum of all dices values and show them in total.
    let dicesTotal = 0;
    for (let i = 0; i < dices.length; i++) {
        dicesTotal += parseInt($("#cube_" + (i + 1)).attr("data-value"));
    }
    $("#Total").text(dicesTotal);
}

function ResetGoalScore() {
    $("#Goalscore").html("?");
    $("#Goalscore").attr("data-value", 0);
}

