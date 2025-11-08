// server.js (or index.js)
import express from 'express';
import dotenv from 'dotenv';
import azureLanguage from './routes/azureLanguage.js';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/language', azureLanguage);

app.get('/health', (_, res) => res.send('ok'));
app.listen(process.env.PORT || 3000, () => console.log('API up'));
