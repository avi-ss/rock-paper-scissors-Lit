import { css } from "lit";

export default css`
  .container {
    display: flex;
    flex-wrap: wrap-reverse;
    justify-content: center;
    gap: 1rem;
  }

  .form {
    padding: 1.5rem;
    width: 30%;
    min-width: 20rem;
    display: flex;
    flex-direction: column;
  }

  .form.login {
    padding-bottom: 0;
    align-items: flex-start;
  }

  .form.register {
    padding-bottom: 2rem;
    align-items: flex-end;
  }

  .form > * {
    width: 100%;
  }

  .title {
    margin: 0.5rem 0;
  }

  vaadin-radio-button {
    font-size: 4rem;
  }
`;
