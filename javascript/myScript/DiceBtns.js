$(document).ready(function () {
    
    ShakeBtnMaker();
    document.addEventListener("keyup", function (event) {
        if ((event.key).toLowerCase() =="enter") {            
            // Cancel the default action.
            event.preventDefault();
            // Trigger the button                         
            $("#ShakeBtn").click();
        }
    });
    $(document).keydown(function (e) { 
        if ((e.key).toLowerCase() =="enter") {            
            e.preventDefault();
        }
    });
    $(document).keypress(function (e) { 
        if ((e.key).toLowerCase() =="enter") {            
            e.preventDefault();
        }
    });

});



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






function AttachShakeBtnEvent(shakeBtn) {

    $(shakeBtn).click(()=> {
        let enable = $(shakeBtn).attr("data-enable");
        if (enable == "true") {
            Shake();
        }
    });
    
    $(shakeBtn).hover(
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



