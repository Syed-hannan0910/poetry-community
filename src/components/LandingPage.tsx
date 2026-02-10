import { Mail, Phone, Heart, Feather } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Feather className="w-16 h-16 text-blue-600" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Welcome to Verses & Souls
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              A sanctuary for writers, poets, and lovers of the written word
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('poems')}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Explore Poetry
              </button>
              <button
                onClick={() => onNavigate('forum')}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-medium border-2 border-blue-600 hover:bg-blue-50 transition-colors"
              >
                Join Community
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Heart className="w-8 h-8 text-rose-500" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
            About the Poet
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p className="text-center italic text-xl text-gray-600 mb-8">
              "Words are the vessels of emotion, carrying the weight of unspoken feelings across the vast ocean of human experience."
            </p>

            <div className="bg-slate-50 p-8 rounded-lg">
              <p className="mb-4">
                As a self-made poet, I have dedicated my craft to exploring the depths of romantic expression through free verse, drawing inspiration from the eloquence of early 19th-century literary tradition. My work delves into the realm of sensational love, capturing moments of longing, yearning, and the bittersweet beauty of emotions that often remain unspoken.
              </p>

              <p className="mb-4">
                Each poem is a journey into the heart's most tender corridors, where far-fetched dreams meet one-sided devotion, and where the impossible becomes beautifully articulated. My verses seek to give voice to the silent prayers of those who love deeply, even from afar.
              </p>

              <p>
                Through this platform, I invite you to not only witness this journey but to become part of a community where words flow freely, where every heart finds its rhythm, and where poetry becomes a bridge connecting souls across distances.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Poetry Collection</h3>
              <p className="text-gray-600 leading-relaxed">
                Explore a curated collection of romantic verses, written in the classical free verse style that captures the essence of profound emotions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Feather className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Writer's Community</h3>
              <p className="text-gray-600 leading-relaxed">
                Join fellow writers in a supportive forum where you can share your work, receive feedback, and grow together as artists.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Learning Resources</h3>
              <p className="text-gray-600 leading-relaxed">
                Master the art of poetry through comprehensive courses covering techniques, styles, and the timeless rules of English literature.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-lg text-slate-300 mb-8">
            Connect with me to discuss poetry, collaborate, or simply share your thoughts
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="mailto:syedhannan0109@gmail.com"
              className="flex items-center space-x-3 text-slate-200 hover:text-white transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>syedhannan0109@gmail.com</span>
            </a>
            <a
              href="https://wa.me/918550011942"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-slate-200 hover:text-white transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>+91 8550011942</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
