var numbers = []; // Array to store input numbers
var originalNumbers = []; // Copy of the original input numbers for back and next pass view
var currentPass = 0; // Current pass index

function initialize() {
  var input = document.getElementById('numbers').value; // Get input value
  var initialAppear = document.querySelectorAll('.intialAppear');
  var sortAppear = document.querySelectorAll('.sortAppear');

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
  var output = document.getElementById('output'); // output area for sorting process
  output.innerHTML = ''; // Clear previous output

  // Create a paragraph element for the pass (Pass 1, Pass 2, etc.)
  var passOutput = document.createElement('p');
  passOutput.innerText = 'Pass ' + (currentPass + 1) + ':';
  output.appendChild(passOutput);

  // Iterate over the numbers and display the comparison steps
  for (var j = 0; j < numbers.length - 1; j++) {
    // Container for Bubble Array and sorting description text
    var numbersContainer = document.createElement('div');
    numbersContainer.classList.add('numbersContainer');

    // Wrapper for Bubble Array
    var numbersWrapper = document.createElement('div');
    numbersWrapper.classList.add('numbersWrapper');

    // Comparison of 2 numbers in the array for Bubble Sorting
    for (var k = 0; k < numbers.length; k++) {
      // Container for Bubble Number
      var number = document.createElement('div');
      number.classList.add('number');

      // Bubble Number 1
      if (k === j) {
        // Set Bubble Number 1 ID
        number.id = 'comparison';
      }
      
      // Bubble Number 2
      if (k === j + 1) {
        // Set Bubble Number 2 ID
        number.id = 'comparison2';
      }
      number.innerText = numbers[k];
      numbersWrapper.appendChild(number);
    }

    // Wrapper for sorting description text
    var comparison = document.createElement('div');
    comparison.classList.add('comparisontxt');
    comparison.innerText = '';

    // Conditioning for sorting description text
    // ex. (12 5) 2 41 13
    // If the current number (12) is greater than the next number (5), swap them
    if (numbers[j] > numbers[j + 1]) {
      var temp = numbers[j]; // Store the current number (12) in a temporary variable
      numbers[j] = numbers[j + 1]; // Replace the current number (12) with the next number (5)
      numbers[j + 1] = temp; // Replace the next number (5) with the stored current number (12)
      comparison.innerHTML += '<span class="comparisonNum">' + numbers[j+1] + '</span> is greater than <span class="comparisonNum">' + numbers[j] + '</span>, <span class="swap">swap</span>';
      
    /* ex. sorted 
      (12 5) 2 41 13
      5 (12 2) 41 13
      5 2 (12 41) 13
      If the current number (12) is less than the next number (41), retain them in the same order */
    } else if (numbers[j] < numbers[j + 1]) {
      comparison.innerHTML += '<span class="comparisonNum">' + numbers[j] + '</span> is lesser than <span class="comparisonNum">' + numbers[j+1] + '</span>, <span class="retain">retain</span>';
    
      /* ex. (5 5) 12 2 41 13
      If the current number (5) is equal to the next number (5), retain them in the same order */
    } else {                                                              
      comparison.innerHTML += '<span class="comparisonNum">' + numbers[j] + '</span> is equal to <span class="comparisonNum">' + numbers[j + 1] + '</span>, <span class="retain">retain</span>';
    }


    numbersContainer.appendChild(numbersWrapper);
    numbersContainer.appendChild(comparison);

    output.appendChild(numbersContainer);
    output.appendChild(document.createElement('br'));
  }

  // Create a list for the pass result (ex. PASS 1 RESULT: 5, 2, 12, 13, 41)
  var passResult = document.createElement('ul');
  passResult.innerHTML = 'Pass ' + (currentPass + 1) + ' result: '; 

  // Add each number as a list item, set glow animation delay per list item
  numbers.forEach(function(number, index) {
    var li = document.createElement('li');
    li.classList.add('passResultNum');
    li.textContent = number;

    var animationDelay = (index + 1) * 0.2; // Increment delay by 0.2 seconds for each index
    li.style.animationDelay = animationDelay + 's';

    passResult.appendChild(li);

    if (index !== numbers.length - 1) {
      passResult.appendChild(document.createTextNode(', '));
    }
  });

  output.appendChild(passResult);
  output.appendChild(document.createElement('br'));

  // Display final sorted array
  if (currentPass === numbers.length - 2) {
    var finalResultContainer = document.createElement('div');
    finalResultContainer.classList.add('finalResultNum');

    var finalResultTxt = document.createElement('p');
    finalResultTxt.classList.add('finaltxt');
    finalResultTxt.innerText = 'The list is now sorted. The final sorted array is: ';

    var finalResult = document.createElement('span');
    finalResult.classList.add('finalSorted');

    // Add each number as a span inside the final result element, set glow animation delay per span
    numbers.forEach(function(number, index) {
      var spanItem = document.createElement('span');
      spanItem.classList.add('resultNum');
      spanItem.textContent = number;

      var animationDelay = (index + 1) * 0.2; // Increment delay by 0.2 seconds for each index
      spanItem.style.animationDelay = animationDelay + 's';

      finalResultTxt.appendChild(spanItem);

      if (index !== numbers.length - 1) {
        finalResultTxt.appendChild(document.createTextNode(', '));
      }
    });

    finalResultContainer.appendChild(finalResultTxt);
    finalResultContainer.appendChild(finalResult);
    output.appendChild(finalResultContainer);
  }
}

// next button
function nextPass() {
  if (currentPass < numbers.length - 2) {
    currentPass++;
    displayCurrentPass(); 
  } else if (currentPass === numbers.length - 2) {
    currentPass++;
    displayCurrentPass();
    disablebtns(); // Disable back and next buttons after the final pass
  } else {
    disablebtns(); // Disable back and next buttons if already in the final pass
  }
}

// back button 
function previousPass() {
  if (currentPass > 0) {
    currentPass--;
    numbers = [...originalNumbers]; // Restore original numbers

    // Update the displayed passes from 0 to currentPass
    clearOutput();
    for (var pass = 0; pass <= currentPass; pass++) {
      displayCurrentPass(pass);
    }
}
}

