import { LitElement, html, css } from "lit";

import { installRouter } from "pwa-helpers/router.js";

import "./view/home-view";
import "./view/game-view";

import "@vaadin/button";

export class RockPaperScissors extends LitElement {
  static get properties() {
    return {
      view: {
        type: String,
      },
      currentUser: {
        type: Object,
      },
    };
  }

  constructor() {
    super();

    this.view = "home";
    this.currentUser = {};
  }

  firstUpdated() {
    // Setting the router
    installRouter((location) => {
      this.handleNavigation(location);
    });
  }

  // This callback gets called when a change in the path ocurs
  handleNavigation(location) {
    const path = location.pathname;
    // Change the property accordly
    this.view = path === "/" ? "home" : path.slice(1);
  }

  getActiveView() {
    switch (this.view) {
      case "home": {
        return html`<home-view
          @on-login=${(event) => this.navigateTo(event.detail)}
        ></home-view>`;
      }
      case "game": {
        return html`<game-view .currentUser=${this.currentUser}></game-view>`;
      }
    }
  }

  navigateTo(data) {
    window.history.pushState({}, "", data.view);
    this.handleNavigation(window.location);

    // From login, we save the current user
    this.currentUser = data.user;
    // TODO: Save it in the local storage
  }

  render() {
    return html`
      <div class="header">
        <h1>🪨, 📜, ✂️!</h1>
        <vaadin-button
          class="button"
          theme="icon"
          @click=${() => this.navigateTo({ view: "home", user: {} })}
          >🏠</vaadin-button
        >
      </div>
      ${this.getActiveView()}
    `;
  }

  static get styles() {
    return css`
      h1 {
        margin: 16px;
      }

      .button {
        font-size: 30px;
        height: 60px;
        width: 60px;
        background-color: rgba(100, 20, 200, 0.4);
      }

      .header {
        height: 80px;
        width: 100%;
        box-sizing: border-box;
        position: sticky;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 40px;
      }
    `;
  }
}

customElements.define("rock-paper-scissors", RockPaperScissors);
