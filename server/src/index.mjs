import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { writeFile } from 'fs/promises'
import express, { json } from 'express';
import papaparse from 'papaparse';
    
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app
  .get('/reports', (req, res) => {
    res.sendStatus(200);
  });


app
  .use(json())
  .post('/reports', (req, res) => {
    res.sendStatus(200);
    const { cspViolations } = req.body ?? {};
    
  
    const spanishData = cspViolations.map(report =>({
      'Directiva violada': report.violatedDirective,
      'URI bloqueada': report.blockedURI,
      'Directiva efectiva': report.effectiveDirective,
      'Constructor': report.constructor,
      'Nombre del elemento': report.elementName,
    }))
  
    writeFile(papaparse.unparse(spanishData));
  });


app
  .use(express.static(join(__dirname, '../../public'), {
    setHeaders:()=>({
        'Content-Security-Policy-Report-Only': 'default-src https:;'
      })
  }))
;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
