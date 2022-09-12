import {randInt} from "kontra";
import {BeamPool} from "../bullet-pool";
import {Level} from "../level";

export class EnemyPattern {

    ticks = 1
    pools = []
    movement

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


export function getBasicPool(arrays) {
    const pool = new BeamPool()
    pool.arrays = arrays
    pool.arraySpread = 360 / arrays
    return pool
}

export function addSpin(pool, difficulty, inverse) {
    pool.spinRate = 1 + difficulty
}


export function generatePools(difficulty) {
    const pools = []
    let difficultyScore = difficulty
    while (difficultyScore > 0) {
        const arrays = randInt(1, Math.min(Math.ceil(difficultyScore / 2), 6))
        difficultyScore -= arrays
        const pool = getBasicPool(arrays)
        if (difficultyScore >= 0) {
            const spin = randInt(0, Math.min(Math.ceil(difficultyScore / 2), 6))
            difficultyScore -= spin
            addSpin(pool, spin, pools.length % 2 === 1)
        }
        const reverse = randInt(0, 5)
        if (reverse < 2) {
            pool.inverseSpin = randInt(45, 120)
        }
        pools.push(pool)
    }
    return pools
}

