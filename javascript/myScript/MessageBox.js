

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

let span30 = document.createElement("span");
span30.innerText = " 30 ou plus ";
$(span30).attr({"class":"goalBtn","data-value":30});
$(span30).css({"padding-left":"10px","padding-right":"10px","border":"solid","border-radius": "20px", "margin-left":"10px", "margin-right":"10px"});
let span12 = document.createElement("span");
span12.innerText = " 12 ou moins ";
$(span12).attr({"class":"goalBtn","data-value":12});
$(span12).css({"padding-left":"10px","padding-right":"15px","border":"solid","border-radius": "20px", "margin-left":"10px", "margin-right":"10px"});

var welcome_msg = {msg:"Bonjour, appuyer sur commencer pour commencer une partie !",color:blue};
var removedPts_msg = {msg:"Entrez le nombre de points à soustraire !",color:green};
var lastCall_msg = {msg:"Choisissez votre mise !  ",color:yellow,input:"goal"};
var keepOneDiceNotice_msg = {msg:"Vous devez conserver au moins 1 dé !",color:red};
var keepOneAndGo_msg = {msg:"Conserver au moins 1 dé et brasser !",color:blue};
var endOfTurn_msg = {msg:"Vous avez terminer votre tour !",color:yellow};
var shakeAllDices_msg = {msg:"Vous devez brasser TOUTES les dés !",color:red};
var pointsToSteel_msg = {msg:"lol, something went wrong",color:yellow,input:0}

let noticeUp = false;
let actual_msg;

let msgSpan = document.createElement("span");
let msgBox = document.createElement("div");
let msgDiv = document.createElement("div");
function MsgBoxMaker() {
    $(msgBox).attr("class", "container");
    $(msgBox).width("85%");
    $(msgBox).height(75);
    $(msgBox).css({ "text-align": "center","background-color": blue, "margin-top": "20px", "border-radius": "20px", "font-family":"'Langar', cursive", "font-size":"xx-large"});
    $(msgDiv).append(msgSpan);
    $(msgBox).append(msgDiv);
    $("#MessageBox").append(msgBox);
    
    Msg(welcome_msg);
    
}

function Msg(msg) { 
    
    if (msg==keepOneDiceNotice_msg) { 
        if (!noticeUp) {
            noticeUp = true;   
            setTimeout(function(){noticeUp = false;Msg(actual_msg);},4000 );
        } 
        else{
            return;
        }         
    }
    else{
        actual_msg = msg;
    }
    
    $(msgDiv).slideUp(500, function () {
        
        while (msgDiv.childNodes.length>1) {//cleanup of numBox and goal numbers after the message span.
            msgDiv.removeChild(msgDiv.lastChild);
        }
        
        if (msg==pointsToSteel_msg) {
            msg.msg = "Voux pouvez dérober " +  msg.input +(((parseInt(msg.input))>1)?" points":" point")  + "  à votre adversaire !";
        }
        
        if (msg==removedPts_msg) {
            numberBox.value = 0;
            $(msgDiv).append(numberBox);
        }
        
        msgSpan.textContent = msg.msg; 
        
        if (msg==lastCall_msg) {
            $(msgDiv).append(span30);
            $(msgDiv).append("ou");
            $(msgDiv).append(span12);
            InitializeGoalSetting();
        }
        
    });   
    
    $(msgDiv).slideDown(500, function () { 
        
        $(msgBox).css("background-color", msg.color); 
    });
}


function InitializeGoalSetting() { 
    $(".goalBtn").click(function(){       
        $("#Goalscore").html(this.innerText);
        $("#Goalscore").attr("data-value",$(this).attr("data-value"));                
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