var numbers = []; // Array to store input numbers
var originalNumbers = []; // Copy of the original input numbers for back and next pass view
var currentPass = 0; // Current pass index

function initialize() {
  var input = document.getElementById('numbers').value; // Get input value
  var initialAppear = document.querySelectorAll('.intialAppear');
  var sortAppear = document.querySelectorAll('.sortAppear');
  document.getElementById('prevbtn').disabled = true;

  var invalidCharacters = /[^0-9,\s]/g; // check for invalid input (letters and other symbols)
  if (invalidCharacters.test(input)) {
    openInvalidAlert(); // Show invalid input alert
    disablebtns(); // Disable back and next button
    return;
  }

  numbers = input.split(',').map(Number); // Split input string and convert to numbers
  originalNumbers = [...numbers]; // Make a copy of the original numbers for back and next pass view

  // check if input is less than 5
  if (numbers.length < 5) {
    open5Alert(); // Show alert for less than 5 numbers
    close11Alert(); // Hide alert for more than 11 numbers
    closeInvalidAlert(); // Hide invalid input alert
    disablebtns(); // Disable back and next button
    return;
  }

  // check if input is more than 11
  if (numbers.length > 11) {
    open11Alert(); // Show alert for more than 11 numbers
    close5Alert(); // Hide alert for less than 5 numbers
    closeInvalidAlert(); // Hide invalid input alert
    disablebtns(); // Disable back and next button
    return;
  }


  sortAppear.forEach(function(button) {
    button.style.display = 'block';
    setTimeout(function() {
      button.style.opacity = '1';
    }, 10);
  });
  enablebtns(); // Enable back and next button
  close5Alert(); // Hide alert for less than 5 numbers
  currentPass = 0; // Reset current pass index
  clearOutput(); // Clear the output area
  close5Alert(); // Hide alert for less than 5 numbers
  close11Alert(); // Hide alert for more than 11 numbers
  closeInvalidAlert(); // Hide invalid input alert
  displayCurrentPass(); // Display the current pass
}

// disabling back and next button
function disablebtns() {
  var nextButton = document.getElementById('nxtbtn');
  var backButton = document.getElementById('prevbtn');
  nextButton.disabled = true; // Disable next button
  backButton.disabled = true; // Disable back button
}

// enabling back and next button
function enablebtns() {
  var nextButton = document.getElementById('nxtbtn');
  var backButton = document.getElementById('prevbtn');
  nextButton.disabled = false; // Enable next button
  backButton.disabled = false; // Enable back button
}

function clearOutput() {
  var output = document.getElementById('output');
  output.innerHTML = ''; // Clear the output area
}

//---------- Functions for showing and hiding alerts ---------- //
function open5Alert() {
  var less5 = document.getElementsByClassName('less5')[0];
  less5.style.display = 'block';
  setTimeout(function() {
    less5.style.opacity = '1';
  }, 10);
}

function close5Alert() {
  var less5 = document.getElementsByClassName('less5')[0];
  less5.style.opacity = '0';
  setTimeout(function() {
    less5.style.display = 'none';
  }, 200);
}

function open11Alert() {
  var greater11 = document.getElementsByClassName('greater11')[0];
  greater11.style.display = 'block';
  setTimeout(function() {
    greater11.style.opacity = '1';
  }, 10);
}

function close11Alert() {
  var greater11 = document.getElementsByClassName('greater11')[0];
  greater11.style.opacity = '0';
  setTimeout(function() {
    greater11.style.display = 'none';
  }, 200);
}

function openInvalidAlert() {
  var invalid = document.getElementsByClassName('invalid')[0];
  invalid.style.display = 'block';
  setTimeout(function() {
    invalid.style.opacity = '1';
  }, 10);
}

function closeInvalidAlert() {
  var invalid = document.getElementsByClassName('invalid')[0];
  invalid.style.opacity = '0';
  setTimeout(function() {
    invalid.style.display = 'none';
  }, 200);
}
//---------- End functions for showing and hiding alerts ---------- //

