import {onKey, SpriteClass, Text} from "kontra";

export class Notebook extends SpriteClass {
    width = 230
    height = 330
    textPositions = [...Array(9).keys()].map(x => (x * 30) + 60)
    numPage = 0

    pageText = Text({x: this.width / 2, y: 7, font: '14px Luminari', color: '#880808'})
    currentWord
    currentRow = 16

    enemies = []

    title = Text({
        text: 'Book of Death',
        font: '32px Homemade Apple',
        color: 'white',
        x: 110,
        y: -40,
        anchor: {x: 0.5, y: 0.5},
        dy: 0.5,
        textAlign: 'center',
    })

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
                this.textPositions.forEach(t => c.fillRect(20, t, this.width - 40, 1))
                this.pageText.render()
                this.title.render()
            },
        });

        let intro = [
            "Ancient funerary texts, holding",
            "names of the departed, now",
            "burned to ashes. Back to life, the",
            "dead roam these lands once more.",
            "Holder of I, collect the names of",
            "these dead and bring back order.",
            "Seal a pact, give me your name."
        ]

        intro.forEach((text, i) => this.addChild(Text({
            x: 20, y: this.textPositions[i] - 13,
            color: '#880808',
            font: '14px Luminari',
            text: text,
        })))
        this.newLine()
    }

    newLine(){
        (this.currentRow = (this.currentRow + 1) % this.textPositions.length) == 0 && this.clear()

        this.currentWord = Text({
            x: 20, y: this.textPositions[this.currentRow] - 13,
            color: '#880808',
            font: '14px Luminari',
            text: '› '
        })

        this.addChild(this.currentWord)
    }

    clear(){
        this.numPage += 1
        this.children = []
    }

    onEnter(){
        this.newLine()
    }

    onLetter(key){
        this.currentWord.text += this.currentWord.text.length < 19 ? key : ''
        this.enemies.forEach(e => e.onType(this.currentWord.text.substring(2)))
    }

    update(){
        this.pageText.text = this.numPage > 0 ? this.numPage + '' : ''
        super.update()
    }
}
