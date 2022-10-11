import { css } from "lit";

export default css`
  .title {
    margin: 1rem;
  }

  .button {
    font-size: 2rem;
    height: 4rem;
    width: 4rem;
    background-color: rgba(255, 255, 255, 0.7);
    transition: all 0.2s linear;
  }

  .button:hover {
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0.25rem 0.25rem 0.3rem rgba(0, 0, 0, 0.3);
  }

  .header {
    height: 5rem;
    width: 100%;
    box-sizing: border-box;
    position: sticky;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.3rem;
    background-color: pink;
    box-shadow: 0.25rem 0.25rem 0.3rem rgba(0, 0, 0, 0.3);
  }
`;
