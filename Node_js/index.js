const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

// fsPromises
//     .mkdir(path.resolve(__dirname, 'dir'), { recursive: true })
//     .catch(err => console.log(err));

// fs.mkdirSync(path.resolve(__dirname, 'dist/lib'), { recursive: true });

// fs.rmSync(path.resolve(__dirname, 'dir'), { recursive: true });

fsPromises.mkdir(path.resolve(__dirname, 'dist/lib')).catch(console.error);
