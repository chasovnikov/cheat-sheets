const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises');

// Создать папку синхронно
fs.mkdirSync(path.resolve(__dirname, 'dir'));

// Создать папку синхронно (рекурсивно со вложенными папками)
fs.mkdirSync(path.resolve(__dirname, 'dist/lib'), { recursive: true });

// Создать папку асинхронно
fs.mkdir(path.resolve(__dirname, 'dirTEST'), err => {
    if (err) throw err;
});

// Создать папку асинхронно (рекурсивно со вложенными папками)
fs.mkdir(path.resolve(__dirname, 'dist/lib'), { recursive: true }, err => {
    if (err) throw err;
});

// Создать папку через промисы (рекурсивно со вложенными папками)
fsPromises.mkdir(path.resolve(__dirname, 'dist/lib'), { recursive: true }).catch(console.error);

// Создать и удалить после работы с ним
let tempDirPath;
try {
    tempDirPath = fs.mkdtempSync(path.join(os.tmpdir(), 'd'));
    // Делать что-то с каталогом.
} finally {
    // Удалить временный каталог, когда мы закончили с ним работать.
    fs.rmdirSync(tempDirPath);
}

// ---------- Удалить папку
let pathDir = path.resolve(__dirname, 'dir');

if (fs.existsSync(pathDir)) {
    // Удалить папку асинхронно через колбэки (рекурсивно)
    fs.rm(pathDir, { recursive: true }, err => {
        if (err) throw err;
    });

    // Удалить каталог синхронно (рекурсивно)
    fs.rmSync(pathDir, { recursive: true });
}

// Удаление папки на промисах
fsPromises.rm(path.resolve(__dirname, 'dir'), { recursive: true }).catch(console.error);

// =========== Другое:

// Показать содержимое папки в виде массива строк
let tempFiles = fs.readdirSync('Nodejsdev_ru_guide');

// Полулчить  массив Dirent и затем вывести пути подкаталогов,
fs.promises
    .readdir('node_modules', { withFileTypes: true })
    .then(entries => {
        entries
            .filter(entry => entry.isDirectory())
            .map(entry => entry.name)
            .forEach(name => console.log(path.join('/tmp/', name)));
    })
    .catch(console.error);

// Применяет потоковый API-интерфейс для вывода элементов каталога, вызывает для каждого элемента
// stat() и выводит имена и размеры файлов и каталогов:
async function listDirectory(dirpath) {
    let dir = await fs.promises.opendir(dirpath);
    for await (let entry of dir) {
        let name = entry.name;
        if (entry.isDirectory()) {
            name += '/'; // Добавлять к подкаталогам хвостовую косую черту
        }
        let stats = await fs.promises.stat(path.join(dirpath, name));
        let size = stats.size;
        console.log(String(size).padStart(10), name);
    }
}
