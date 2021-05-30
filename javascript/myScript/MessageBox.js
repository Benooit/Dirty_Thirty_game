
// window.onbeforeunload = function (event) { //To prevent reloading or quitting the page if game as started.
//     event.returnValue = "Won't/Can't be shown!, treated as a flag since ? ";
// };

$(document).ready(() => {
    MsgBoxMaker();
}); 

{ //braquettes to keep let variables accessible only from to this page.

    //for a easier use of color.
    let green = "hsla(120, 100%, 90%, 0.77)";
    let blue = "hsla(235, 100%, 49%, 0.77)";
    let yellow = "hsla(60, 100%, 70%, 0.77)";
    let red = "hsla(0, 50%, 45%, 1)";
    let cornsilk = "rgb(255,248,220)";

    let welcome_msg = {msg:" Bonjour, appuyez sur 'Commencer' pour débuter une partie ! ",color:cornsilk};
    let removedPts_msg = {msg:" Entrez le nombre de points à soustraire ! ",color:green};
    let lastCall_msg = {msg:" Choisissez votre mise ! ",color:green};
    let keepOneAndGo_msg = {msg:" Conserver au moins 1 dé et brasser ! ",color:cornsilk};
    let endOfTurn_msg = {msg:" Vous avez terminer votre tour ! ",color:yellow};
    let pointsToSteel_msg = {msg:" lol, something went wrong ",color:yellow};//message edited in Msg()
    let gameOver_msg = {msg:"Vous êtes éliminé !  ",color:yellow};
    let gameOverAndPtsToSteel_msg = {msg:"Vous êtes éliminé, et enlever X points à votre prochain adversaire !  ",color:yellow};
    
    let pressStart_notice = {msg:" Appuyez sur 'Commencer' pour débuter une partie ! ",color:red};
    let pressRestart_notice = {msg:" Appuyez sur 'Recommencer' pour débuter une autre partie ! ",color:red};
    let removedPts_notice = {msg:" Entrez le nombre de points à soustraire ! ",color:red};
    let lastCall_notice = {msg:" Vous devez votre mise ! ",color:red};
    let keepOneDice_notice = {msg:" Vous devez conserver au 1 dé ou plus ! ",color:red};
    let shakeAllDices_notice = {msg:" Vous devez brasser TOUTES les dés ! ",color:red};
    let pressContinue_notice = {msg:" Appuyez sur 'Continuer' afin de poursuivre votre partie ! ",color:red};
    
    var Messages = {
        "welcome_msg":welcome_msg,
        "removedPts_msg":removedPts_msg,
        "lastCall_msg":lastCall_msg,
        "keepOneAndGo_msg":keepOneAndGo_msg,
        "endOfTurn_msg":endOfTurn_msg,
        "pointsToSteel_msg":pointsToSteel_msg,
        "gameOver_msg":gameOver_msg,
        "gameOverAndPtsToSteel_msg":gameOverAndPtsToSteel_msg

    };    
    var Notices = {
        "pressStart_notice":pressStart_notice,//include in Msg() 'if' to send to Notice()
        "pressContinue_notice":pressContinue_notice,//include in Msg() 'if' to send to Notice()
        "pressRestart_notice":pressRestart_notice,//include in Msg() 'if' to send to Notice()
        "removedPts_notice":removedPts_notice,//include in Msg() 'if' to send to Notice()
        "lastCall_notice":lastCall_notice,//include in Msg() 'if' to send to Notice()
        "keepOneDice_notice":keepOneDice_notice,//include in Msg() 'if' to send to Notice()
        "shakeAllDices_notice":shakeAllDices_notice//include in Msg() 'if' to send to Notice()
        
    };

    //Creation of the message box and appening of it in the first state of the game.
    let msgSpan = document.createElement("span");
    let msgBox = document.createElement("div");
    let msgDiv = document.createElement("div");

    function MsgBoxMaker() {
        $(msgBox).attr("class", "container msgBox");
        $(msgDiv).append(msgSpan);
        $(msgBox).append(msgDiv);
        $("#MessageBox").append(msgBox); //append in a already written Div in the HTML.

        Msg("welcome_msg"); //sending the first message.

    }

    function Msg(msg_) {
        let msg = Messages[msg_];

        $(msgDiv).slideUp(500, () => {
            while (msgDiv.childNodes.length > 1) { //cleanup of numBox and goal numbers after the message span.
                msgDiv.removeChild(msgDiv.lastChild);
            }

            if (msg == pointsToSteel_msg) {
                msg.msg = "Voux pouvez dérober " +
                    pointsToSteel +
                    ((pointsToSteel > 1) ? " points" : " point") +
                    "  à votre prochain adversaire !";
            }
            if (msg == gameOverAndPtsToSteel_msg) {
                msg.msg = "Vous êtes éliminé, et enlever " +
                    (pts * -1) +
                    (((pts * -1) > 1) ? " points" : " point") +
                    "  à votre prochain adversaire !";
            }

            if (msg == removedPts_msg) {
                //Appending of the extra of remove points message...(Will be removed when another message take place.)
                $(msgDiv).append(CreateNumBox());
            }

            if (msg == lastCall_msg) {
                //Appending of the extra buttons for bet...(Will be removed when another message take place.)
                $(msgDiv).append(CreateBtn(30)).append("ou").append(CreateBtn(12));
                $("#ShakeBtn").addClass("dicesBtnsDisable");//showing less of the shake button.
            }

            msgSpan.textContent = msg.msg;
        });

        $(msgDiv).slideDown(500, () => {
            $(msgBox).css("background-color", msg.color);
        });

    }
    
    function Notice(notice_) { //-----vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
        let notice = Notices[notice_];
        let timeItLast = 2500;//time notification stay on in miliseconds.
        let noticeFrame = CreateNoticeFrame(notice.color);
        
        $("#ShakeBtn").attr("data-enable", false);
        noticeFrame.noticeSpan.textContent = notice.msg;
        
        $(noticeFrame.noticeDiv).slideDown(400, () => {
            setTimeout(() => {
                $(noticeFrame.noticeDiv).slideUp(400, () => {
                    noticeFrame.noticeDiv.remove();
                    $("#ShakeBtn").attr("data-enable", true);
                });
            }, timeItLast);
        });
    }
    
    function CreateNoticeFrame(color) { 
        let noticeSpan = document.createElement("span");
        let noticeDiv = document.createElement("div");

        noticeDiv = $(msgBox).clone()
        $(noticeDiv).empty();
        $(noticeDiv).css({
            "display": "none",
            "z-index": "1000",
            "position": "absolute",
            "background-color": color
        });
        $(noticeDiv).append(noticeSpan);      
        $("#MessageBox").append(noticeDiv);

        return {noticeDiv,noticeSpan};
     }//---------------------------^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    
    function CreateNumBox() { //--For "removedPts_msg" message.
        let numberBox = document.createElement("input");
        $(numberBox).attr({
            value: 0,
            type: 'number',
            name: 'ptsToRemove_box',
            id: 'ptsToRemove_box',
            class: 'NumBox',
            min: 0,
            max: 6 //---OTHERWYSW WITH BONUS GAME IT HAVE TO BE 36
        });
       
        return numberBox;
     }

    function CreateBtn(limit) {//--For "lastCall_msg" message. ----vvvvvvvvvvvvvvvvvvvvvvvv
        let text;
        switch (limit) {
            case 30:
                text = " 30 ou plus";
                break;
            case 12:
                text = "12 ou moins ";
                break;
            default:
                text = "pas de choix!"
                break;
        }
        var button = $('<input/>').attr({
            type: 'button',
            name: 'Button_' + limit,
            id: 'Btn_' + limit,
            class: "goalBtn goalBtnUp",
            value: text,
            "data-value": limit,
            tabindex: -1
        });
        AttachBtnClickEvent(button);
        return button;
    }

    function AttachBtnClickEvent(button) {
        $(button).click(function () {
            $("#Goalscore").html(this.value);
            $("#Goalscore").attr("data-value", $(this).attr("data-value"));
            $(".goalBtn").removeClass("goalBtnDn");
            $(this).addClass('goalBtnDn');

            $("#ShakeBtn").removeClass("dicesBtnsDisable");
        });

    }//---------------------------^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^




    } //braquettes to keep let variables to this page.

