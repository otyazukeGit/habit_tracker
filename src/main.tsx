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
		db.find({}).exec((err, docs) => {
			console.log("db.find()")
			const comparison = (a, b) => {
				return a.habitKey - b.habitKey
			}
			docs.sort(comparison)

			if (err) {
				// event.sender.send('callback_ipc', 'alert from Main precess!');
				console.error("data_find - error")
			}
			if (docs.length === 0) {
				console.log('db no data')
			}

			event.sender.send('show_itemList', docs);
		})
	});
	
	ipcMain.on('data_add', function (event, keyIndex) {
		console.log("db data_add()")
		const doc = {
			habitKey:keyIndex + 1, 
			habitName:"",
			habitDays:{
				monday:false,
				tuesday:false,
				wednesday:false,
				thirsday:false,
				friday:false,
				sataday:false,
				sunday:false
			}
		}
		db.insert(doc, (err, newDoc) => {})
		
	})

	// 習慣 名称変更
	ipcMain.on('data_change_Name', function (event, arg) {
		console.log("db data_change_Name()")
		db.update({ habitKey: arg.habitKey }, { $set: { habitName: arg.habitName } }, {}, function (err, newDoc) {
			if (err) {
				console.log('err update: ' + err);
			}
			//event.sender.send('callback_ipc', 'Done update!')
		})
	})

	// 習慣 曜日On/Off 変更
	ipcMain.on('data_change_Day', function (event, arg) {
		console.log("db data_change_Day()")
		db.update({ habitKey: arg.habitKey }, { $set: { habitDays: arg.habitDays } }, {}, function (err, newDoc) {
			if (err) {
				console.log('err update: ' + err);
			}
			//event.sender.send('callback_ipc', 'Done update!')
		})
	})

	// 全ての習慣 曜日On/Off 変更
	ipcMain.on('data_change_OneDaysAll', function (event, arg) {
		console.log("db data_change_OneDaysAll()")
		db.find({}).exec((err, docs) => {
			let obj = {}
			docs.forEach(habits => {
				obj = Object.assign(habits.habitDays, {...habits.habitDays, [arg.className]:arg.onOff})
				console.log("habits.habitKey: " + habits.habitKey)
				console.log(obj)
				db.update({ habitKey: habits.habitKey }, { $set: { habitDays: obj } }, {}, function (err, newDoc) {
					if (err) {
						console.log('err update: ' + err);
					}
					//event.sender.send('callback_ipc', 'Done update!')
				})
			})
		})
	})

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
