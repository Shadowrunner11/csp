import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import express, { json } from 'express';
    
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(json());

app.post('/reports', (req, res) => {
  console.log('asdasdasd')
  console.log(req.body);
  res.sendStatus(200);
});

app.get('/reports', (req, res) => {
  console.log('asdasdasd')
  console.log(req.body);
  res.sendStatus(200);
});

app
  .use((_, res, next)=>{
    res.set('Content-Security-Policy', ["default-src 'self'"])

    next()
  }, express.static(join(__dirname, '../../public')))
;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
