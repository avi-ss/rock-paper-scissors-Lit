import { LitElement, html, css } from "lit";

import "@vaadin/grid";

export class RankingView extends LitElement {
  static get properties() {
    return {
      users: {
        type: Array,
      },
    };
  }

  constructor() {
    super();

    this.users = [];
  }

  firstUpdated() {
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i) != "user") {
        this.users.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
      }
    }

    this.users = [...this.users];
  }

  render() {
    return html`
      <div class="container">
        <vaadin-grid .items="${this.users}">
          <vaadin-grid-column path="name"></vaadin-grid-column>
          <vaadin-grid-column path="gender"></vaadin-grid-column>
          <vaadin-grid-column path="wins"></vaadin-grid-column>
          <vaadin-grid-column path="defeats"></vaadin-grid-column>
        </vaadin-grid>
      </div>
    `;
  }

  static get styles() {
    return css`
      .container {
        display: flex;
        align-items: center;
        margin: auto;
        margin-top: 20px;
        width: 60%;
      }
    `;
  }
}

customElements.define("ranking-view", RankingView);
