import express from "express"
import fs from "fs"
import path from "path"

const app = express()

app.post("/files", (req, res) => {
    const Folderpath = "D:/";
    const currentDate = new Date();
    const filename = `${currentDate.toISOString().replace(/:/g, "-")}.txt`
    const filepath = path.join(Folderpath, filename)
    fs.writeFile(filepath, currentDate.toString(), (err) => {
        if (err) {
            console.error('Error', err);
            res.status(500).json({ error: 'Failed' });
        } else {
            console.log('successfully written');
            res.status(200).json({ message: 'created successfully' });
        }
    })
})


app.get('/files', (req, res) => {
    const folderpath = 'D:/'; 

    fs.readdir(folderpath, (err, files) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed ' });
        } else {
            const textFiles = files.filter((file) => path.extname(file) === '.txt');
            res.status(200).json({ files: textFiles });
        }
    });
});
app.listen(3000, () => console.log('Server is running on port 3000'));