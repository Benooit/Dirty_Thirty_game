

$(document).ready(() => {
    MsgBoxMaker();
});

let green = "hsla(120, 100%, 90%, 0.77)";
let blue = "hsla(235, 100%, 49%, 0.77)";
let yellow = "hsla(60, 100%, 70%, 0.77)";
let red = "hsla(0, 100%, 50%, 0.77)";
let numberBox = document.createElement("input");
    $(numberBox).attr({ type: 'number', name: 'ptsToRemove_box', id: 'ptsToRemove_box', class: 'NumBox' ,min:0,max:36});
    $(numberBox).css({"height":"45px","width":"50px","font-family":"'Langar', cursive", "font-size":"xx-large", "margin-left": "20px", "border-radius": "10px"});

var welcome_msg = {msg:"Bonjour, appuyer sur commencer pour commencer une partie !",color:blue};
var removedPts_msg = {msg:"Entrez le nombre de points à soustraire !",color:green,input:"numbox"};
var lastCall_msg = {msg:"Choisissez votre mise !",color:yellow,input:"goal"};
var keepOneDiceNotice_msg = {msg:"Vous devez conserver au moins 1 dé !",color:red};
var keepOneAndGo_msg = {msg:"Conserver au moins 1 dé et brasser !",color:blue};
var endOfTurn_msg = {msg:"Vous avez terminer votre tour !",color:yellow};
var shakeAllDices_msg = {msg:"Vous devez brasser TOUTES les dés !",color:red};


let msgSpan = document.createElement("span");
let msgBox = document.createElement("div");
let msgDiv = document.createElement("div");
function MsgBoxMaker() {
    $(msgBox).attr("class", "container");
    $(msgBox).width("85%");
    $(msgBox).height(75);
    $(msgBox).css({ "background-color": blue, "margin-top": "20px", "border-radius": "20px" });
    $(msgSpan).css({"font-family":"'Langar', cursive", "font-size":"xx-large"});
    $(msgDiv).append(msgSpan);
    $(msgBox).append(msgDiv);
    $("#MessageBox").append(msgBox);

    Msg(welcome_msg);

}

function Msg(msg) { 
    $(msgDiv).slideUp(500, function () {

        while (msgDiv.childNodes.length>1) {
            msgDiv.removeChild(msgDiv.lastChild);
        }
        if (msg.input=="numbox") {
            numberBox.value = 0;
            $(msgDiv).append(numberBox);
        }
        msgSpan.textContent = msg.msg; 
    });   

    $(msgDiv).slideDown(500, function () { 

        $(msgBox).css("background-color", msg.color); 
        
        
    });
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