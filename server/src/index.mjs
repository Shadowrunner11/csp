import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { writeFile, stat } from 'fs/promises'
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
    const { cspViolations, sessionId } = req.body ?? {};
  
    const spanishData = cspViolations.map(report =>({
      'Directiva violada': report.violatedDirective,
      'URI bloqueada': report.blockedURI,
      'Directiva efectiva': report.effectiveDirective,
      'Constructor': report.constructor,
      'Nombre del elemento': report.elementName,
    }))

    const filePath = join(__dirname,"../reports",`csp-${sessionId}.csv`)
    stat(filePath)
      .then(({size})=>{
        if(size)
          return writeFile(filePath,papaparse.unparse(spanishData));
        
        return writeFile(filePath,papaparse.unparse(spanishData, {header: false}), {
          flag: 'a'
        });
      })
    ;
  });


app
  .use(express.static(join(__dirname, '../../public'), {
    setHeaders:(res)=>{
      res.set('Content-Security-Policy-Report-Only', "default-src 'self';")
    }
  }))
;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
