var fs = require('fs');

function deleteFolderRecursive(path) {
  if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
    fs.readdirSync(path).forEach(function (file) {
      var curPath = path + "/" + file;

      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });

    console.log('Deleting directory "${path}"...');
    fs.rmdirSync(path);
  }
};

deleteFolderRecursive('Build');

var dir = 'Build';
if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}

const execSync = require('child_process').execSync;

execSync('git clone https://github.com/Dygmalab/chrysalis-api.git Build/chrysalis-api');
process.chdir("Build/chrysalis-api/");
execSync('yarn install --prefix');
execSync('git clone https://github.com/Dygmalab/Chrysalis.git ../chrysalis/');
process.chdir("../chrysalis");
execSync('yarn upgrade usb --prefix');
execSync('yarn install --prefix');
execSync('git clone https://github.com/0957758592/makes-build-chrysalis.git ../chrysalis-api/build');

const myArgs = process.argv.slice(2);

switch (myArgs[0]) {
  case 'linux':
    execSync('node ../chrysalis-api/build/makeFileLinux.js');
    break;
  case 'windows':
    execSync('node ../chrysalis-api/build/makeFileWindows.js');
    break;
  case 'mac':
    execSync('node ../chrysalis-api/build/makeFileMac.js');
    break;
  default:
    console.log('Sorry, u have another OS');
}