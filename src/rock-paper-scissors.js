import { LitElement, html } from "lit";

import { installRouter } from "pwa-helpers/router.js";

import styles from "./styles/app.styles";

import * as utils from "./utils/utils";

import "./view/home-view";
import "./view/game-view";
import "./view/ranking-view";

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
        return html`<home-view @on-login=${this.onLogin}></home-view>`;
      }
      case "game": {
        // Prevent the user to enter the game without login
        if (Object.entries(this.currentUser).length === 0) {
          this.navigateTo({ view: "home", user: {} });
          return html`<home-view @on-login=${this.onLogin}></home-view>`;
        } else {
          return html`<game-view .currentUser=${this.currentUser}></game-view>`;
        }
      }
      case "ranking": {
        return html`<ranking-view></ranking-view>`;
      }
      // Return to home view in case we set a non existing path
      default: {
        this.navigateTo({ view: "home", user: {} });
        return html`<home-view @on-login=${this.onLogin}></home-view>`;
      }
    }
  }

  onLogin(event) {
    utils._showNotification("Welcome, " + event.detail.user.name + "!", "success");
    this.navigateTo(event.detail);
  }

  navigateTo(data) {
    window.history.pushState({}, "", data.view);
    this.handleNavigation(window.location);

    // From login, we save the current user
    this.currentUser = data.user;
    localStorage.setItem("currentUser", this.currentUser.name);
  }

  render() {
    return html`
      <div class="header">
        <h1 class="title">🪨, 📜, ✂️, 🦎, 🧛🏻!</h1>
        <vaadin-button
          class="button"
          theme="icon"
          @click=${() => this.navigateTo({ view: "home", user: {} })}
          >🏠</vaadin-button
        >
        <vaadin-button
          class="button"
          theme="icon"
          @click=${() => this.navigateTo({ view: "ranking", user: {} })}
          >🎖️</vaadin-button
        >
      </div>
      ${this.getActiveView()}
    `;
  }

  static get styles() {
    return styles;
  }
}

customElements.define("rock-paper-scissors", RockPaperScissors);
