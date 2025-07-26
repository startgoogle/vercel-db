import fs from 'fs';
import path from 'path';

const filePath = path.resolve('./data.txt');

export default async function handler(req, res) {
  // Set content type to plain text for all responses
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  
  if (req.method === 'GET') {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      res.status(200).send(data);
    } catch (e) {
      res.status(500).send('Error reading data');
    }
  } else if (req.method === 'POST' || req.method === 'PUT') {
    const body = req.body;
    if (typeof body !== 'string') {
      res.status(400).send('Must send raw text');
      return;
    }
    try {
      fs.writeFileSync(filePath, body, 'utf8');
      res.status(200).send('Updated');
    } catch (e) {
      res.status(500).send('Error writing data');
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
