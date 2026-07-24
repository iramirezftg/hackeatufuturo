import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'db_data.json');

// Default initial state
const defaultData = {
  users: [
    {
      id: 'usr_demo_1',
      name: 'Carlos Mendoza',
      email: 'estudiante@hackea.com',
      password: '123456', // In production, hash passwords
      role: 'student',
      plan: 'pro', // 'free', 'starter', 'pro', 'master', 'isa'
      createdAt: '2026-01-15T10:00:00.000Z',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      streakDays: 14,
      totalHours: 42,
    }
  ],
  transactions: [
    {
      id: 'tx_982401',
      userId: 'usr_demo_1',
      planId: 'pro',
      planName: 'Plan Pro Hackear El Futuro',
      amount: 2999,
      currency: 'MXN',
      status: 'completed',
      paymentMethod: 'Tarjeta de Crédito (•••• 4242)',
      createdAt: '2026-01-15T10:15:00.000Z',
      receiptUrl: '#',
    }
  ],
  courses: [
    {
      id: 'course_fullstack',
      title: 'Full-Stack Modern Web & AI Apps',
      category: 'Desarrollo Web',
      description: 'Domina React, Node.js, TypeScript y la integración de modelos LLM con IA para crear productos digitales de alto impacto.',
      icon: 'Code2',
      totalLessons: 24,
      completedLessons: 16,
      progressPercentage: 67,
      instructor: 'Alex Rivera (Ex-Google Senior Lead)',
      modules: [
        {
          id: 'mod_1',
          title: 'Módulo 1: Arquitectura Frontend & React 18+',
          duration: '3h 45m',
          lessons: [
            { id: 'les_101', title: 'Fundamentos de React 18, Server Components & Hooks', duration: '45m', completed: true, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { id: 'les_102', title: 'Gestión de Estado Avanzada & Context API', duration: '50m', completed: true, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { id: 'les_103', title: 'Tailwind CSS, Animaciones & Design Systems', duration: '1h 10m', completed: true, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          ]
        },
        {
          id: 'mod_2',
          title: 'Módulo 2: Backend Escalable con Node.js & Databases',
          duration: '4h 10m',
          lessons: [
            { id: 'les_201', title: 'Diseño de APIs RESTful y GraphQL', duration: '55m', completed: true, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { id: 'les_202', title: 'Bases de Datos Relacionales (PostgreSQL) y NoSQL', duration: '1h 15m', completed: true, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { id: 'les_203', title: 'Autenticación Segura con JWT y OAuth 2.0', duration: '1h 00m', completed: true, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          ]
        },
        {
          id: 'mod_3',
          title: 'Módulo 3: Integración de IA & Agentes Autónomos',
          duration: '5h 30m',
          lessons: [
            { id: 'les_301', title: 'APIs de LLM (OpenAI, Gemini) y Prompt Engineering', duration: '1h 20m', completed: true, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { id: 'les_302', title: 'Vectores, Embeddings y Retrieval-Augmented Generation (RAG)', duration: '1h 45m', completed: false, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { id: 'les_303', title: 'Construcción de Agentes con Herramientas y Function Calling', duration: '2h 25m', completed: false, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          ]
        }
      ]
    },
    {
      id: 'course_career',
      title: 'Hacking de Carrera Tech & Entrevistas FAANG',
      category: 'Preparación Laboral',
      description: 'Estrategias aceleradas de networking, optimización de CV/LinkedIn y preparación de entrevistas técnicas y de algoritmos.',
      icon: 'Rocket',
      totalLessons: 12,
      completedLessons: 9,
      progressPercentage: 75,
      instructor: 'Mariana Silva (Ex-Meta Talent Lead)',
      modules: [
        {
          id: 'mod_c1',
          title: 'Módulo 1: Portafolio de Alto Impacto & Marca Personal',
          duration: '2h 30m',
          lessons: [
            { id: 'les_c101', title: 'Cómo estructurar proyectos que destaquen ante recruiters', duration: '45m', completed: true, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { id: 'les_c102', title: 'Optimización de LinkedIn para recibir inmails semanales', duration: '50m', completed: true, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
          ]
        },
        {
          id: 'mod_c2',
          title: 'Módulo 2: Dominio de Entrevistas de Sistema y Algoritmos',
          duration: '3h 15m',
          lessons: [
            { id: 'les_c201', title: 'Framework para resolver System Design en 45 minutos', duration: '1h 10m', completed: true, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { id: 'les_c202', title: 'Simulación de Entrevista Técnica en Vivo', duration: '1h 20m', completed: false, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
          ]
        }
      ]
    }
  ],
  mentors: [
    {
      id: 'm_3',
      name: 'Israel Ramírez (@isra_developer)',
      role: 'Lead Architect & Fundador de Hackea tu Futuro',
      expertise: ['Full-Stack', 'Arquitectura Cloud', 'Hacking de Carrera Tech'],
      avatar: '/founder.jpg',
      availableTimes: ['Lun 11:00', 'Mié 15:00', 'Vie 17:00']
    },
    {
      id: 'm_1',
      name: 'Sofía Valenzuela',
      role: 'Senior Staff Engineer @ Mercado Libre',
      expertise: ['Full-Stack', 'Arquitectura Distribuida', 'Career Mentoring'],
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      availableTimes: ['Lun 16:00', 'Mié 18:00', 'Vie 10:00']
    },
    {
      id: 'm_2',
      name: 'David Ramos',
      role: 'Principal AI Scientist @ Tech Corp',
      expertise: ['AI Engineering', 'Machine Learning', 'RAG Systems'],
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      availableTimes: ['Mar 17:00', 'Jue 19:00', 'Sáb 11:00']
    },
    {
      id: 'm_4',
      name: 'Mariana Silva',
      role: 'Ex-Meta Senior Talent Recruiter',
      expertise: ['Entrevistas FAANG', 'Optimización LinkedIn', 'Negociación Salarial'],
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      availableTimes: ['Mar 10:00', 'Jue 16:00', 'Sáb 12:00']
    }
  ],
  bookings: [
    {
      id: 'bkg_1',
      userId: 'usr_demo_1',
      mentorId: 'm_1',
      mentorName: 'Sofía Valenzuela',
      dateTime: '2026-07-28 16:00',
      topic: 'Revisión de Arquitectura Backend y Estrategia de Búsqueda de Empleo',
      status: 'confirmed',
      meetUrl: 'https://meet.google.com/abc-defg-hij'
    }
  ]
};

// Data Store Class with disk persistence
class Store {
  constructor() {
    this.data = this.loadData();
  }

  loadData() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(fileContent);
      }
    } catch (err) {
      console.error('Error reading DB data file, fallback to defaults:', err);
    }
    this.saveData(defaultData);
    return defaultData;
  }

  saveData(dataToSave) {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(dataToSave || this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error saving DB data file:', err);
    }
  }

  // Users
  getUserByEmail(email) {
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  getUserById(id) {
    return this.data.users.find(u => u.id === id);
  }

  createUser(userData) {
    const newUser = {
      id: 'usr_' + Date.now(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: 'student',
      plan: userData.plan || 'free',
      createdAt: new Date().toISOString(),
      avatarUrl: userData.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userData.name)}`,
      streakDays: 1,
      totalHours: 0,
    };
    this.data.users.push(newUser);
    this.saveData();
    return newUser;
  }

  updateUserPlan(userId, plan) {
    const user = this.getUserById(userId);
    if (user) {
      user.plan = plan;
      this.saveData();
    }
    return user;
  }

  // Payments / Transactions
  addTransaction(txData) {
    const newTx = {
      id: 'tx_' + Math.floor(100000 + Math.random() * 900000),
      userId: txData.userId,
      planId: txData.planId,
      planName: txData.planName,
      amount: txData.amount,
      currency: txData.currency || 'MXN',
      status: 'completed',
      paymentMethod: txData.paymentMethod || 'Tarjeta Bancaria',
      createdAt: new Date().toISOString(),
      receiptUrl: '#',
    };
    this.data.transactions.unshift(newTx);
    this.updateUserPlan(txData.userId, txData.planId);
    this.saveData();
    return newTx;
  }

  getTransactionsByUserId(userId) {
    return this.data.transactions.filter(t => t.userId === userId);
  }

  // Courses & Lessons
  getCourses() {
    return this.data.courses;
  }

  toggleLessonComplete(userId, lessonId) {
    for (const course of this.data.courses) {
      for (const module of course.modules) {
        const lesson = module.lessons.find(l => l.id === lessonId);
        if (lesson) {
          lesson.completed = !lesson.completed;
          // recalculate completed count and progress
          let total = 0;
          let completed = 0;
          course.modules.forEach(m => {
            m.lessons.forEach(l => {
              total++;
              if (l.completed) completed++;
            });
          });
          course.totalLessons = total;
          course.completedLessons = completed;
          course.progressPercentage = Math.round((completed / total) * 100);
          this.saveData();
          return { course, lesson };
        }
      }
    }
    return null;
  }

  // Mentors & Bookings
  getMentors() {
    return this.data.mentors;
  }

  getBookingsByUserId(userId) {
    return this.data.bookings.filter(b => b.userId === userId);
  }

  createBooking(bookingData) {
    const newBooking = {
      id: 'bkg_' + Date.now(),
      userId: bookingData.userId,
      mentorId: bookingData.mentorId,
      mentorName: bookingData.mentorName,
      dateTime: bookingData.dateTime,
      topic: bookingData.topic || 'Sesión 1 a 1 de Mentoría Técnica',
      status: 'confirmed',
      meetUrl: 'https://meet.google.com/hkt-fut-live'
    };
    this.data.bookings.unshift(newBooking);
    this.saveData();
    return newBooking;
  }
}

export const store = new Store();
