import React, { Component } from "react";
import Cards from "./components/Cards";
import Nav from "./components/Nav";
import Wrapper from "./components/Wrapper";
import imgCards from "./imgCards.json";
import Title from "./components/Title";
import Row from "./components/Styling/Row";
import Column from "./components/Styling/Column";
import Container from "./components/Styling/Container";
import "./App.css";

function shuffleFriends(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
class App extends Component {
  state = {
    imgCards,
    currentScore: 0,
    topScore: 0,
    rightWrong: "",
    clicked: []
  };

  handleClick = id => {
    if (this.state.clicked.indexOf(id) === -1) {
      this.handleIncrement();
      this.setState({ clicked: this.state.clicked.concat(id) });
    } else {
      this.handleReset();
    }
  };

  handleIncrement = () => {
    const newScore = this.state.currentScore + 1;
    this.setState({
      currentScore: newScore,
      rightWrong: ""
    });
    if (newScore >= this.state.topScore) {
      this.setState({ topScore: newScore });
    }
    if (newScore === 12) {
      this.setState({ rightWrong: "You win!" });
    }
    this.handleShuffle();
  };

  handleReset = () => {
    this.setState({
      currentScore: 0,
      topScore: this.state.topScore,
      rightWrong: "50% Of The Universe is GONE!",
      clicked: []
    });
    this.handleShuffle();
  };

  handleShuffle = () => {
    let shuffledFriends = shuffleFriends(imgCards);
    this.setState({ friends: shuffledFriends });
  };

  render() {
    return (
      <Wrapper>
        <Nav
          title="Marvel Avengers Clicky Game"
          score={this.state.currentScore}
          topScore={this.state.topScore}
          rightWrong={this.state.rightWrong}
        />
        <Title>
          Try to click on each character, but don't hit any duplicates, or we'll
          kill 50% of the Universe!!!
        </Title>

        <Container>
          <Row>
            {this.state.imgCards.map(friend => (
              <Column size="md-3 sm-6">
                <Cards
                  key={friend.id}
                  handleClick={this.handleClick}
                  handleIncrement={this.handleIncrement}
                  handleReset={this.handleReset}
                  handleShuffle={this.handleShuffle}
                  id={friend.id}
                  image={friend.image}
                />
              </Column>
            ))}
          </Row>
        </Container>
      </Wrapper>
    );
  }
}

export default App;
