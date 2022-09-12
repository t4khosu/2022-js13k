import {randInt} from "kontra";
import {BeamPool} from "../bullet-pool";
import {chaseMovement, circleMovement, EnemyPattern, straightMovement} from "../enemy-pattern/pattern";

export function getBasicPool(arrays) {
    const pool = new BeamPool()
    pool.arrays = arrays
    pool.arraySpread = 360 / arrays
    return pool
}

export function addSpin(pool, difficulty, inverse) {
    pool.spinRate = 1 + difficulty
}

export function addFirerate(pool, difficulty){
    debugger
    pool.fireRate = Math.floor(20 - Math.abs(-5 * Math.log(difficulty+3) + 6))
}

export function getPools(cost){
    let account = cost
    const pools = []
    while (account > 0) {
        const arrays = randInt(1, Math.min(Math.ceil(account / 2), 6))
        account -= arrays
        const pool = getBasicPool(arrays)
        addFirerate(pool, cost)
        if (account >= 0) {
            const spin = randInt(0, Math.min(Math.ceil(account / 2), 6))
            account -= spin
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


