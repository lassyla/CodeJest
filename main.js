//HTML element variables
var image = document.getElementById("image");
var text = document.getElementById("text");
var hintText = document.getElementById("hinttext");
var buttonBox = document.getElementById('buttonBox');
var textBox = document.getElementById('textBox');
var codeTextBox = document.getElementById('codeTextBox');

//player variables
var currentScenario;

textBox.onkeypress = function(event) {
    if (event.key == "Enter" || event.keyCode == 13) {
        parseInput(textBox.value);
        textBox.value = "";
    }
};

codeTextBox.onkeypress = function(event) {
    if (event.key == "Enter" || event.keyCode == 13) {
        evaluateAnswer(codeTextBox.value);
    }
};

var evaluateAnswer = function(answer) {
    answer = answer.toLowerCase();
    answer = answer.replace(/\s/g, ''); 
    for (var i = 0; i < currentScenario.correctAnswers.length; i++)
        if (answer == currentScenario.correctAnswers[i]) {
            codeTextBox.value = ""; 
            eval(currentScenario.correctScenario);
            codeBoxOff();
            return;
        }
    changeHintText("that was incorrect.");
}

var parseInput = function(input) {
    input = input.toLowerCase(); 
    input = input.replace(/\s/g, ''); 
    for (var i = 0; i < currentScenario.functionNames.length; i++)
        if (input == currentScenario.functionNames[i][0]) {
            eval(currentScenario.functionNames[i][1]);
            return;
        }
    changeHintText("you can't do that. type 'help' to see what you can do.");
}

var changeText = function(words) {
    text.innerHTML = words;
    hinttext.innerHTML = "";
};

var changeHintText = function(words) {
    hinttext.innerHTML = words;
};

var changeButtons = function(buttonList) {
    buttonBox.innerHTML = "";
    for (var i = 0; i < buttonList.length; i++) {
        buttonBox.innerHTML += "<button onClick=" + buttonList[i][1] + ">" + buttonList[i][0] + "</button>";
    }
};

var advanceTo = function(nextScenario) {
    image.src = nextScenario.image;
    changeText(nextScenario.text) 
    currentScenario = nextScenario;
};

var codeBoxOn = function() {
    codeTextBox.style.visibility = "visible";
}

var codeBoxOff = function() {
    codeTextBox.style.visibility = "hidden";
}

scenario = {}

var scenario = {
    one: {
        image: "images/1.png", 
        text: "The room is dark all around. A chill breeze runs through the room resulting in a quiet eerie whistling sound. In the corner of your eye, you can barely make out something that appears to be glowing softly.",
        functionNames: [
            ["help", "changeHintText('commands: help, examine, look')"],
            ["examine", "advanceTo(lightbulbscenario.one)"],
        ]
    },
    two: { //the lights are now on
        image: "images/2.png", 
        text: "Crystal walls twinkle, shimmering in and out; however, inside the room lays ramshackled pieces. Ramen bowls are piled into a tiny trashcan. Sheets of paper cover the floor along with some laptops and tablets on a glass table.  A large ornate door covered in golden designs looms overhead. The windows are draped with long black curtains.",
        functionNames: [
            ["help", "changeHintText('commands: help, examine, look')"],
            ["examine", "changeHintText('examine what?')"],
            ["examinetrash", "advanceTo(trashscenario.one)"],
            ["examinetrashcan", "advanceTo(trashscenario.one)"],
            ["examinepaper", "advanceTo(paperscenario.one)"],
            ["examinesheets", "advanceTo(paperscenario.one)"],
            ["examinepapersheets", "advanceTo(paperscenario.one)"],
        ]
    }
};

var lightbulbscenario = {
    one: {
        image:"images/lightbulb1.png",
        text: "You walk towards the lightswitch, you hear the sound of crunching.",
        functionNames: [
            ["help", "changeHintText('commands: help, examine, look')"],
            ["examine", "advanceTo(lightbulbscenario.two)"],
            ["look", "advanceTo(lightbulbscenario.two)"]
        ]
    },
    two: {
        image:"images/lightbulb2.png",
        text: "It appears to look like the outline of a lightswitch; however it appears to have been engraved into the wall. Above the lightswitch outline is a shimmering plaque.",
        functionNames: [
            ["help", "changeHintText('commands: help, examine, read')"],
            ["examine", "changeHintText('examine what?')"],
            ["examineplaque", "advanceTo(lightbulbscenario.three); codeBoxOn();"],
            ["readplaque", "advanceTo(lightbulbscenario.three); codeBoxOn();"],
        ]
    },
    three: {
        image:"images/lightbulb3.png",
        text: "The plaque has the words bool lightswitch=False. Next to the plaque however appears to be a little keypad.  As you place your fingers on the keypad, a groan rumbles through the clearing as light emanates from the keys. You can only type one line into the keypad.",
        functionNames: [
            ["help", "changeHintText('write the correct code in the code box. commands: back')"],
            ["back", "advanceTo(lightbulbscenario.two); codeBoxOff();"]
        ],
        correctAnswers: ["lightswitch=true;", "skip"],
        correctScenario: "advanceTo(lightbulbscenario.four); document.body.style.background = 'white'; document.body.style.color = 'black';"
    },
    four: {
        image:"images/lightbulb4.png",
        text: "Light floods the room, radiating somehow from the center of the walls.",
        functionNames: [
            ["help", "changeHintText('commands: return')"],
            ["return", "advanceTo(scenario.two)"]
        ],
    }
}

var trashscenario = {
    one: {
        text: "As you peer through the trash can, you see ramen bowls piled in the trash can. Above the trash can is a dimly lit plaque.", 
        functionNames: [
            ["help", "changeHintText('commands: examine, read, back')"],
            ["examine", "changeHintText('examine what?')"],
            ["read", "changeHintText('read what?')"],
            ["readplaque", "advanceTo(trashscenario.two); codeBoxOn();"],
            ["examineplaque", "advanceTo(trashscenario.two); codeBoxOn();"],
            ["back", "advanceTo(trashscenario.two)"],
        ]
    },
    two: {
        text: "The plaque has the words int ramenBowls=30 . Next to the plaque is a keypad.", 
        functionNames: [
            ["help", "changeHintText('write your code in the lower box. commands: examine, read')"],
            ["examine", "changeHintText('examine what?')"],
            ["back", "advanceTo(trashscenario.two); codeBoxOff();"],
        ],
        correctAnswers: ["ramenBowls=0", "skip"], 
        correctScenario: "advanceTo(trashscenario.three)"
    },
    three: {
        text: "The ramenbowls all vanish leaving behind a small slip of paper in the trash can."
    }
}

var laptopscenario = {
    
    
}

var wallscenario = {
    
}

var bookscenario = {
    
    
    
}

var paperscenario = {
    one: {
    
        
    }
    
}

var bagscenario = {
    
    
}

currentScenario = scenario.one;
advanceTo(currentScenario);