import { LitElement, html } from "lit";

import "@vaadin/button";
import styles from "../styles/game-view.styles";

export class GameView extends LitElement {
  static get properties() {
    return {
      currentUser: {
        type: Object,
      },
      options: {
        type: Array,
      },
      _isLoading: {
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
    this._isLoading = false;
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

  // Get the current user stored
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
            @click=${() => this.selectOption(this.options[0])}
            ?disabled=${this._isLoading}
            >👊</vaadin-button
          >
          <vaadin-button
            theme="primary"
            @click=${() => this.selectOption(this.options[1])}
            ?disabled=${this._isLoading}
            >🖐</vaadin-button
          >
          <vaadin-button
            theme="primary"
            @click=${() => this.selectOption(this.options[2])}
            ?disabled=${this._isLoading}
            >✌️</vaadin-button
          >
          <vaadin-button
            theme="primary"
            @click=${() => this.selectOption(this.options[3])}
            ?disabled=${this._isLoading}
            >🤏</vaadin-button
          >
          <vaadin-button
            theme="primary"
            @click=${() => this.selectOption(this.options[4])}
            ?disabled=${this._isLoading}
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

  selectOption(option) {
    // prevent double click
    this._isLoading = true;

    setTimeout(() => {
      this._handleGame(option);
      this._isLoading = false;
    }, 1000);
  }

  _handleGame(option) {
    const botOption =
      this.options[Math.floor(Math.random() * this.options.length)];

    this._handleResults(option, botOption);

    this._restartResultsAnimation();
    this._playerOption = this.currentUser.gender + option.text;
    this._botOption = botOption.text + "🤖";

    // Save and restart the buttons
    this._saveScore();
  }

  _handleResults(playerOption, botOption) {
    if (playerOption.beats.includes(botOption.text)) {
      this.currentUser.wins++;
      this._resultText = "You won! 🎉🎉🎉";
    } else if (botOption.beats.includes(playerOption.text)) {
      this.currentUser.defeats++;
      this._resultText = "You lost... 😭😭😭";
    } else {
      this._resultText = "It's a tie 🙅🙅🙅";
    }
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

  static get styles() {
    return styles;
  }
}

customElements.define("game-view", GameView);
