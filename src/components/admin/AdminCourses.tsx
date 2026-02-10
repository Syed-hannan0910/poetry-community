import { useEffect, useState } from 'react';
import { Plus, Edit, Trash, ChevronDown, ChevronRight } from 'lucide-react';
import { supabase, Course, Lesson } from '../../lib/supabase';

export default function AdminCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [lessons, setLessons] = useState<Record<string, Lesson[]>>({});
  const [loading, setLoading] = useState(true);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);

  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    price: 0,
    is_published: false,
  });

  const [lessonForm, setLessonForm] = useState({
    title: '',
    content: '',
    video_url: '',
    order_number: 1,
  });

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadLessons = async (courseId: string) => {
    try {
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('course_id', courseId)
        .order('order_number', { ascending: true });

      if (error) throw error;
      setLessons((prev) => ({ ...prev, [courseId]: data || [] }));
    } catch (error) {
      console.error('Error loading lessons:', error);
    }
  };

  const handleCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingCourse) {
        const { error } = await supabase
          .from('courses')
          .update(courseForm)
          .eq('id', editingCourse.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('courses')
          .insert(courseForm);

        if (error) throw error;
      }

      setShowCourseForm(false);
      setEditingCourse(null);
      setCourseForm({ title: '', description: '', price: 0, is_published: false });
      loadCourses();
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  const handleLessonSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourseId) return;

    try {
      if (editingLesson) {
        const { error } = await supabase
          .from('lessons')
          .update(lessonForm)
          .eq('id', editingLesson.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('lessons')
          .insert({
            ...lessonForm,
            course_id: selectedCourseId,
          });

        if (error) throw error;
      }

      setShowLessonForm(false);
      setEditingLesson(null);
      setLessonForm({ title: '', content: '', video_url: '', order_number: 1 });
      loadLessons(selectedCourseId);
    } catch (error) {
      console.error('Error saving lesson:', error);
    }
  };

  const handleDeleteCourse = async (id: string) => {
    if (!confirm('Are you sure? This will delete all lessons in this course.')) return;

    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', id);

      if (error) throw error;
      loadCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleDeleteLesson = async (id: string, courseId: string) => {
    if (!confirm('Are you sure you want to delete this lesson?')) return;

    try {
      const { error } = await supabase
        .from('lessons')
        .delete()
        .eq('id', id);

      if (error) throw error;
      loadLessons(courseId);
    } catch (error) {
      console.error('Error deleting lesson:', error);
    }
  };

  const toggleCourseExpand = (courseId: string) => {
    if (expandedCourse === courseId) {
      setExpandedCourse(null);
    } else {
      setExpandedCourse(courseId);
      if (!lessons[courseId]) {
        loadLessons(courseId);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-600">Loading courses...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Manage Courses</h2>
        <button
          onClick={() => {
            setShowCourseForm(!showCourseForm);
            setEditingCourse(null);
            setCourseForm({ title: '', description: '', price: 0, is_published: false });
          }}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          <span>New Course</span>
        </button>
      </div>

      {showCourseForm && (
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            {editingCourse ? 'Edit Course' : 'Create New Course'}
          </h3>
          <form onSubmit={handleCourseSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={courseForm.title}
                onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={courseForm.description}
                onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
              <input
                type="number"
                value={courseForm.price}
                onChange={(e) => setCourseForm({ ...courseForm, price: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                step="0.01"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_published"
                checked={courseForm.is_published}
                onChange={(e) => setCourseForm({ ...courseForm, is_published: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="is_published" className="ml-2 text-sm text-gray-700">
                Publish this course
              </label>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                {editingCourse ? 'Update Course' : 'Create Course'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCourseForm(false);
                  setEditingCourse(null);
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
        {courses.map((course) => (
          <div key={course.id} className="bg-white border border-gray-200 rounded-lg">
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <button
                      onClick={() => toggleCourseExpand(course.id)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      {expandedCourse === course.id ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </button>
                    <h3 className="text-lg font-bold text-gray-900">{course.title}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        course.is_published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {course.is_published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{course.description}</p>
                  <p className="text-sm text-blue-600 font-medium">${course.price}</p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => {
                      setEditingCourse(course);
                      setCourseForm({
                        title: course.title,
                        description: course.description,
                        price: course.price,
                        is_published: course.is_published,
                      });
                      setShowCourseForm(true);
                    }}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {expandedCourse === course.id && (
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-gray-900">Lessons</h4>
                  <button
                    onClick={() => {
                      setSelectedCourseId(course.id);
                      setShowLessonForm(true);
                      setEditingLesson(null);
                      const maxOrder = lessons[course.id]?.length || 0;
                      setLessonForm({
                        title: '',
                        content: '',
                        video_url: '',
                        order_number: maxOrder + 1,
                      });
                    }}
                    className="flex items-center space-x-1 text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Lesson</span>
                  </button>
                </div>

                {showLessonForm && selectedCourseId === course.id && (
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <form onSubmit={handleLessonSubmit} className="space-y-3">
                      <input
                        type="text"
                        placeholder="Lesson Title"
                        value={lessonForm.title}
                        onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        required
                      />
                      <textarea
                        placeholder="Lesson Content"
                        value={lessonForm.content}
                        onChange={(e) => setLessonForm({ ...lessonForm, content: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none"
                        required
                      />
                      <input
                        type="url"
                        placeholder="Video URL (optional)"
                        value={lessonForm.video_url}
                        onChange={(e) => setLessonForm({ ...lessonForm, video_url: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                      <input
                        type="number"
                        placeholder="Order"
                        value={lessonForm.order_number}
                        onChange={(e) => setLessonForm({ ...lessonForm, order_number: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        min="1"
                      />
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700"
                        >
                          {editingLesson ? 'Update' : 'Add'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowLessonForm(false);
                            setEditingLesson(null);
                          }}
                          className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg text-sm hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                <div className="space-y-2">
                  {lessons[course.id]?.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="bg-white rounded-lg p-3 flex items-start justify-between"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                            #{lesson.order_number}
                          </span>
                          <h5 className="font-medium text-gray-900">{lesson.title}</h5>
                        </div>
                        <p className="text-sm text-gray-600">{lesson.content}</p>
                      </div>
                      <div className="flex items-center space-x-1 ml-2">
                        <button
                          onClick={() => {
                            setSelectedCourseId(course.id);
                            setEditingLesson(lesson);
                            setLessonForm({
                              title: lesson.title,
                              content: lesson.content,
                              video_url: lesson.video_url || '',
                              order_number: lesson.order_number,
                            });
                            setShowLessonForm(true);
                          }}
                          className="p-1 text-gray-600 hover:text-blue-600 rounded"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteLesson(lesson.id, course.id)}
                          className="p-1 text-gray-600 hover:text-red-600 rounded"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )) || <p className="text-sm text-gray-500 text-center py-4">No lessons yet</p>}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
