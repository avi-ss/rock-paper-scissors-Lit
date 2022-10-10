import { LitElement, html, css } from "lit";
import { Router } from "@vaadin/router";

import "./view/game-view"
import "./view/login-view"

export class RockPaperScissors extends LitElement {
  static get properties() {
    return {};
  }

  constructor() {
    super();
  }

  firstUpdated() {
    // Setting the router
    this.router = new Router(this.shadowRoot.getElementById("outlet"));

    this.router.setRoutes([
      { path: "/", component: "login-view" },
      { path: "/game", component: "game-view" },
    ]);
  }

  render() {
    return html`
      <h1>Rock, Paper, Scissors</h1>
      <a href="/game">GAME</a>
      <a href="/">LOGIN</a>
      <div id="outlet"></div>
    `;
  }

  static get styles() {
    return css``;
  }
}

customElements.define("rock-paper-scissors", RockPaperScissors);
