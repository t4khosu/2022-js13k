import {SpriteClass, Text} from "kontra";
import {Game} from "../game";

export class Notebook extends SpriteClass {
    width = 300
    height = 330
    numLines = 9
    numPage = 0
    currentEnemies = []

    title = Text({
        text: 'Book of Death', font: '32px Luminari', color: 'white', x: 55, y: -50,
    })

    paginationText = Text({
        x: 147, y: 313, font: '12px Luminari', color: '#880808'
    })

    currentLine = this.numLines - 2

    textPositions = [
        ...Array(this.numLines).keys()
    ].map(x => (x * 30) + 60)

    playerName = Text({
        x: this.width / 2,
        y: 18,
        color: '#880808',
        font: '13px monospace',
        text: '',
        textAlign: 'center',
        anchor: {x: 0.5, y: 0.5}
    });

    constructor(x, y) {
        super({
            x: x,
            y: y,
            render: () => {
                let c = this.context

                c.fillStyle = '#f2dcb1'
                c.fillRect(0, 0, this.width, this.height)

                c.fillStyle = '#778377'
                this.textPositions.forEach(tp => c.fillRect(20, tp, 260, 1))
                this.paginationText.render()
                this.playerName.render()
                this.title.render()

                c.fillStyle = '#554444'
                c.fillRect(20, -50, 10, 40)
                c.fillRect(10, -40, 30, 10)

                c.fillRect(270, -50, 10, 40)
                c.fillRect(260, -40, 30, 10)
            }
        });

        this.initCover()
    }

    /**
     * Create cover text for when the game starts
     */
    initCover(){
        [
            "Ancient funerary texts, holding",
            "names of the departed, now burned to",
            "ashes. Cursed to never rest, the dead",
            "roam these lands once more. Thou who",
            "holds me, collect the names of",
            "these lost souls and restore order.",
            "Seal a pact, give me thy first name."
        ].forEach((line, pos) => this.insertLineAt(pos, line))
        this.lineBreak()
    }

    /**
     * Create final page for the game over scene
     */
    initGameOver(score){
        this.numPage = 0
        this.currentLine = this.numLines - 1
        this.paginationText.text = ""
        this.x = 235
        this.children = [];

        [
            "You succumbed to the dead",
            "and entered the realm of death.",
            "",
            "You successfully returned",
            `${Game.instance.score} souls to my realm.`,
            "",
            "Turn this page to go back",
            "and try once again."
        ].forEach((line, pos) => this.insertLineAt(pos, line))
    }

    /**
     * Write name of player in the book of death depending on the player's health
     * @param player {Player}
     */
    updatePlayerName(player){
        let percentage = 1 - (player.health / player.maxHealth)
        let len = Math.floor(percentage * player.name.length)
        this.playerName.text = player.name.substring(0,len) + "_".repeat(player.name.length - len);
    }

    /**
     * Go to the next line if any space left. Otherwise, go to next page
     */
    lineBreak(){
        if(++this.currentLine % this.numLines == 0) {
            this.currentLine = 0
            this.numPage += 1
            this.paginationText.text = this.numPage + ''
            this.children = []
        }
        this.insertLineAt(this.currentLine, '› ')
    }

    /**
     * Check for key presses to write something & check if the current text matches any enemy's name
     * @param {string} key
     */
    type(key){
        key = key == " " ? "·" : key
        let currentLine = this.currentText()
        currentLine.text += currentLine.text.length < 34 ? key : ''
        let conv = currentLine.text.substring(2).replaceAll("·", " ")
        this.currentEnemies.forEach(e => e.onType(conv))
    }

    /**
     * Insert a new text object at a specific notebook line.
     * @param pos {int} - Visual line position on the notebook
     * @param initialText {string} - Prefix
     */
    insertLineAt(pos, initialText){
        this.addChild(Text({
            x: 20,
            y: this.textPositions[pos] - 11,
            color: '#880808',
            font: '12px monospace',
            text: initialText,
        }))
    }

    /**
     * Return the last child which in this case defaults to the last Text object
     * @returns {kontra.GameObject}
     */
    currentText(){
        return this.children.at(-1)
    }
}
