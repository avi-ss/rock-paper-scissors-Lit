import { LitElement, html, css } from "lit";

import "@vaadin/text-field";
import "@vaadin/button";
import "@vaadin/radio-group";

import { Notification } from "@vaadin/notification";

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
            @invalid-changed=${(e) => (this._isNameValidRegister = e.detail.value)}
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
        <div class="vl"></div>
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
    if (name.value == "") {
      this._showNotification("Name can't be empty!", "error");
      return;
    }

    let user;

    // If it doesnt exist, return
    if (localStorage.getItem("users." + name.value) == null) {
      this._showNotification("This player doesn't exist!", "error");
      return;
    }
    // Else we return it
    else {
      user = JSON.parse(localStorage.getItem("users." + name.value));
    }

    this._showNotification("Welcome back, " + name.value + "!", "success");

    // Send the data of the current user
    this.dispatchEvent(
      new CustomEvent("on-login", {
        detail: {
          view: "game",
          user: user,
        },
      })
    );
  }

  onRegister() {
    const name = this.shadowRoot.getElementById("registerName");
    const gender = this.shadowRoot.getElementById("gender");

    // Validate its not null
    if (name.value == "") {
      this._showNotification("Name can't be empty!", "error");
      return;
    }

    let user = {
      name: name.value,
      gender: gender.value,
      wins: 0,
      defeats: 0,
    };

    // If it doesnt exist, create it
    if (localStorage.getItem(name.value) == null) {
      localStorage.setItem("users." + name.value, JSON.stringify(user));
    }
    // Else we throw erro
    else {
      this._showNotification("This name is already taken!", "error");
      return;
    }

    this._showNotification("Welcome aboard, " + name.value + "!", "success");

    // Even we're on register, redirect to the game
    // Send the data of the current user
    this.dispatchEvent(
      new CustomEvent("on-login", {
        detail: {
          view: "game",
          user: user,
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
        display: flex;
        justify-content: center;
        gap: 50px;
      }

      .form {
        padding-top: 20px;
        width: 30vw;
        display: flex;
        flex-direction: column;
      }

      .form.login {
        align-items: flex-start;
      }

      .form.register {
        align-items: flex-end;
      }

      .form > * {
        max-width: 30vw;
        width: 100%;
      }

      vaadin-radio-button {
        font-size: 64px;
      }
    `;
  }
}

customElements.define("home-view", HomeView);
