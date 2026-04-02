import express from 'express';
import cookieParser from 'cookie-parser';
import { ApiError } from '../src/utils/apiError.js';
import cors from 'cors';
const app = express();

// Using middlewares
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static('public'));
app.use(cookieParser());

// importing and using routes
import orderRoutes from './routes/order.route.js';
import dashboardRoutes from './routes/dashboard.route.js';
app.use('/api/v1/order', orderRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors,
            data: err.data,
        });
    }

    // fallback for unexpected errors
    return res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});
// http://localhost:4003/api/v1/order/
export default app;