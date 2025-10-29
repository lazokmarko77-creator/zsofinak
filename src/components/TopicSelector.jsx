export default function TopicSelector({ topics, onSelectTopic }) {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Közgazdaságtan Kvíz</h1>
          <p className="text-xl text-base-content/70">
            Válassz egy fejeztet és teszteld a tudásod!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topics.map((topic) => (
            <button
              key={topic.id}
              className="btn btn-lg btn-primary h-auto py-6 text-xl"
              onClick={() => onSelectTopic(topic)}
            >
              <div className="flex flex-col items-center gap-2">
                <span>{topic.title}</span>
                <span className="text-sm opacity-70">
                  {topic.questions.length} kérdés
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
