<script>
  import katexify from "../katexify";
</script>

<section id="body">
  <h1 class="body-header">The Math of The Monty Hall Problem</h1>
  <p class="body-text">
    The problem clearly elucidates the idea of <b>conditional probability</b>. 
    As the name suggests, conditional probability involves using knowledge you <b>currently have</b> to predict the probability of a future event.
  </p>
  <p class="body-text">
    First, let's navigate the problem intuitively. Let's assume you pick door 1. The probability that the car lies behind door 1 is <b>1/3</b>,
    and that it's not behind it (i.e. behind one of the other 2 doors) is <b>2/3</b>.
    Now, assume that the host, Monty Hall, opens door number 2.
    This new information does not mean the probability is split between door 1 and door 3 (i.e. that there is a <b>50-50</b> probability),
    but that the initial <b>2/3</b> probability of the car being behind door 2 or door 3 is now a <b>2/3</b> probability of the car being behind <b> only door 3</b>.
  </p>
  <p class="body-text">
    Now, let's try and visualize this using conditional probability. The core formula we will use here is: {@html katexify(
      "P(A|B)=\\frac{P(B|A)P(A)}{P(B)}",
      false
    )}
    This formula is known as Bayes' Theorem and defines how the probability of an event changes knowing information about another related event.
    For our purposes, let's define the 3 events as follows: {@html katexify(
      "P(A) = P(B) = P(C) = \\frac{1}{3}",
      true
    )}
    This defines the probability of the contestant winning the car by choosing either one of 3 doors.
    For our purposes, <b>Let's assume the contestant has picked door A.</b>
    Next, <b>Let's assume the host opens door B.</b> We define this event as HB. The formula for this event is <b>dependent on the 3 doors.</b> Therefore: {@html katexify(
      "P(HB|A) = \\frac{1}{2}",
      true
    )}
    wherein the other half is the event that the host chooses to open door C - HC. Further, we have: {@html katexify(
      "P(HB|B) = 0",
      true
    )}
    wherein the host would not open door B if the car was indeed behind door B. Finally, we have: {@html katexify(
      "P(HB|C) = 1",
      true
    )}
    wherein the host would only have 1 door left to open, since the contestant chose door A, and the car is behind door C, leaving just door B to be opened.
    Now that we have these events defined, we can define the probability of winning by <b>sticking to door A</b>: {@html katexify(
      "P(A|HB) = \\frac{P(HB|A)P(A)}{P(HB)}",
      true
    )}
    which is equivalent to: {@html katexify(
      "P(A|HB) = \\frac{P(HB|A)P(A)}{P(HB|A)P(A) + P(HB|B)P(B) + P(HB|C)P(C)}",
      true
    )}
    Therefore, we get: {@html katexify(
      "P(A|HB) = \\frac{\\frac{1}{2} \\cdot \\frac{1}{3}}{\\frac{1}{6} + 0 + \\frac{1}{3}} = \\frac{\\frac{1}{2} \\cdot \\frac{1}{3}}{\\frac{1}{2}} = \\boxed{\\frac{1}{3}}",
      true
    )}
    We can further define the probability of winning by <b>switching to door C</b>: {@html katexify(
      "P(C|HB) = \\frac{P(HB|C)P(C)}{P(HB)}",
      true
    )}
    which is equivalent to: {@html katexify(
      "P(C|HB) = \\frac{P(HB|C)P(C)}{P(HB|A)P(A) + P(HB|B)P(B) + P(HB|C)P(C)}",
      true
    )}
    Therefore, we get: {@html katexify(
      "P(C|HB) = \\frac{1 \\cdot \\frac{1}{3}}{\\frac{1}{6} + 0 + \\frac{1}{3}} = \\frac{1 \\cdot \\frac{1}{3}}{\\frac{1}{2}} = \\boxed{\\frac{2}{3}}",
      true
    )}
  </p>
  <p class="body-text">
    Therefore, the strategy is <b>always to switch!</b> Continue reading to see an interactive simulation of the same!
  </p>
</section>

<style>
  #body {
    max-width: 600px;
    margin: 1rem auto;
    text-align: center;
    padding-top: 1rem;
  }

  .body-header {
    font-size: 2rem;
    margin-top: 5px;
    margin-bottom: 0;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    max-width: 100%;
    margin: auto;
    text-align: center;
    color: black;
    font-family: 'Times New Roman', Times, serif;
  }

  .body-text {
    font-size: 1.4rem;
    color: black;
    text-align: center;
    margin: 1rem;
    opacity: 0.75;
    padding: 1rem;
    font-family: 'Times New Roman', Times, serif;
  }
</style>