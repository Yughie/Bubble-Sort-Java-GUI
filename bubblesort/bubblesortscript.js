var numbers = [];
var currentPass = 0;

function initialize() {
  var input = document.getElementById('numbers').value;
  numbers = input.split(',').map(Number);

  // Check if the input length is within the desired range
  if (numbers.length < 5) {
    alert("Please enter a minimum of 5 inputs.");
    return;
  }

  if (numbers.length > 11) {
    alert("Maximum of 11 inputs only.");
    return;
  }

  currentPass = 0;
  displayCurrentPass();
}

function displayCurrentPass() {
  var output = document.getElementById('output');
  output.innerHTML = ''; // Clear previous output

  var passOutput = document.createElement('p');
  passOutput.innerText = 'Pass ' + (currentPass + 1) + ':';
  output.appendChild(passOutput);

  for (var j = 0; j < numbers.length - currentPass - 1; j++) {
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
      comparison.innerHTML += '<span class="comparisonNum">' + numbers[j] + '</span> is lesser than <span class="comparisonNum">' + numbers[j + 1] + '</span>, swap';
    } else {
      comparison.innerHTML += '<span class="comparisonNum">' + numbers[j] + '</span> is greater than or equal to <span class="comparisonNum">' + numbers[j + 1] + '</span>, retain';
    }

    numbersContainer.appendChild(numbersWrapper);
    numbersContainer.appendChild(comparison);
    
    output.appendChild(numbersContainer);
    output.appendChild(document.createElement('br'));
  }

  var passResult = document.createElement('p');
  passResult.innerHTML = 'Pass ' + (currentPass + 1) + ' result: <span class="resultNum">' + numbers.join(', ') + '</span>';
  output.appendChild(passResult);
  output.appendChild(document.createElement('br'));

  if (currentPass === numbers.length - 2) {
    var finalResult = document.createElement('p');
    finalResult.innerHTML = 'Since no swaps were made during Pass ' + (numbers.length - 1) + ', the list is now sorted. The final sorted array is: <span class="resultNum">' + numbers.join(', ') + '</span>';
    output.appendChild(finalResult);
  }
}

function nextPass() {
  if (currentPass < numbers.length - 2) {
    currentPass++;
    displayCurrentPass();
  }
}

function previousPass() {
  if (currentPass > 0) {
    currentPass--;
    displayCurrentPass();
  }
}
