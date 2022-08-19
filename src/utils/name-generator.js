var firstNames = ['Nok']

var lastNames = ['Shou']

var infixes = ['the']

var titles = ['cold', 'wind', 'forgotten']


function capitalCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function generateName() {
    let name = capitalCase(firstNames[getRandomInt(0, firstNames.length)])

    let choice = getRandomInt(0, 4)
    if (choice <= 2) {
        name += ` ${capitalCase(lastNames[getRandomInt(0, lastNames.length)])}`
    }

    choice = getRandomInt(0, 5)
    if (choice <= 1) {
        name += ` ${infixes[getRandomInt(0, infixes.length)]}`
        name += ` ${capitalCase(titles[getRandomInt(0, titles.length)])}`
    }

    return name
}