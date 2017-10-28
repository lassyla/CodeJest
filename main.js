//HTML element variables
var images = document.getElementById("images");
var text = document.getElementById("text");
var hintText = document.getElementById("hintText");
var buttonBox = document.getElementById('buttonBox');
var textBox = document.getElementById('textBox');
var codeTextBox = document.getElementById('codeTextBox');
var noteList = document.getElementById('noteList');
var helpOptions = ["help", "changeHintText('commands: help, examine, look, return, back')"];
var backToStart = ["return", "advanceTo(scenario.two); codeBoxOff()"];

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
    hintText.innerHTML = "";
};

var changeHintText = function(words) {
    hintText.innerHTML = words;
};

var changeImage = function(img) {
    images.style.backgroundImage = "url(" + img + ")";
};

var changeButtons = function(buttonList) {
    buttonBox.innerHTML = "";
    for (var i = 0; i < buttonList.length; i++) {
        buttonBox.innerHTML += "<button onClick=" + buttonList[i][1] + ">" + buttonList[i][0] + "</button>";
    }
};

var advanceTo = function(nextScenario) {
    //changeImage(nextscenario.image)
    console.log(nextScenario)
    changeText(nextScenario.text)
    currentScenario = nextScenario;
};

var codeBoxOn = function() {
    codeTextBox.style.visibility = "visible";
}

var codeBoxOff = function() {
    codeTextBox.style.visibility = "hidden";
}

var addRiddle = function(riddle) {
    var child = document.createElement('div'); 
    child.id = "riddle"; 
    child.innerHTML = riddle; 
    noteList.appendChild(child); 
}

scenario = {}

var scenario = {
    one: {
        image: "images/1.png", 
        text: "The room is dark all around. A chill breeze runs through the room resulting in a quiet eerie whistling sound. In the corner of your eye, you can barely make out something that appears to be glowing softly.",
        functionNames: [
            helpOptions,
            ["examine", "advanceTo(lightbulbscenario.one)"],
        ]
    },
    two: { //the lights are now on
        image: "images/2.png", 
        text: "Crystal walls twinkle, shimmering in and out; however, inside the room lays ramshackled pieces. Ramen bowls are piled into a tiny trashcan. Sheets of paper cover the floor along with some laptops and tablets on a glass table.  A large ornate door covered in golden designs looms overhead. The windows are draped with long black curtains.",
        functionNames: [
            helpOptions,
            ["examine", "changeHintText('examine what?')"],
            ["examinetrash", "advanceTo(trashscenario.one)"],
            ["examinetrashcan", "advanceTo(trashscenario.one)"],
            ["examinepaper", "advanceTo(paperscenario.one)"],
            ["examinesheets", "advanceTo(paperscenario.one)"],
            ["examinepapersheets", "advanceTo(paperscenario.one)"],
            ["examinelaptop", "advanceTo(laptopscenario.one)"]
        ]
    }
};

var lightbulbscenario = {
    one: {
        image:"images/lightbulb1.png",
        text: "You walk towards the lightswitch, you hear the sound of crunching.",
        functionNames: [
            helpOptions,
            ["examine", "advanceTo(lightbulbscenario.two)"],
            ["look", "advanceTo(lightbulbscenario.two)"]
        ]
    },
    two: {
        image:"images/lightbulb2.png",
        text: "It appears to look like the outline of a lightswitch; however it appears to have been engraved into the wall. Above the lightswitch outline is a shimmering plaque.",
        functionNames: [
            helpOptions,
            ["examine", "changeHintText('examine what?')"],
            ["examineplaque", "advanceTo(lightbulbscenario.three); codeBoxOn();"],
            ["readplaque", "advanceTo(lightbulbscenario.three); codeBoxOn();"],
        ]
    },
    three: {
        image:"images/lightbulb3.png",
        text: "The plaque has the words bool lightswitch=False. Next to the plaque however appears to be a little keypad.  As you place your fingers on the keypad, a groan rumbles through the clearing as light emanates from the keys. You can only type one line into the keypad.",
        functionNames: [
            helpOptions,
            ["back", "advanceTo(lightbulbscenario.two); codeBoxOff();"]
        ],
        correctAnswers: ["lightswitch=true;", "skip"],
        correctScenario: "advanceTo(lightbulbscenario.four); document.body.style.background = 'white'; document.body.style.color = 'black';"
    },
    four: {
        image:"images/lightbulb4.png",
        text: "Light floods the room, radiating somehow from the center of the walls.",
        functionNames: [
            helpOptions,
            backToStart,
        ],
    }
}

