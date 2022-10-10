import { LitElement, html, css } from "lit";

import "@vaadin/menu-bar";
import { Notification } from "@vaadin/notification";

export class GameView extends LitElement {
  static get properties() {
    return {
      currentUser: {
        type: Object,
      },
    };
  }

  constructor() {
    super();

    this.currentUser = {};

    // Information about the game logic
    this.options = [
      { text: "👊", beats: "✌️" },
      { text: "🖐", beats: "👊" },
      { text: "✌️", beats: "🖐" },
    ];
  }
  
  render() {
    return html`
      <div class="container">
        <h1>Hi, ${this.currentUser.name}! 👋</h1>
        <vaadin-menu-bar
          theme="primary center"
          .items=${this.options}
          @item-selected=${this.onOptionSelected}
        ></vaadin-menu-bar>
      </div>
    `;
  }

  onOptionSelected(event) {
    const option = event.detail.value;

    setTimeout(() => {
      const botOption =
        this.options[Math.floor(Math.random() * this.options.length)];

      if (option.beats === botOption.text) {
        console.log("You won! " + option.text + " - " + botOption.text);
      } else if (botOption.beats === option.text) {
        console.log("You lost... " + option.text + " - " + botOption.text);
      } else if (option.text === botOption.text) {
        console.log("Tie " + option.text + " - " + botOption.text);
      } else {
        console.log("Cheater detected!");
        this._showNotification("You're cheating!", "error");
      }
    }, 1000);
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

      vaadin-menu-bar {
        font-size: 24px;
      }
    `;
  }
}

customElements.define("game-view", GameView);
