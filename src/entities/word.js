import {on, onKey, Text, TextClass} from 'kontra'


const alphabet = []
for (var i = 97; i < 123; i++)
    alphabet.push(String.fromCharCode(i));

export class Word extends TextClass {

    font = '16px Luminari '
    color = 'black'
    x = 0
    y = 0

    constructor() {
        super();

    }

    clearText() {
        this.text = ''
    }

    update(dt) {
        // TODO does not work
        on('clearWord', this.clearText);
        const context = this
        onKey(alphabet, function (e) {
            console.log(context.text)
            context.text += e.key
        });


        super.update()
    }

}