import React, { Component, Fragment } from "react";
import Grid from "../Grid";

class App extends Component {
  constructor() {
    super();
    this.state = {
      size: 5,
      diamondsLeft: 5,
      foundAllDiamond: false,
      gameOver: false,
      score: 5 * 5,
      isClicked: false,
      difficulty: "Easy",
    };
    this._removeDiamondFromArray = this._removeDiamondFromArray.bind(this);
    this._decrementCounter = this._decrementCounter.bind(this);
    this.diamondPositions = [];
  }

  _onChange = (event) => {
    event.preventDefault();
    this.setState({
      size: event.target.value,
      diamondsLeft: event.target.value,
      score: event.target.value * event.target.value,
      difficulty:
        event.target.value <= 6
          ? "Easy"
          : event.target.value >= 9
          ? "Hard"
          : "Medium",
    });
  };

  _onClickHandler = () => {
    this.setState({
      isClicked: true,
    });
  };

  componentDidMount() {
    while (this.diamondPositions.length < this.state.size) {
      let row = Math.floor(Math.random() * this.state.size);
      let col = Math.floor(Math.random() * this.state.size);
      if (
        this.diamondPositions.findIndex(
          (pos) => pos.row === row && pos.col === col
        ) === -1
      ) {
        this.diamondPositions.push({ row, col });
      }
    }
  }

  _removeDiamondFromArray(row, col) {
    this.diamondPositions.splice(
      this.diamondPositions.findIndex(
        (diamond) => diamond.row === row && diamond.col === col
      ),
      1
    );
    this.setState({
      diamondsLeft: this.diamondPositions.length,
    });
    if (this.diamondPositions.length === 0) {
      this.setState({ foundAllDiamond: true });
    }
  }

  _decrementCounter() {
    this.setState({
      score: this.state.score - 1,
    });
    if (this.state.score === 0) {
      this.setState({ gameOver: true });
    }
  }

  _renderRowElements(row) {
    let rowElements = [];
    for (let i = 0; i < this.state.size; i++) {
      rowElements.push(
        <div className="game-grid">
          <Grid
            key={i + "" + row}
            row={row}
            col={i}
            diamondPositions={this.diamondPositions}
            removeDiamondFromArray={() => this._removeDiamondFromArray(row, i)}
            decrementCounter={() => this._decrementCounter(row, i)}
          />
        </div>
      );
    }
    return rowElements;
  }

  _renderRows() {
    let row = [];
    for (let i = 0; i < this.state.size; i++) {
      row.push(
        <div key={i} className="game-rows">
          {this._renderRowElements(i)}
        </div>
      );
    }
    return row;
  }

  _renderTable() {
    return (
      <Fragment>
        <div className="game-scoreboard">
          <div>Your Current Score: {this.state.score}</div>
          {/* <div>Diamonds Remaining: {this.state.diamondsLeft}</div> */}
        </div>
        {this._renderRows()}
      </Fragment>
    );
  }

  _renderGameOver() {
    return (
      <div className="game-over-content">
        <span
          className={this.state.gameOver ? "game-over-text hardClass" : "game-over-text easyClass"}
        >
          {this.state.gameOver
            ? `Game Over`
            : `Congratulations! You have found all the diamonds.`}
        </span>
        <p className="game-score-text">Your Final score: {this.state.score}</p>
        <p>Reload to play again</p>
      </div>
    );
  }

  render() {
    return (
      <Fragment>
        <h1 className="game-title">Diamond Sweeper</h1>
        {this.state.isClicked ? (
          <section className="game-content">
            {this.state.gameOver || this.state.foundAllDiamond
              ? this._renderGameOver()
              : this._renderTable()}
          </section>
        ) : (
          <div className="game-option">
            <label>
              Boxes:
              <select
                name="choice"
                className="game-option--choices"
                onChange={this._onChange}
                defaultValue="5"
              >
                <option name="option" value="5">
                  5 x 5
                </option>
                <option name="option" value="6">
                  6 x 6
                </option>
                <option name="option" value="7">
                  7 x 7
                </option>
                <option name="option" value="8">
                  8 x 8
                </option>
                <option name="option" value="9">
                  9 x 9
                </option>
                <option name="option" value="10">
                  10 x 10
                </option>
              </select>
            </label>
            <p
              className={
                this.state.difficulty === "Easy"
                  ? "easyClass"
                  : this.state.difficulty === "Hard"
                  ? "hardClass"
                  : "medClass"
              }
            >
              {this.state.difficulty}
            </p>
            <button
              type="submit"
              className="game-option--playbutton"
              onClick={this._onClickHandler}
            >
              <i class="fa-solid fa-play"></i>
            </button>
          </div>
        )}
      </Fragment>
    );
  }
}

export default App;
