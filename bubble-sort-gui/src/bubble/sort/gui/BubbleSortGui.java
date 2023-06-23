import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import javax.imageio.ImageIO;

public class BubbleSortGui {
    private JFrame frame;
    private JTextArea inputArea;
    private JTextArea outputArea;
    private JPanel mainMenuPanel;
    private JPanel sortingPanel;

    public BubbleSortGui() {
        // Create the main frame
        frame = new JFrame("Bubble Sort GUI");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(400, 300);
        frame.setExtendedState(JFrame.MAXIMIZED_BOTH); // Maximize the window
        frame.setLayout(new BorderLayout());

        // Create the main menu panel
        mainMenuPanel = new JPanel();
        mainMenuPanel.setLayout(new BorderLayout());

        // Create the title label and set the font and alignment
        JLabel titleLabel = new JLabel("Bubble Sort!");
        titleLabel.setFont(new Font("Arial", Font.BOLD, 24));
        titleLabel.setHorizontalAlignment(SwingConstants.CENTER);

        // Create the subtitle label and set the alignment
        JLabel subtitleLabel = new JLabel("See step by step bubble sort with us");
        subtitleLabel.setHorizontalAlignment(SwingConstants.CENTER);
        
        try {
            BufferedImage backgroundImage = ImageIO.read(new File("C:\\Users\\janic\\OneDrive\\Documents\\NetBeansProjects\\bubble-sort-gui\\src\\bubble\\sort\\gui\\sky.png"));
            JLabel backgroundLabel = new JLabel(new ImageIcon(backgroundImage));
            subtitleLabel.add(backgroundLabel);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Create the start sorting button
        JButton startSortingButton = new JButton("Start Sorting");

        // Add action listener to the start sorting button
        startSortingButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                sortingPanel();
            }
        });

        // Add the components to the main menu panel
        mainMenuPanel.add(titleLabel, BorderLayout.NORTH);
        mainMenuPanel.add(subtitleLabel, BorderLayout.CENTER);
        mainMenuPanel.add(startSortingButton, BorderLayout.SOUTH);

        // Create the sorting panel
        sortingPanel = new JPanel();
        sortingPanel.setLayout(new BorderLayout());

        // Create the input area
        inputArea = new JTextArea();
        JScrollPane inputScrollPane = new JScrollPane(inputArea);
        sortingPanel.add(inputScrollPane, BorderLayout.NORTH);

        // Create the sort button
        JButton sortButton = new JButton("Sort");

        // Create the output area
        outputArea = new JTextArea();
        outputArea.setEditable(false);
        JScrollPane outputScrollPane = new JScrollPane(outputArea);
        sortingPanel.add(outputScrollPane, BorderLayout.CENTER);

        // Create the button panel for "Go back to Main Menu" and "Sort Next"
        JPanel buttonPanel = new JPanel();
        buttonPanel.setLayout(new FlowLayout());

        // Create the "Go back to Main Menu" button
        JButton mainMenuButton = new JButton("Go back to Main Menu");
        buttonPanel.add(mainMenuButton);

        // Create the "Sort Next" button
        JButton sortNextButton = new JButton("Sort Next");
        buttonPanel.add(sortNextButton);

        // Add the button panel to the sorting panel
        sortingPanel.add(buttonPanel, BorderLayout.SOUTH);

        // Add action listener to the "Go back to Main Menu" button
        mainMenuButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                frame.getContentPane().removeAll();
                frame.add(mainMenuPanel, BorderLayout.CENTER);
                frame.revalidate();
                frame.repaint();
                outputArea.setText(""); // Clear the output area
                inputArea.setText(""); // Clear the input area
            }
        });

        // Add action listener to the "Sort Next" button
        sortNextButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                frame.getContentPane().removeAll();
                sortingPanel();
            }
        });

        // Add action listener to the sort button
        sortButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                String input = inputArea.getText();
                int[] data = parseInput(input);

                if (data != null && data.length >= 5 && data.length <= 11) {
                    Sort.bubbleSort(data, outputArea);
                } else {
                    outputArea.setText(""); // Clear the output area
                    JOptionPane.showMessageDialog(frame, "Invalid input! Please enter between 5 and 11 number of inputs.", "Error",
                            JOptionPane.ERROR_MESSAGE);
                }
            }
        });
        
        // Add action listener to the sort button
        sortNextButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                outputArea.setText(""); // Clear the output area
                inputArea.setText(""); // Clear the input area
                sortingPanel();
            }
        });


        // Add the sort button to the button panel
        buttonPanel.add(sortButton);

        // Add the main menu panel to the frame initially
        frame.add(mainMenuPanel, BorderLayout.CENTER);

        // Make the frame visible
        frame.setVisible(true);
    }

    private void sortingPanel() {
        frame.getContentPane().removeAll();
        frame.add(sortingPanel, BorderLayout.CENTER);
        frame.revalidate();
        frame.repaint();
    }

    private int[] parseInput(String input) {
        String[] numbers = input.split("[,\\s]+");
        int[] data = new int[numbers.length];
        try {
            for (int i = 0; i < numbers.length; i++) {
                data[i] = Integer.parseInt(numbers[i].trim());
            }
            return data;
        } catch (NumberFormatException e) {
            JOptionPane.showMessageDialog(frame, "Invalid input! Please enter numbers only.", "Error",
                    JOptionPane.ERROR_MESSAGE);
            return null;
        }
    }


    public static void main(String[] args) {
        // Run the GUI in the event dispatch thread
        SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                new BubbleSortGui();
            }
        });
    }
}
