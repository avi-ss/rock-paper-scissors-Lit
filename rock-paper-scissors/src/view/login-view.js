import { LitElement, html, css } from "lit";

import "@vaadin/text-field";
import "@vaadin/button";
import { Notification } from "@vaadin/notification";

import { Router } from "@vaadin/router";

export class LoginView extends LitElement {
  static get properties() {
    return {
        _isNameValid: {
            type: Boolean,
        }
    };
  }

  constructor() {
    super();
    this._isNameValid = false;
  }

  render() {
    return html`
      <h3>Login!</h3>
      <vaadin-text-field
        id="name"
        label="Your name!"
        minlength="5"
        maxlength="12"
        error-message="Name must be between 5 and 12 characters"
        @invalid-changed=${(e) => (this._isNameValid = e.detail.value)}
        required
      >
      </vaadin-text-field>
      <vaadin-button theme="primary" @click=${this.onLogin} ?disabled=${this._isNameValid}>Join</vaadin-button>
    `;
  }

  onLogin() {
    const name = this.shadowRoot.getElementById("name");

    if(name.value == ""){
        this._showNotification("Name can't be empty!", "error");
        return;
    }
    
    this._showNotification("Welcome, " + name.value + "!", "success");
    Router.go("/game");
  }

  _showNotification(text, theme) {
    const notification = Notification.show(text, {
      position: "bottom-center",
      duration: 2000
    });
    notification.setAttribute("theme", theme);
    const handleOpenChanged = (e) => {
      if (!e.detail.value) {
        notification.removeEventListener("opened-changed", handleOpenChanged);
      }
    };
    notification.addEventListener("opened-changed", handleOpenChanged);
  }

  static get styles() {
    return css``;
  }
}

customElements.define("login-view", LoginView);
