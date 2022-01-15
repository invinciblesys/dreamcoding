const fs = require('fs').promises;
const path = require('path');

function moveFile(file, orgin, destination) {
  fs.rename(path.join(orgin, file), path.join(orgin, destination, file))
    .then(() => { console.log(file + 'moved to ' + destination + '.') })
    .catch(console.error);
}

const targetFolder = process.argv[2];
const videoFolder = 'video';
const capturedFolder = 'captured';
const duplicatedFolder = 'duplicated';

//make dirs - video, catured, duplicated
fs.mkdir(path.join(targetFolder, videoFolder)).then(() => console.log('done!')).catch(console.error);
fs.mkdir(path.join(targetFolder, capturedFolder)).then(() => console.log('done!')).catch(console.error);
fs.mkdir(path.join(targetFolder, duplicatedFolder)).then(() => console.log('done!')).catch(console.error);
//read all files
//check the extension of each file
fs.readdir(targetFolder).then(files => {
  files.forEach(file => {
    if (path.extname(file) === '.mp4' || path.extname(file) === '.mov') {//if video
      moveFile(file, targetFolder, videoFolder)
    } else if (path.extname(file) === '.png' || path.extname(file) === '.aae') {//if captured
      moveFile(file, targetFolder, capturedFolder)
    } else if (path.basename(file).includes('IMG_E')) {//check the filenames with E
      //if so move the file without E to the duplicated folder
      const original = file.replace('IMG_E', 'IMG_');
      moveFile(file, targetFolder, duplicatedFolder)
    }
  })
})

