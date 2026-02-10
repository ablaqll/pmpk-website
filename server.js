import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'data.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR);
}

// Multer Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOADS_DIR)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.use(cors());
app.use(bodyParser.json());
// Serve static files from uploads directory
app.use('/uploads', express.static(UPLOADS_DIR));

// Initial Data Helper
const getInitialData = () => ({
    news: [],
    staff: [],
    vacancies: [],
    faq: [],
    info: {
        directorName: 'Иванова Мария Ивановна',
        directorBio: 'Педагог-психолог высшей категории, стаж работы 20 лет.',
        directorPhoto: '/director.jpg',
        address: 'Астана қ., Е-321 көшесі, 18 үй',
        phone: '+7 777 608 00 65',
        email: 'pmpk9_ast@mail.ru',
        whatsapp: '77776080065',
        schedule: 'Mon-Fri 8:30-13:20'
    }
});

// Read Data
const readData = () => {
    if (!fs.existsSync(DATA_FILE)) {
        const initial = getInitialData();
        fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2));
        return initial;
    }
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading data file:", err);
        return getInitialData();
    }
};

// Write Data
const writeData = (data) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        return true;
    } catch (err) {
        console.error("Error writing data file:", err);
        return false;
    }
};

// Routes

// File Upload Route
app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    // Return the URL to access the file
    const fileUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
});

// GET All Data
app.get('/api/data', (req, res) => {
    const data = readData();
    res.json(data);
});

// GET Specific Section (Optional convenience)
app.get('/api/news', (req, res) => {
    const data = readData();
    res.json(data.news || []);
});

app.get('/api/staff', (req, res) => {
    const data = readData();
    res.json(data.staff || []);
});

app.get('/api/vacancies', (req, res) => {
    const data = readData();
    res.json(data.vacancies || []);
});

app.get('/api/faq', (req, res) => {
    const data = readData();
    res.json(data.faq || []);
});

app.get('/api/info', (req, res) => {
    const data = readData();
    res.json(data.info || {});
});

// SAVE Whole Section
app.post('/api/save', (req, res) => {
    const { type, data } = req.body; // type: 'news', 'staff', 'info', 'vacancies', 'faq'
    if (!type || !data) {
        return res.status(400).json({ error: 'Missing type or data' });
    }

    const currentData = readData();
    currentData[type] = data;

    if (writeData(currentData)) {
        res.json({ success: true, message: `${type} saved successfully` });
    } else {
        res.status(500).json({ error: 'Failed to save data' });
    }
});

// Full Restore (Import)
app.post('/api/restore', (req, res) => {
    const { data } = req.body;
    if (!data) return res.status(400).json({ error: 'No data provided' });

    if (writeData(data)) {
        res.json({ success: true, message: 'Data restored successfully' });
    } else {
        res.status(500).json({ error: 'Failed to restore data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
