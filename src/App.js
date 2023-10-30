import './App.css'
import Popup from 'reactjs-popup'
import {Component} from 'react'
import 'reactjs-popup/dist/index.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class App extends Component {
  state = {
    score: 0,
    result: '',
    yourChoice: '',
    opponentChoice: '',
    isClickedChoiceButton: false,
    currentScore: 0,
  }

  onClickPlayButton = () => {
    this.setState(prevState => ({
      isClickedChoiceButton: !prevState.isClickedChoiceButton,
    }))
  }

  onClickChoiceButton = event => {
    this.setState(prevState => ({
      isClickedChoiceButton: !prevState.isClickedChoiceButton,
    }))
    const yourChoice = event.target.alt
    const value = Math.floor(Math.random() * 3)
    console.log(value)
    const opponentChoice = choicesList[value].id

    if (
      (yourChoice === 'ROCK' && opponentChoice === 'SCISSORS') ||
      (yourChoice === 'SCISSORS' && opponentChoice === 'PAPER') ||
      (yourChoice === 'PAPER' && opponentChoice === 'ROCK')
    ) {
      this.setState(prevState => ({
        score: prevState.score + 1,
        currentScore: 1,
        result: 'YOU WON',
        yourChoice,
        opponentChoice,
      }))
      console.log('YOU WON')
    } else if (yourChoice === opponentChoice) {
      this.setState({
        currentScore: 0,
        result: 'IT IS DRAW',
        yourChoice,
        opponentChoice,
      })
      console.log('IT IS DRAW')
    } else {
      this.setState(prevState => ({
        score: prevState.score - 1,
        currentScore: -1,
        result: 'YOU LOSE',
        yourChoice,
        opponentChoice,
      }))
      console.log('YOU LOSE')
    }
  }

  renderPlayingView = () => (
    <div className="play-container">
      {choicesList.map(eachChoice => (
        <div key={eachChoice.id}>
          <button
            type="button"
            onClick={this.onClickChoiceButton}
            data-testid={`${eachChoice.id.toLowerCase()}Button`}
          >
            <img
              src={eachChoice.imageUrl}
              alt={eachChoice.id}
              className="choice-image"
            />
          </button>
        </div>
      ))}
    </div>
  )

  renderResultView = () => {
    const {yourChoice, opponentChoice, result} = this.state

    const yourChoiceData = choicesList.filter(
      eachChoice => eachChoice.id === yourChoice,
    )
    const opponentChoiceData = choicesList.filter(
      eachChoice => eachChoice.id === opponentChoice,
    )

    return (
      <div className="result-container">
        <div className="game-result-view">
          <div>
            <img
              src={yourChoiceData[0].imageUrl}
              alt="your choice"
              className="choice-image"
            />
            <p>Your Choice</p>
          </div>
          <div>
            <img
              src={opponentChoiceData[0].imageUrl}
              alt="opponent choice"
              className="choice-image"
            />
            <p>Opponent Choice</p>
          </div>
        </div>
        <p>{result}</p>
        <button type="button" onClick={this.onClickPlayButton}>
          PLAY AGAIN
        </button>
      </div>
    )
  }

  render() {
    const {isClickedChoiceButton, score, currentScore} = this.state
    const scoreDisplay = isClickedChoiceButton ? currentScore : score
    return (
      <div className="app-container">
        <div>
          <div className="common-container">
            <div>
              <h1 className="choice-text-color">ROCK PAPER SCISSORS</h1>
            </div>
            <div className="score-container">
              <p>Score</p>
              <p className="score">{scoreDisplay}</p>
            </div>
          </div>
          {isClickedChoiceButton
            ? this.renderResultView()
            : this.renderPlayingView()}
        </div>
        <div className="popup-container">
          <Popup
            modal
            trigger={
              <button type="button" className="trigger-button">
                Rules
              </button>
            }
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
              alt="rules"
              className="rules-image"
            />
          </Popup>
        </div>
      </div>
    )
  }
}

export default App
