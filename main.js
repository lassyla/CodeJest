//HTML element variables
var image = document.getElementById("image");
var text = document.getElementById("text");
var hintText = document.getElementById("hintText");
var buttonBox = document.getElementById('buttonBox');
var textBox = document.getElementById('textBox');
var codeTextBox = document.getElementById('codeTextBox');
var noteList = document.getElementById('noteList');
var helpOptions = ["help", "changeHintText('commands: help, examine, return')"];
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
    if(codeTextBox.style.visibiliy == "visible") 
        changeHintText("you can't do that. type 'help' to see what you can do. make sure to type all code in the code box below."); 
}

var changeText = function(words) {
    text.innerHTML = words;
    hintText.innerHTML = "";
};

var changeHintText = function(words) {
    hintText.innerHTML = words;
};


var changeButtons = function(buttonList) {
    buttonBox.innerHTML = "";
    for (var i = 0; i < buttonList.length; i++) {
        buttonBox.innerHTML += "<button onClick=" + buttonList[i][1] + ">" + buttonList[i][0] + "</button>";
    }
};

var advanceTo = function(nextScenario) {
    image.src = nextScenario.image;
    changeText(nextScenario.text);
    currentScenario = nextScenario;
};

var codeBoxOn = function() {
    codeTextBox.style.visibility = "visible";
    codeTextBox.focus(); 
}

var codeBoxOff = function() {
    codeTextBox.style.visibility = "hidden";
    textBox.focus(); 
}

var addRiddle = function(riddle) {
    var child = document.createElement('div');
    child.id = "riddle";
    child.innerHTML = riddle;
    noteList.appendChild(child);
}

var addDefaultRiddles = function() {
    addRiddle('Why is this room like this? It hates me. Count. The answer was naming the variable count all along. They’re variables! It doesn’t matter what they’re called, it all functions the same. It could be called anything, but for some reason it only accepts count. '); 
    addRiddle('Int, int int Look at all the ints in the world. Intersect, integrity, intuition, integer. Ah integers, theyre so whole and nice.  Such nice numbers sometimes negatives,  sometimes positive but always whole.'); 
    addRiddle("Loopity loops around we go. Again and again and again and again. For is as long starting with 0 to whatever you need, up you increment 1. But while, while up or down you go but when you’ll end you’ll never know… until you end that is."); 
    addRiddle(); 
    addRiddle("Equals equals everywhere. One equals to set but two to compare. One is alone, a matchmaker on it’s own, destined to set to things together. Two, however, brings the gossip about to compare whether equal or not. "); 
    addRiddle("Floats and integers go hand and hand yet clash as the difference is clear. Floats can go beyond the whole number, while integers cannot split into anything but whole."); 
    addRiddle("! Oh ! You excite me so much. You split up the double equals and turn equals into nots.");  
}

scenario = {}

var scenario = {
    one: {
        image: "images/1.png",
        text: "You awaken to a familiar yet distinct inky blackness. A chill runs down your spine as the air is completely still around you. You call out hello, but no one responds. As your echoing cry fades away the room is once again submerged into silence. As you turn around slowly, sharp crinkling sounds pierce the silence. A dim light shines from a single wall, vaguely resembling a light switch.",
        functionNames: [
            helpOptions, ["examine", "advanceTo(lightbulbscenario.one)"],
            helpOptions, ["examinelight", "advanceTo(lightbulbscenario.one)"],
            helpOptions, ["examinelightswitch", "advanceTo(lightbulbscenario.one)"],
            helpOptions, ["examineswitch", "advanceTo(lightbulbscenario.one)"],

        ]
    },
    two: { //the lights are now on
        text: "Papers are everywhere. Covering the floor, piled in corners, crunched into balls... Black ink stains the sharp white walls excluding a single lone plaque resting on the wall. Rising from the paper infested floor a table cowers. Atop the table rests a disconnected keypad, plaque and a single top eerily spinning on its own. Opposite the tables in a small area surprisingly barren of paper two laptops and a tablet are huddled together shining dimly. In the last corner of the room partially buried underneath the paper is a shallow trash can filled with food packages. In front of you a single ornately decorated door looms. While you stare at it for a few seconds, you can’t help feeling disorientated as everything continues to shift resulting in you glancing away.",
        functionNames: [
            helpOptions, ["examine", "changeHintText('examine what?')"],
            ["examinetrash", "advanceTo(trashscenario.one)"],
            ["examinetrashcan", "advanceTo(trashscenario.one)"],
            ["examinelaptop", "advanceTo(laptopscenario.one)"],
            ["examinewallplaque", "advanceTo(wallscenario.one); "],
            ["examinewall", "advanceTo(wallscenario.one); "],
            ["examinepile", "advanceTo(pilescenario.one); "],
            ["examinepapers", "addDefaultRiddles();"],
            ["examinetop", "advanceTo(topscenario.one); "],
            ["examinedoor","advanceTo(door.one);"]
        ]
    }
};
           

