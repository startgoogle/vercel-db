import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data.txt');

export default function handler(req, res) {
  // Always return plain text
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
  
  if (req.method === 'GET') {
    // Read the file
    try {
      if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        res.status(200).send(data);
      } else {
        res.status(200).send(''); // Empty if file doesn't exist
      }
    } catch (error) {
      res.status(500).send('Error reading data');
    }
  } 
  else if (req.method === 'POST' || req.method === 'PUT') {
    // Write to the file
    try {
      const body = req.body || '';
      fs.writeFileSync(filePath, body, 'utf8');
      res.status(200).send('OK');
    } catch (error) {
      res.status(500).send('Error writing data');
    }
  } 
  else {
    res.status(405).send('Method not allowed');
  }
}
