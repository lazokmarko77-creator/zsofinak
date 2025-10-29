import { useState } from 'react'
import TopicSelector from './components/TopicSelector'
import Quiz from './components/Quiz'
import { topics } from './data/quizData'

function App() {
  const [selectedTopic, setSelectedTopic] = useState(null)

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic)
  }

  const handleBack = () => {
    setSelectedTopic(null)
  }

  return (
    <div className="montserrat-font">
      {selectedTopic ? (
        <Quiz topic={selectedTopic} onBack={handleBack} />
      ) : (
        <TopicSelector topics={topics} onSelectTopic={handleSelectTopic} />
      )}
    </div>
  )
}

export default App
