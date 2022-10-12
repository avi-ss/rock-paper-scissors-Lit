import { html } from "lit";
import { fixture, expect, elementUpdated } from "@open-wc/testing";

import "../src/rock-paper-scissors.js";
import "../src/view/game-view";

describe("GameView", () => {
  let app, game;

  beforeEach(async () => {
    app = await fixture(html`<rock-paper-scissors></rock-paper-scissors>`);

    // Register
    const home = app.shadowRoot.querySelector("home-view");
    home.shadowRoot.getElementById("registerName").value = "Nuevo123";
    home.onRegister();
    await elementUpdated(app);

    game = app.shadowRoot.querySelector("game-view");
  });

  it("renders the game component on register", () => {
    expect(game).to.exist;
  });

  it("choosing an option leads to a result", () => {
    const playerOptionText = game.shadowRoot.getElementById("player").innerText;
    const botOptionText = game.shadowRoot.getElementById("bot").innerText;
    const resultText = game.shadowRoot.getElementById("result-text").innerText;

    expect(playerOptionText).to.be.empty;
    expect(botOptionText).to.be.empty;
    expect(resultText).to.be.empty;

    game.selectOption(game.options[0]);

    setTimeout(() => {
      expect(playerOptionText).not.to.be.empty;
      expect(botOptionText).not.to.be.empty;
      expect(resultText).not.to.be.empty;
    }, 1100);
  });
});
