import {randInt, degToRad} from "kontra";




export function getMovement(difficulty){
    const movements = [straightMovement(randInt(1,2) === 1 )]
    if (difficulty > 5){
        movements.push(chaseMovement())
    }
    if (difficulty > 10){
        const radius = randInt(30, 60-difficulty)
        movements.push(circleMovement(radius))
    }
    return movements[randInt(0, movements.length - 1)]
}


export function circleMovement(radius) {
    return (go, speed) => {
        const player = go.level.player

        const distance = Math.sqrt((Math.pow((go.x-player.x),2)  + Math.pow((go.y-player.y), 2)))
        const distanceDiff = 1/100 * (radius - distance)

        let angle = Math.atan2( go.y-player.y, go.x-player.x ) * ( 180 / Math.PI )
        angle = degToRad(angle +1)
        const circleX = player.x + Math.cos(angle) * (distance + distanceDiff)
        const circleY = player.y + Math.sin(angle) * (distance +distanceDiff)

        go.x = circleX
        go.y =  circleY
    }
}

export function chaseMovement() {
    return (go, speed) => {
        const player = go.level.player
        const xDiff = player.x - go.x
        const yDiff = player.y - go.y
        go.x += 1/(500 -speed*100) * xDiff
        go.y += 1/(500 -speed*100) * yDiff
    }
}

 export function straightMovement(horizontal) {
    return (go, speed) => {
        const padding = 20
        let max = go.level.height
        if (horizontal) {
            max = go.level.width
            if (go.x <= padding || go.x >= max - padding) go.dx *= -1
            go.x += go.dx * speed
        } else {
            if (go.y <= padding || go.y >= max - padding) go.dy *= -1
            go.y += go.dy * speed
        }
    }
}
