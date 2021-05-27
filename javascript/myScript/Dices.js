

$(document).ready(() => {

    //test();
        
    DiceMaker(diceQty)

});

    const diceQty = 6;//Quantity of dices to be produce. 
    const animFinished = new Event('diceAnimFinished');
    const animStarted = new Event('diceAnimStarted');

function DiceMaker(diceQty) {

        let facesClassNames = ["front", "back", "right", "left", "top", "bottom"];

        for (let i = 1; i <= diceQty; i++) {
            //making dice environment...
            var diceSection = document.createElement("section");
            diceSection.className = "diceContainer";
            diceSection.id = ("diceCont_" + i);
            //making dice cube div...
            var cubeDiv = document.createElement("div");
            cubeDiv.className = "cube";
            cubeDiv.id = ("cube_" + i)//id's of the cubes....
            
            //making all dice faces...
            for (let i = 0; i < facesClassNames.length; i++) {

                var face = document.createElement("div");
                face.className = facesClassNames[i];
  
                for (dot of Dotmaker(i + 1)) {//add 1 to y to match the quantity of dots.
                    face.append(dot);
                }
                cubeDiv.append(face);
            }

            cubeDiv.setAttribute("data-value", 1);
            cubeDiv.setAttribute("data-frozen", false);
            cubeDiv.setAttribute("data-inTransition", false);
            
            cubeDiv.addEventListener("transitionstart", () => { document.dispatchEvent(animStarted); console.log("transitionstart for cube_"+i); }, true);
            cubeDiv.addEventListener("transitionend", () => { document.dispatchEvent(animFinished); console.log("transitionend for cube_"+i);}, true);
            diceSection.append(cubeDiv);
            $("#dices").append(diceSection);//insert the diceSections in your div/section of choice to append all dices. 
        }
            ReFillShakeBag();////////////////////////////////////////////////////////////

    } 

    

    //produce quantity of dot received...
    function Dotmaker(NumberOfDot) {
        var dots = [];
        for (var i = 1; i <= NumberOfDot; i++) {
            var dot = document.createElement("span");
            dot.className = ("dot dot" + i);
            dots.push(dot);
        }
        return dots;
    }

    
   

