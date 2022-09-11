import {randInt} from "kontra";

var firstNames = [
    'Aa', 'Ab', 'Ac', 'Ad', 'Ae', 'Af', 'Ag', 'Ah', 'Ai', 'Aj',
    'Ba', 'Bb', 'Bc', 'Bd', 'Be', 'Bf', 'Bg', 'Bh', 'Bi', 'Bj',
    'Ca', 'Cb', 'Cc', 'Cd', 'Ce', 'Cf', 'Cg', 'Ch', 'Ci', 'Cj',
]

var lastNames = ['Aa', 'Ab', 'Ac', 'Ad', 'Ae', 'Af', 'Ag', 'Ah', 'Ai', 'Aj']

let titles = ['cold', 'wind', 'forgotten', 'hateful']

let locations = ['Aa', 'Ab', 'Ac']

// function capitalCase(string) {
//     return string.charAt(0).toUpperCase() + string.slice(1);
// }


/**
 * Get a random element from a list depending on the difficulty setting. The higher the difficulty is the more likely
 * it is to return an element that is closer to the end of the array
 * @param difficulty {int}
 * @param data {array}
 * @returns {string} - random element from data depending on the difficulty
 */
function selectByDifficulty(difficulty, data){
    let window = Math.floor(data.length / 3)
    difficulty = Math.min(difficulty, window * 2) - 1
    return data[randInt(difficulty, window + difficulty)]
}

/**
 * Generate the name of an enemy
 * @param difficulty {int}
 * @returns {string}
 */
export function generateNameByDifficulty(difficulty){
    let firstName = selectByDifficulty(difficulty, firstNames)
    let lastName = selectByDifficulty(difficulty, lastNames)

    let name = firstName + ' ' + lastName

    if(difficulty > 5 && Math.random() > 0.6){
        name += ' the ' + selectByDifficulty(difficulty, titles)
    }

    if(difficulty > 10 && Math.random() > 0.7){
        name += ' from ' + selectByDifficulty(difficulty, locations)
    }

    return name
}