
$(document).ready(function () {

    var buttonQty = $(".diceContainer").length;
    //alert(buttonQty);
    DiceButtonMaker(buttonQty);
    ShakeBtnMaker();
    GoalButtonMaker();

    //var divVal = document.getElementById("Goal");
    //divVal.setAttribute("data-value", 4);
    //alert($("#Goal").attr("data-value"));
});

function DiceButtonMaker(buttonQty) {

    for (let i = 1; i <= buttonQty; i++) {
        var btnSection = document.createElement("section");
        $(btnSection).attr({ class: "btnSection" });
        var button = $('<input/>').attr({ type: 'button', name: 'Button_'+i, id:'Btn_'+i,  class: 'dicesBtns buttonUp', value: 'KEEP' });
        $(button).attr("data-frozen", false);      
        AttachDiceButtonEvent(button);
        $(btnSection).append(button);
        $("#buttonsDiv").append(btnSection);
    }
}

function ShakeBtnMaker() {
    var div = document.createElement("div");
    div.className = "container";
    var shakeBtn = document.createElement("input");//$('<input/>').attr({ type: 'button', name: 'Shake_Btn', id: 'ShakeBtn', class: 'buttonUp', value: 'SHAKE' });
    $(shakeBtn).attr({ type: 'button', name: 'Shake_Btn', id: 'ShakeBtn', class: 'dicesBtns buttonUp', value: 'GO' });
    AttachShakeBtnEvent(shakeBtn);
    div.append(shakeBtn);
    document.getElementById("ShakeButton").append(div);
}


function GoalButtonMaker() {
    var GoalBtn = document.createElement("div");
    $(GoalBtn).attr({ class: "display", id: "GoalDisplay" });
    var GoalNbr = document.createElement("span");
    $(GoalNbr).attr({ class: "numbers", id: "GoalNbr"});
    $(GoalNbr).text("30");
    GoalNbr.setAttribute("data-value", $(GoalNbr).text());
    GoalNbr.setAttribute("data-frozen", false);
    GoalBtn.append(GoalNbr);
    AttachGoalBtnEvent(GoalBtn, GoalNbr);
    (document.getElementById("Goal")).append(GoalBtn);
}

function AttachDiceButtonEvent(button) {
    $(button).hover(
        function () { $(this).addClass('buttonHover') },
        function () { $(this).removeClass('buttonHover') }
    );

    $(button).click(function () {
        if ($(this).attr("data-frozen") == "false") {
            var btnId = $(this).attr("id");
            var cubeNbr = btnId.substr(4);
            var freezeState = $("#cube_" + cubeNbr).attr("data-frozen");

            if (freezeState==="false"){
                if ($(this).attr('class').match('buttonUp')) {
                    if (removeFromShakeBag("cube_" + cubeNbr)) {
                        $(this).removeClass('buttonUp');
                        $(this).addClass('buttonDn');
                    }
                
                }
                else if ($(this).attr('class').match('buttonDn')) {
                    if (addToShakeBag("cube_" + cubeNbr)) {
                        $(this).removeClass('buttonDn');
                        $(this).addClass('buttonUp');
                    }
                }
            }
        }
    });
}

function AttachShakeBtnEvent(shakeBtn) {
    $(shakeBtn).click(function () {
        if (true) {
            Shake();
        }
    });
    $(shakeBtn).hover(
        function () { $(this).addClass('buttonHover') },
        function () { $(this).removeClass('buttonHover') }
    );
    
}

function AttachGoalBtnEvent(GoalDisplay, GoalNbr) {
    $(GoalDisplay).click(function () {
        if (GoalNbr.getAttribute("data-frozen")=="false") {
            $(GoalNbr).slideUp(500, function () {
                if ($(this).attr("data-value") == 30) {
                    $(this).text(12);
                    $(this).attr("data-value", 12);
                }
                else {
                    $(this).text(30);
                    $(this).attr("data-value", 30);
                }
            });
            $(GoalNbr).slideDown();
        }
        
    });
}

//--------------------------Buttons logic-------------//
function ResetButtons() {
    var buttons = document.getElementsByClassName("dicesBtns");
    for (btn of buttons) {
        $(btn).removeClass('buttonDn');
        $(btn).addClass('buttonUp');
    }

}







