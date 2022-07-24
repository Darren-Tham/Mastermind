# Mastermind
## Introduction
This is a recreation of the board game Mastermind using React!
<p align="center">
  <img src="https://cdn.discordapp.com/attachments/704606226553634932/1000890225146466304/Screen_Shot_2022-07-24_at_6.17.45_PM.png" width="200">
  <img src="https://cdn.discordapp.com/attachments/704606226553634932/1000890225452666910/Screen_Shot_2022-07-24_at_6.19.26_PM.png" width="201">
</p>

## Rules
The player's goal is to guess the correct code combination. After making a guess, 
there are four small dots to the right of the row that show your result, and they have three different colors:

- Red
  - One of the balls is in the correct position
  - **Important Note**: The position of the red dot does not correlate with the position of the balls 
  (e.g., if there is one red dot, that does not imply that the first ball is in the correct position)
- White
  - One of the balls is not in the correct position but exists in the code
- Gray
  - One of the balls is not in the correct position and does not exist in the code
 
The player loses if they run out of guesses.
 
## How To Play
1. To insert a color, click on one of the gray balls to turn it into a question mark ball 
2. Click on any of the color in the color container
3. Once the row is filled with colors (no gray balls or question mark balls), click the "Check" button to see your result

## Settings
Note: The player must click the "New Game" button for the settings to take effect
- The player can change the code length from 1 to 8.
- The player can allow duplicate colors in the code.

## Play
Click [here](https://darren-tham.github.io/Mastermind/) to play!

## Credits
- Thank you Momo for introducing me to the game!
