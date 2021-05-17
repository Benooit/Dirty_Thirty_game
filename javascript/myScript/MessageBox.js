

$(document).ready(() => {
    MsgBoxMaker();
});

var green = "hsla(120, 100%, 90%, 0.77)";
var blue = "hsla(235, 100%, 49%, 0.77)";
var yellow = "hsla(60, 100%, 70%, 0.77)";
var red = "hsla(0, 100%, 50%, 0.77)";
var msg = "Bonjour, appuyer sur GO pour commencer !";
    var msgSpan = document.createElement("span");
    var msgBox = document.createElement("div");


function MsgBoxMaker() {
    $(msgBox).attr("class", "container");
    $(msgBox).width("75%");
    $(msgBox).height(75);
    $(msgBox).css({ "background-color": blue, "margin-top": "20px", "border-radius": "20px" });
    $(msgSpan).css({"font-family":"'Langar', cursive", "font-size":"xx-large"});
    $(msgBox).append(msgSpan);
    $("#MessageBox").append(msgBox);

    Msg(msg, "blue");
}

function Msg(msg, color) {//toute a changer
    $(msgSpan).slideUp(500, function () {msgSpan.textContent = msg; });    
    $(msgSpan).slideDown(500, function () { $(msgBox).css("background-color", ColorPicking(color)); });
    
}

function ColorPicking(colorStr) {// a éléminer
    switch (colorStr) {
        case "green": 
            return green;
            break;
        case "blue":
            return blue;
            break;
        case "red":
            return red;
            break;
        case "yellow":
            return yellow;
            break;
        default:
            return "hsla(30, 100%, 60%, 0.77)";//fail color
    }
}