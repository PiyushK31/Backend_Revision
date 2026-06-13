const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

//view engine setup:-
app.set('view engine' , 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    fs.readdir('./files', (err, files) => {
        if (err) {
            return res.render('index', { files: [] });
        }

        res.render('index', { files: files });
    });
});

app.post('/create', (req, res) => {
    fs.writeFile(
        `./files/${req.body.title.split(' ').join('')}.txt`,
        req.body.details,
        function (err) {
            if (err) {
                console.log("Error in creating file");
                return res.send("Error in creating file");
            }

            console.log("File created successfully");
            res.redirect('/');
        }
    );
});

app.get('/files/:filename', (req, res) => {
    fs.readFile(
        `./files/${req.params.filename}`,
        'utf8',
        (err, data) => {
            if (err) {
                return res.send('Error reading file');
            }

            res.render('show', {
                filename: req.params.filename,
                filedata: data
            });
        }
    );
});

app.listen(3000, (err) =>{{
    if(err){
        console.log("Error in running the server");
    }else{
        console.log("server is running on port 3000");
    }
}})