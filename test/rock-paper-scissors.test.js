import { html } from "lit";
import { fixture, expect, elementUpdated } from "@open-wc/testing";

import "../src/rock-paper-scissors.js";

describe("RockPaperScissors", () => {
  let app;
  beforeEach(async () => {
    app = await fixture(html`<rock-paper-scissors></rock-paper-scissors>`);
  });

  it("renders the home component at start", () => {
    const home = app.shadowRoot.querySelector("home-view");
    expect(home).to.exist;
  });

  it("stay on the home page if we login incorrect", () => {
    const home = app.shadowRoot.querySelector("home-view");
    home.shadowRoot.getElementById("loginName").value = "wrong";

    home.onLogin();

    expect(home).to.exist;
  });

  it("redirect on the game page if we register successfully", async () => {
    const home = app.shadowRoot.querySelector("home-view");

    home.shadowRoot.getElementById("registerName").value = "Nuevo123";
    home.onRegister();

    await elementUpdated(app);

    const game = app.shadowRoot.querySelector("game-view");

    expect(game).to.exist;
  });

  it("returns to the home component if we try to access the game without login", async () => {
    app.navigateTo({ view: "game", user: {} });
    await elementUpdated(app);
    const game = app.shadowRoot.querySelector("game-view");
    const home = app.shadowRoot.querySelector("home-view");

    expect(game).to.not.exist;
    expect(home).to.exist;
  });

  it("renders the ranking component on navigate", async () => {
    app.navigateTo({ view: "ranking", user: {} });
    await elementUpdated(app);
    const ranking = app.shadowRoot.querySelector("ranking-view");
    expect(ranking).to.exist;
  });

  it("renders the home component on navigate incorrectly", async () => {
    app.navigateTo({ view: "gta6", user: {} });
    await elementUpdated(app);
    const home = app.shadowRoot.querySelector("home-view");
    expect(home).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(app).shadowDom.to.be.accessible();
  });
});
