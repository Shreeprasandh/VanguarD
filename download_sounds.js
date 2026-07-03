import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://zty.pe/';
const ASSETS = [
  'media/sounds/hit.ogg',
  'media/sounds/target.ogg',
  'media/sounds/explosion-small.ogg',
  'media/sounds/explosion.ogg',
  'media/sounds/explosion-large.ogg',
  'media/sounds/emp.ogg',
  'media/sounds/plasma.ogg',
  'media/sounds/click.ogg',
  'media/sounds/explosion-player.ogg',
  'media/sounds/multi-2.ogg',
  'media/sounds/multi-3.ogg',
  'media/music/endure.ogg',
  'media/music/orientation.ogg'
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (Status: ${response.statusCode})`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function main() {
  console.log('Starting sound assets download...');
  for (const asset of ASSETS) {
    const destPath = path.join(__dirname, 'public', asset);
    const destDir = path.dirname(destPath);
    
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    console.log(`Downloading ${asset}...`);
    try {
      await download(BASE_URL + asset, destPath);
      console.log(`✓ Saved to public/${asset}`);
    } catch (err) {
      console.error(`✗ Error downloading ${asset}:`, err.message);
    }
  }
  console.log('All downloads completed!');
}

main();