// Displaying sorting process
function displayCurrentPass() {
  var output = document.getElementById('output');
  output.innerHTML = '';

  var passOutput = document.createElement('p');
  passOutput.innerText = 'Pass ' + (currentPass + 1) + ':';
  output.appendChild(passOutput);

  var swapsMade = false; // Flag to track if any swaps were made during the pass

  for (var j = 0; j < numbers.length - 1 - currentPass; j++) {
    var numbersContainer = document.createElement('div');
    numbersContainer.classList.add('numbersContainer');

    var numbersWrapper = document.createElement('div');
    numbersWrapper.classList.add('numbersWrapper');

    for (var k = 0; k < numbers.length; k++) {
      var number = document.createElement('div');
      number.classList.add('number');

      if (k === j) {
        number.id = 'comparison';
      }

      if (k === j + 1) {
        number.id = 'comparison2';
      }
      number.innerText = numbers[k];
      numbersWrapper.appendChild(number);
    }

    var comparison = document.createElement('div');
    comparison.classList.add('comparisontxt');
    comparison.innerText = '';

    if (numbers[j] > numbers[j + 1]) {
      var temp = numbers[j];
      numbers[j] = numbers[j + 1];
      numbers[j + 1] = temp;
      comparison.innerHTML += '<span class="comparisonNum">' + numbers[j + 1] + '</span> is greater than <span class="comparisonNum">' + numbers[j] + '</span>, <span class="swap">swap</span>';
      swapsMade = true; // Set swapsMade flag to true if a swap is made
    } else if (numbers[j] < numbers[j + 1]) {
      comparison.innerHTML += '<span class="comparisonNum">' + numbers[j] + '</span> is lesser than <span class="comparisonNum">' + numbers[j + 1] + '</span>, <span class="retain">retain</span>';
    } else {
      comparison.innerHTML += '<span class="comparisonNum">' + numbers[j] + '</span> is equal to <span class="comparisonNum">' + numbers[j + 1] + '</span>, <span class="retain">retain</span>';
    }

    numbersContainer.appendChild(numbersWrapper);
    numbersContainer.appendChild(comparison);

    output.appendChild(numbersContainer);
    output.appendChild(document.createElement('br'));
  }

  currentPass++;

  if (swapsMade && currentPass < numbers.length - 1) {
    // Enable the next button to proceed to the next pass
    document.getElementById('nxtbtn').disabled = false;
  } else {
    var finalResultContainer = document.createElement('div');
    finalResultContainer.classList.add('finalResultNum');

    var finalResultTxt = document.createElement('p');
    finalResultTxt.classList.add('finaltxt');
    finalResultTxt.innerText = 'The list is now sorted. The final sorted array is: ';

    var finalResult = document.createElement('span');
    finalResult.classList.add('finalSorted');
    finalResult.innerText = numbers.join(', ');

    finalResultContainer.appendChild(finalResultTxt);
    finalResultContainer.appendChild(finalResult);
    output.appendChild(finalResultContainer);

    // Disable the next button when sorting is completed
    document.getElementById('nxtbtn').disabled = true;
  }
  }


// next button
function nextPass() {
  if (currentPass < numbers.length - 1) {
    displayCurrentPass();
  }
}

// back button 
function previousPass() {
  if (currentPass > 0) {
    currentPass--;
    displayPass(currentPass); // Display the previous pass
  }

  // Enable the next button if we are not on the last pass
  if (currentPass < numbers.length - 1) {
    document.getElementById('nxtbtn').disabled = false;
  }

  // Enable the previous button if we are not on the first pass
  if (currentPass > 0) {
    document.getElementById('prevbtn').disabled = false;
  } else {
    // Disable the previous button when on the first pass
    document.getElementById('prevbtn').disabled = true;
  }
}

function displayPass(pass) {
  var output = document.getElementById('output');
  output.innerHTML = '';

  var passOutput = document.createElement('p');
  passOutput.innerText = 'Pass ' + (pass + 1) + ':';
  output.appendChild(passOutput);

  var swapsMade = false;

  for (var j = 0; j < numbers.length - 1 - pass; j++) {
    var numbersContainer = document.createElement('div');
    numbersContainer.classList.add('numbersContainer');

    var numbersWrapper = document.createElement('div');
    numbersWrapper.classList.add('numbersWrapper');

    for (var k = 0; k < numbers.length; k++) {
      var number = document.createElement('div');
      number.classList.add('number');

      if (k === j) {
        number.id = 'comparison';
      }

      if (k === j + 1) {
        number.id = 'comparison2';
      }
      number.innerText = numbers[k];
      numbersWrapper.appendChild(number);
    }

    var comparison = document.createElement('div');
    comparison.classList.add('comparisontxt');
    comparison.innerText = '';

    if (numbers[j] > numbers[j + 1]) {
      var temp = numbers[j];
      numbers[j] = numbers[j + 1];
      numbers[j + 1] = temp;
      comparison.innerHTML += '<span class="comparisonNum">' + numbers[j + 1] + '</span> is greater than <span class="comparisonNum">' + numbers[j] + '</span>, <span class="swap">swap</span>';
      swapsMade = true; // Set swapsMade flag to true if a swap is made
    } else if (numbers[j] < numbers[j + 1]) {
      comparison.innerHTML += '<span class="comparisonNum">' + numbers[j] + '</span> is lesser than <span class="comparisonNum">' + numbers[j + 1] + '</span>, <span class="retain">retain</span>';
    } else {
      comparison.innerHTML += '<span class="comparisonNum">' + numbers[j] + '</span> is equal to <span class="comparisonNum">' + numbers[j + 1] + '</span>, <span class="retain">retain</span>';
    }

    numbersContainer.appendChild(numbersWrapper);
    numbersContainer.appendChild(comparison);

    output.appendChild(numbersContainer);
    output.appendChild(document.createElement('br'));
  }

  if (swapsMade && pass < numbers.length - 1) {
    // Enable the next button to proceed to the next pass
    document.getElementById('nxtbtn').disabled = false;
  } else {
    // Disable the next button when sorting is completed
    document.getElementById('nxtbtn').disabled = true;
  }

  // Enable the previous button if we are not on the first pass
  if (pass > 0) {
    document.getElementById('prevbtn').disabled = false;
  } else {
    // Disable the previous button when on the first pass
    document.getElementById('prevbtn').disabled = true;
  }
}

  