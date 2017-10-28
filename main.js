//HTML element variables
var images = document.getElementById("images");
var text = document.getElementById("text");
var hintText = document.getElementById("hinttext"); 
var buttonBox = document.getElementById('buttonBox');
var textBox = document.getElementById('textBox');
var codeTextBox = document.getElementById('codeTextBox');

//player variables
var currentScenario;

textBox.onkeypress = function(event) {
    if (event.key == "Enter" || event.keyCode == 13) {
        parseInput(textBox.value, currentScenario);
        textBox.value = ""; 
  }
};

codeTextBox.onkeypress = function(event) {
    if (event.key == "Enter" || event.keyCode == 13) {
        evaluateAnswer(codeTextBox.value); 
        codeTextBox.value = ""; 
  }
};

var evaluateAnswer = function(answer) {
    for(var i = 0; i < currentScenario.correctAnswers.length; i++)
        if(answer == currentScenario.correctAnswers[i]) {
            eval(currentScenario.correctScenario);
            codeBoxOff(); 
            return; 
        }
    changeHintText("that was incorrect. hints: semicolon.");
}

var changeText = function(words) {
    text.innerHTML = words; 
    hinttext.innerHTML = ""; 
};

var changeHintText = function(words) {
  hinttext.innerHTML = words; 
};

var changeImage = function(img) {
  images.style.backgroundImage = "url(" + img + ")";
};

var changeButtons = function(buttonList) {
  buttonBox.innerHTML = "";
  for (var i = 0; i < buttonList.length; i++) {
    buttonBox.innerHTML += "<button onClick="+buttonList[i][1]+">" + buttonList[i][0] + "</button>";
  }
};

var advanceTo = function(nextscenario) {
  changeImage(nextscenario.image)
  changeText(nextscenario.text)
  currentScenario = nextscenario; 
};

var parseInput = function(input){
    //var inputs = split[input]; 
    for(var i = 0; i < currentScenario.functionNames.length; i++)
        if(input == currentScenario.functionNames[i][0]) 
        {
            eval(currentScenario.functionNames[i][1]); 
            return; 
        }
    changeHintText("you can't do that. type 'help' to see what you can do.");
}

var codeBoxOn = function() {
        codeTextBox.style.visibility="visible"; 
}

var codeBoxOff = function() {
        codeTextBox.style.visibility="hidden"; 
}

scenario = {}

var scenario = {
  one: {
    image: "https://s9.postimg.org/eceo9mp73/5860028206_d66810105f_b.jpg", //dog
    text: "TThe room is dark all around. A chill breeze runs through the room resulting in a quiet eerie whistling sound. In the corner of your eye, you can barely make out something that appears to be glowing softly. Crystal walls twinkle, shimmering in and out; however, inside the room",
    functionNames: [
            ["help", "changeHintText('commands: help, examine, look')"], 
            ["examine", "advanceTo(lightbulbscenario.one)"], 
            ["look", "advanceTo(scenario.three)"]
        ]
  },
  two: {
    image: "https://s9.postimg.org/9p8m7v1u7/6899639786_d517c4cce3_z.jpg", //house
    text: "you examined something. what now?",
    functionNames: [
            ["help", "changeHintText('commands: help, examine, look')"], 
            ["examine", "advanceTo(scenario.two)"], 
            ["look", "advanceTo(scenario.three)"]
        ]
  },
  three: {
    image: "https://s4.postimg.org/t1g20apst/261819008_d4316c1bdf_o.jpg",
    text: "You looked at something. what now?",
    functionNames: [
            ["help", "changeHintText('commands: help, examine, look')"], 
            ["examine", "advanceTo(scenario.two)"], 
            ["look", "advanceTo(scenario.three)"]
        ]
  }
};

var lightbulbscenario = {
    one: {
        text:"You walk towards the lightswitch, you hear the sound of crunching.",
        functionNames: [
            ["help", "changeHintText('commands: help, examine, look')"], 
            ["examine", "advanceTo(lightbulbscenario.two)"], 
            ["look", "advanceTo(lightbulbscenario.two)"]
        ]
    },
    two: {
        text:"It appears to look like the outline of a lightswitch; however it appears to have been engraved into the wall. Above the lightswitch outline is a shimmering plaque.",
        functionNames: [
            ["help", "changeHintText('commands: help, examine')"], 
            ["examine", "advanceTo(lightbulbscenario.three); codeBoxOn();"], 
        ]
    },
    three: {
        text:"The plaque has the words bool lightswitch=False. Next to the plaque however appears to be a little keypad.  As you place your fingers on the keypad, a groan rumbles through the clearing as light emanates from the keys. You can only type one line into the keypad.",
        functionNames: [
            ["help", "changeHintText('write the correct code in the code box. commands: back')"], 
            ["back", "advanceTo(lightbulbscenario.two); codeBoxOff();"]
        ],
        correctAnswers: ["bool lightswitch = true;", "skip"], 
        correctScenario: "advanceTo(lightbulbscenario.four)"
    },
    four: {
        text:"Light floods the room, radiating somehow from the center of the walls.",
        functionNames: [
            ["help", "changeHintText('commands: return')"], 
            ["return", "advanceTo(scenario.one)"]
        ],
        
    }
    
}
currentScenario = scenario.one; 
advanceTo(currentScenario);