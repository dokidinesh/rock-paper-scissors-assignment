import {Component} from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import './App.css'

import ImageButton from './components/ImageButton'

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
    currentScore: 0,
    isClickedChoiceButton: false,
    isClickedPlayButton: true,
  }

  onClickPlayButton = () => {
    this.setState({isClickedChoiceButton: false, isClickedPlayButton: true})
  }

  onClickImage = imageId => {
    this.setState({isClickedChoiceButton: true, isClickedPlayButton: false})
    const yourChoice = imageId

    const randomValue = Math.floor(Math.random() * 3)
    const opponentChoice = choicesList[randomValue].id

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

  render() {
    const {
      isClickedChoiceButton,
      score,
      yourChoice,
      opponentChoice,
      result,
      isClickedPlayButton,
    } = this.state

    const yourChoiceData = choicesList.filter(
      eachChoice => eachChoice.id === yourChoice,
    )
    const opponentChoiceData = choicesList.filter(
      eachChoice => eachChoice.id === opponentChoice,
    )
    return (
      <div className="app-container">
        <div>
          <div className="common-container">
            <div>
              <h1 className="choice-text-color">ROCK PAPER SCISSORS</h1>
            </div>
            <div className="score-container">
              <p>Score</p>
              <p className="score">{score}</p>
            </div>
          </div>
          {isClickedPlayButton ? (
            <div className="play-container">
              {choicesList.map(eachChoice => (
                <ImageButton
                  choiceDetails={eachChoice}
                  key={eachChoice.id}
                  onClickImage={this.onClickImage}
                />
              ))}
            </div>
          ) : null}

          {isClickedChoiceButton ? (
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
          ) : null}
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
