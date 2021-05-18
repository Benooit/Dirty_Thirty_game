//VERY IMPORTANT $(document).ready have to be the first block in order to work!
$(document).ready(() => {
    
    //alert("fini loader DiceShaker.js");
    document.addEventListener('diceAnimFinished', () => {
        AreAllAnimFinished();
    });
    $('#ShakeBtn').val("commencer");
});
//VERY IMPORTANT to be accessible from another .js file 
//the function need to be outside $(document).ready. 
//Also need to be after $(document).ready block because everything inside 
//the $(document).ready block won't work.

let finishedAnim = 0;
var gameCnt = 0;
var PtsTotal = 0;
var shotTotal = 0;
var shotCnt = 0;
var shakeBag = [];//Bag That contains the dices to be shaken.
var toBeFrozed = [];//contains the dices to be saved.
var frozenBag = [];//contains saved dices.
var turnStart = true;//first shot of this round.
var dices = [];
dices = document.getElementsByClassName("cube");

function AreAllAnimFinished() {
    
    if (++finishedAnim == shakeBag.length) {
        finishedAnim = 0;
        DiceAnimOver();
        console.log("all dices animations finished !");
    }
}

function FillShakeBag() {
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
    }
}
function addToShakeBag(cube) {//...id is received...object is pushed...
    //shakeBag.push((document.getElementById(cube)));
    let index = toBeFrozed.findIndex(cubeX => cubeX === (document.getElementById(cube)));
    if (index >= 0) {
        shakeBag.push((toBeFrozed.splice(index, 1))[0]);
        return true;
    }
    else {
        alert("Already gone from ToBeFrozenBag !");
        return false;
    }
}
function removeFromShakeBag(cube) {//...id is received...object is spliced...
    if (shotCnt > 0) {//no right to keep dice before first draw.
        let index = shakeBag.findIndex(cubeX => cubeX === (document.getElementById(cube)));
        if (index >= 0) {
            toBeFrozed.push((shakeBag.splice(index, 1))[0]);
            return true;
        }
        else {
            alert("Already gone from shakeBag !");
            return false;
        }
    }
    else {
        //alert("Vous devez brasser TOUTES les dés !");
        Msg(shakeAllDices_msg);///////////////
        return false;
    }
}
function Freeze() {
    if (toBeFrozed.length > 0) {
        for (cube of toBeFrozed) {
            frozenBag.push(cube);
            cube.setAttribute("data-frozen", true);
        }
        toBeFrozed = [];
        return true;
    }
    else { return false; }    
}
function Shake() {//Shake each cube in shakeBag then reset btns and refill shakeBag.
    
    if (!turnStart) {
        
        if (Freeze() || shotCnt < 1) {//if you have 1 or more dices to freeze else you should be at your first shot.
            
            $(".dicesBtns").attr("data-frozen", true);//to freeze the Keep buttons while dices are animated. 
            
            if (shakeBag.length > 0) {//if there are dices to be shaken...
                for (cube of shakeBag) {
                    cube.setAttribute("data-value", Shaker(cube)); //shaking to dice cube return it's value.       
                }                
                
                if (shotCnt == 0) {//after the first time dice are mixed                      
                    
                    setTimeout(function () {
                        Msg(lastCall_msg);/////////////////
                    },5000);
                }
                else if(frozenBag.length != (dices.length - 1)){
                    setTimeout(function () {
                        Msg(keepOneAndGo_msg);////////////////////////////////
                    }, 5000);                    
                }
                
                shotCnt++;

                $('#ShakeBtn').val("Brasser");
                
                if (shotCnt > 1) { $("#GoalNbr").attr("data-frozen", true); }//block the goal number after first draw.
            }
            else {//all dices are frozed 
                DiceAnimOver();               
            }            
        }
        else {
            Msg(keepOneDiceNotice_msg);//////////////
        }        
    }
    else {
        Msg(removedPts_msg);//////////////
        $('#ShakeBtn').val("Entrer");        
        turnStart = false//have to update comments..
    }
    
}

function RecordGoalScore(){
    var valToCheck = $("#Goalscore").text($("#ptsToRemove_box").val());

    if(valToCheck>36||valToCheck<0) {          
        return true;
    }
    else{
        return false;
    }
}

function FinalMove(){
    ResetButtons();
    ReFillShakeBag();//Fully refill the shakeBag after a single shake.......
    shotCnt = 0;
    turnStart = true;
    gameCnt++;
    $("#GoalNbr").attr("data-frozen", false);
    $('#ShakeBtn').val("continuer");
}

function DiceAnimOver() {
    
    DisplayValues();
    if (frozenBag.length == (dices.length - 1) || (shakeBag.length < 1) ) {//there to wait the animation.
        setTimeout(function () { Msg(endOfTurn_msg); FinalMove(); }, 1);///////////
    }
    $(".dicesBtns").attr("data-frozen", false);
    
    
}
function DisplayValues() {//calculate the sum of all dices values and show them in total.
    shotTotal = 0;
    for (let i = 0; i < dices.length; i++) {
        shotTotal += parseInt($("#cube_"+(i + 1)).attr("data-value"));
    }   
    $("#Total").text(shotTotal);
}
