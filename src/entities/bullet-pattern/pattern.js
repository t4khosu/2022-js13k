import {randInt} from "kontra";
import {BeamPool} from "../bullet-pool";

export function getBasicPool(arrays) {
    const pool = new BeamPool()
    pool.arrays = arrays
    pool.arraySpread = 360 / arrays
    return pool
}

export function addSpin(pool, difficulty, inverse) {
    pool.spinRate = 1 + difficulty
}

export function getPatterns(difficulty) {
    debugger
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
        if (reverse < 1) {
            pool.inverseSpin = randInt(45, 120)
        }
        pools.push(pool)
    }
    return pools
}

