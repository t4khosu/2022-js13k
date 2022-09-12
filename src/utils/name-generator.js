import {randInt} from "kontra";

var firstNames = [
    'bel', 'fui', 'li', 'ces', 'echo', 'paul', 'indy', 'elle', 'kelsi', 'zalam', 'vere', 'andre', 'chelle', 'keira',
    'percy', 'zenia', 'carlton', 'rusty', 'jazmin', 'bonnie', 'carlisa', 'maree', 'hayley', 'justice', 'garret', 'aurora',
    'doreen', 'ulagella', 'olacaryn', 'chandler', 'maldrak', 'mackenzie', 'shosushah', 'talrandroll', 'andresh', 'drimvildoot',
]

var lastNames = [
    'pei', 'mu', 'chu', 'rue', 'june', 'brion', 'thelma', 'davin', 'keaton', 'annice', 'darwin',
    'briella', 'dianne', 'saundra', 'gerrard', 'janella', 'cassandra', 'melody', 'brittney'
]

let titles = ['cold', 'wind', 'forgotten', 'hateful']

let locations = ['tobria', 'anarim', 'rabia']

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
    difficulty = Math.max(Math.min(difficulty-5, window * 2) - 1, 0)
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
    else if(difficulty > 10 && Math.random() > 0.7){
        name += ' from ' + selectByDifficulty(difficulty, locations)
    }

    return name
}