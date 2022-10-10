import { LitElement, html, css } from "lit";

import "@vaadin/grid";
import '@vaadin/grid/vaadin-grid-sort-column.js';

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

    for (let i = 0; i < localStorage.length; i++) {
      if (/(users\.)+/.test(localStorage.key(i))) {
        this.users.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
      }
    }
  }

  render() {
    return html`
      <div class="container">
        <vaadin-grid .items="${this.users}">
          <vaadin-grid-sort-column path="name"></vaadin-grid-sort-column>
          <vaadin-grid-sort-column path="gender"></vaadin-grid-sort-column>
          <vaadin-grid-sort-column path="wins"></vaadin-grid-sort-column>
          <vaadin-grid-sort-column path="defeats"></vaadin-grid-sort-column>
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
