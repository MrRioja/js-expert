import ComponentsBuilder from "./components.js";
export default class TerminalController {
  contructor() {}

  #onInputReceived(eventEmitter) {
    return function () {
      const message = this.getValue();
      console.log(message);
      this.clearValue();
    };
  }

  async initializaTable(eventEmitter) {
    const components = new ComponentsBuilder()
      .setScreen({
        title: "Hacker-Chat",
      })
      .setLayoutComponent()
      .setInputComponent(this.#onInputReceived(eventEmitter))
      .setChatComponent()
      .build();

    components.input.focus();
    components.screen.render();
  }
}
