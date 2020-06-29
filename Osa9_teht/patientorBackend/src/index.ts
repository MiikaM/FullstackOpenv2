import express from 'express';
import patientRouter from './routers/patients';
import diagnoseRouter from './routers/diagnoses';
const cors: any = require('cors'); //eslint-disable-line
const app = express();
app.use(express.json());
app.use(cors());//eslint-disable-line

const PORT = 3001;

app.get('/api/ping', (_req, res) => { 
  console.log('someone pinged here');
  res.status(200).send('pong');
});

app.use('/api/patients', patientRouter);
app.use('/api/diagnoses', diagnoseRouter);
  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});