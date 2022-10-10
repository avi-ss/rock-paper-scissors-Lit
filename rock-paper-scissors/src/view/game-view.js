import { LitElement, html, css } from "lit";

import "@vaadin/button";

import { Notification } from "@vaadin/notification";

export class GameView extends LitElement {
  static get properties() {
    return {
      currentUser: {
        type: Object,
      },
      options: {
        type: Array,
      },
      _isResultPending: {
        type: Boolean,
      },
      _resultText: {
        type: String,
      }
    };
  }

  constructor() {
    super();

    this.currentUser = {};
    this._isResultPending = false;
    this._resultText = "";

    // Information about the game logic
    this.options = [
      { text: "👊", beats: "✌️" },
      { text: "🖐", beats: "👊" },
      { text: "✌️", beats: "🖐" },
    ];
  }

  // If the current user is stored
  firstUpdated() {
    this.currentUser = JSON.parse(
      localStorage.getItem(localStorage.getItem("user"))
    );
  }

  render() {
    return html`
      <div class="container">
        <h1 style="margin-bottom: 50px">
          Hi, ${this.currentUser.name}! 👋 <br />
          ${this.currentUser.gender} ${this.currentUser.wins} -
          ${this.currentUser.defeats} 🤖
        </h1>
        <div class="buttons">
          <vaadin-button
            theme="primary"
            @click=${() => this.onOptionSelected(this.options[0])}
            ?disabled=${this._isResultPending}
            >👊</vaadin-button
          >
          <vaadin-button
            theme="primary"
            @click=${() => this.onOptionSelected(this.options[1])}
            ?disabled=${this._isResultPending}
            >🖐</vaadin-button
          >
          <vaadin-button
            theme="primary"
            @click=${() => this.onOptionSelected(this.options[2])}
            ?disabled=${this._isResultPending}
            >✌️</vaadin-button
          >
        </div>
        <h1>${this._resultText}</h1>
      </div>
    `;
  }

  onOptionSelected(option) {
    // prevent double click
    this._isResultPending = true;

    setTimeout(() => {
      const botOption =
        this.options[Math.floor(Math.random() * this.options.length)];

      if (option.beats === botOption.text) {
        this.currentUser.wins++;
        this._resultText = "You won! 🎉🎉🎉"
      } else if (botOption.beats === option.text) {
        this.currentUser.defeats++;
        this._resultText = "You lost... 😭😭😭"
      } else if (!option.text === botOption.text) {
        this._showNotification("You're cheating!", "error");
      } else {
        this._resultText = "It's a tie 🙅🙅🙅"
      }

      // So the component reloads
      this.currentUser = { ...this.currentUser };

      // Save and restart the buttons
      this._isResultPending = false;
      this._saveScore();
    }, 1000);
  }

  _saveScore() {
    localStorage.setItem(
      this.currentUser.name,
      JSON.stringify(this.currentUser)
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
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .container h1 {
        text-align: center;
      }

      .buttons {
        display: flex;
        gap: 10px;
      }

      vaadin-button {
        height: 60px;
        font-size: 64px;
        text-shadow: 4px 4px 5px black;
        transition: all 0.1s linear;
      }

      vaadin-button:hover {
        background-color: rgba(70, 130, 80, 1);
        font-size: 70px;
      }
    `;
  }
}

customElements.define("game-view", GameView);
