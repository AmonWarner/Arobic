// preload.js
var fs = require('fs'); 

window.addEventListener('DOMContentLoaded', () => {
  console.log("LOADED");
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text;
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }


})

window.save = function(userdata) {
  fs.readFile('./files/savedata.json', 'utf8', function (err, data) {
var json = JSON.parse(data); // Read the data
var info = json.info; // Get all users
info = userdata;
info = JSON.stringify(info);
fs.writeFile('./files/savedata.json', info, (err) => {
  location.replace("index.html")
});
});
}

window.reset = function() {
  info = {};
  fs.writeFile('./files/savedata.json', info, (err) => {
    location.replace("index.html")
  });
}

window.getFileList = function() {
  fs.readdir('./files', (err, files) => {
      console.log("SENDING " + files)
      localStorage.setItem('filelist', files);
  })
  // Sync
  fs.readdirSync('./files');
}

window.getFileData = function(file) {
  console.log("Getting file " + file)
  fs.readFile('./files/' + file, 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return;
  }
  console.log("Got file with data " + data)
  // legit monkey code but im tired
  localStorage.setItem(file, data);
})
}

window.saveFile = function(file, type, data) {
  if (type == "txt") {
    fs.writeFile('./files/' + file, data, (err) => {
      return;
    });
  }
}


window.getInfo = function() {
  //console.log("useinfo was requested");
  fs.readFile('./files/savedata.json', 'utf8', function (err, data) {
    var info = JSON.parse(data); // Read the data
    console.log("Recived " + info)
    // Set data locally for security reasons(and the fact that i am lazy)
    localStorage.setItem('info', JSON.stringify(info));
    console.log("set");
  });
}