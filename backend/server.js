// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const os = require('os');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
require('dotenv').config();

console.log("SERVER FILE STARTED");

require("dotenv").config();

//console.log("TOKEN LOADED:", Boolean(process.env.HIGHLEVEL_API_TOKEN));
//console.log("LOCATION LOADED:", Boolean(process.env.HIGHLEVEL_LOCATION_ID));
//console.log("BLOG ID LOADED:", Boolean(process.env.HIGHLEVEL_BLOG_ID));

// Routes
{/** *
const getAllBlogsRoute = require('./routes/user/getallblogs');
const postBlog = require('./routes/user/postblog');
const editBlog = require('./routes/user/editblog');
const deleteBlog = require('./routes/user/deleteblog');
**/}
const subscribeEmails = require('./routes/user/subscription');
const postComments = require('./routes/user/comments');
const uploadRoute = require('./routes/uploads');
const sendContact = require('./routes/admin/contact');
const registerRoute = require('./routes/user/register');
const contactRoute  = require("./routes/user/contactform")
const fetchhighlevelBlogs = require('./routes/user/getblogshighlevel')
const coursesRouter = require("./routes/user/courses");
const paymentRouter = require('./routes/admin/payment');
const shopRoutes = require("./routes/admin/store");



const app = express();
const PORT = process.env.PORT || 3400;
app.use(
  helmet({
  contentSecurityPolicy: false
  })
);

// CORS
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://packetpros.org",
  "https://www.packetpros.org",
  "https://techychris.com",
  "https://www.techychris.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origin not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 204,
  })
);
app.options("/*splat", cors());

// JSON parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

mongoose.connect(process.env.MONGODB_URI, {
  //useNewUrlParser: true,
  //useUnifiedTopology: true,
})
.then(() => console.log(`MongoDB connected: ${mongoose.connection.name}`))
.catch((err) => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
});

// User routes
{/** 
app.use('/api', getAllBlogsRoute);
app.use('/api', postBlog);
app.use('/api', editBlog);
app.use('/api', deleteBlog);
**/}
app.use('/api', subscribeEmails);
app.use('/api', postComments);
app.use('/api', uploadRoute);
app.use('/api', sendContact);
app.use('/api', registerRoute);
app.use('/api', contactRoute);
app.use('/api/blogs', fetchhighlevelBlogs);
app.use("/api/courses", coursesRouter);
app.use('/api', paymentRouter);
app.use("/api/shop", shopRoutes);


app.get('/health', (req, res) => {
  const uptimeSeconds = process.uptime(); 
  const memoryUsage = process.memoryUsage(); 
  const loadAvg = os.loadavg(); 
  const freeMem = os.freemem();
  const totalMem = os.totalmem();
  const usedMem = totalMem - freeMem;

  const formatUptime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h}h ${m}m ${s}s`;
  };

  const formatBytes = (bytes) => {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
  };

  res.json({
    status: 'OK',
    uptime: formatUptime(uptimeSeconds),
    memory: {
      rss: formatBytes(memoryUsage.rss),
      heapTotal: formatBytes(memoryUsage.heapTotal),
      heapUsed: formatBytes(memoryUsage.heapUsed),
      external: formatBytes(memoryUsage.external),
      totalMem: formatBytes(totalMem),
      usedMem: formatBytes(usedMem),
      freeMem: formatBytes(freeMem),
    },
    loadAvg: loadAvg.map((n) => n.toFixed(2)), 
    timestamp: new Date().toISOString()
  });
});

app.use(express.static(path.join(__dirname, '..', 'dist')));
app.get('/*splat', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

const readData = (filePath) => {
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath));
};
const writeData = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`check server health at http://localhost:${PORT}/health`)
});