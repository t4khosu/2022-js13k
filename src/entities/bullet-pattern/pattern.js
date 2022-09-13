import {randInt} from "kontra";
import {BeamPool} from "../bullet-pool";

export function getBasicPool(arrays, color) {
    const pool = new BeamPool(color)
    pool.arrays = arrays
    pool.arraySpread = 360 / arrays
    return pool
}

export function addSpin(pool, difficulty, inverse) {
    pool.spinRate = 1 + difficulty
}

export function addFirerate(pool, difficulty){
    pool.fireRate = Math.floor(20 - Math.abs(-5 * Math.log(difficulty+3) + 6))
}

export function getPools(cost, color){
    let account = cost
    const pools = []
    while (account > 0) {
        const arrays = randInt(1, Math.min(Math.ceil(account / 2), 6))
        account -= arrays
        const pool = getBasicPool(arrays, color)
        addFirerate(pool, Math.min(50, cost))
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


