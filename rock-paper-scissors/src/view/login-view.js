import { LitElement, html, css } from "lit";

export class LoginView extends LitElement {
  static get properties() {
    return {};
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <h3>Login!</h3>
    `;
  }

  static get styles() {
    return css``;
  }
}

customElements.define("login-view", LoginView);
