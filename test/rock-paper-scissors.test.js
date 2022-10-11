import { html } from 'lit';
import { fixture, expect, elementUpdated } from '@open-wc/testing';

import '../src/rock-paper-scissors.js';

describe('RockPaperScissors', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<rock-paper-scissors></rock-paper-scissors>`);
  });

  it('renders the home component at start', () => {
    const home = element.shadowRoot.querySelector("home-view");
    expect(home).to.exist;
  });

  it('renders the game component on property view changed to ranking', async () => {
    element.view = "game";
    await elementUpdated(element);
    const game = element.shadowRoot.querySelector("game-view");
    expect(game).to.exist;
  });

  it('renders the ranking component on property view changed to ranking', async () => {
    element.view = "ranking";
    await elementUpdated(element);
    const ranking = element.shadowRoot.querySelector("ranking-view");
    expect(ranking).to.exist;
  });

  it('renders the home component on property view changed incorrectly', async () => {
    element.view = "gta6";
    await elementUpdated(element);
    const home = element.shadowRoot.querySelector("home-view");
    expect(home).to.exist;
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
