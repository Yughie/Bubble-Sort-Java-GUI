import javax.swing.JTextArea;

class Sort {
    // perform the bubble sort
    public static void bubbleSort(int array[], JTextArea outputArea) {
        int size = array.length;

        for (int i = 0; i < size - 1; i++) {
            boolean swapped = false;

            for (int j = 0; j < size - i - 1; j++) {
                if (array[j] > array[j + 1]) {
                    // swapping occurs if elements are not in the intended order
                    int temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;

                    swapped = true;
                }

                // Displaying the array with asterisks and numbers being compared
                outputArea.append("Array: " + underlineNumber(array, j, j + 1) + "\n");
            }

            outputArea.append("Pass " + (i + 1) + " Complete\n");

            // If no swapping occurred in the current pass, the array is already sorted
            if (!swapped) {
                break;
            }
        }
    }

    // Helper method to underline the numbers being sorted
    private static String underlineNumber(int[] array, int index1, int index2) {
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < array.length; i++) {
            if (i == index1) {
                sb.append("*").append(array[i]);
            } else if (i == index2) {
                sb.append(" *").append(array[i]);
            } else {
                sb.append(array[i]);
            }

            if (i < array.length - 1) {
                sb.append(" ");
            }
        }

        return sb.toString();
    }
}
