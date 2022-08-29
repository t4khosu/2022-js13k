import {SpriteClass, Text} from "kontra";

const coverText = [
    "Ancient funerary texts, holding",
    "names of the departed, now",
    "burned to ashes. Back to life, the",
    "dead roam these lands once more.",
    "Holder of I, collect the names of",
    "these dead and bring back order.",
    "Seal a pact, give me your first",
    "name."
]

export class Notebook extends SpriteClass {
    width = 230
    height = 330
    numLines = 9
    numPage = 0
    currentLine = 16

    textPositions = [...Array(this.numLines).keys()].map(x => (x * 30) + 60)
    paginationText = Text({
        x: 8, y: 8, font: '14px Luminari', color: '#880808'
    })

    enemies = []

    title = Text({
        text: 'Book of Death',
        font: '32px Homemade Apple',
        color: 'white',
        x: 20,
        y: -50,
    })

    name = ''

    nameText = Text({
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
                this.nameText.render()
            }
        });
        this.initCover()
    }

    initCover(){
        coverText.forEach((ct, i) => this.addLineAt(i, ct))
        this.nextLine()
    }

    addHit(health, maxHealth){
        this.nameText.text = this.name.substring(0,Math.floor(((maxHealth - health) / maxHealth) * this.name.length));
    }

    nextLine(){
        (this.currentLine = (this.currentLine + 1) % this.numLines) == 0 && this.nextPage()
        this.paginationText.text = this.numPage > 0 ? this.numPage + '' : ''
        this.addLineAt(this.currentLine, '› ')
    }

    nextPage(){
        this.numPage += 1
        this.children = []
    }

    addLineAt(pos, text){
        this.addChild(Text({
            x: 20,
            y: this.textPositions[pos] - 13,
            color: '#880808',
            font: '14px Luminari',
            text: text
        }))
    }

    onWrite(key){
        let current = this.children.at(-1)
        current.text += current.text.length < 19 ? key : ''
        this.enemies.forEach(e => e.onType(current.text.substring(2)))
    }
}
