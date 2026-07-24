import React, { useState } from 'react';
import { 
  Users, MessageSquare, ThumbsUp, ExternalLink, Github, Sparkles, 
  Plus, Search, Filter, Share2, CheckCircle2, Award, Code2, Send, X, AlertCircle
} from 'lucide-react';

export default function CommunityForum({ user }) {
  const currentUserName = user?.name || 'Carlos Mendoza';

  const [activeCategory, setActiveCategory] = useState('all');
  const [newPostModalOpen, setNewPostModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Initial Posts Data
  const [posts, setPosts] = useState([
    {
      id: 'post_1',
      author: 'María Fernanda Ruiz',
      authorBadge: 'Estudiante Fullstack',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      category: 'peer_review',
      categoryLabel: '🚀 Peer Review',
      categoryColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      title: '¿Pueden revisar la arquitectura y README de mi E-commerce en React & Node?',
      description: 'Acabo de terminar mi proyecto integrador. Implementé React 18, Context API, Express.js y pago diferido simulado. Me gustaría recibir comentarios sobre la estructura de carpetas y rendimiento de re-renders.',
      githubUrl: 'https://github.com/mfernanda/react-ecommerce-demo',
      demoUrl: 'https://react-ecommerce-demo.vercel.app',
      upvotes: 42,
      hasUpvoted: false,
      timestamp: 'Hace 2 horas',
      tags: ['React', 'Node.js', 'Peer Review', 'Architecture'],
      comments: [
        {
          id: 'c1',
          author: 'Alex Rivera (Mentor Staff)',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          badge: 'Mentor Staff',
          text: '¡Excelente estructura María! Te sugiero memorizar las funciones pasadas como props usando useCallback en la vista del carrito para evitar re-renders innecesarios.',
          timestamp: 'Hace 1 hora'
        },
        {
          id: 'c2',
          author: 'Gabriel Torres',
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          badge: 'Estudiante',
          text: 'El diseño en Tailwind te quedó impecable. La fluidez del checkout se ve muy profesional.',
          timestamp: 'Hace 30 min'
        }
      ]
    },
    {
      id: 'post_2',
      author: 'Carlos Mendoza',
      authorBadge: 'Mentor Senior Staff',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      category: 'careers',
      categoryLabel: '💼 Consejos de Empleo',
      categoryColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      title: '5 Preguntas clave para hacerle al VP de Ingeniería al final de tu entrevista',
      description: 'Muchos candidatos no aprovechan los últimos 10 minutos de la entrevista. Aquí están las 5 preguntas que más impresionan a los líderes de tecnología y demuestran pensamiento estratégico.',
      githubUrl: null,
      demoUrl: null,
      upvotes: 67,
      hasUpvoted: false,
      timestamp: 'Hace 5 horas',
      tags: ['Entrevistas', 'Soft Skills', 'Consejos', 'Liderazgo'],
      comments: [
        {
          id: 'c3',
          author: 'Sofía Castro',
          avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
          badge: 'Alumni Google',
          text: '¡Totalmente de acuerdo! La pregunta sobre los OKRs del equipo siempre genera una excelente conversación.',
          timestamp: 'Hace 3 horas'
        }
      ]
    },
    {
      id: 'post_3',
      author: 'Gabriel Torres',
      authorBadge: 'Estudiante Junior',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      category: 'code',
      categoryLabel: '⚡ Código & Algoritmos',
      categoryColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      title: 'Solución optimizada para el reto Two Sum usando Hash Map (0.4ms)',
      description: 'Pasé de usar dos bucles for anidados O(N^2) a una sola pasada O(N) con Map. Les comparto el patrón por si les sirve para sus entrevistas de algoritmos.',
      githubUrl: 'https://github.com/gabriel/leetcode-solutions',
      demoUrl: null,
      upvotes: 29,
      hasUpvoted: false,
      timestamp: 'Hace 1 día',
      tags: ['Algorithms', 'JavaScript', 'LeetCode', 'Data Structures'],
      comments: []
    }
  ]);

  // New Post Form State
  const [newPostForm, setNewPostForm] = useState({
    title: '',
    category: 'peer_review',
    description: '',
    githubUrl: '',
    demoUrl: '',
    tags: 'React, Peer Review'
  });

  // Comment Input State map: postId -> comment text
  const [commentInputs, setCommentInputs] = useState({});

  const handleUpvote = (postId) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        const hasUpvoted = p.hasUpvoted;
        return {
          ...p,
          upvotes: hasUpvoted ? p.upvotes - 1 : p.upvotes + 1,
          hasUpvoted: !hasUpvoted
        };
      }
      return p;
    }));
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostForm.title || !newPostForm.description) return;

    const tagsArray = newPostForm.tags.split(',').map(t => t.trim()).filter(Boolean);

    const categoryMeta = {
      peer_review: { label: '🚀 Peer Review', color: 'bg-purple-500/20 text-purple-300 border-purple-500/40' },
      careers: { label: '💼 Consejos de Empleo', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
      code: { label: '⚡ Código & Algoritmos', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' }
    };

    const meta = categoryMeta[newPostForm.category] || categoryMeta.peer_review;

    const newPost = {
      id: `post_${Date.now()}`,
      author: currentUserName,
      authorBadge: 'Estudiante Tech',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      category: newPostForm.category,
      categoryLabel: meta.label,
      categoryColor: meta.color,
      title: newPostForm.title,
      description: newPostForm.description,
      githubUrl: newPostForm.githubUrl || null,
      demoUrl: newPostForm.demoUrl || null,
      upvotes: 1,
      hasUpvoted: true,
      timestamp: 'Justo ahora',
      tags: tagsArray.length > 0 ? tagsArray : ['Comunidad'],
      comments: []
    };

    setPosts([newPost, ...posts]);
    setNewPostModalOpen(false);
    setNewPostForm({
      title: '',
      category: 'peer_review',
      description: '',
      githubUrl: '',
      demoUrl: '',
      tags: 'React, Peer Review'
    });
  };

  const handleAddComment = (postId) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    const newComment = {
      id: `c_${Date.now()}`,
      author: currentUserName,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      badge: 'Estudiante Tech',
      text: text.trim(),
      timestamp: 'Justo ahora'
    };

    setPosts(posts.map(p => {
      if (p.id === postId) {
        return { ...p, comments: [...p.comments, newComment] };
      }
      return p;
    }));

    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  const filteredPosts = posts.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesQuery = searchQuery === '' || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900/70 via-indigo-900/50 to-slate-900 border border-purple-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold shadow-lg">
              <Users className="w-4 h-4 text-amber-400" />
              <span>Comunidad de Desarrolladores Tech 👥</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Foro de Comunidad & Peer Review
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Publica tus proyectos de GitHub para recibir retroalimentación técnica de tus compañeros, resuelve dudas de algoritmos y comparte experiencias de entrevistas.
            </p>
          </div>

          <button
            onClick={() => setNewPostModalOpen(true)}
            className="px-6 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 flex items-center gap-2 shrink-0 transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Crear Publicación / Proyecto</span>
          </button>
        </div>
      </div>

      {/* Controls Bar: Category Filters & Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-3 sm:p-4 rounded-2xl">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto">
          {[
            { id: 'all', label: '💬 Todas' },
            { id: 'peer_review', label: '🚀 Peer Review' },
            { id: 'careers', label: '💼 Empleo' },
            { id: 'code', label: '⚡ Algoritmos' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por palabra clave..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Feed of Posts */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-slate-900/90 border border-slate-800 hover:border-purple-500/30 rounded-3xl p-6 shadow-xl space-y-5 transition-all">
            
            {/* Post Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div className="flex items-center gap-3">
                <img
                  src={post.avatarUrl}
                  alt={post.author}
                  className="w-10 h-10 rounded-full object-cover border border-purple-500/40"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">{post.author}</h4>
                    <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 text-[10px] font-semibold border border-purple-500/20">
                      {post.authorBadge}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">{post.timestamp}</span>
                </div>
              </div>

              <span className={`px-3 py-1 rounded-xl text-xs font-bold border ${post.categoryColor}`}>
                {post.categoryLabel}
              </span>
            </div>

            {/* Post Content */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white leading-snug">{post.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {post.description}
              </p>

              {/* GitHub & Demo Links Box if available */}
              {(post.githubUrl || post.demoUrl) && (
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800/80 flex flex-wrap items-center gap-4">
                  {post.githubUrl && (
                    <a
                      href={post.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 text-xs font-bold border border-slate-700 flex items-center gap-2 transition-all"
                    >
                      <Github className="w-4 h-4" />
                      <span>Ver Repositorio en GitHub</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {post.demoUrl && (
                    <a
                      href={post.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 text-xs font-bold border border-purple-500/30 flex items-center gap-2 transition-all"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Ver Demo en Vivo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {post.tags.map((tag, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-950 text-slate-400 text-[11px] font-medium border border-slate-800">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Post Actions Bar (Upvote & Comments Counter) */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleUpvote(post.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                    post.hasUpvoted
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4 fill-current" />
                  <span>▲ {post.upvotes} Votos</span>
                </button>

                <span className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
                  <MessageSquare className="w-4 h-4 text-purple-400" />
                  <span>{post.comments.length} Comentarios</span>
                </span>
              </div>
            </div>

            {/* Comments Thread Section */}
            <div className="space-y-3 pt-3 border-t border-slate-800/60">
              {post.comments.map((c) => (
                <div key={c.id} className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={c.avatarUrl} alt={c.author} className="w-6 h-6 rounded-full object-cover border border-purple-400" />
                      <span className="text-xs font-bold text-white">{c.author}</span>
                      <span className="text-[10px] text-purple-300 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20">{c.badge}</span>
                    </div>
                    <span className="text-[10px] text-slate-500">{c.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pl-8">{c.text}</p>
                </div>
              ))}

              {/* Add Comment Input */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="text"
                  value={commentInputs[post.id] || ''}
                  onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                  placeholder="Escribe un comentario o retroalimentación técnica..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-purple-500"
                />
                <button
                  onClick={() => handleAddComment(post.id)}
                  className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md"
                >
                  Comentar
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* New Post Modal */}
      {newPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-2xl bg-[#080d1a] border border-purple-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-bold text-white">Crear Nueva Publicación / Peer Review</h3>
              </div>
              <button onClick={() => setNewPostModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Título de la Publicación *</label>
                <input
                  type="text"
                  required
                  value={newPostForm.title}
                  onChange={(e) => setNewPostForm({ ...newPostForm, title: e.target.value })}
                  placeholder="Ej: ¿Pueden revisar la arquitectura de mi proyecto React?"
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Categoría *</label>
                  <select
                    value={newPostForm.category}
                    onChange={(e) => setNewPostForm({ ...newPostForm, category: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="peer_review">🚀 Peer Review de Proyecto</option>
                    <option value="careers">💼 Consejos de Empleo</option>
                    <option value="code">⚡ Código & Algoritmos</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Etiquetas (separadas por comas)</label>
                  <input
                    type="text"
                    value={newPostForm.tags}
                    onChange={(e) => setNewPostForm({ ...newPostForm, tags: e.target.value })}
                    placeholder="Ej: React, Node.js, Architecture"
                    className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Descripción / Detalles *</label>
                <textarea
                  rows={4}
                  required
                  value={newPostForm.description}
                  onChange={(e) => setNewPostForm({ ...newPostForm, description: e.target.value })}
                  placeholder="Describe qué tecnologías usaste, tus decisiones de diseño y qué tipo de feedback te gustaría recibir..."
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Enlace a GitHub (opcional)</label>
                  <input
                    type="url"
                    value={newPostForm.githubUrl}
                    onChange={(e) => setNewPostForm({ ...newPostForm, githubUrl: e.target.value })}
                    placeholder="https://github.com/usuario/repo"
                    className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Enlace a Demo en Vivo (opcional)</label>
                  <input
                    type="url"
                    value={newPostForm.demoUrl}
                    onChange={(e) => setNewPostForm({ ...newPostForm, demoUrl: e.target.value })}
                    placeholder="https://mi-proyecto.vercel.app"
                    className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setNewPostModalOpen(false)}
                  className="px-5 py-3 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-lg"
                >
                  Publicar en la Comunidad
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
