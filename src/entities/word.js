import {emit, on, onKey, Text, TextClass} from 'kontra'


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


    update(dt) {
        // TODO does not work
        const context = this
        on('clearWord', () => { // separate function does not bind this
            context.text = ''
        });
        onKey(alphabet, function (e) {
            console.log(context.text)
            context.text += e.key
            emit('onWordType', context.text)
        });


        super.update()
    }

}