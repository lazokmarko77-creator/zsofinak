export default function QuestionCard({
  question,
  currentQuestion,
  totalQuestions,
  score,
  selectedAnswer,
  answered,
  onAnswerClick,
  onNext,
  onBack
}) {
  const getButtonClass = (option) => {
    if (!answered) {
      return 'btn btn-outline btn-lg w-full justify-start text-left'
    }
    
    if (option === question.correctAnswer) {
      return 'btn btn-success btn-lg w-full justify-start text-left'
    }
    
    if (option === selectedAnswer && option !== question.correctAnswer) {
      return 'btn btn-error btn-lg w-full justify-start text-left'
    }
    
    return 'btn btn-outline btn-lg w-full justify-start text-left opacity-50'
  }

  const optionLabels = ['A', 'B', 'C', 'D']

  return (
    <div className="min-h-screen bg-base-200 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button className="btn btn-ghost" onClick={onBack}>
            ← Vissza
          </button>
          <div className="text-lg font-semibold">
            Kérdés {currentQuestion + 1} / {totalQuestions}
          </div>
          <div className="text-lg font-semibold">
            Pontszám: {score}
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6">{question.question}</h2>

            {question.image && (
              <div className="mb-6 flex justify-center">
                <img
                  src={question.image}
                  alt="Kérdéshez tartozó ábra"
                  className="max-w-full h-auto rounded-lg shadow-md"
                  style={{ maxHeight: '400px' }}
                />
              </div>
            )}

            <div className="space-y-3">
              {question.shuffledOptions.map((option, index) => (
                <button
                  key={index}
                  className={getButtonClass(option)}
                  onClick={() => onAnswerClick(option)}
                  disabled={answered}
                >
                  <span className="font-bold mr-3">{optionLabels[index]})</span>
                  {option}
                </button>
              ))}
            </div>

            {answered && (
              <div className="mt-6">
                {selectedAnswer === question.correctAnswer ? (
                  <div className="alert alert-success">
                    <span>✓ Helyes válasz!</span>
                  </div>
                ) : (
                  <div className="alert alert-error">
                    <div>
                      <div>✗ Helytelen válasz!</div>
                      <div className="text-sm mt-1">
                        A helyes válasz: {question.correctAnswer}
                      </div>
                    </div>
                  </div>
                )}
                <button
                  className="btn btn-primary w-full mt-4"
                  onClick={onNext}
                >
                  {currentQuestion < totalQuestions - 1 ? 'Következő kérdés' : 'Eredmény megtekintése'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
