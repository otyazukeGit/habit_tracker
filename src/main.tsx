import { app, BrowserWindow, ipcMain } from 'electron'
import * as Datastore from 'nedb'
import * as fs from 'fs'
import * as path from 'path'

const db = new Datastore({ filename: 'items.db', autoload: false })
let win :BrowserWindow;

function createWindow() {
	win = new BrowserWindow({
		width: 1000,
		height: 600,
		webPreferences: {
			nodeIntegration: true
		}
	})

	// DBロード
	if (fs.existsSync(path.join(app.getAppPath(),'../items.db'))){
		fs.writeFileSync(path.join(app.getAppPath(),'items.db'), '');
	}
	db.loadDatabase();

	ipcMain.on('data_find', function (event, arg) {
		console.log('Main data_find');
		db.find({}, function (err, docs) {
			console.log("db.find()")
			if (err) {
				// event.sender.send('callback_ipc', 'alert from Main precess!');
				console.error("data_find - error")
			}
			if (docs.length === 0) {
				console.log('db lengh0')
				// let doc = { itemId: 9999, body: 'zero' }
				// db.insert(doc, (err, newDoc) => { })
			}
			console.log("Main data_find docs: ")
			console.dir(docs)
			event.sender.send('show_itemList', docs);
		});
	});

	// and load the index.html of the app.
	win.loadFile('../view/index.html')

// 	win.on('closed', function() {
// 		console.log(1)
// 		// win.webContents.session.clearCache()
// 		// win = null
//   })

	// Open the DevTools.
	win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	/// On macOS it is common for applications and their menu bar
	/// to stay active until the user quits explicitly with Cmd + Q
	win.webContents.session.clearCache()
	win = null
	// if (process.platform !== 'darwin') {
	app.quit()
	//}
})

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (win === null) {
		createWindow()
	}
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
