import { app, BrowserWindow, ipcMain, shell } from 'electron'
import * as Datastore from 'nedb'
import * as fs from 'fs'
import * as path from 'path'
import * as elelog from 'electron-log'

let win :BrowserWindow;

// process.on('uncaughtException', function(err) {
	// elelog.error('electron:event:uncaughtException');
	// // elelog.error(err);
	// // elelog.error(err.stack);
	// elelog.error("__dirname : " + __dirname);
	// elelog.error("app.getAppPath() : " + app.getAppPath());
	// elelog.error("userData : " + app.getPath("userData"));
	// elelog.error("home : " + app.getPath("home"));
	// elelog.error("appData : " + app.getPath("appData"));
	// elelog.error("exe : " + app.getPath("exe"));
	// elelog.error("temp : " + app.getPath("temp"));
	// elelog.error("path.resolve('file://',__dirname,'/index.html') : " + path.resolve('file://',__dirname,'/index.html'));

// 	app.quit();
//  });

 function createWindow() {
	win = new BrowserWindow({
		width: 1000,
		height: 600,
		webPreferences: {
			nodeIntegration: true
		}
	})

	// DBロード
	const dbPathFile = path.join(app.getAppPath(),'../items.db')
	console.log("dbPathFile : " + dbPathFile)
	if (!fs.existsSync(dbPathFile)){
		console.log("no DB file.")
		fs.writeFileSync(dbPathFile, '');
	}
	// const db = new Datastore({ filename: 'items.db', autoload: false })
	const db = new Datastore({ filename: dbPathFile, autoload: false })
	db.loadDatabase();

	ipcMain.on('data_find', function (event, arg) {
		console.log('Main data_find');
		db.find({}).exec((err, docs) => {
			console.log("db.find()")
			if (err) {
				// event.sender.send('callback_ipc', 'alert from Main precess!');
				console.error("data_find - error")
				return
			}
			if (docs.length === 0) {
				console.log('db no data')
				return
			}

			const comparison = (a, b) => {
				return a.habitKey - b.habitKey
			}
			docs.sort(comparison)

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

	// 習慣 行削除
	ipcMain.on('data_delete_Habit', function (event, arg) {
		console.log("db data_delete_Habit()")
		db.remove({ habitKey: arg.habitKey }, {}, function (err, newDoc) {
			if (err) {
				console.log('err update: ' + err);
			}
			//event.sender.send('callback_ipc', 'Done update!')
		})
	})

	// 全ての習慣 全曜日 Offに変更
	ipcMain.on('data_clear_AllDays', function(event, arg) {
		console.log("db data_clear_AllDays()")
		const days = { monday:false,tuesday:false,wednesday:false,thirsday:false,friday:false,sataday:false,sunday:false }
		db.update({}, { $set: { habitDays: days } }, {multi: true}, function (err, newDoc) {
			if (err) {
				console.log('err update: ' + err);
			}
			//event.sender.send('callback_ipc', 'Done update!')
		})
})

	// 全ての習慣 １曜日On/Off 切り替え
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

	win.webContents.on('new-window', (event, url) => {
		console.log("new-window")
		event.preventDefault();
		shell.openExternal(url);
	 });
  
	//  win.loadFile('index.html');	
	console.log('__dirname: ' + __dirname)
	// and load the index.html of the app.
	win.loadFile(path.join(app.getAppPath(),'/view/index.html'))
	// win.loadFile('view/index.html')

	//  win.loadFile(path.join(__dirname,'/view/index.html'))
	// win.loadURL(`file://${__dirname}/view/index.html`)  //ng?
	//  win.loadFile('file://' + __dirname + '/view/index.html')  // double?
		// file:///Users/kadowakikaoru/Desktop/wk_git/habit_tracker/build/file:/index.html
	//  win.loadFile(__dirname + '/index.html')  // double?
	 	// file:///index.html

	// win.loadFile(path.resolve('file://',__dirname,'/index.html'))  //ng?
	/* 'file://' + __dirname + '/index.html' */

	win.on('close', function() {
		console.log(1)
		win.webContents.session.clearCache()
  })

	// Open the DevTools.
	// win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	/// On macOS it is common for applications and their menu bar
	/// to stay active until the user quits explicitly with Cmd + Q
	// win.webContents.session.clearCache()
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
