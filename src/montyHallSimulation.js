/**
 * Simulates a single game of the Monty Hall problem.
 * @param {boolean} makeSwitch - Whether the player switches their choice after a goat is revealed.
 * @param {number} nDoors - The number of doors in the game.
 * @returns {boolean} - Whether the player won the game.
 */
export function simulateGame(makeSwitch = false, nDoors = 3) {
    // Randomly choose a door that hides the prize
    const prizeIndex = Math.floor(Math.random() * nDoors);
  
    // Randomly choose a door as the player's initial choice
    const choiceIndex = Math.floor(Math.random() * nDoors);
  
    // Determine if the player's initial choice is correct
    const currentResult = prizeIndex === choiceIndex;
  
    if (makeSwitch) {
      // If the player chooses to switch, they win if their initial choice was incorrect
      return !currentResult;
    } else {
      // If the player does not switch, they win if their initial choice was correct
      return currentResult;
    }
  }
  
  /**
   * Simulates multiple games of the Monty Hall problem.
   * @param {number} nGames - The number of games to simulate.
   * @param {boolean} makeSwitch - Whether the player switches their choice after a goat is revealed.
   * @returns {Array<boolean>} - An array of results where each element is whether the player won that game.
   */
  export function simulateMultipleGames(nGames = 1000, makeSwitch = false) {
    const results = [];
    for (let i = 0; i < nGames; i++) {
      results.push(simulateGame(makeSwitch));
    }
    return results;
  }
  