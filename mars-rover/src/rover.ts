const compass: string[] = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
const turnInstructions: string = 'LR';
const moveInstructions: string = 'FB';

class Rover {
  private position: number[];
  private currentDirection: string;
  private obstacleList?: number[][];
  private hasObstacle: boolean;

  constructor(
    x: number,
    y: number,
    direction: string,
    obstacles: number[][] = []
  ) {
    this.position = [x, y];
    this.currentDirection = direction;
    this.obstacleList = obstacles;
    this.hasObstacle = false;
  }

  get coordinates(): number[] {
    return this.position;
  }

  get direction(): string {
    return this.currentDirection;
  }

  get obstacles(): number[][] | number[] {
    return this.obstacleList || [];
  }

  get status(): string {
    return this.hasObstacle ? 'STOPPED' : 'OK';
  }

  private setDirection(direction: string): boolean {
    const currentDirectionIndex = compass.indexOf(this.currentDirection);
    const directionLen = compass.length;
    const nextDirectionIndex =
      (directionLen + currentDirectionIndex + (direction === 'R' ? 1 : -1)) %
      directionLen;

    this.currentDirection = compass[nextDirectionIndex];
    return true;
  }

  private isObstacle(x: number, y: number): boolean {
    this.hasObstacle = !!this.obstacleList?.find(
      coordinate => coordinate[0] === x && coordinate[1] === y
    )?.length;

    return this.hasObstacle;
  }

  private shift(
    pos: number,
    instruction: string,
    reverse: boolean = false
  ): number {
    if (instruction === 'F') {
      return pos + (reverse ? -1 : 1);
    }

    return pos + (reverse ? 1 : -1);
  }

  private shiftPosition(instruction: string): boolean {
    const { currentDirection } = this;
    const [x, y] = this.position;
    let newY: number = y;
    let newX: number = x;

    if (currentDirection === 'NORTH') newY = this.shift(y, instruction);
    else if (currentDirection === 'EAST') newX = this.shift(x, instruction);
    else if (currentDirection === 'SOUTH')
      newY = this.shift(y, instruction, true);
    else if (currentDirection === 'WEST')
      newX = this.shift(x, instruction, true);

    if (this.isObstacle(newX, newY)) {
      return false;
    }
    this.position = [newX, newY];
    return true;
  }

  translateInstructions(instructions: string[]): void {
    instructions.every(instruction => {
      if (turnInstructions.includes(instruction)) {
        return this.setDirection(instruction);
      } else if (moveInstructions.includes(instruction)) {
        return this.shiftPosition(instruction);
      } else {
        throw new Error('Invalid instruction provided');
      }
    });
  }

  move(instructions: string): void {
    if (instructions) {
      const instructionsList: string[] = instructions.split('');
      this.translateInstructions(instructionsList);
    }
  }
}

export default Rover;
