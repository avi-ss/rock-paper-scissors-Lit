import { css } from "lit";

export default css`
  .container {
    margin: auto;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.7rem;
  }

  .results {
    display: flex;
    gap: 3rem;
  }

  .results h1 {
    font-size: 4.5rem;
    text-shadow: 0.25rem 0.25rem 0.3rem black;
  }

  vaadin-button {
    height: 3.5rem;
    font-size: 4rem;
    text-shadow: 0.25rem 0.25rem 0.3rem black;
    transition: all 0.1s linear;
  }

  vaadin-button:hover {
    background-color: rgba(70, 130, 80, 1);
    font-size: 4.5rem;
  }

  @media (max-width: 515px) {
    .header {
      margin-bottom: 2rem;
      font-size: 1.5rem;
    }

    .buttons {
      margin: 0 2rem;
    }

    vaadin-button {
      height: 2rem;
      font-size: 3rem;
    }

    vaadin-button:hover {
      font-size: 3rem;
    }

    .results {
      gap: 1.5rem;
    }

    .results h1 {
      font-size: 3rem;
    }
  }

  .result-text {
    animation: 2s anim-result-text ease-out forwards;
  }

  .result-option {
    animation: 1.5s anim-result-option ease-out forwards;
  }

  @keyframes anim-result-text {
    0% {
      opacity: 0;
      transform: translateY(80%);
    }
    20% {
      opacity: 0;
    }
    50% {
      opacity: 1;
      transform: translateY(0%);
    }
    100% {
      opacity: 1;
      transform: translateY(0%);
    }
  }

  @keyframes anim-result-option {
    0% {
      transform: scale(0);
      opacity: 0;
      text-shadow: 0 0 0 rgba(0, 0, 0, 0);
    }
    25% {
      transform: scale(1.5);
      opacity: 1;
      text-shadow: 0.25rem 0.8rem 0.3rem rgba(0, 0, 0, 0.5);
    }
    50% {
      transform: scale(1);
      opacity: 1;
      text-shadow: 1px 0 0 rgba(0, 0, 0, 0);
    }
    100% {
      /* animate nothing to add pause at the end of animation */
      transform: scale(1);
      opacity: 1;
      text-shadow: 1px 0 0 rgba(0, 0, 0, 0);
    }
  }
`;
