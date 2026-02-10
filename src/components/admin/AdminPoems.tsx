import { useEffect, useState } from 'react';
import { Plus, Edit, Trash, Star } from 'lucide-react';
import { supabase, Poem } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminPoems() {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPoem, setEditingPoem] = useState<Poem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    genre: 'Romantic',
    style: 'Free Verse',
    is_featured: false,
  });
  const { user } = useAuth();

  useEffect(() => {
    loadPoems();
  }, []);

  const loadPoems = async () => {
    try {
      const { data, error } = await supabase
        .from('poems')
        .select(`*, profiles (username)`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPoems(data || []);
    } catch (error) {
      console.error('Error loading poems:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      if (editingPoem) {
        const { error } = await supabase
          .from('poems')
          .update(formData)
          .eq('id', editingPoem.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('poems')
          .insert({
            ...formData,
            user_id: user.id,
          });

        if (error) throw error;
      }

      setShowForm(false);
      setEditingPoem(null);
      setFormData({
        title: '',
        content: '',
        genre: 'Romantic',
        style: 'Free Verse',
        is_featured: false,
      });
      loadPoems();
    } catch (error) {
      console.error('Error saving poem:', error);
    }
  };

  const handleEdit = (poem: Poem) => {
    setEditingPoem(poem);
    setFormData({
      title: poem.title,
      content: poem.content,
      genre: poem.genre,
      style: poem.style,
      is_featured: poem.is_featured,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this poem?')) return;

    try {
      const { error } = await supabase
        .from('poems')
        .delete()
        .eq('id', id);

      if (error) throw error;
      loadPoems();
    } catch (error) {
      console.error('Error deleting poem:', error);
    }
  };

  const toggleFeatured = async (poem: Poem) => {
    try {
      const { error } = await supabase
        .from('poems')
        .update({ is_featured: !poem.is_featured })
        .eq('id', poem.id);

      if (error) throw error;
      loadPoems();
    } catch (error) {
      console.error('Error updating poem:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-600">Loading poems...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Manage Poems</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingPoem(null);
            setFormData({
              title: '',
              content: '',
              genre: 'Romantic',
              style: 'Free Verse',
              is_featured: false,
            });
          }}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          <span>New Poem</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            {editingPoem ? 'Edit Poem' : 'Create New Poem'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={10}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
                <input
                  type="text"
                  value={formData.genre}
                  onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Style</label>
                <input
                  type="text"
                  value={formData.style}
                  onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_featured"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="is_featured" className="ml-2 text-sm text-gray-700">
                Feature this poem
              </label>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                {editingPoem ? 'Update Poem' : 'Create Poem'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingPoem(null);
                }}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {poems.map((poem) => (
          <div key={poem.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{poem.title}</h3>
                  {poem.is_featured && (
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  )}
                </div>
                <p className="text-gray-600 line-clamp-2 mb-2">{poem.content}</p>
                <div className="flex gap-2 text-sm text-gray-500">
                  <span className="bg-gray-100 px-2 py-1 rounded">{poem.genre}</span>
                  <span className="bg-gray-100 px-2 py-1 rounded">{poem.style}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => toggleFeatured(poem)}
                  className="p-2 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                  title={poem.is_featured ? 'Unfeature' : 'Feature'}
                >
                  <Star className={`w-5 h-5 ${poem.is_featured ? 'fill-current text-yellow-500' : ''}`} />
                </button>
                <button
                  onClick={() => handleEdit(poem)}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(poem.id)}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
