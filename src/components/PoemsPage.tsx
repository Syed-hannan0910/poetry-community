import { useEffect, useState } from 'react';
import { Heart, Calendar, User } from 'lucide-react';
import { supabase, Poem } from '../lib/supabase';

export default function PoemsPage() {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null);

  useEffect(() => {
    loadPoems();
  }, []);

  const loadPoems = async () => {
    try {
      const { data, error } = await supabase
        .from('poems')
        .select(`*, profiles (username, full_name)`)
        .order('published_at', { ascending: false });

      if (error) throw error;
      setPoems(data || []);
    } catch (error) {
      console.error('Error loading poems:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading poetry...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Poetry Collection
          </h1>
          <p className="text-lg text-gray-600">
            Explore verses that speak to the soul
          </p>
        </div>

        {poems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No poems published yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {poems.map((poem) => (
              <div
                key={poem.id}
                onClick={() => setSelectedPoem(poem)}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all cursor-pointer group"
              >
                {poem.is_featured && (
                  <div className="flex items-center space-x-1 text-rose-500 mb-3">
                    <Heart className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">Featured</span>
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {poem.title}
                </h3>
                <p className="text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                  {poem.content}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{poem.profiles?.username || 'Anonymous'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(poem.published_at)}</span>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <span className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
                    {poem.genre}
                  </span>
                  <span className="inline-block bg-slate-50 text-slate-700 text-xs px-2 py-1 rounded">
                    {poem.style}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedPoem && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPoem(null)}
        >
          <div
            className="bg-white rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedPoem.is_featured && (
              <div className="flex items-center space-x-2 text-rose-500 mb-4">
                <Heart className="w-5 h-5 fill-current" />
                <span className="font-medium">Featured Poem</span>
              </div>
            )}
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {selectedPoem.title}
            </h2>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{selectedPoem.profiles?.username || 'Anonymous'}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(selectedPoem.published_at)}</span>
              </div>
            </div>
            <div className="prose prose-lg max-w-none">
              <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {selectedPoem.content}
              </p>
            </div>
            <div className="mt-6 flex gap-2">
              <span className="inline-block bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded">
                {selectedPoem.genre}
              </span>
              <span className="inline-block bg-slate-50 text-slate-700 text-sm px-3 py-1 rounded">
                {selectedPoem.style}
              </span>
            </div>
            <button
              onClick={() => setSelectedPoem(null)}
              className="mt-6 w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
