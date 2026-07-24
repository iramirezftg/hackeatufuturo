import express from 'express';
import cors from 'cors';
import { store } from './store.js';

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

// Helper for simple token parsing
const getUserFromHeader = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;
  const token = authHeader.split(' ')[1]; // "Bearer usr_xxx" or token
  if (!token) return null;
  return store.getUserById(token);
};

// ---------------- AUTH ENDPOINTS ----------------

// Register
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Todos los campos (nombre, email, contraseña) son obligatorios.' });
  }

  const existing = store.getUserByEmail(email);
  if (existing) {
    return res.status(400).json({ error: 'Ya existe una cuenta con este correo electrónico.' });
  }

  const newUser = store.createUser({ name, email, password });
  const token = newUser.id; // Simple session token mechanism for dev

  const { password: _, ...userWithoutPass } = newUser;
  return res.json({
    message: 'Usuario registrado exitosamente',
    user: userWithoutPass,
    token
  });
});

// Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Proporciona correo y contraseña.' });
  }

  const user = store.getUserByEmail(email);
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Credenciales inválidas. Verifica tu correo y contraseña.' });
  }

  const token = user.id;
  const { password: _, ...userWithoutPass } = user;

  return res.json({
    message: 'Inicio de sesión exitoso',
    user: userWithoutPass,
    token
  });
});

// Verify Current User Session
app.get('/api/auth/me', (req, res) => {
  const user = getUserFromHeader(req);
  if (!user) {
    return res.status(401).json({ error: 'Sesión no válida o expirada.' });
  }
  const { password: _, ...userWithoutPass } = user;
  return res.json({ user: userWithoutPass });
});

// ---------------- PAYMENT ENDPOINTS ----------------

// Process Payment Checkout
app.post('/api/payments/checkout', (req, res) => {
  const user = getUserFromHeader(req);
  if (!user) {
    return res.status(401).json({ error: 'Debes iniciar sesión para procesar un pago.' });
  }

  const { planId, planName, amount, paymentMethod, isISA } = req.body;

  if (!planId) {
    return res.status(400).json({ error: 'ID de plan requerido.' });
  }

  // Simulate payment processing delay & validation
  const transaction = store.addTransaction({
    userId: user.id,
    planId: planId,
    planName: planName || `Plan ${planId.toUpperCase()} Hackea Tu Futuro`,
    amount: isISA ? 0 : (amount || 1499),
    paymentMethod: isISA ? 'Acuerdo de Ingresos Compartidos (ISA)' : (paymentMethod || 'Tarjeta Crédito/Débito'),
    currency: 'MXN'
  });

  const updatedUser = store.getUserById(user.id);
  const { password: _, ...userWithoutPass } = updatedUser;

  return res.json({
    success: true,
    message: isISA ? '¡Solicitud de Pago Diferido Aprobada!' : '¡Pago procesado exitosamente!',
    transaction,
    user: userWithoutPass
  });
});

// Get User Payment History
app.get('/api/payments/history', (req, res) => {
  const user = getUserFromHeader(req);
  if (!user) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  const history = store.getTransactionsByUserId(user.id);
  return res.json({ transactions: history });
});

// ---------------- STUDENT DASHBOARD ENDPOINTS ----------------

// Get Student Dashboard Data
app.get('/api/student/dashboard', (req, res) => {
  const user = getUserFromHeader(req);
  if (!user) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  const { password: _, ...userWithoutPass } = user;
  const courses = store.getCourses();
  const mentors = store.getMentors();
  const bookings = store.getBookingsByUserId(user.id);
  const transactions = store.getTransactionsByUserId(user.id);

  return res.json({
    user: userWithoutPass,
    courses,
    mentors,
    bookings,
    transactions
  });
});

// Toggle Lesson Completion
app.post('/api/student/toggle-lesson', (req, res) => {
  const user = getUserFromHeader(req);
  if (!user) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  const { lessonId } = req.body;
  if (!lessonId) {
    return res.status(400).json({ error: 'Lesson ID requerido' });
  }

  const result = store.toggleLessonComplete(user.id, lessonId);
  return res.json({ success: true, result });
});

// Schedule Mentor 1-on-1 Call
app.post('/api/student/schedule-mentor', (req, res) => {
  const user = getUserFromHeader(req);
  if (!user) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  const { mentorId, mentorName, dateTime, topic } = req.body;
  if (!mentorId || !dateTime) {
    return res.status(400).json({ error: 'Selecciona un mentor y horario.' });
  }

  const booking = store.createBooking({
    userId: user.id,
    mentorId,
    mentorName,
    dateTime,
    topic
  });

  return res.json({
    success: true,
    message: 'Mentoría agendada con éxito',
    booking
  });
});

// Start Express App
app.listen(PORT, () => {
  console.log(`Backend server active on http://localhost:${PORT}`);
});
