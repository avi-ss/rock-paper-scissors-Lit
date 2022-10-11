import { css } from "lit";

export default css`
  .container {
    display: flex;
    align-items: center;
    margin: auto;
    margin-top: 1.5rem;
    width: 60%;
  }

  @media (max-width: 1200px) {
    .container {
      width: 80%;
    }
  }
`;
