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
      _playerOption: {
        type: String,
      },
      _botOption: {
        type: String,
      },
      _resultText: {
        type: String,
      },
    };
  }

  constructor() {
    super();

    this.currentUser = {};
    this._isResultPending = false;
    this._playerOption = "";
    this._botOption = "";
    this._resultText = "";

    // Information about the game logic
    this.options = [
      { text: "👊", beats: ["✌️", "🤏"] },
      { text: "🖐", beats: ["👊", "🖖"] },
      { text: "✌️", beats: ["🖐", "🤏"] },
      { text: "🤏", beats: ["🖖", "🖐"] },
      { text: "🖖", beats: ["✌️", "👊"] },
    ];
  }

  // If the current user is stored
  firstUpdated() {
    this.currentUser = JSON.parse(
      localStorage.getItem("users." + localStorage.getItem("currentUser"))
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
          <vaadin-button
            theme="primary"
            @click=${() => this.onOptionSelected(this.options[3])}
            ?disabled=${this._isResultPending}
            >🤏</vaadin-button
          >
          <vaadin-button
            theme="primary"
            @click=${() => this.onOptionSelected(this.options[4])}
            ?disabled=${this._isResultPending}
            >🖖</vaadin-button
          >
        </div>
        <div class="results">
          <h1 id="player">${this._playerOption}</h1>
          <h1 id="bot">${this._botOption}</h1>
        </div>
        <h1 id="result-text">${this._resultText}</h1>
      </div>
    `;
  }

  onOptionSelected(option) {
    // prevent double click
    this._isResultPending = true;

    setTimeout(() => {
      const botOption =
        this.options[Math.floor(Math.random() * this.options.length)];

      if (option.beats.includes(botOption.text)) {
        this.currentUser.wins++;
        this._resultText = "You won! 🎉🎉🎉";
      } else if (botOption.beats.includes(option.text)) {
        this.currentUser.defeats++;
        this._resultText = "You lost... 😭😭😭";
      } else if (!option.text === botOption.text) {
        this._showNotification("You're cheating!", "error");
      } else {
        this._resultText = "It's a tie 🙅🙅🙅";
      }

      this._restartResultsAnimation();
      this._playerOption = this.currentUser.gender + option.text;
      this._botOption = botOption.text + "🤖";

      // Save and restart the buttons
      this._isResultPending = false;
      this._saveScore();
    }, 1000);
  }

  _restartResultsAnimation() {
    const player = this.shadowRoot.getElementById("player");
    const bot = this.shadowRoot.getElementById("bot");
    const results = this.shadowRoot.getElementById("result-text");

    player.classList.remove("result-option");
    bot.classList.remove("result-option");
    results.classList.remove("result-text");

    // triggering reflow : The actual magic
    void player.offsetWidth;
    void bot.offsetWidth;
    void results.offsetWidth;

    player.classList.add("result-option");
    bot.classList.add("result-option");
    results.classList.add("result-text");
  }

  _saveScore() {
    localStorage.setItem(
      "users." + this.currentUser.name,
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

      .results {
        display: flex;
        gap: 50px;
      }

      .results h1 {
        font-size: 72px;
        text-shadow: 4px 4px 5px black;
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

      .result-text {
        animation: 2s anim-result-text ease-out forwards;
      }

      .result-option {
        animation: 1.5s anim-result-option ease-out forwards;
      }

      @keyframes anim-result-text {
        0% {
          opacity: 0;
          transform: translateY(80%);
        }
        20% {
          opacity: 0;
        }
        50% {
          opacity: 1;
          transform: translateY(0%);
        }
        100% {
          opacity: 1;
          transform: translateY(0%);
        }
      }

      @keyframes anim-result-option {
        0% {
          transform: scale(0);
          opacity: 0;
          text-shadow: 0 0 0 rgba(0, 0, 0, 0);
        }
        25% {
          transform: scale(1.5);
          opacity: 1;
          text-shadow: 3px 10px 5px rgba(0, 0, 0, 0.5);
        }
        50% {
          transform: scale(1);
          opacity: 1;
          text-shadow: 1px 0 0 rgba(0, 0, 0, 0);
        }
        100% {
          /* animate nothing to add pause at the end of animation */
          transform: scale(1);
          opacity: 1;
          text-shadow: 1px 0 0 rgba(0, 0, 0, 0);
        }
      }
    `;
  }
}

customElements.define("game-view", GameView);
