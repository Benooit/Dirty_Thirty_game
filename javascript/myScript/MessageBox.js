

$(document).ready(() => {
    MsgBoxMaker();
});
{//braquettes to keep let variables to this page.

    //for a easier use of color.
    let green = "hsla(120, 100%, 90%, 0.77)";
    let blue =  "hsla(235, 100%, 49%, 0.77)";
    let yellow = "hsla(60, 100%, 70%, 0.77)";
    let red = "hsla(0, 100%, 50%, 0.77)";
    let cornsilk = "rgb(255,248,220)";

    let welcome_msg = {msg:" Bonjour, appuyer sur commencer pour commencer une partie ! ",color:cornsilk};
    let removedPts_msg = {msg:" Entrez le nombre de points à soustraire ! ",color:green};
    let lastCall_msg = {msg:" Choisissez votre mise ! ",color:yellow};
    let keepOneDiceNotice_msg = {msg:" Vous devez conserver au moins 1 dé ! ",color:red};
    let keepOneAndGo_msg = {msg:" Conserver au moins 1 dé et brasser ! ",color:cornsilk};
    let endOfTurn_msg = {msg:" Vous avez terminer votre tour ! ",color:yellow};
    let shakeAllDices_msg = {msg:" Vous devez brasser TOUTES les dés ! ",color:red};
    let pointsToSteel_msg = {msg:" lol, something went wrong ",color:yellow};
    let gameOver_msg = {msg:"Vous êtes éliminé, Merci d'avoir joué !  ",color:red};
    let gameOverAndPtsToSteel_msg = {msg:"Vous êtes éliminé, et enlever X points à votre prochain adversaire !  ",color:red};
    
    var Messages = {
        "welcome_msg":welcome_msg,
        "removedPts_msg":removedPts_msg,
        "lastCall_msg":lastCall_msg,
        "keepOneDiceNotice_msg":keepOneDiceNotice_msg,
        "keepOneAndGo_msg":keepOneAndGo_msg,
        "endOfTurn_msg":endOfTurn_msg,
        "shakeAllDices_msg":shakeAllDices_msg,
        "pointsToSteel_msg":pointsToSteel_msg,
        "gameOver_msg":gameOver_msg,
        "gameOverAndPtsToSteel_msg":gameOverAndPtsToSteel_msg
    };    

    //Creation of the message box and appening of it in the first state of the game.
    let msgSpan = document.createElement("span");
    let msgBox = document.createElement("div");
    let msgDiv = document.createElement("div");
    function MsgBoxMaker() {
        $(msgBox).attr("class", "container");
        $(msgBox).width("85%");
        $(msgBox).height(75);
        $(msgBox).css({ "text-align": "center","background-color": blue, "margin-top": "20px", "border-radius": "20px","border":"solid 3px", "font-family":"'Langar', cursive", "font-size":"xx-large"});
        $(msgDiv).append(msgSpan);
        $(msgBox).append(msgDiv);
        $("#MessageBox").append(msgBox);//append in a already written Div in the HTML.
        
        Msg("welcome_msg");//sending the first message.
        
    }
    
    function Msg(msg_) {     
        let msg = Messages[msg_];
        
        if (msg==keepOneDiceNotice_msg||msg==shakeAllDices_msg) { 
            Notice(msg.msg);
            return;
        }
        
        $(msgDiv).slideUp(500,()=> {            
            while (msgDiv.childNodes.length>1) {//cleanup of numBox and goal numbers after the message span.
                msgDiv.removeChild(msgDiv.lastChild);
            }
            
            if (msg==pointsToSteel_msg) {
                msg.msg = "Voux pouvez dérober " +
                  pointsToSteel +
                  ((pointsToSteel>1)?" points":" point")  +
                   "  à votre prochain adversaire !";    
            }
            if (msg==gameOverAndPtsToSteel_msg) {
                msg.msg = "Vous êtes éliminé, et enlever " +
                  (pts*-1) +
                  (((pts*-1)>1)?" points":" point")  +
                   "  à votre prochain adversaire !";    
            }
            
            if (msg==removedPts_msg) {
                //Creation of the numbox for points removal from adversery.
                let numberBox = document.createElement("input");
                $(numberBox).attr({ value: 0, type: 'number', name: 'ptsToRemove_box', id: 'ptsToRemove_box', class: 'NumBox' ,min:0,max:36});
                $(numberBox).css({"height":"45px","width":"50px","font-family":"'Langar', cursive", "font-size":"xx-large", "margin-left": "20px", "border-radius": "10px"});
                //Appending of the extra of remove points message...(Will be removed when another message take place.)
                $(msgDiv).append(numberBox);
            }            
            
            if (msg==lastCall_msg) {
                //Creation of the goal score buttons (spans).
                let span30 = document.createElement("span");
                span30.innerText = " 30 ou plus ";
                $(span30).attr({"class":"goalBtn","data-value":30});
                $(span30).css({"padding-left":"10px","padding-right":"10px","border":"solid","border-radius": "20px", "margin-left":"10px", "margin-right":"10px"});
                let span12 = document.createElement("span");
                span12.innerText = " 12 ou moins ";
                $(span12).attr({"class":"goalBtn","data-value":12});
                $(span12).css({"padding-left":"10px","padding-right":"15px","border":"solid","border-radius": "20px", "margin-left":"10px", "margin-right":"10px"});
                //Appending of the extra spans...(Will be removed when another message take place.)
                $(msgDiv).append(span30);
                $(msgDiv).append("ou");
                $(msgDiv).append(span12);
                AttachSpansClickEvent();
            }
            msgSpan.textContent = msg.msg; 
        });   
        
        $(msgDiv).slideDown(500,()=>{$(msgBox).css("background-color", msg.color);});    
        
    }
    
    function Notice(notice) { 
        let noticeSpan = document.createElement("span");
        let noticeBox = document.createElement("div");
        let noticeDiv = document.createElement("div");
        noticeBox = $(msgBox).clone()
        $(noticeBox).empty();
        $(noticeBox).css({"z-index":"1000","position":"absolute","background-color": "red"});
        $(noticeDiv).append(noticeSpan);
        $(noticeBox).append(noticeDiv);
        $(noticeBox).slideUp(1);
        $("#MessageBox").append(noticeBox);
        $("#ShakeBtn").attr("data-frozen", true); 
        noticeSpan.textContent = notice;
        
        $(noticeBox).slideDown( 500,()=>{
            setTimeout(()=>{
                $(noticeBox).slideUp(500,()=>{
                    noticeBox.remove();
                    $("#ShakeBtn").attr("data-frozen", false); 
                });
            },3000);
        });   
    }
            
            
    function AttachSpansClickEvent() { 
        $(".goalBtn").click(function(){       
            $("#Goalscore").html(this.innerText);
            $("#Goalscore").attr("data-value",$(this).attr("data-value"));                
        });
    }
            
            
            
            
}//braquettes to keep let variables to this page.

            
            
            
            
            
            
            
            
            
            
            
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