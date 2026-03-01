/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const specPath = path.join(__dirname, 'spec.md');
const content = fs.readFileSync(specPath, 'utf8');

const regex = /\| ([^|]+) \| ([^|]+) \| ([^|]+) \| ([^|]+) \|/g;
let match;
const flowers = [];

while ((match = regex.exec(content)) !== null) {
  const season = match[1].trim();
  const flowerText = match[4].trim();

  if (season === '七十二候' || season.includes('---')) continue;

  // Extract the first flower if multiple are listed
  const flowerList = flowerText.split(/[、,]/).map(f => f.trim().replace(/\(.*?\)/g, ''));
  const primaryFlower = flowerList[0];

  flowers.push({
    season,
    flower: primaryFlower
  });
}

console.log(JSON.stringify(flowers, null, 2));
