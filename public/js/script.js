x = document.querySelectorAll(".label-text");
    for (i = 0; i < x.length; i++) {
      x[i].classList.replace("label-text","label-text-active");
    }
   
// let Defaultfont = document.getElementById('Default-font')
let Defaultfont = document.querySelector("[id='Default-font']")
Defaultfont.addEventListener("click", ChangeDefaultfont);

function ChangeDefaultfont() {
    document.getElementById("textcanvas").style.fontFamily = ('Raleway')
}
let Streamster = document.querySelector("[id='Streamstar-font']")
Streamster.addEventListener("click", ChangeStreamsterfont);

function ChangeStreamsterfont() {
    document.getElementById("textcanvas").style.fontFamily = ('Streamster')

}
let Learningblocks = document.querySelector("[id='Learningblocks-font']")

Learningblocks.addEventListener("click", ChangeLearningblocksfont);

function ChangeLearningblocksfont() {
    document.getElementById("textcanvas").style.fontFamily = ('Nixies')

}

//text input
let textInput = document.querySelector("[id='textInputButton']")

textInput.addEventListener("click", Shirttext);

function Shirttext() {
    let textValue = document.getElementById('Shirttext').value
    document.querySelector("h2").innerHTML=textValue

}
//text Color

let Blacktextcolor = document.getElementById('Black-textcolor')
Blacktextcolor.addEventListener("click", ChangeColorBlack);

function ChangeColorBlack() {
    document.getElementById("textcanvas").style.color = ('black')

}
let Whitetextcolor = document.getElementById('White-textcolor')
Whitetextcolor.addEventListener("click", ChangeColorWhite);

function ChangeColorWhite() {
    document.getElementById("textcanvas").style.color = ('white')

}


//Shirt color
let White = document.getElementById('White-shirtcolor')
White.addEventListener("click", ShirtWhite);

function ShirtWhite() {
    document.getElementById("shirtcanvas").src = "../source/pictures/shirts/whiteshirt.jpg"   
}

let Black = document.getElementById('Black-shirtcolor')
Black.addEventListener("click", ShirtBlack);

function ShirtBlack() {
    document.getElementById("shirtcanvas").src = "../source/pictures/shirts/blackshirt.jpg"
}

let Gray = document.getElementById('Gray-shirtcolor')
Gray.addEventListener("click", ShirtGray);

function ShirtGray() {
    document.getElementById("shirtcanvas").src = "../source/pictures/shirts/grayshirt.jpg"
}

let Green = document.getElementById('Green-shirtcolor')
Green.addEventListener("click", ShirtGreen);

function ShirtGreen() {
    document.getElementById("shirtcanvas").src = "../source/pictures/shirts/greenshirt.jpg"
}

let Purple = document.getElementById('Purple-shirtcolor')
Purple.addEventListener("click", ShirtPurple);

function ShirtPurple() {
    document.getElementById("shirtcanvas").src = "../source/pictures/shirts/purpleshirt.jpg"
}

let Orange = document.getElementById('Orange-shirtcolor')
Orange.addEventListener("click", ShirtOrange);

function ShirtOrange() {
    document.getElementById("shirtcanvas").src = "../source/pictures/shirts/orangeshirt.jpg"
}

let Pink = document.getElementById('Pink-shirtcolor')
Pink.addEventListener("click", ShirtPink);

function ShirtPink() {
    document.getElementById("shirtcanvas").src = "../source/pictures/shirts/pinkshirt.jpg"
}



let Yellow = document.getElementById('Yellow-shirtcolor')
Yellow.addEventListener("click", ShirtYellow);

function ShirtYellow() {
    document.getElementById("shirtcanvas").src = "../source/pictures/shirts/yellowshirt.jpg"   
}
let Red = document.getElementById('Red-shirtcolor')
Red.addEventListener("click", ShirtRed);

function ShirtRed() {
    document.getElementById("shirtcanvas").src = "../source/pictures/shirts/redshirt.jpg" 
}
let Blue = document.getElementById('Blue-shirtcolor')
Blue.addEventListener("click", ShirtBlue);

function ShirtBlue() {
    document.getElementById("shirtcanvas").src = "../source/pictures/shirts/blueshirt.jpg"
}
