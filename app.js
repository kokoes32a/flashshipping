// app.js

const express = require('express');
const app = express();

// إعداد السيرفر للاستماع على البورت 3000
app.get('/', (req, res) => {
  res.send('مرحبًا بك في تطبيق Express!');
});

// تشغيل السيرفر
app.listen(3000, () => {
  console.log('الخادم يعمل على http://localhost:3000');
});
const express = require('express');
const path = require('path');
const app = express();

// تحديد مجلد الملفات الثابتة (مثل html, css, js)
app.use(express.static(path.join(__dirname, 'public')));

// إعداد السيرفر للاستماع على البورت 3000
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// تشغيل السيرفر
app.listen(3000, () => {
  console.log('الخادم يعمل على http://localhost:3000');
});
const express = require('express');
const admin = require('firebase-admin');
const app = express();
const port = 3000;

// إعداد Firebase Admin SDK
const serviceAccount = require('./path/to/your/firebase-adminsdk.json'); // ضع المسار الصحيح للملف

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-database-name.firebaseio.com' // ضع URL قاعدة البيانات الخاصة بك
});

const db = admin.firestore();

// إعداد route أساسي
app.get('/', (req, res) => {
  res.send('مرحبًا بك في تطبيق Firebase!');
});

// إعداد route لجلب الشحنات من Firebase
app.get('/shipments', (req, res) => {
  db.collection('shipments').get().then(snapshot => {
    const shipments = [];
    snapshot.forEach(doc => {
      shipments.push(doc.data());
    });
    res.json(shipments);
  }).catch(error => {
    res.status(500).send('حدث خطأ: ' + error);
  });
});

// بدء السيرفر
app.listen(port, () => {
  console.log(`الخادم يعمل على http://localhost:${port}`);
});


