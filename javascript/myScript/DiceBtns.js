$(document).ready(function () {

    var buttonQty = $(".diceContainer").length;

    DiceButtonMaker(buttonQty);
    ShakeBtnMaker();

});

function DiceButtonMaker(buttonQty) {

    for (let i = 1; i <= buttonQty; i++) {
        var btnSection = document.createElement("section");
        $(btnSection).attr({
            class: "btnSection"
        });
        var button = $('<input/>').attr({
            type: 'button',
            name: 'Button_' + i,
            id: 'Btn_' + i,
            class: 'dicesBtns buttonUp',
            value: 'conserver'
        });
        $(button).attr("data-frozen", false);
        AttachDiceButtonEvent(button);
        $(btnSection).append(button);
        $("#buttonsDiv").append(btnSection);
    }
}

function ShakeBtnMaker() {
    var div = document.createElement("div");
    div.className = "container";
    var shakeBtn = document.createElement("input");
    $(shakeBtn).attr({
        type: 'button',
        name: 'Shake_Btn',
        id: 'ShakeBtn',
        class: 'dicesBtns buttonUp',
        value: 'GO'
    });
    $(shakeBtn).attr("data-enable", false);
    AttachShakeBtnEvent(shakeBtn);
    div.append(shakeBtn);
    document.getElementById("ShakeButton").append(div);
}


function AttachDiceButtonEvent(button) {
    $(button).hover(
        function () {
            $(this).addClass('buttonHover')
        },
        function () {
            $(this).removeClass('buttonHover')
        }
    );

    $(button).click(function () {
        if ($(this).attr("data-frozen") == "false") {
            var btnId = $(this).attr("id");
            var cubeNbr = btnId.substr(4);
            var freezeState = $("#cube_" + cubeNbr).attr("data-frozen");

            if (freezeState === "false") {
                if ($(this).attr('class').match('buttonUp')) {
                    if (removeFromShakeBag("cube_" + cubeNbr)) {
                        $(this).removeClass('buttonUp');
                        $(this).addClass('buttonDn');
                    }

                } else if ($(this).attr('class').match('buttonDn')) {
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
        let frozed = $(shakeBtn).attr("data-enable");
        if (frozed == "false") {
            Shake();
        }
    });
    $(shakeBtn).hover(
        function () {
            $(this).addClass('buttonHover')
        },
        function () {
            $(this).removeClass('buttonHover')
        }
    );

}



//--------------------------Buttons logic-------------//
function ResetButtons() {
    var buttons = document.getElementsByClassName("dicesBtns");
    for (btn of buttons) {
        $(btn).removeClass('buttonDn');
        $(btn).addClass('buttonUp');
    }

}