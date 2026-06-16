const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const inputDir = path.join(__dirname, '../public/images/projects')

async function convert() {
  const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'))
  for (const file of files) {
    const inputPath = path.join(inputDir, file)
    const base = path.basename(file, path.extname(file))
    const webpPath = path.join(inputDir, `${base}.webp`)
    const avifPath = path.join(inputDir, `${base}.avif`)

    try {
      await sharp(inputPath)
        .resize({ width: 1200 })
        .avif({ quality: 70 })
        .toFile(avifPath)
      console.log('Created', avifPath)
    } catch (e) {
      console.error('AVIF conversion failed for', inputPath, e)
    }

    try {
      await sharp(inputPath)
        .resize({ width: 1200 })
        .webp({ quality: 75 })
        .toFile(webpPath)
      console.log('Created', webpPath)
    } catch (e) {
      console.error('WebP conversion failed for', inputPath, e)
    }
  }
}

convert()