var lightbulbscenario = {
    one: {
        image: "images/lightbulb1.png",
        text: "You walk towards the lightswitch, you hear the sound of crunching.",
        functionNames: [
            helpOptions, ["examine", "advanceTo(lightbulbscenario.two)"],
            ["examinelight", "advanceTo(lightbulbscenario.two)"],
            ["examinelightswitch", "advanceTo(lightbulbscenario.two)"],
            ["look", "advanceTo(lightbulbscenario.two)"]
            ["keepgoing", "advanceTo(lightbulbscenario.two)"]
        ]
    },
    two: {
        image: "images/lightbulb2.png",
        text: "You make your way towards the lightswitch, each step accompanied by the sharp crackle of something being crushed. You walk for an oddly long time before finally the light becomes clear. Without a doubt, the dim light resembles a lightswitch, yet instead of protruding from the wall, it appears to be engraved. Above the lightswitch engraving you can just make out the words of the plaque, illuminated by the engraving.",
        functionNames: [
            helpOptions, ["examine", "changeHintText('examine what?')"],
            ["examineplaque", "advanceTo(lightbulbscenario.three); codeBoxOn();"],
            ["readplaque", "advanceTo(lightbulbscenario.three); codeBoxOn();"],
        ]
    },
    three: {
        image: "images/lightbulb3.png",
        text: "The plaque has the words bool lightsOn = False;. Right nearby is a single keypad with room for a single line to be entered. Placing your fingers on the keyboard, a sudden groan jolts through the room. Almost as though the room is alive, but of course that would not be possible. Again, silence falls.",
        functionNames: [
            helpOptions, ["back", "advanceTo(lightbulbscenario.two); codeBoxOff();"], ["examine", "changeHintText('examine what?')"]
        ],
        correctAnswers: ["lightson=true;", "skip"],
        correctScenario: "advanceTo(lightbulbscenario.four); document.body.style.background = 'white'; document.body.style.color = 'black';"
    },
    four: {
        image: "images/lightbulb4.png",
        text: "The entire room moans for a single instant before light begins to rise. Slow at first, soon enough it begins to flood the room, illuminating every last corner in its incriminating white light.",
        functionNames: [
            helpOptions,
            backToStart,
            ["examine", "changeHintText('examine what? maybe you should return to the room.')"]
        ],
    }
}

