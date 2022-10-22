const express = require("express");
const cors = require("cors");
const port = 4000;
const app = express();
const UserController = require("./controllers/user");
const PhotoController = require("./controllers/photo");
const authentication = require('./middlewares/auth');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', UserController.getDataUser);
app.post('/register', UserController.registerUser);
app.post('/login', UserController.loginUser);

app.use(authentication);
app.get('/photo', PhotoController.GetAllPhotos);
app.get('/photo/:id', PhotoController.GetOnePhotosByID);
app.post('/photo', PhotoController.CreatePhoto);


app.get('/asd', async (req, res, next) => {
    res.send('Selamat datang di Halaman asd...');
});

// app.listen(port, () => {
//   console.log(`App listening at http://localhost:${port}`);
// });

module.exports = app;
