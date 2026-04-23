import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import authRoutes from './Routes/authRoutes.js';


dotenv.config();
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// Auth routes
app.use('/api/auth', authRoutes);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
