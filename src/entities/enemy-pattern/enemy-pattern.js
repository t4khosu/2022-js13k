import {randInt} from "kontra";
import {chaseMovement, getMovement} from "./pattern";
import {getPools} from "../bullet-pattern/pattern";

export class EnemyPattern {
    ticks = 1
    pools = []
    movement = chaseMovement()

    togglePools(bool){
        this.pools.forEach((pool) => {
            pool.active = bool
        })
    }

}

export function getPatterns(difficulty) {
    const patterns = []
    let difficultyScore = difficulty
    while (difficultyScore > 0) {
        const pattern = new EnemyPattern()
        pattern.ticks = randInt(120, 240)
        pattern.movement = getMovement(difficultyScore)

        const cost = randInt(3, Math.max(difficultyScore, 4))
        pattern.pools = getPools(cost)
        patterns.push(pattern)
        difficultyScore -= cost
    }
    return patterns.reverse()
}