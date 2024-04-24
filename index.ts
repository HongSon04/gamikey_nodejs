// ? Import Libraries and Modules
import express, { Express, Request, Response } from 'express';
import adminRouter from './routes/admin/admin.routes';
import clientRouter from './routes/client/client.routes';
import bodyParser from 'body-parser';
import checkConnect from './config/database';
import ejs from 'ejs';
// ? Config
const app: Express = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/public`));


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
})