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

  handleNavigation(location) {
    const path = location.pathname;
    console.log(path);
  }

  getActiveView() {
    switch (this.view) {
      case "home": {
        return html`<home-view
          @on-login=${(event) => this.navigateTo(event)}
        ></home-view>`;
      }
      case "game": {
        return html`<game-view
          .currentUser=${this.currentUser}
          @on-back=${(event) => this.navigateTo(event)}
        ></game-view>`;
      }
    }
  }

  navigateTo(event) {
    window.history.pushState({}, "", event.detail.view);
    this.handleNavigation(window.location);

    // From login, we save the current user
    this.currentUser = event.detail.user;
    // TODO: Save it in the local storage
  }

  render() {
    return html`
      <div class="header">
        <vaadin-button class="button" theme="icon">
          <vaadin-icon
            icon="vaadin:arrow-backward"
            @click=${this.onLogout}
          ></vaadin-icon>
        </vaadin-button>
        <h1>Rock, Paper, Scissors!</h1>
      </div>
      ${this.getActiveView()}
    `;
  }

  static get styles() {
    return css`
      h1 {
        font-size: 18px;
        margin: 16px;
      }

      .button {
        margin-left: 16px;
      }

      .header {
        height: 70px;
        width: 100%;
        box-sizing: border-box;
        position: sticky;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: start;
      }
    `;
  }
}

customElements.define("rock-paper-scissors", RockPaperScissors);
