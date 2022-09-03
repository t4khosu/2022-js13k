import {SpriteClass, Text} from "kontra";

export class Notebook extends SpriteClass {
    width = 230
    height = 330
    numLines = 9
    numPage = 0
    currentEnemies = []

    title = Text({
        text: 'Book of Death', font: '32px Luminari', color: 'white', x: 20, y: -50,
    })

    paginationText = Text({
        x: 8, y: 8, font: '14px Luminari', color: '#880808'
    })

    currentLine = this.numLines - 2

    textPositions = [
        ...Array(this.numLines).keys()
    ].map(x => (x * 30) + 60)

    playerName = Text({
        x: this.width / 2,
        y: 18,
        color: '#880808',
        font: '16px Luminari',
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
                c.beginPath()
                c.fillRect(0, 0, this.width, this.height)

                c.fillStyle = '#778377'
                this.textPositions.forEach(tp => c.fillRect(20, tp, 190, 1))
                this.paginationText.render()
                this.title.render()
                this.playerName.render()
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
            "names of the departed, now",
            "burned to ashes. Back to life, the",
            "dead roam these lands once more.",
            "Holder of I, collect the names of",
            "these dead and bring back order.",
            "Seal a pact, give me your first",
            "name."
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
            `${score} corpses to my realm.`,
            "",
            "Turn this page over to go back",
            "and try once again."
        ].forEach((line, pos) => this.insertLineAt(pos, line))
    }

    /**
     * Write name of player in the book of death depending on the player's health
     * @param player {Player}
     */
    updatePlayerName(player){
        let percentage = 1 - (player.health / player.maxHealth)
        this.playerName.text = player.name.substring(0,Math.floor(percentage * player.name.length));
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
        let currentLine = this.currentText()
        currentLine.text += currentLine.text.length < 30 ? key : ''
        this.currentEnemies.forEach(e => e.onType(currentLine.text.substring(2)))
    }

    /**
     * Insert a new text object at a specific notebook line.
     * @param pos {int} - Visual line position on the notebook
     * @param initialText {string} - Prefix
     */
    insertLineAt(pos, initialText){
        this.addChild(Text({
            x: 20,
            y: this.textPositions[pos] - 13,
            color: '#880808',
            font: '14px Luminari',
            text: initialText
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
