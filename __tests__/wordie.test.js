import { wordie } from "../src/wordie.js";
import readlineSync from "readline-sync";
import sinon from "sinon";

const lostGameMessage = /Game over! The word was:/;
const winMessage = /Congratulations! You have won!/;

describe("Wordie game game", () => {
  let stub;

  beforeEach(() => {
    stub = sinon.stub(readlineSync, "question");

    for (let i = 0; i <= 4; i += 1) {
      stub.onCall(i).returns("pizza");
    }
    sinon.stub(console, "log");
  });

  afterEach(() => {
    if (stub) stub.restore();
    console.log.restore();
  });

  it("plays game and wins", () => {
    wordie("pizza");

    sinon.assert.calledWithMatch(console.log, winMessage);
  });

  it("plays game and loses", () => {
    wordie("lsjdn");

    sinon.assert.calledWithMatch(console.log, lostGameMessage);
  });
});
