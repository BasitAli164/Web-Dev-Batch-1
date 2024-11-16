// import express from 'express';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import routerPro from './route/product.router.js';
// import router from './route/user.route.js';
// import purchaseRouter from './route/parchaseProd.route.js';
// import wishRoute from './route/wishlist.route.js';
// import path, { dirname } from "path";
// import { fileURLToPath } from "url";

// const __dirname = dirname(fileURLToPath(import.meta.url));

// const app = express();

// // Middleware for handling CORS and other configuration
// app.use(cors({
//     origin: process.env.CORS_ORIGION,
//     credentials: true,
// }));

// // Log image paths being served from the 'media' folder
// app.use('/media', express.static(path.join(__dirname, 'media'), {
//     setHeaders: (res, filePath) => {
//         // Log the image file path whenever an image is served
//         console.log(`Serving image at: ${filePath}`);
//     }
// }));

// // Body parser middleware and other routes
// app.use(express.json({ limit: process.env.LIMITS }));
// app.use(express.urlencoded({ extended: true, limit: process.env.LIMITS }));
// app.use(cookieParser());

// // Your other routes
// app.use('/api/user', router);
// app.use('/api/product', routerPro);
// app.use('/api/purchase', purchaseRouter);
// app.use('/api/wish', wishRoute);

// // Export the app for use
// export default app;
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import routerPro from './route/product.router.js';
import router from './route/user.route.js';
import purchaseRouter from './route/parchaseProd.route.js';
import wishRoute from './route/wishlist.route.js';
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app=express();
app.use(cors({
    origin:process.env.CORS_ORIGION,
    credentials:true
}))
app.use("/media", express.static(path.join(__dirname, "media")));
app.use(express.json({limit:process.env.LIMITS}));
app.use(express.urlencoded({extended:true,limit:process.env.LIMITS}));
app.use(cookieParser())


app.use('/api/user',router)
app.use('/api/product',routerPro)
app.use('/api/purchase',purchaseRouter)
app.use('/api/wish',wishRoute)

export default app;