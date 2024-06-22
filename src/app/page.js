import Link from "next/link";

export default function Home() {
  return (
    <div>
      <section className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Form and Store Your Ideas</h2>
          <p className="mb-8">
            Easily jot down your ideas and keep them organized in one place.
          </p>
          <button className="bg-blue-500 text-white py-2 px-4 rounded">
            <Link href="/ideas"> Form Now </Link>
          </button>
        </div>
      </section>

      {/* Chat with AI Assistant Section */}
      <section className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Chat with AI Assistant</h2>
          <p className="mb-8">
            Get insights and feedback on your ideas from our AI assistant.
          </p>
          <span className="border-green-500 border-2  text-black py-2 px-4 rounded">
            Chat On uploading ideas/videos.
          </span>
        </div>
      </section>

      {/* Upload Videos and Get Summarized Insights Section */}
      <section className="min-h-screen flex items-center justify-center bg-yellow-50">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">
            Upload Videos and Get Summarized Insights
          </h2>
          <p className="mb-8">
            Upload your videos and receive concise summaries and insights.
          </p>
          <button className="bg-yellow-500 text-white py-2 px-4 rounded">
            <Link href={"/videos"}>Upload Now</Link>
          </button>
        </div>
      </section>

      {/* Automate Social Media Posts Section */}
      <section className="min-h-screen flex items-center justify-center bg-purple-50">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">
            Automate Social Media Posts
          </h2>
          <p className="mb-8">
            Use the AI chat to automate your social media posts on Facebook
            pages.
          </p>
          <span className="border-purple-500 border-2 text-black py-2 px-4 rounded">
            Automate on the chatbot ui
          </span>
        </div>
      </section>
    </div>
  );
}
