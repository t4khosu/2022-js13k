import {randInt} from "kontra";
import {chaseMovement, getMovement} from "./pattern";
import {getPools} from "../bullet-pattern/pattern";

export class EnemyPattern {
    ticks = 1
    pools = []
    movement = chaseMovement()
}

export function getPatterns(difficulty) {
    const patterns = []
    let difficultyScore = difficulty
    while (difficultyScore > 0) {
        const pattern = new EnemyPattern()
        pattern.ticks = randInt(30, 120)
        pattern.move = getMovement(difficultyScore)

        const cost = randInt(3, Math.max(difficultyScore, 4))
        pattern.pools = getPools(cost)
        patterns.push(pattern)
        difficultyScore -= cost
    }
    return patterns
}