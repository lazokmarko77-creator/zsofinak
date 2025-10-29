export default function ResultsScreen({ score, total, onRestart, onBack, onShowReview }) {
  const percentage = (score / total) * 100

  const getMessage = () => {
    if (score === total) return "Tökéletes! Gratulálunk! 🎉"
    if (percentage >= 70) return "Nagyszerű teljesítmény! 👏"
    if (percentage >= 50) return "Jó munka! 👍"
    return "Gyakorlás teszi a mestert! 💪"
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-2xl bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-3xl mb-4">Kvíz Befejezve!</h2>
          
          <div className="text-6xl font-bold mb-4">
            {score} / {total}
          </div>
          
          <p className="text-xl mb-6">{getMessage()}</p>

          <div className="card-actions flex-col sm:flex-row gap-3">
            <button className="btn btn-primary btn-lg" onClick={onShowReview}>
              Kérdések áttekintése
            </button>
            <button className="btn btn-secondary btn-lg" onClick={onRestart}>
              Újra
            </button>
            <button className="btn btn-outline btn-lg" onClick={onBack}>
              Vissza a főoldalra
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
