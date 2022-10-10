import { LitElement, html, css } from "lit";

export class GameView extends LitElement {
  static get properties() {
    return {};
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <h3>Game!</h3>
    `;
  }

  static get styles() {
    return css``;
  }
}

customElements.define("game-view", GameView);
