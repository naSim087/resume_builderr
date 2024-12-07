const express = require('express');
const mongoose = require('mongoose');
const resumeRoutes = require('./routes/resumeRoutes');
const companyRoutes = require('./routes/companyRoutes');
const getResumeRoutes=require('./routes/getResumeRoutes')
const matchResumeRoutes=require('./routes/matchRoutes')
const loinRoutes=require('./routes/loginRoutes')
const {PORT, CONECTIONSTRING}=require('./config/serverconfig')
const infoRoutes=require('./routes/infoRoutes')
const AuthRoute = require("./routes/authRoutes");
const UserRoute = require("./routes/userRoutes");
const friendRequest = require("./routes/friendRequestRoutes");
const courseRoutes = require("./routes/courseRoutes");
const UploadRoute = require("./routes/uploadRoutes");
const ChatRoute = require("./routes/chatRoutes");
const MessageRoute = require("./routes/messageRoutes");
const updateRequest= require("./routes/updateRequest");
const PostRoute = require("./routes/postRoute")
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const { matchJobWithResume } = require('./controllers/matchController');
const app = express();
app.use(cors());

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('public'));
// app.use("/images", express.static(path.join(__dirname, "/public/images")));
// app.use(express.static('public'));
app.use(express.static('public')); 
 app.use("images", express.static('images'));

app.use('/api', resumeRoutes);
app.use('/api', companyRoutes);
app.use('/api',infoRoutes);
app.use('/api',getResumeRoutes);
app.use('/api',loinRoutes);
app.use('/api',matchResumeRoutes)
app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/api",friendRequest);
app.use("/api",courseRoutes);
app.use("/api", updateRequest);
app.use("/posts", PostRoute);
app.use("/upload", UploadRoute);
app.use("/chat", ChatRoute);
app.use("/message", MessageRoute);
 app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(CONECTIONSTRING)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.log('Database connection error:', err));



