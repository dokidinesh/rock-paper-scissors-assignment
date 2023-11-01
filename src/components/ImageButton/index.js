import './index.css'

const ImageButton = props => {
  const {choiceDetails, onClickImage} = props
  const {id, imageUrl} = choiceDetails
  const testId = `${id.toLowerCase()}Button`
  console.log(testId)

  const onClickChoiceButton = () => {
    onClickImage(id)
  }

  return (
    <div>
      <div key={id}>
        <button
          type="button"
          onClick={onClickChoiceButton}
          data-testid={testId}
        >
          <img src={imageUrl} alt={id} className="choice-image" />
        </button>
      </div>
    </div>
  )
}

export default ImageButton
