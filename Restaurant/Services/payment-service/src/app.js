import express from 'express';
import { ApiError } from './utils/apiError.js';
import cors from 'cors';
const app = express();

// Using middlewares
app.use(cors());
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));

// importing and using routes
import paymentRoutes from './routes/payment.route.js';
app.use('/api/v1/payment', paymentRoutes);

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
// http://localhost:4004/api/v1/payment/
export default app;