import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/auth.routes.js";
import userRoutes from './routes/user.routes.js';
import referenceRoutes from './routes/reference.routes.js';
import avatarRoutes from './routes/avatar.routes.js';
import db from './models/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/references', referenceRoutes);

app.use("/api/users", avatarRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Проверка подключения к БД
db.sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('DB error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));