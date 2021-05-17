
//VERY IMPORTANT $(document).ready have to be the first block in order to work!
$(document).ready(()=> {

    //alert("fini loader DiceShaker.js");
});

//VERY IMPORTANT to be accessible from another .js file 
//the function need to be outside $(document).ready. 
//Also need to be after $(document).ready block because everything inside 
//the $(document).ready block won't work. 

    
    function Shaker(diceCube) {     

        ResetRotation(diceCube);
       
        const min = 1;//minimum of a 6 faces dice
        const max = 6;//maximum of a 6 faces dice
        const speed = getRandom(max, min)+5;//best speed is between 5 and 12.
        const rotation = 360;//this value cannot be other than 360 to have the right dice number!
        var xRotation = speed*rotation;
        var yRotation = speed*rotation;
            
            var drawedNumber = getRandom(max, min);            

            switch (drawedNumber) {
                case 1: xRotation += 180; yRotation += 180;//or (x=180,y=180) or (x=0,y=0)
                    break;
                case 2: xRotation += 180; yRotation += 360; //or xRotation = 360; yRotation = 180;
                    break;
                case 3: xRotation += 360; yRotation += 270;//no other choice because need 2D rotation(z axis).
                    break;
                case 4: xRotation += 360; yRotation += 90;//or xRotation = 180; yRotation = 270;
                    break;
                case 5: xRotation += 270; yRotation += 90;//yRotation can be 90,180,270,360
                    break;
                case 6: xRotation += 90; yRotation += 90;//or xRotation = 90; yRotation = 270; or y to 180,360 for sideway
                    break;                
                default: xRotation += 45; yRotation += 45;//put dice in suspention no choosen face.
            }
            //diceCube.setAttribute("data-value", drawedNumber);//Set the dice Value in a Attribute called data-value.
            MoveDice(diceCube, xRotation, yRotation);
      return drawedNumber;
    }

    function ResetRotation(diceCube) {  
        diceCube.style.webkitTransform = 'rotateX(' + 0 + 'deg) rotateY(' + 0 + 'deg)';
        diceCube.style.transform = 'rotateX(' + 0 + 'deg) rotateY(' + 0 + 'deg)';       
    }

    function MoveDice(diceCube, xRotation, yRotation) {
        xRotation += 0;//can be set between -30 and 30 for x axis percpective.
        yRotation += 0;//can be set between -20 and -20 for y axis percpective.

        diceCube.style.webkitTransform = 'rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg)';
        diceCube.style.transform = 'rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg)';                    

       
    }

    function getRandom(max, min) {
        var randnum = Math.floor(Math.random() * (max - min + 1)) + min;       
        return randnum;
    }


    
 







