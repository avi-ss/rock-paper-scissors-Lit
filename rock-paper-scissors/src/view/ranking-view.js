import { LitElement, html, css } from "lit";

export class RankingView extends LitElement {
  static get properties() {
    return {
      users: {
        type: Array,
      }
    };
  }

  constructor() {
    super();

    this.users = [];
  }

  firstUpdated() {
  }

  render() {
    return html`
    <h1>RANKING</h1>
    `;
  }

  static get styles() {
    return css`
    `;
  }
}

customElements.define("ranking-view", RankingView);
