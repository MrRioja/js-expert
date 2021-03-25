import ComponentsBuilder from "./components.js";
export default class TerminalController {
  #usersCollors = new Map();

  contructor() {}

  #pickCollor() {
    return "#" + (((1 << 24) * Math.random()) | 0).toString(16) + "-fg";
  }

  #getUserCollor(userName) {
    if (this.#usersCollors.has(userName)) {
      return this.#usersCollors.get(userName);
    }

    const color = this.#pickCollor();
    this.#usersCollors.set(userName, color);

    return color;
  }

  #onInputReceived(eventEmitter) {
    return function () {
      const message = this.getValue();
      console.log(message);
      this.clearValue();
    };
  }

  #onMessageReceived({ screen, chat }) {
    return (msg) => {
      const { userName, message } = msg;
      const collor = this.#getUserCollor(userName);

      chat.addItem(`{${collor}}{bold}${userName}{/}: ${message}`);
      screen.render();
    };
  }

  #registerEvents(eventEmitter, components) {
    eventEmitter.on("message:received", this.#onMessageReceived(components));
  }

  async initializaTable(eventEmitter) {
    const components = new ComponentsBuilder()
      .setScreen({
        title: "Hacker-Chat",
      })
      .setLayoutComponent()
      .setInputComponent(this.#onInputReceived(eventEmitter))
      .setChatComponent()
      .setActivityLogComponent()
      .setStatusComponent()
      .build();

    this.#registerEvents(eventEmitter, components);

    components.input.focus();
    components.screen.render();

    setInterval(() => {
      eventEmitter.emit("message:received", {
        message: "Salve",
        userName: "ManoBrow",
      });

      eventEmitter.emit("message:received", {
        message: "quebrada",
        userName: "IceBlue",
      });

      eventEmitter.emit("message:received", {
        message: "iae",
        userName: "KlJay",
      });

      eventEmitter.emit("message:received", {
        message: "opa",
        userName: "EdiRock",
      });
    }, 1000);
  }
}
