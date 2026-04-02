import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

app.on("error", (err) => {
    console.error("Server Error:", err);
});

app.listen(process.env.PORT || 4004, () => {
    console.log(`💳 Payment Service running on port ${process.env.PORT}`);
});
