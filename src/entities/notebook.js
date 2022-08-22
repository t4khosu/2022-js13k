import {onKey, SpriteClass, Text, emit} from "kontra";

const alphabet = ['space', ...[...Array(26).keys()].map(c => String.fromCharCode(c + 97))]

export class Notebook extends SpriteClass {
    x = 400
    y = 60
    width = 220
    height = 330
    textPositions = [...Array(9).keys()].map(x => (x * 30) + 60)
    numPage = 0

    pageText = Text({x: this.width / 2, y: 7, font: '14px Luminari'})
    currentWord
    currentRow = -1

    enemies = []

    constructor() {
        super({
            render: () => {
                let c = this.context
                c.fillStyle = '#f2dcb1'
                c.beginPath()
                c.fillRect(0, 0, this.width, this.height)

                c.fillStyle = '#778377'
                this.textPositions.forEach(t => c.fillRect(20, t, this.width - 40, 1))
                this.pageText.render()
            },
        });
        this.newRow()
    }

    newRow(){
        (this.currentRow = (this.currentRow + 1) % this.textPositions.length) == 0 && this.clear()

        this.currentWord = Text({
            x: 20, y: this.textPositions[this.currentRow] - 16,
            color: '#16264c',
            font: '16px Luminari',
            text: '• ',
        })

        this.addChild(this.currentWord)
    }

    clear(){
        this.numPage += 1
        this.children = []
    }

    update(){
        this.pageText.text = this.numPage + ''

        onKey('enter', () => this.newRow())
        onKey(alphabet, (e) => {
            this.currentWord.text += this.currentWord.text.length < 19 ? e.key : ''
            this.enemies.forEach(e => e.onType(this.currentWord.text.substring(2)))
        })
        super.update()
    }
}
