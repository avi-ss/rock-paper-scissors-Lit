import { LitElement, html } from "lit";

import "@vaadin/text-field";
import "@vaadin/button";
import "@vaadin/radio-group";

import styles from "../styles/home-view.styles";
import * as utils from "../utils/utils";

export class HomeView extends LitElement {
  static get properties() {
    return {
      _isNameValidRegister: {
        type: Boolean,
      },
      _isNameValidLogin: {
        type: Boolean,
      },
    };
  }

  constructor() {
    super();
    this._isNameValidRegister = false;
    this._isNameValidLogin = false;
  }

  render() {
    return html`
      <div class="container">
        <div class="form register">
          <h2>Register ✍️</h2>
          <vaadin-radio-group
            id="gender"
            label="Select your gender! 👽"
            theme="horizontal"
            required
          >
            <vaadin-radio-button
              value="👧"
              label="👧"
              checked
            ></vaadin-radio-button>
            <vaadin-radio-button value="👦" label="👦"></vaadin-radio-button>
            <vaadin-radio-button value="👽" label="👽"></vaadin-radio-button>
          </vaadin-radio-group>
          <vaadin-text-field
            id="registerName"
            label="Your name!"
            placeholder="5 characters at least!"
            minlength="5"
            maxlength="12"
            pattern="^[^0-9\\\\]\\w+$"
            error-message="Only letters and numbers!"
            @invalid-changed=${(e) =>
              (this._isNameValidRegister = e.detail.value)}
            required
          >
          </vaadin-text-field>
          <vaadin-button
            theme="primary"
            @click=${this.onRegister}
            ?disabled=${this._isNameValidRegister}
            >Register</vaadin-button
          >
        </div>
        <div class="form login">
          <h2>Login 👋</h2>
          <vaadin-text-field
            id="loginName"
            label="Your name!"
            placeholder="p.e. OnlySpock12"
            minlength="5"
            maxlength="12"
            pattern="^[^0-9\\\\]\\w+$"
            error-message="Only letters and numbers!"
            @invalid-changed=${(e) => (this._isNameValidLogin = e.detail.value)}
            required
          >
          </vaadin-text-field>
          <vaadin-button
            theme="primary"
            @click=${this.onLogin}
            ?disabled=${this._isNameValidLogin}
            >Join</vaadin-button
          >
        </div>
      </div>
    `;
  }

  onLogin() {
    const name = this.shadowRoot.getElementById("loginName");

    // Validate its not null
    if (!name.value) {
      utils._showNotification("Name can't be empty!", "error");
      return;
    }

    if (!localStorage.getItem("users." + name.value)) {
      // The player doesn't exist
      utils._showNotification("This player doesn't exist!", "error");
    }
    // Else we return it
    else {
      const user = JSON.parse(localStorage.getItem("users." + name.value));
      this._onLoginEvent("game", user);
    }
  }

  onRegister() {
    const name = this.shadowRoot.getElementById("registerName");
    const gender = this.shadowRoot.getElementById("gender");

    // Validate its not null
    if (name.value == "") {
      utils._showNotification("Name can't be empty!", "error");
      return;
    }

    // If it doesn't exist, create it
    if (!localStorage.getItem(name.value)) {
      let user = {
        name: name.value,
        gender: gender.value,
        wins: 0,
        defeats: 0,
      };
      localStorage.setItem("users." + name.value, JSON.stringify(user));
      // Even we're on register, redirect to the game
      this._onLoginEvent("game", user);
    }
    else {
      utils._showNotification("This name is already taken!", "error");
    }
  }

  _onLoginEvent(view, user) {
    this.dispatchEvent(
      new CustomEvent("on-login", {
        detail: {
          view: view,
          user: user,
        },
      })
    );
  }

  static get styles() {
    return styles;
  }
}

customElements.define("home-view", HomeView);