var trashscenario = {
    one: {
        text: "As you peer through the trash can, you see ramen bowls piled in the trash can. Above the trash can is a dimly lit plaque.", 
        functionNames: [
            helpOptions,
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
            helpOptions,
            ["examine", "changeHintText('examine what?')"],
            ["back", "advanceTo(trashscenario.two); codeBoxOff();"],
        ],
        correctAnswers: ["ramenBowls=0", "skip"], 
        correctScenario: "advanceTo(trashscenario.three)"
    },
    three: {
        text: "The ramenbowls all vanish leaving behind a small slip of paper in the trash can.",
        functionNames: [
            helpOptions,
            ["examine", "changeHintText('examine what?')"],
            ["examinepaper", "advanceTo(trashscenario.three_riddle)"],
            ["back", "advanceTo(scenario.two);"],
        ],
    },
    three_riddle: {
        text: 'The paper reads Hidden in a pile lies the note sealed shut. 15 page flips must be done before the answer can be revealed."',
        functionNames: [
            helpOptions,
            ["examine", "changeHintText('examine what?')"],
            backToStart,
        ],
    }
}

var laptopscenario = {
  one: {
    text: "Wow look. More random shit. There seems to be a tablet and two laptops. They all have something on their screens. I guess you should pick one to interact with: tablet, laptop 1, laptop 2", 
    functionNames: [
      helpOptions,
      ["examine", "changeHintText('examine what?')"],
      ["examinetablet", "advanceTo(laptopscenario.two);"],
      ["examinelaptop1", "advanceTo(laptopscenario.three);"],
      ["examinelaptop2", "advanceTo(laptopscenario.four)"],
      backToStart
    ]
  },
  
  transition:{
    text:"So that device is done. How do you know? You don't. Just roll with it. What should we do now?",
    functionNames: [
      helpOptions,
      ["examine", "changeHintText('examine what?')"],
      ["examinetablet", "advanceTo(laptopscenario.two);"],
      ["examinelaptop1", "advanceTo(laptopscenario.three);"],
      ["examinelaptop2", "advanceTo(laptopscenario.four)"],
      backToStart
    ]
  },
  
  two: {
    text: 'The tablet displays the line “x+15-y*13=password”. You push a random button again, because that’s how things works here apparently,  and the text is suddenly replaced with “input password:”',
    functionNames: [
      helpOptions,
      ["examine", "changeHintText('examine what?')"],
      ["back", "advanceTo(laptopscenario.one); codeBoxOff();"],
      ["-110", "advanceTo(laptopscenario.three_riddle)"],
    ],
  },
  
  two_riddle: {
    text: 'whatever the tablet riddle',
    functionNames: [
      helpOptions,
      ["examine", "changeHintText('examine what? the riddle I guess? but you're already examining it!')"],
      ["back", "advanceTo(laptopscenario.transition); codeBoxOff();"],
    ],
  },
      
  three: {
    text: 'The laptop displays “x%2=password”. You decide to tap a random key, and suddenly the text is replaced with “input password: “', 
    functionNames: [
      helpOptions,
      ["examine", "changeHintText('examine what?')"],
      ["back", "advanceTo(laptopscenario.one); codeBoxOff();"],
      ["1", "advanceTo(laptopscenario.three_riddle)"],
    ],
  },
  
  three_riddle: {
    text: 'The laptop now displays a riddle: "If even go through and let it be, but if odd divide by two it must become."',
    functionNames: [
      helpOptions,
      ["examine", "changeHintText('examine what? the riddle I guess? but you're already examining it!')"],
      ["back", "advanceTo(laptopscenario.transition); codeBoxOff();"],
    ],
  },
  
    
   four: {
     text: 'The laptop displays “The password lies in the number of spins before it dies and starts once more. Answer:',
     functionNames: [
       helpOptions,
       ["examine", "changeHintText('examine what?')"],
       ["back", "advanceTo(laptop.two); codeBoxOff();"],
       ["13", "advanceTo(laptopscenario.four_riddle); codeBoxOff();"],
     ],
    },
  
  four_riddle: {
    text: 'The laptop unlocks and a riddle appears: “The door that shifts follows the cycle around and around it goes. Too fast to truly read but slow enough to see, the shifts to the answer is the key."',
    functionNames: [
       helpOptions,
       ["examine", "changeHintText('examine what?')"],
       ["back", "advanceTo(laptopscenario.end); codeBoxOff();"],
     ],
  },
  
  end: {
    text: "Well that seems to be all that needs to be done in this area. You can revisit these devices at any time to view the riddles again.",
    functionNames: [
      helpOptions,
      ["examine", "changeHintText('examine what?')"],
      ["examinetablet", "advanceTo(laptopscenario.two);"],
      ["examinelaptop1", "advanceTo(laptopscenario.three);"],
      ["examinelaptop2", "advanceTo(laptopscenario.four)"],
      backToStart
     ],
  },
    
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
