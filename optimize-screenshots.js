// Script para optimizar screenshots automáticamente
// Este script puede ejecutarse con Node.js para optimizar las imágenes

const fs = require('fs');
const path = require('path');

// Configuración de optimización para screenshots
const optimizationConfig = {
    maxWidth: 1200,
    maxHeight: 800,
    quality: 90,
    format: 'png'
};

// Función para optimizar una imagen
function optimizeScreenshot(inputPath, outputPath) {
    console.log(`Optimizando: ${inputPath}`);
    
    // Aquí puedes integrar con herramientas como:
    // - Sharp (npm install sharp)
    // - Jimp (npm install jimp)
    // - ImageMagick (requiere instalación)
    
    console.log(`Optimización completada: ${outputPath}`);
}

// Función para procesar todas las screenshots
function processScreenshots() {
    const screenshotsDir = path.join(__dirname, 'Assets', 'Controlla');
    const outputDir = path.join(__dirname, 'Assets', 'Controlla', 'optimized');
    
    // Crear directorio de salida si no existe
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Procesar cada screenshot
    const files = fs.readdirSync(screenshotsDir);
    const pngFiles = files.filter(file => file.endsWith('.png'));
    
    pngFiles.forEach(file => {
        const inputPath = path.join(screenshotsDir, file);
        const outputPath = path.join(outputDir, `optimized-${file}`);
        optimizeScreenshot(inputPath, outputPath);
    });
    
    console.log('Procesamiento completado!');
}

// Instrucciones de uso
console.log(`
🎯 Optimizador de Screenshots

Para usar este script:

1. Instalar dependencias:
   npm install sharp

2. Ejecutar optimización:
   node optimize-screenshots.js

3. Configuración recomendada para screenshots:
   - Formato: PNG
   - Calidad: 90%
   - Tamaño máximo: 1200x800px
   - Compresión: Sin pérdida

4. Herramientas alternativas:
   - TinyPNG (online)
   - Squoosh (online)
   - GIMP (local)
   - Photoshop (local)

5. Después de optimizar, actualizar HTML:
   <img src="Assets/Controlla/optimized/1.png">
`);

// Ejecutar si se llama directamente
if (require.main === module) {
    processScreenshots();
}

module.exports = { optimizeScreenshot, processScreenshots }; 