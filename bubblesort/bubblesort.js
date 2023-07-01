function bubbleSort(arr) {
var len = arr.length;
var steps = [];

    for (var i = 0; i < len; i++) {
        var passSteps = [];
        var swapped = false;
        for (var j = 0; j < len - 1 - i; j++) {
        // Store the step with all comparisons
        passSteps.push({ step: [...arr], comparedIndices: [j, j + 1] });

            if (arr[j] > arr[j + 1]) {
                // Swap elements
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;

                // Store the step after swapping
                passSteps.push({ step: [...arr], comparedIndices: [j, j + 1] });
                swapped = true;
            } else {
                // Store the step without swapping
                passSteps.push({ step: [...arr], comparedIndices: [] });
            }
        }
        steps.push(passSteps);
        if (!swapped) {
        break; // No more swaps, sorting finished
        }
    }
    return steps;
}

function sortArray() {
var inputArray = document.getElementById("inputArray").value;
var arr = inputArray.split(",").map(Number);

    if (arr.length < 5 || arr.length > 11) {
        alert("Please enter a minimum of 5 inputs and a maximum of 11 inputs.");
        return;
    }

    var steps = bubbleSort(arr);

    var output = "";
    for (var i = 0; i < steps.length; i++) {
        output += "<strong>Pass " + (i + 1) + ":</strong><br>";
        for (var j = 0; j < steps[i].length; j++) {
        output += formatStep(steps[i][j], j === steps[i].length - 1);
        }
        output += "<br>";
    }

var sortedOutput = formatSortedArray(steps[steps.length - 1][steps[steps.length - 1].length - 1].step);
document.getElementById("outputSteps").innerHTML = output;
document.getElementById("outputSorted").innerHTML = sortedOutput;
}

function formatStep(step, isLastStep) {
var output = "[";

    for (var i = 0; i < step.step.length; i++) {
        var num = step.step[i];
        var hasAsterisks = step.comparedIndices.length === 2 && step.comparedIndices.includes(i);

        if (i !== 0) {
        output += ", ";
        }

        if (hasAsterisks) {
        output += "<span class='highlight'>" + num + "</span>";
        } else {
        output += num;
        }
    }

output += "]<br>";
return output;
}

function formatSortedArray(arr) {
var output = "<strong>Sorted Array:</strong><br>";
output += "<span class='sorted'>[";
    for (var i = 0; i < arr.length; i++) {
        if (i !== 0) {
        output += ", ";
        }
        output += arr[i];
        if (i !== arr.length - 1) {
        output += "*";
        }
    }
output += "]</span>";
return output;
}
