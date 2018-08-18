// Define array of word solutions (answers) //
var wordCocktails = ["mai tai", "whiskey sour", "gin and tonic", "white russian", "singapore sling", "blood and sand", "hot toddy", "mint julip", "mojito", "martini", "moscow mule", "gin fizz"]

//Empty arrays for collecting letters as user makes guesses//
var usedLetters = [];
var correctGuess = [];

// Empty array for placeholder values
var placeholders = [];

// variable that generates a random INDEX based on wordCocktails array//
var randomCocktail = Math.floor(Math.random() * wordCocktails.length);

// variable that holds the random string
var puzzle = wordCocktails[randomCocktail];

// score keeping variables
var $guessRemain = 10;
var $wins = 0;
var $losses = 0;

//Define function that selects new Cocktail from array based on the INDEX value of variable randomCocktail //
function newCocktail() {

  // Attaches to id applied in html doc to insert random string from array  //
  document.getElementById("cocktailText").innerHTML = puzzle;

  for (i = 0; i < puzzle.length; i++) {


    if (puzzle[i] == " ") {

      placeholders.push(" ");

    }

    else {

      placeholders.push(" _ ");

    }
    document.getElementById("cocktailText").innerHTML = placeholders.join("");
    console.log(puzzle[i]);
  }

}

// Define function for starting new game
function newGame () {
  if ($guessRemain === 0 && placeholders.join("") !== puzzle) {

    $losses ++;
    $guessRemain = 10;
    usedLetters = [];
    correctGuess = [];

    document.getElementById("losses").innerHTML = ("Losses: " + $losses);
    document.getElementById("guessRemain").innerHTML = ("Ingredients left: " + $guessRemain);document.getElementById("userGuesses").innerHTML = ("Wrong Ingredients:" + usedLetters);

    alert("You ran out of ingredients. Try again!");
    newCocktail();

  } else if (placeholders.join("") == puzzle) {

    $wins ++;
    $guessRemain = 10;
    usedLetters = [];
    correctGuess = [];

    document.getElementById("wins").innerHTML = ("Wins: " + $wins);
    document.getElementById("guessRemain").innerHTML = ("Ingredients left: " + $guessRemain);document.getElementById("userGuesses").innerHTML = ("Wrong Ingredients: " + usedLetters);

    alert("That's a tasty lookin' drink! Play again?");
    newCocktail();

  }
}

// Initial setup
alert("By clicking 'OK', you confirm you are at least 21 years of age.");
newGame();
// Execute function to generate random wordCocktail and insert in html//

newCocktail();






//Detects and returns user keystrokes//
document.onkeyup = function (event) {

  // Defines user key input as variable
  var userInput = event.key;

  // Checks if key entered is NOT (!) already included in usedLetters array or current puzzle//
  if (!usedLetters.includes(userInput) && !correctGuess.includes(userInput)) {

    //THEN checks IF keycode is a letter... 
    if (event.which >= 65 && event.which <= 90) {

      // THEN checks IF key entered is included in current puzzle...
      if (puzzle.includes(userInput)) {
        // Adds guess to array but does not display wrong ingredient
          correctGuess.push(userInput)
        // for loop to check...
        for (i = 0; i < puzzle.length; i++) {
          // userInput against current puzzle
          if (puzzle[i] === userInput) {
            // and set matching user guess equal to placeholder value
            placeholders[i] = userInput;
            // and rewrite placeholders with guessed value
            document.getElementById("cocktailText").innerHTML = placeholders.join("");
            //and alert user of correct guess in html
            document.getElementById("gameAlerts").innerHTML = ("Looks good to me. Add it in!");

          }

        }

      }

      else {
        // ...push user keystrokes as values to usedLetters array
        usedLetters.push(userInput);
        // and write array and alert to html //
        document.getElementById("userGuesses").innerHTML = ("Wrong ingredients: " + (usedLetters.join(" ")));
        document.getElementById("gameAlerts").innerHTML = "Oops! That's not in this recipe. Try again."

        // and decrease guesses by one and alert to html //
        $guessRemain --;
        document.getElementById("guessRemain").innerHTML = ("Ingredients left: " + $guessRemain);

      }
    }
    // Else alerts user that they must choose a letter //
    else {
      document.getElementById("gameAlerts").innerHTML = "Sorry! Not an ingredient. Try adding a letter."
    }

  }

  else {
    document.getElementById("gameAlerts").innerHTML = "We used that ingredient. Try something else!"
  }

  //log input
  console.log(userInput);
  // log array
  console.log(usedLetters);

}






