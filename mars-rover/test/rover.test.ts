import Rover from '../src/rover';

describe('Rover', () => {
  let rover: any;
  beforeEach(() => {
    rover = new Rover(0, 0, 'EAST');
  });

  describe('Given the initial starting point of a rover and the direction', () => {
    it('should have a starting coordinates at (x=0, y=0)', () => {
      expect(rover.coordinates).toEqual([0, 0]);
    });

    it('should have a starting position towards EAST', () => {
      expect(rover.direction).toBe('EAST');
    });
  });

  describe('Throws error', () => {
    it('when an invalid move is provided', () => {
      expect(() => rover.move('X')).toThrow('Invalid instruction provided');
    });
  });

  describe('When receives the rotating instruction(s)', () => {
    beforeEach(() => {
      expect(rover.direction).toBe('EAST');
    });

    it('should change direction to SOUTH on R instruction(s)', () => {
      rover.move('R');
      expect(rover.direction).toBe('SOUTH');
    });

    it('should have make a 180 degree rotation to WEST on RR instruction(s)', () => {
      rover.move('RR');
      expect(rover.direction).toBe('WEST');
    });

    it('should change direction to NORTH on L instruction(s)', () => {
      rover.move('L');
      expect(rover.direction).toBe('NORTH');
    });

    it('should change direction to WEST on LL instruction(s)', () => {
      rover.move('LL');
      expect(rover.direction).toBe('WEST');
    });
  });

  describe('should move on given array of instruction(s)', () => {
    it('should change direction one step ahead at EAST', () => {
      rover.move('FL');
      expect(rover.coordinates).toEqual([1, 0]);
      expect(rover.direction).toBe('NORTH');
    });

    it('should follow FLLF instructions and end up on the same place facing on opposite direction', () => {
      rover.move('FLLF');
      expect(rover.coordinates).toEqual([0, 0]);
      expect(rover.direction).toBe('WEST');
    });

    it('should follow FLFFFRFLB instructions facing on NORTH direction', () => {
      rover.move('FLFFFRFLB');
      expect(rover.coordinates).toEqual([2, 2]);
      expect(rover.direction).toBe('NORTH');
    });
  });

  describe('should detect obstacles before move', () => {
    const obstacles: number[][] = [
      [1, 4],
      [3, 5],
      [7, 4],
    ];

    beforeEach(() => {
      rover = new Rover(0, 0, 'EAST', obstacles);
    });

    it('should assign obstacles', function() {
      expect(rover.obstacles).toEqual(obstacles);
    });

    it('should use empty array when obstacles are not assigned', function() {
      rover = new Rover(0, 0, 'EAST');
      expect(rover.obstacles.length).toEqual(0);
    });

    it('should not move without any obstacle', () => {
      rover.move('FFFFLFLL');
      expect(rover.coordinates).toEqual([4, 1]);
      expect(rover.direction).toBe('SOUTH');
      expect(rover.status).toBe('OK');
    });
    it('should not move to the obstacle', () => {
      rover.move('FFFFFLFFFFFLFF');
      expect(rover.coordinates).toEqual([4, 5]);
      expect(rover.direction).toBe('WEST');
      expect(rover.status).toBe('STOPPED');
    });
  });
});
