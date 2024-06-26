// ? Import Libraries and Modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const ejs = require('ejs');
const jwt = require('jsonwebtoken');
const checkConnect = require('./config/database');
const adminRouter = require('./routes/admin/admin.routes');
const clientRouter = require('./routes/client/client.routes');
const { decodeJwt, isAdmin, isLogin } = require('./app/middleware/auth');

// ? Config
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/public`));
// ? Flash Messages
app.use(cookieParser('keyboard cat'));
// ? Cookies hết hạn sau 12 tiếng
app.use(
  session({
    secret: 'keyboard cat',
    // ?
    cookie: {
      maxAge: process.env.COOKIE_EXPIRES,
      secure: false,
      httpOnly: true,
      resave: true,
      saveUninitialized: true,
    },
  }),
);
app.use(flash());

// ? MEthod Override
app.use(methodOverride('_method'));
/* New Route to the TinyMCE Node module */
app.use(
  '/tinymce',
  express.static(path.join(__dirname, 'node_modules', 'tinymce')),
);
// ? Set Template Engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.set('views', `${__dirname}/views`);

// ? Connect to Database
checkConnect();
// ? Test Routes
/* app.get('/', (req: Request, res: Response) => {
    console.log('Hello World');
});
 */
// ? Routers

app.use('/admin', decodeJwt, isLogin, isAdmin, adminRouter);
app.use('/', clientRouter);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
