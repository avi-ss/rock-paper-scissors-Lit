import { css } from "lit";

export default css`
  .container {
    margin: auto;
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .container h1 {
    text-align: center;
  }

  .buttons {
    display: flex;
    gap: 10px;
  }

  .results {
    display: flex;
    gap: 50px;
  }

  .results h1 {
    font-size: 72px;
    text-shadow: 4px 4px 5px black;
  }

  vaadin-button {
    height: 60px;
    font-size: 64px;
    text-shadow: 4px 4px 5px black;
    transition: all 0.1s linear;
  }

  vaadin-button:hover {
    background-color: rgba(70, 130, 80, 1);
    font-size: 70px;
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
      text-shadow: 3px 10px 5px rgba(0, 0, 0, 0.5);
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
