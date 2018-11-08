# Spock-Rock-Paper-Scissors-Lizard

## Description

This is a variation of the Rock, Paper, Scissors game that includes Spock and Lizard gestures as part of the player options. Since this is a less used version I have included a image that shows which gestures win over which other gestures. There is also a chat functionality with message pop-ups to opposite player.

## Usage

The game is used for entertainment with another player. The game begins with players enter there name.
[User Input](assets/images/markdown-images/User-Name.png)
Next, there is the game area with gestures options to be selected. [Playmap](assets/images/markdown-images/Playmap.png)
There is a message area is opened via a message icon. [Chat Bubble](assets/images/markdown-images/Chat-Bubble.png)
Once the chat bubble is clicked the message area opens. [Message Area](assets/images/markdown-images/Message-Area.png)
When messages are sent to player with chat area closed, the message can be seen from as a popup. [Popup Message](assets/images/markdown-images/Popup-Message.png)

## Design -Frontend

### HTML

The design simplistic, with material design implementation via Materialize CSS plugin. A modal is used to take in user name input. The main game area is a card with an image that also displays which options win against the other options.

The text area at the top of the card is cycled to show the necessary message needed for the moment. Messages are slightly player specific by design. Second player does not need to see "waiting on another player."

The message area is a sidenav with a scrolling messages. Just like before the player that sends messages does not need to see popup message if they have sent it.

The game area has an area map to create the click handling function. Also thanks to another github user the area map was resize via a jquery file. Unfortunately, due to the design the game would clear map coordinates. As a fix the game will trigger a resize at a certain point.

### Javascript & JQuery

Username is store in local storage for convience. Once the username is added it will autofill from the saved name.

Next, the modal is hidden using a hide class attribute, and game area then has the hide class removed. This also brings with it the chat button.

The chat sidenav uses Materialize javascript method to activate the open and closing. As part of the functionality of the messaging system if the sidenav is closed, and the opposing player messages a toast will popup with the player name and message sent.

The game verifies whether the player has an opponent and if not prompts that player is waiting for another player. Only one player should receive this message. Once second player has choosen gesture game immediately compares and states winner, or draw.

### Backend

All messages and gameplay information is stored on Firebase Database. Both pieces of data are set to empty when needed. If the browser is unloaded via page refresh, closing tab, or closing browser chat history is wiped.

## Support

git.vega@gmail.com

## Contributing

If you choose to contribute to this in any way everything is saved to the repository. The only knowledge need outside of said repository is reading and utilizing [Materialize's Documentation.](https://materializecss.com/)

## Authors and acknowledgment

Carl Vega - Overall design

Andrea Vega - Wicked smarts

Matt Stow - [JQuery plugin](https://github.com/stowball/jQuery-rwdImageMaps)

## License

Open Source

## Project status

At the moment there is not an intention to expand the game, but I may add more later after realizing it needs to be and can be improved.
