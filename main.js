var images = document.getElementById("images");
var text = document.getElementById("text");
var hintText = document.getElementById("hinttext"); 
var buttonBox = document.getElementById('buttonBox');
var textbox = document.getElementById('textbox');
var yerdog;

textbox.onkeypress = function(event) {
    if (event.key == "Enter" || event.keyCode == 13) {
        parseInput(textbox.value, scenario.one);
        textbox.value = ""; 
  }
};


var changeText = function(words) {
    text.innerHTML = words.replace("Your dog", yerdog);
    hinttext.innerHTML = ""; 
};

var changeHintText = function(words) {
  hinttext.innerHTML = words.replace("Your dog", yerdog);
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

var advanceTo = function(s) {
  changeImage(s.image)
  changeText(s.text)
};


var listFunctionNames = function(s){
    changeHintText(s.helpText); 
}

var parseInput = function(input, s){
    //var inputs = split[input]; 
    for(var i = 0; i < s.functionNames.length; i++)
        if(input == s.functionNames[i][0]) 
        {
            eval(s.functionNames[i][1]); 
            return; 
        }
    changeHintText("i don't know what that is.");
}

scenario = {}
var scenario = {
  one: {
    image: "https://s9.postimg.org/eceo9mp73/5860028206_d66810105f_b.jpg", //dog
    text: "You are in a room. what to do?\n",
    helpText: "commands: help, examine, look", 
    functionNames: [["help", "listFunctionNames(scenario.one)"], ["examine", "advanceTo(scenario.two)"], ["look", "advanceTo(scenario.three)"]]
  },
  two: {
    image: "https://s9.postimg.org/9p8m7v1u7/6899639786_d517c4cce3_z.jpg", //house
    text: "you examined something. what now?",
    functionNames: [["help", "listFunctionNames(scenario.one)"], ["examine", "advanceTo(scenario.two)"], ["look", "advanceTo(scenario.three)"]]
  },
  three: {
    image: "https://s4.postimg.org/t1g20apst/261819008_d4316c1bdf_o.jpg",
    text: "You looked at something. what now?",
    functionNames: [["help", "listFunctionNames(scenario.one)"], ["examine", "advanceTo(scenario.two)"], ["look", "advanceTo(scenario.three)"]]

  }
  
};

advanceTo(scenario.one)