var trashscenario = {
    one: {
        image: "images/trash1.png",
        text: "You head towards the trashcan, bushing aside all the pieces of paper to reveal the hole filled with different wrappers. Above the trash can a plaque glows dimly.",
        functionNames: [
            helpOptions, ["examine", "changeHintText('examine what?')"],
            ["read", "changeHintText('read what?')"],
            ["readplaque", "advanceTo(trashscenario.two); codeBoxOn();"],
            ["examineplaque", "advanceTo(trashscenario.two); codeBoxOn();"],
            ["back", "advanceTo(trashscenario.two)"],
        ]
    },
    two: {
        image: "images/trash2.png",
        text: "The plaque simply reads Int trash=122; Next to the plaque is once again a single keypad for a single line. As you place your finger on the keypad, once again it comes to life in a quiet groan.",
        functionNames: [
            helpOptions, ["examine", "changeHintText('examine what?')"],
            ["back", "advanceTo(trashscenario.two); codeBoxOff();"],
        ],
        correctAnswers: ["trash=0;", "trash=0", "skip"],
        correctScenario: "advanceTo(trashscenario.three)"
    },
    three: {
        image: "images/trash3.png",
        text: "Instantly, the trash dematerialized leaving a gaping hole. Surprisingly, it’s shallow enough for you to reach into a pull out a single small piece of paper. ",
        functionNames: [
            helpOptions, ["examine", "changeHintText('examine what?')"],
            ["examinepaper", "advanceTo(trashscenario.three_riddle); addRiddle('The paper reads Hidden in a pile lies the note sealed shut. 15 page flips must be done before the answer can be revealed.')"],
            ["back", "advanceTo(scenario.two);"],
        ],
    },
    three_riddle: {
        image: "images/hint.png",
        text: 'It reads: Hidden in a pile lies the the note sealed shut. But one by one it may flip. 151 must be done to begin the next fun."',
        functionNames: [
            helpOptions, ["examine", "changeHintText('examine what?')"],
            backToStart,
        ],
    }
}

var laptopscenario = {
    one: {
        image: "images/laptop1.png",
        text: "Going towards the small area barren of paper, you kneel down to look at the three electronic devices. As they glow weakly, you debate which one to use. ",
        functionNames: [
            helpOptions, ["examine", "changeHintText('examine what?')"],
            ["examinetablet", "advanceTo(laptopscenario.two);"],
            ["examinelaptop1", "advanceTo(laptopscenario.three);"],
            ["examinelaptop2", "advanceTo(laptopscenario.four)"],
            backToStart
        ]
    },

    transition: {
        image: "images/laptop1.png",
        text: "So that device is done. How do you know? You don't. Just roll with it. What should we do now?",
        functionNames: [
            helpOptions, ["examine", "changeHintText('examine what?')"],
            ["examinetablet", "advanceTo(laptopscenario.two);"],
            ["examinelaptop1", "advanceTo(laptopscenario.three);"],
            ["examinelaptop2", "advanceTo(laptopscenario.four)"],
            backToStart
        ]
    },

    two: {
        image: "images/laptop2.png",
        text: 'The tablet displays the line “x+15-y*13=password”. You push a random button again, because that’s how things works here apparently,  and the text is suddenly replaced with “input password:”',
        functionNames: [
            helpOptions, ["examine", "changeHintText('examine what?')"],
            ["back", "advanceTo(laptopscenario.one); codeBoxOff();"],
            ["-110", "advanceTo(laptopscenario.three_riddle)"],
        ],
    },

    two_riddle: {
        image: "images/paper.png",
        text: 'whatever the tablet riddle',
        functionNames: [
            helpOptions, ["examine", "changeHintText('examine what? the riddle I guess? but you're already examining it!')"],
            ["back", "advanceTo(laptopscenario.transition); codeBoxOff();"],
        ],
    },

    three: {
        image: "images/laptop3.png",
        text: 'The laptop displays “x%2=password”. You decide to tap a random key, and suddenly the text is replaced with “input password: “',
        functionNames: [
            helpOptions, ["examine", "changeHintText('examine what?')"],
            ["back", "advanceTo(laptopscenario.one); codeBoxOff();"],
            ["1", "advanceTo(laptopscenario.three_riddle); addRiddle('If even go through and let it be, but if odd divide by two it must become.')"],
        ],
    },

    three_riddle: {
        image: "images/paper.png",
        text: 'The laptop now displays a riddle: "If even go through and let it be, but if odd divide by two it must become."',
        functionNames: [
            helpOptions, ["examine", "changeHintText('examine what? the riddle I guess? but you're already examining it!')"],
            ["back", "advanceTo(laptopscenario.transition); codeBoxOff();"],
        ],
    },


    four: {
        image: "images/four.png",
        text: 'The laptop displays “The password lies in the number of spins before it dies and starts once more. Answer:',
        functionNames: [
            helpOptions, ["examine", "changeHintText('examine what?')"],
            ["back", "advanceTo(laptop.two); codeBoxOff();"],
            ["13", "advanceTo(laptopscenario.four_riddle); codeBoxOff(); addRiddle('The door that shifts follows the cycle around and around it goes. Too fast to truly read but slow enough to see, the shifts to the answer is the key.')"],
        ],
    },

    four_riddle: {
        image: "images/paper.png",
        text: 'The laptop unlocks and a riddle appears: “The door that shifts follows the cycle around and around it goes. Too fast to truly read but slow enough to see, the shifts to the answer is the key."',
        functionNames: [
            helpOptions, ["examine", "changeHintText('examine what?')"],
            ["back", "advanceTo(laptopscenario.end); codeBoxOff();"],
        ],
    },

    end: {
        image: "images/laptop1.png",
        text: "Well that seems to be all that needs to be done in this area. You can revisit these devices at any time to view the riddles again.",
        functionNames: [
            helpOptions, ["examine", "changeHintText('examine what?')"],
            ["examinetablet", "advanceTo(laptopscenario.two);"],
            ["examinelaptop1", "advanceTo(laptopscenario.three);"],
            ["examinelaptop2", "advanceTo(laptopscenario.four)"],
            backToStart
        ],
    },

}

