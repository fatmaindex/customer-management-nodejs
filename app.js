require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');
const path = require('path');
const connectDB = require('./src/config/db');
const Customer = require('./src/models/customerSchema');
const customerRoutes = require('./src/routes/customer');


//banshe2 tatbek express we store it in app variable 
const app = express();
const PORT = process.env.PORT || 3000;


// 🟢 الاتصال بقاعدة البيانات
connectDB();

//  إعداد الـ View Engine (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 📁 ملفات static زي CSS و JS
app.use(express.static(path.join(__dirname, 'public')));



//  Pages Routing aw View Routing
//server side rendering
app.get('/', async (req, res) => {
  try {
    // جلب كل العملاء من الداتابيس
    const customers = await Customer.find();

    // إرسالهم للـ EJS
    res.render('index', { customers });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get('/add', (req, res) => res.render('add'));



// 🧩 Middleware للـ JSON
app.use(express.json());

// لدعم بيانات الفورم
app.use(express.urlencoded({ extended: true }));

// اربطي LiveReload بالـ Express
app.use(connectLiveReload());

//  شغّلي LiveReload server

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public')); // راقب فولدر public

// لما المتصفح يتصل أول مرة، اعمل refresh بعد ثانية
liveReloadServer.server.once('connection', () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100);
});


//أي request يبدأ بـ / يمشي على هذا Router
app.use('/', customerRoutes);


// 🚀 تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
    