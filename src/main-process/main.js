const {app, BrowserWindow} = require('electron');

let mainWindow;

const createMainWindow = () => {
    mainWindow = new BrowserWindow({
        minWidth: 400,
        minHeight: 400
    });
    mainWindow.loadFile(__dirname + '/main.html');
};

app.whenReady().then(() => {
    createMainWindow();
});