var wallscenario = {
    one: {
        image:"images/wall1.png",
        text: "Unlike normal, the plaque has no obvious object next to it. You can just make out the barely visible words pulsing lightly. They seem to say <p> string status = \“invisible\”; <\p> As normal however, there is a keypad. What will you enter in?",
        functionNames: [
            helpOptions,
            backToStart,
        ],
        correctAnswers: ['stringstatus="visible";', "skip"],
        correctScenario: "advanceTo(wallscenario.two); codeBoxOn();"
    },
    two: {

        image:"images/wall2.png",
        text: "A box materializes in front of you. Although worn and rusted, the image of a plaid dragon curling around sides is unmistakeable. Centered in the front are the words <p>If luck==10: <br>&nbsp&nbsp&nbsp boxUnlock=True; <br> Else: <br>&nbsp&nbsp&nbsp boxUnlock=False;<br>\\\With only one line change allowed, the outside can change but the inside is locked <\span><\p> On the side of the box curled in the dragon's talons is a small keypad. You place your hand on the keypad. What do you want to enter?",
        functionNames: [
            helpOptions,
            backToStart,
        ],
        correctAnswers: ["10", "skip"],
        correctScenario: "advanceTo(wallscenario.three); codeBoxOff(); addRiddle('The PEMDAS comes to play once again as operations never truly go away. Times is times and adds is adds however squares and roots are not quite the same. Let x be 5 and y be 10 and the second will come to play');"
    },
    three: {

        image:"images/wall3.png",
        text: "The dragon uncoils the the box unlocks revealing another sheet of paper: \"The PEMDAS comes to play once again as operations never truly go away. Times is times and adds is adds however squares and roots are not quite the same. Let x be 5 and y be 10 and the second will come to play\".",
        functionNames: [
            helpOptions,
            backToStart,
        ],
    }
}


var topscenario = {
    one: {
        image: "images/top2.png",
        text: "Going towards the table the top suddenly stutters to a stop.For a few seconds it lays still on the table before once again it begins to spin. Underneath the top lies a plaque.",
        functionNames: [
            helpOptions,
            backToStart, ["examineplaque", "advanceTo(topscenario.two); codeBoxOn();"],
        ],
    },
    two: {
        image: "images/top1.png",
        text: "The plaque reads simply:<p>int x;<br>While spinning==True:<br>x;<br>\\\Change a single line  <\p>You place your hands on the keypad.",
        functionNames: [
            helpOptions,
            backToStart,
        ],
        correctAnswers: ["x=x+1;", "x+=1;", "x++;", "skip"],
        correctScenario: "advanceTo(wallscenario.three); codeBoxOff();",
    },
        three: {
            image: "images/top3.png",
            text: "You wait at the top spins until finally it comes to a stop .241 is returned as a number.", 
            functionNames: [
            helpOptions,
            backToStart,
        ],
    }

}

