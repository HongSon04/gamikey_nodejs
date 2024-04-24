// ? Import Libraries and Modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const ejs = require('ejs');
const checkConnect = require('./config/database');
const adminRouter = require('./routes/admin/admin.routes');
const clientRouter = require('./routes/client/client.routes');

// ? Config
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/public`));
// ? Flash Messages
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

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

app.use('/admin', adminRouter);
app.use('/', clientRouter);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
