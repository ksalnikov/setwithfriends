import React, { Component } from "react";
import Card from "./Card";
import { findCard } from "../util";
import { Button } from "react-bootstrap";

class Game extends Component {
  render() {
    var colors = this.props.gameInfo.meta.userColors;
    var userNames = this.props.gameInfo.meta.userNames;

    var { deck, count, scores, freeze } = this.props.gameInfo;
    var selected = JSON.parse(this.props.gameInfo.cards[this.props.uid]);
    const cards = deck.slice(0, count);
    return (
      <div>
        <p>
          You are:
          <span
            style={{
              display: "inline",
              backgroundColor: `${colors[this.props.uid]}`
            }}
          >
            {userNames[this.props.uid]}
          </span>
        </p>
        {scores && (
          <div className="scoreboard">
            {Object.entries(scores).map(scoreEntry => (
              <div
                key={scoreEntry[0]}
                style={{
                  display: "block"
                }}
              >
                <div
                  style={{
                    display: " inline",
                    backgroundColor: `${colors[scoreEntry[0]]}`
                  }}
                >
                  {userNames[scoreEntry[0]]}: {scoreEntry[1]}{" "}
                </div>
              </div>
            ))}
          </div>
        )}

        <h1>Set Game</h1>
        <p>
          <b>Remaining cards:</b> {deck.length}
        </p>

        <div className="card-container">
          {cards.map((c, i) => (
            <Card
              value={c}
              key={i}
              freeze={freeze ? freeze.freeze : false}
              freezeColor={
                freeze && freeze.goodCards
                  ? findCard(freeze.goodCards, c) !== -1
                    ? freeze.color
                    : ""
                  : "#fff"
              }
              selected={findCard(selected, c) !== -1}
              onClick={() => this.props.onSelect(c)}
            />
          ))}
        </div>
        <div className="m-3">
          <Button variant="outline-secondary" onClick={this.props.onAdd3}>Add 3</Button>
        </div>
      </div>
    );
  }
}

export default Game;