var pilescenario = {
    one: {
        image: "images/pile1.png",
        text: "You search through the pile to find a sealed notepad. Pulling it out, you place it on the table next to the disconnected keypad and plaque. Instantly, the plaque whirls to life.",
        functionNames: [
            helpOptions,
            backToStart, ["examineplaque", "advanceTo(pilescenario.two); codeBoxOn();"],
        ],
    },
    two: {
        image: "images/pile2.png",
        text: "The plaque reads simply:<p> int pageNum=0;<b>for (): <b>#num is the number on the door, the rest is up to you<\p>You place your hands on the keypad",
        functionNames: [
            helpOptions,
            backToStart,
        ],
        correctAnswers: ["for (int pageNum=0; pageNum<151; pageNum++)", "for (int pageNum=0; pageNum<151", "pageNum+=1)", "for (int pageNum=0; pageNum<151; pageNum=pageNum+1)", "skip"],
        correctScenario: "advanceTo(pilescenario.three); codeBoxOff(); addRiddle('Within the artificial lights the answers await. But each light holds a different heart. To solve the first know what remains is the percent and the 3 marks the x on the spot.');"
    },
    three: {
        image: "images/pile3.png",
        text: "The notepad flips page by page until finally it stops at page 150. It reads: <p>Within the artificial lights the answers await. But each light holds a different heart. To solve the first know what remains is the percent and the 3 marks the x on the spot. </p>",
        functionNames: [
            helpOptions,
            backToStart,
        ],
    }

}

var door = {
        one: {
            text: "You walk towards the door through hordes of paper, coming to a stop in front of the plaque. It reads<p>float count = 0;<br>int key;<br>int num;<br>\\\\num is the number on the door, the rest is up to you<\p>",
            functionNames: [
                helpOptions,
                backToStart,
            ],
            correctAnswers: ["key=112;"],
            correctScenario: "advanceTo(door.two)",
        },
        two: {
            functionNames: [
                helpOptions,
                backToStart,
            ],
            correctAnswers: ["whilenum!=key:"],
            correctScenario: "advanceTo(door.three)",
        },
        three: {
            functionNames: [
                helpOptions,
                backToStart,
            ],
            correctAnswers: ["count+=1"],
            correctScenario: "advanceTo(door.four)",
        },
        four: {
            functionNames: [
                helpOptions,
                backToStart,
            ],
            correctAnswers: ["ifcount%2==1"],
            correctScenario: "advanceTo(door.five)",
        },
        five: {
            functionNames: [
                helpOptions,
                backToStart,
            ],
            correctAnswers: ["returncount/2"],
            correctScenario: "advanceTo(door.six)",
        },
        six: {
            functionNames: [
                helpOptions,
                backToStart,
            ],
            correctAnswers: ["else:"],
            correctScenario: "advanceTo(door.seven)",
        },
        seven: {
            functionNames: [
                helpOptions,
                backToStart,
            ],
            correctAnswers: ["returncount"],
            correctScenario: "advanceTo(door.eight)",
        },
        eight: {
            text: "ENDING: The door creaks open slowly. Relieved, you step out of the room into the soft green grass. Relieved to see nature once more, you gaze around taking in the bright blue sky, chirping birds, and fresh air. After a few moments however, your eyes close and open into a familiar yet distinct inky blackness. You let out a sigh and think simply, “Here we go again, time for part two!"
        }
    }

currentScenario = scenario.one;
advanceTo(currentScenario);

