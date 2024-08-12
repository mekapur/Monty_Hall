<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
  
    let count, index, offset, progress;
  
    // Game state
    let doors = [1, 2, 3];
    let chosenDoor = null;
    let winningDoor = null;
    let hostDoor = null;
    let switched = false;
    let result = null;
    let revealed = false;
    let doorSwitched = false;
  
    // Images
    let doorImage = 'static/door.png';  // Path to the door image in the static directory
    let goatImage = 'static/goat.png';  // Path to the goat image in the static directory
    let carImage = 'static/car.png';    // Path to the car image in the static directory
  
    const chooseDoor = (door) => {
      chosenDoor = door;
      hostDoor = doors.find(d => d !== chosenDoor && d !== winningDoor);
    };
  
    const switchDoor = () => {
      setTimeout(() => {
        chosenDoor = doors.find(d => d !== chosenDoor && d !== hostDoor);
        switched = true;
        doorSwitched = true;
      }, 500); // 1 second delay
    };
  
    const reveal = () => {
      setTimeout(() => {
        result = chosenDoor === winningDoor ? 'Win' : 'Lose';
        revealed = true;
      }, 500); // 1 second delay
    };
  
    const resetGame = () => {
      chosenDoor = null;
      winningDoor = doors[Math.floor(Math.random() * doors.length)]; // Randomize winning door
      hostDoor = null;
      switched = false;
      result = null;
      revealed = false;
      doorSwitched = false;
    };
  
    onMount(resetGame);
  </script>
  
  <div class="section">
    <div>
      <h2>Iteration of the Game</h2>
    </div>
    <div class="content">
      {#if !chosenDoor}
        <p>Choose a door:</p>
        <div class="doors">
          {#each doors as door}
            <div class="door" on:click={() => chooseDoor(door)}>
              <img src={doorImage} alt={`Door ${door}`} />
            </div>
          {/each}
        </div>
      {:else if !result}
        <p>Host opens door {hostDoor}.</p>
        <div class="doors">
          {#each doors as door}
            <div class="door {chosenDoor === door ? 'chosen' : ''}" on:click={() => chosenDoor === door && !revealed ? reveal() : null}>
              {#if door === hostDoor}
                <img src={goatImage} alt="Goat" />
              {:else if revealed && door === chosenDoor}
                <img src={door === winningDoor ? carImage : goatImage} alt={door === winningDoor ? 'Car' : 'Goat'} />
              {:else}
                <img src={doorImage} alt={`Door ${door}`} />
              {/if}
            </div>
          {/each}
        </div>
        <div class="buttons">
          {#if !doorSwitched}
            <button class = "styled-button" on:click={switchDoor}>Switch Door</button>
          {/if}
          <button class = "styled-button" on:click={reveal}>Reveal</button>
        </div>
      {:else}
        <p>You {result}!</p>
        <div class="doors">
          {#each doors as door}
            <div class="door {chosenDoor === door ? 'chosen' : ''}">
              {#if door === chosenDoor}
                <img src={door === winningDoor ? carImage : goatImage} alt={door === winningDoor ? 'Car' : 'Goat'} />
              {:else if door === hostDoor}
                <img src={goatImage} alt="Goat" />
              {:else}
                <img src={door === winningDoor ? carImage : goatImage} alt={door === winningDoor ? 'Car' : 'Goat'} />
              {/if}
            </div>
          {/each}
        </div>
        <div class="buttons">
          <button class = "styled-button" on:click={resetGame}>Play Again</button>
        </div>
      {/if}
    </div>
  </div>
  <style>
    .small-visualization {
      width: 80%; /* Adjust width as needed */
      max-width: 500px; /* Set a maximum width if needed */
      margin: 0 auto; /* Center the visualization horizontally */
    }
  
    .section {
      height: 50vh; /* Full height of the viewport */
      overflow-y: auto; /* Enable scrolling within each section */
      display: flex; /* Use flexbox to center content vertically */
      flex-direction: column; /* Stack content vertically */
      justify-content: center; /* Center content horizontally */
      align-items: center; /* Center content vertically */
      text-align: center; /* Center text horizontally */
      padding: 10px; /* Add padding for better readability */
      color: black; /* Text color for better readability against gradient */
    }
  
    .section h2 {
      font-size: 2.5rem; /* Larger font size for headings */
      font-family: 'Times New Roman', Times, serif;
    }
  
    .section p {
      font-size: 1.5rem; /* Larger font size for paragraphs */
      padding: 15px;
      font-family: 'Times New Roman', Times, serif;
    }
  
    .doors {
      display: flex;
      justify-content: center;
      gap: 20px;
    }
  
    .door {
      cursor: pointer;
      transition: transform 0.5s; /* Smooth transition for scaling */
    }
  
    .door:hover {
      transform: scale(1.1); /* Slightly enlarge the door on hover */
    }
  
    .chosen {
      transform: scale(1.1); /* Keep the chosen door enlarged */
    }
  
    .door img {
      width: 100px;
      height: 150px;
    }
  
    .hidden {
      display: none;
    }
  
    .styled-button {
    border: 2px solid #000;
    padding: 5px 10px;
    font-size: 14px;
    background-color: #f8f9fa;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 10px;
  }

  .styled-button:hover {
    background-color: #e2e6ea;
  }
  
    #histogram {
      margin-top: 20px; /* Ensures spacing below the text */
    }
  </style>