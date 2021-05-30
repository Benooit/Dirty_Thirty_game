$(document).ready(function () {

    var buttonQty = $(".diceContainer").length;
    DiceButtonMaker(buttonQty);
    ShakeBtnMaker();
    document.addEventListener("keyup", function (event) {
        if ((event.key).toLowerCase() =="enter") {            
            // Cancel the default action, if needed, but don't work.
            event.preventDefault();
            // Trigger the button                         
            $("#ShakeBtn").click();
        }
    });
    $(document).keydown(function (e) { 
        e.preventDefault();
    });
    $(document).keypress(function (e) { 
        e.preventDefault();
    });

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
            class: 'dicesBtns dicesBtnsUp',
            value: 'conserver',
            tabindex:-1
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
        class: 'dicesBtns dicesBtnsUp',
        value: 'GO',
        tabindex:-1
    });
    $(shakeBtn).attr("data-enable", true);
    AttachShakeBtnEvent(shakeBtn);
    div.append(shakeBtn);
    document.getElementById("ShakeBtnDiv").append(div);
}


function AttachDiceButtonEvent(button) {

    let btnId = $(button).attr("id");
    let cubeNbr = btnId.substr(btnId.length - 1);

    $(button).click(function (e) {
        if ($(this).attr("data-frozen") == "false") {
            let freezeState = $("#cube_" + cubeNbr).attr("data-frozen");

            if (freezeState === "false") {
                if ($(this).attr('class').match('dicesBtnsUp')) {
                    if (removeFromShakeBag("cube_" + cubeNbr)) {
                        $(this).removeClass('dicesBtnsUp');
                        $(this).addClass('dicesBtnsDn');
                    }

                } else if ($(this).attr('class').match('dicesBtnsDn')) {
                    if (addToShakeBag("cube_" + cubeNbr)) {
                        $(this).removeClass('dicesBtnsDn');
                        $(this).addClass('dicesBtnsUp');
                    }
                }
            }
        }
    });

    AttachHoverEvent(button);
    LinkDiceToBtn(button, ($("#cube_" + cubeNbr).get()))
}

function LinkDiceToBtn(button, dice) {
    $(dice).click(() => {
        button.click();
    })
}

function AttachShakeBtnEvent(shakeBtn) {
    $(shakeBtn).click(()=> {
        let enable = $(shakeBtn).attr("data-enable");
        if (enable == "true") {
            Shake();
        }
    });
    AttachHoverEvent(shakeBtn);    
}

function AttachHoverEvent(button) {
    $(button).hover(
        function () {
            if ($(this).attr("data-frozen") == "false" && !$(this).hasClass("dicesBtnsDisable") || $(this).attr("data-enable") == "true") {
                $(this).addClass('buttonHover');
                setTimeout(() => {
                    $(this).removeClass('buttonHover');
                }, 1000);
            }
        },
        function () {
            $(this).removeClass('buttonHover');
        }
    );
}

//--------------------------Buttons logic-------------//
function ResetButtons() {
    var buttons = document.getElementsByClassName("dicesBtns");
    for (btn of buttons) {
        $(btn).removeClass('dicesBtnsDn');
        $(btn).addClass('dicesBtnsUp');
    }
}
