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
    const filename = path.basename(req.body.title.trim());

    fs.writeFile(
        path.join(__dirname, 'files', filename),
        req.body.details,
        (err) => {
            if (err) {
                return res.send('Error creating file');
            }

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

app.get('/Edit/:filename', (req, res) => {
    const filename = req.params.filename;

    fs.readFile(`./files/${filename}`, 'utf8', (err, data) => {
        if (err) {
            return res.send('Error reading file');
        }

        res.render('edit', {
            filename,
            filedata: data
        });
    });
});

app.post('/edit/:filename', (req, res) => {
    const filename = req.params.filename;

    fs.writeFile(`./files/${filename}`, req.body.details, (err) => {
        if (err) {
            return res.send('Error saving file');
        }

        res.redirect(`/files/${filename}`);
    });
});

app.get('/delete/:filename', (req, res) => {
    const filename = req.params.filename;

    fs.unlink(path.join(__dirname, 'files', filename), (err) => {
        if (err) {
            return res.send('Error deleting file');
        }

        res.redirect('/');
    });
});

app.listen(3000, (err) =>{{
    if(err){
        console.log("Error in running the server");
    }else{
        console.log("server is running on port 3000");
    }
}})