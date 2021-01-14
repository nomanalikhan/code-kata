import BowlingGame from '../src/bowling-game';

describe('bowling game', () => {
  let game: any;

  function rollMany(pins: number, rolls: number) {
    for (let i = 0; i < rolls; i++) {
      game.roll(pins);
    }
  }

  beforeEach(() => {
    game = new BowlingGame();
  });

  it('should return 0 for a game of all zeros', () => {
    rollMany(0, 20);

    expect(game.score).toEqual(0);
  });

  it('should return 20 for a game of all ones', () => {
    rollMany(1, 20);

    expect(game.score).toEqual(20);
  });

  it('should return correct score when a spare is rolled', () => {
    game.roll(5);
    game.roll(5);
    game.roll(3);
    rollMany(0, 17);

    expect(game.score).toEqual(16);
  });

  it('should return correct score when a strike is rolled', () => {
    game.roll(10);
    game.roll(1);
    game.roll(1);
    rollMany(0, 17);

    expect(game.score).toEqual(14);
  });
});
