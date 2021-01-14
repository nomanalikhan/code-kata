const MAX_PINS: number = 10;

class BowlingGame {
  rolls: number[];

  constructor() {
    this.rolls = [];
  }

  roll(pins: number) {
    this.rolls.push(pins);
  }

  private isSpare(frameScore: number): boolean {
    return frameScore === MAX_PINS;
  }

  private spareBonus(rollIndex: number): number {
    return MAX_PINS + this.rolls[rollIndex + 2];
  }

  private isStrike(roll: number): boolean {
    return roll === MAX_PINS;
  }

  private strikeBonus(rollIndex: number): number {
    return MAX_PINS + this.rolls[rollIndex + 1] + this.rolls[rollIndex + 2];
  }

  get score() {
    let score = 0;
    let rollIndex = 0;

    for (let frameIndex = 0; frameIndex < 10; frameIndex++) {
      if (this.isStrike(this.rolls[rollIndex])) {
        score += this.strikeBonus(rollIndex);
        rollIndex++;
        continue;
      }

      const frameScore = this.rolls[rollIndex] + this.rolls[rollIndex + 1];

      score += this.isSpare(frameScore)
        ? this.spareBonus(rollIndex)
        : frameScore;

      rollIndex += 2;
    }

    return score;
  }
}

export default BowlingGame;
