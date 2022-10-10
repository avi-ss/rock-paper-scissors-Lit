import { LitElement, html, css } from "lit";

import "@vaadin/text-field";
import "@vaadin/button";
import { Notification } from "@vaadin/notification";

export class HomeView extends LitElement {
  static get properties() {
    return {
      _isNameValid: {
        type: Boolean,
      },
    };
  }

  constructor() {
    super();
    this._isNameValid = false;
  }

  render() {
    return html`
      <div class="container">
        <vaadin-text-field
          id="name"
          label="Your name!"
          placeholder="5 characters at least!"
          minlength="5"
          maxlength="12"
          pattern="^[^0-9\\\\]\\w+$"
          error-message="Only letters and numbers!"
          @invalid-changed=${(e) => (this._isNameValid = e.detail.value)}
          required
        >
        </vaadin-text-field>
        <vaadin-button
          theme="primary"
          @click=${this.onLogin}
          ?disabled=${this._isNameValid}
          >Join</vaadin-button
        >
      </div>
    `;
  }

  onLogin() {
    const name = this.shadowRoot.getElementById("name");

    // Validate its not null
    if (name.value == "") {
      this._showNotification("Name can't be empty!", "error");
      return;
    }

    let user = {
      name: name.value,
      wins: 0,
      defeats: 0
    }

    // If it doesnt exist, create it
    if(localStorage.getItem(name.value) == null){
      localStorage.setItem(name.value, JSON.stringify(user))
    }
    // Else we return it
    else {
      user = JSON.parse(localStorage.getItem(name.value));
    }

    this._showNotification("Welcome, " + name.value + "!", "success");

    // Send the data of the current user
    this.dispatchEvent(
      new CustomEvent("on-login", {
        detail: {
          view: "game",
          user: user
        },
      })
    );
  }

  _showNotification(text, theme) {
    const notification = Notification.show(text, {
      position: "bottom-center",
      duration: 2000,
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
    return css`
      .container {
        margin: auto;
        margin-top: 40px;
        align-items: center;
        display: flex;
        flex-direction: column;
      }

      .container > * {
        max-width: 30vw;
        width: 100%;
      }
    `;
  }
}

customElements.define("home-view", HomeView);
