import { useState, useEffect } from 'react'
import QuestionCard from './QuestionCard'
import ResultsScreen from './ResultsScreen'
import ReviewScreen from './ReviewScreen'

function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function Quiz({ topic, onBack }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [finished, setFinished] = useState(false)
  const [shuffledQuestions, setShuffledQuestions] = useState([])
  const [userAnswers, setUserAnswers] = useState([])
  const [showReview, setShowReview] = useState(false)

  useEffect(() => {
    const shuffled = shuffleArray(topic.questions).map(q => ({
      ...q,
      shuffledOptions: shuffleArray(q.options)
    }))
    setShuffledQuestions(shuffled)
  }, [topic])

  if (shuffledQuestions.length === 0) {
    return <div>Loading...</div>
  }

  const question = shuffledQuestions[currentQuestion]

  const handleAnswerClick = (answer) => {
    if (answered) return
    
    setSelectedAnswer(answer)
    setAnswered(true)
    
    const isCorrect = answer === question.correctAnswer
    if (isCorrect) {
      setScore(score + 1)
    }
    
    setUserAnswers([...userAnswers, {
      question: question.question,
      userAnswer: answer,
      correctAnswer: question.correctAnswer,
      isCorrect: isCorrect,
      image: question.image,
      options: question.shuffledOptions
    }])
  }

  const handleNext = () => {
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setAnswered(false)
    } else {
      setFinished(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setAnswered(false)
    setFinished(false)
    setShowReview(false)
    setUserAnswers([])
    const shuffled = shuffleArray(topic.questions).map(q => ({
      ...q,
      shuffledOptions: shuffleArray(q.options)
    }))
    setShuffledQuestions(shuffled)
  }

  const handleShowReview = () => {
    setShowReview(true)
  }

  const handleBackToResults = () => {
    setShowReview(false)
  }

  if (showReview) {
    return (
      <ReviewScreen
        userAnswers={userAnswers}
        onBack={handleBackToResults}
        onRestart={handleRestart}
        onHome={onBack}
      />
    )
  }

  if (finished) {
    return (
      <ResultsScreen
        score={score}
        total={shuffledQuestions.length}
        onRestart={handleRestart}
        onBack={onBack}
        onShowReview={handleShowReview}
      />
    )
  }

  return (
    <QuestionCard
      question={question}
      currentQuestion={currentQuestion}
      totalQuestions={shuffledQuestions.length}
      score={score}
      selectedAnswer={selectedAnswer}
      answered={answered}
      onAnswerClick={handleAnswerClick}
      onNext={handleNext}
      onBack={onBack}
    />
  )
}
