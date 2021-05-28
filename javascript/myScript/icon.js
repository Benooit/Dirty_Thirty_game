$(document).ready(() => {
    
    
});
let diceFaces = [
    "../pics/dice_fig1.png",
    "../pics/dice_fig2.png",
    "../pics/dice_fig3.png",
    "../pics/dice_fig4.png",
    "../pics/dice_fig5.png",
    "../pics/dice_fig6.png"
]
let faceCnt = 1;
faviconLnk = document.querySelector('link[rel*="icon"]');
var diceFaceSwap = setInterval(() => {
    faviconLnk.href = diceFaces[(faceCnt-1)];
    if (faceCnt==6) {
        faceCnt=1;
    }
    faceCnt++;
}, 1000);