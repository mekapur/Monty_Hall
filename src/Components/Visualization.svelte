<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import { simulateMultipleGames } from '../montyHallSimulation';

    let nGames = 1000;
    let resultsWithSwitching = [];
    let resultsWithoutSwitching = [];

    const runSimulation = () => {
        resultsWithSwitching = simulateMultipleGames(nGames, true);
        resultsWithoutSwitching = simulateMultipleGames(nGames, false);
        drawChart();
    };

    const drawChart = () => {
        const games = d3.range(1, nGames + 1);
        const cumulativeSwitching = d3.cumsum(resultsWithSwitching);
        const cumulativeNotSwitching = d3.cumsum(resultsWithoutSwitching);

        const svg = d3.select("#chart").attr("width", 800).attr("height", 400); // Adjust size
        svg.selectAll("*").remove();

        const margin = { top: 20, right: 30, bottom: 50, left: 60 }; // Adjusted margins
        const width = +svg.attr("width") - margin.left - margin.right;
        const height = +svg.attr("height") - margin.top - margin.bottom;

        const x = d3.scaleLinear().domain([0, nGames]).range([0, width]);
        const y = d3.scaleLinear().domain([0, nGames]).range([height, 0]);

        const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        g.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).ticks(10).tickSize(-height));

        g.append("g")
            .call(d3.axisLeft(y).ticks(10).tickSize(-width));

        const area = d3.area()
            .x(d => x(d))
            .y0(d => y(cumulativeNotSwitching[d - 1]))
            .y1(d => y(cumulativeSwitching[d - 1]));

        g.append("path")
            .datum(games)
            .attr("fill", "purple")
            .attr("fill-opacity", 0.3)
            .attr("d", area);

        const lineSwitching = g.append("path")
            .datum(games)
            .attr("fill", "none")
            .attr("stroke", "blue")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line().x(d => x(d)).y(d => y(cumulativeSwitching[d - 1])));

        const lineNotSwitching = g.append("path")
            .datum(games)
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line().x(d => x(d)).y(d => y(cumulativeNotSwitching[d - 1])));

        // Adding a legend
        const legend = svg.append("g")
            .attr("transform", `translate(${width - 80}, ${20})`); // Adjusted position

        legend.append("rect")
            .attr("width", 140) // Increased width
            .attr("height", 70) // Increased height
            .attr("fill", "white")
            .attr("stroke", "black");

        legend.append("line")
            .attr("x1", 10)
            .attr("y1", 20)
            .attr("x2", 30)
            .attr("y2", 20)
            .attr("stroke", "blue")
            .attr("stroke-width", 2);

        legend.append("text")
            .attr("x", 35)
            .attr("y", 20)
            .attr("dy", ".35em")
            .style("text-anchor", "start")
            .text("Switching");

        legend.append("line")
            .attr("x1", 10)
            .attr("y1", 50)
            .attr("x2", 30)
            .attr("y2", 50)
            .attr("stroke", "red")
            .attr("stroke-width", 2);

        legend.append("text")
            .attr("x", 35)
            .attr("y", 50)
            .attr("dy", ".35em")
            .style("text-anchor", "start")
            .text("Sticking");

        // Adding interactivity - highlighting and tooltip
        const focus = g.append("g").style("display", "none");

        focus.append("circle").attr("r", 4.5);

        const tooltip = svg.append("foreignObject")
            .attr("class", "tooltip")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 150)
            .attr("height", 100)
            .style("opacity", 0);

        const tooltipDiv = tooltip.append("xhtml:div")
            .style("font-size", "12px")
            .style("background", "white")
            .style("border", "1px solid black")
            .style("padding", "5px")
            .style("border-radius", "5px")
            .style("text-align", "left");

        // Adding hover effect to the area
        g.selectAll(".area-hover")
            .data(games)
            .enter()
            .append("rect")
            .attr("class", "area-hover")
            .attr("x", d => x(d) - 1)
            .attr("width", 2)
            .attr("y", 0)
            .attr("height", height)
            .attr("fill", "none")
            .attr("pointer-events", "all")
            .on("mouseover", function(event, d) {
                focus.style("display", null);
                tooltip.style("opacity", 1);
            })
            .on("mouseout", function() {
                focus.style("display", "none");
                tooltip.style("opacity", 0);
            })
            .on("mousemove", function(event, d) {
                const mouse = d3.pointer(event);
                const x0 = Math.round(x.invert(mouse[0]));
                const switchWins = cumulativeSwitching[x0 - 1];
                const stickWins = cumulativeNotSwitching[x0 - 1];
                const difference = switchWins - stickWins;
                const switchPercentage = ((switchWins / nGames) * 100).toFixed(2);
                const stickPercentage = ((stickWins / nGames) * 100).toFixed(2);
                const percentageDifference = ((difference / nGames) * 100).toFixed(2);

                focus.attr("transform", `translate(${x(x0)},${y(switchWins)})`);
                tooltip.attr("x", x(x0)).attr("y", y(switchWins) - 10);

                // Adjust tooltip position if it goes beyond the right edge
                if (x(x0) + 160 > width) {
                    tooltip.attr("x", x(x0) - 160);
                }

                // Adjust tooltip position if it goes beyond the top edge
                if (y(switchWins) - 90 < 0) {
                    tooltip.attr("y", y(switchWins) + 10);
                }

                tooltipDiv.html(`
                    <div>Switch Wins: ${switchWins} (${switchPercentage}%)</div>
                    <div>Stick Wins: ${stickWins} (${stickPercentage}%)</div>
                    <div>Difference: ${difference} (${percentageDifference}%)</div>
                `);
            });
    };
    onMount(runSimulation);
</script>

<div class="section">
    <h2>Interactive Line Chart</h2>
    <p>Number of games: <input type="number" bind:value={nGames} min="100" max="10000" step="100" /></p>
    <button class = "styled-button" on:click={runSimulation}>Run Simulation</button>
    <svg id="chart"></svg>
    <p class="description">
        This chart shows the cumulative wins over multiple Monty Hall game simulations. 
        The blue line represents the cumulative wins when the contestant always switches their choice, 
        while the red line represents the cumulative wins when the contestant always sticks with their choice. 
        The shaded region is the difference between the 2 lines, represented as a proportion of the graph. As can be seen, when N tends to a large value (~10000 iterations),
        the switching strategy wins ~67% of the time while the sticking strategy wins only ~33% of the time.
    </p>
</div>

<style>
  #chart {
    display: block;
    margin: 0 auto;
  }

  .tooltip {
    visibility: hidden;
  }

  .section {
    height: 100vh; /* Full height of the viewport */
    overflow-y: auto; /* Enable scrolling within each section */
    display: flex; /* Use flexbox to center content vertically */
    flex-direction: column; /* Stack content vertically */
    justify-content: center; /* Center content horizontally */
    align-items: center; /* Center content vertically */
    text-align: center; /* Center text horizontally */
    padding: 20px; /* Add padding for better readability */
    color: black; /* Text color for better readability against gradient */
  }

  .section h2 {
    font-size: 2.5rem; /* Larger font size for headings */
    font-family: 'Times New Roman', Times, serif;
  }

  .section p {
    font-size: 1.5rem; /* Larger font size for paragraphs */
    font-family: 'Times New Roman', Times, serif;
  }

  .description {
    margin-top: 20px;
    font-size: 1.2rem;
    max-width: 800px;
    font-family: 'Times New Roman', Times, serif;
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
</style>
