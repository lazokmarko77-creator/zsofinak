export default function ReviewScreen({ userAnswers, onBack, onRestart, onHome }) {
  const optionLabels = ['A', 'B', 'C', 'D']

  return (
    <div className="min-h-screen bg-base-200 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button className="btn btn-ghost" onClick={onBack}>
            ← Vissza az eredményekhez
          </button>
          <h1 className="text-2xl font-bold">Kérdések áttekintése</h1>
          <div className="w-32"></div>
        </div>

        <div className="space-y-6">
          {userAnswers.map((answer, index) => (
            <div key={index} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-start gap-4">
                  <div className="badge badge-primary badge-lg">{index + 1}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-4">{answer.question}</h3>
                    
                    {answer.image && (
                      <div className="mb-4 flex justify-center">
                        <img
                          src={answer.image}
                          alt="Kérdéshez tartozó ábra"
                          className="max-w-full h-auto rounded-lg shadow-md"
                          style={{ maxHeight: '300px' }}
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      {answer.options.map((option, optIndex) => {
                        const isUserAnswer = option === answer.userAnswer
                        const isCorrectAnswer = option === answer.correctAnswer
                        
                        let className = "p-3 rounded-lg border-2 "
                        
                        if (isCorrectAnswer) {
                          className += "bg-success/20 border-success text-success-content"
                        } else if (isUserAnswer && !answer.isCorrect) {
                          className += "bg-error/20 border-error text-error-content"
                        } else {
                          className += "bg-base-200 border-base-300 opacity-60"
                        }

                        return (
                          <div key={optIndex} className={className}>
                            <div className="flex items-center gap-3">
                              <span className="font-bold">{optionLabels[optIndex]})</span>
                              <span>{option}</span>
                              {isCorrectAnswer && (
                                <span className="ml-auto badge badge-success">✓ Helyes</span>
                              )}
                              {isUserAnswer && !isCorrectAnswer && (
                                <span className="ml-auto badge badge-error">✗ A te válaszod</span>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {!answer.isCorrect && (
                      <div className="alert alert-info mt-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <div>
                          <div className="font-bold">Helyes válasz:</div>
                          <div>{answer.correctAnswer}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="sticky bottom-4 mt-8 flex justify-center gap-4 bg-base-200 p-4 rounded-lg shadow-xl">
          <button className="btn btn-primary" onClick={onRestart}>
            Újra
          </button>
          <button className="btn btn-outline" onClick={onHome}>
            Vissza a főoldalra
          </button>
        </div>
      </div>
    </div>
  )
}
