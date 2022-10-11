import { css } from "lit";

export default css`
  .container {
    display: flex;
    flex-wrap: wrap-reverse;
    justify-content: center;
    gap: 50px;
  }

  .form {
    padding-top: 20px;
    width: 30%;
    min-width: 400px;
    display: flex;
    flex-direction: column;
  }

  .form.login {
    align-items: flex-start;
  }

  .form.register {
    align-items: flex-end;
  }

  .form > * {
    width: 100%;
  }

  vaadin-radio-button {
    font-size: 64px;
  }
`;
