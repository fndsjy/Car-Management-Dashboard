const express = require("express");
const app = express();
const axios = require('axios');
const uploadOnMemory = require("../public/scripts/uploadOnMemory");
const cloudinary = require("../public/scripts/cloudinary");


app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

const PORT = process.env.PORT || 2001;

app.get('/', async (req, res) => {
    try {
        const cars = await axios.get('http://localhost:2002/cars');
        res.render('index', cars.data)
    } catch (err) {
        res.status(500).json(err)
    }
})

app.get('/add-car', (req, res) => {
    res.render('add-content')
})
    
app.get('/delete-car', async (req, res) => {
    try {
        const cars = await axios.get('http://localhost:2002/cars');
        res.render('delete-content', cars.data)
    } catch (err) {
        res.status(500).json(err)
    }
})

app.post(
    "/add-car",
    uploadOnMemory.single("car_image"),
    (req, res) => {
        const fileBase64 = req.file.buffer.toString("base64");
        const file = `data:${req.file.mimetype};base64,${fileBase64}`;

        cloudinary.uploader.upload(file, { folder: 'Challenge Chapter 5' }, async function (err, result) {
            if (!!err) {
                console.log(err);
                return res.status(400).json({
                    message: "Gagal upload file!",
                });
            }

            const body = req.body;
            body.car_image = result.url;
            try {
                const cars = await axios.post('http://localhost:2002/cars', body);
                return res.redirect("/")
            } catch (err) {
                return res.status(500).json(err)
            }
        });
    }
);

app.get('/update-car/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const cars = await axios.get(`http://localhost:2002/cars/${id}`);
        res.render('update-content', cars.data)
    } catch (err) {
        res.status(500).json(err)
    }
})

app.post(
    "/update-car/:id",
    uploadOnMemory.single("car_image"),
    (req, res) => {
        const fileBase64 = req.file.buffer.toString("base64");
        const file = `data:${req.file.mimetype};base64,${fileBase64}`;

        cloudinary.uploader.upload(file, { folder: 'Challenge Chapter 5' }, async function (err, result) {
            if (!!err) {
                console.log(err);
                return res.status(400).json({
                    message: "Gagal upload file!",
                });
            }

            const id = req.params.id;
            const body = req.body;
            body.car_image = result.url;
            try {
                const cars = await axios.put(`http://localhost:2002/cars/${id}`, body);
                return res.redirect("/")
            } catch (err) {
                return res.status(500).json(err)
            }
        });
    }
);

app.get('/delete-car/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const cars = await axios.delete(`http://localhost:2002/cars/${id}`);
        res.redirect("/")
    } catch (err) {
        res.status(500).json(err)
    }
})

app.listen(PORT, () => {
    console.log(`Client Side running at http://localhost:${PORT}`);
});
