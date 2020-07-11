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
		width: 720,
		height: 600,
		webPreferences: {
			nodeIntegration: true
		}
	})

	const db:any = {}
	const dbLoad = async (dbName,filePath) => {
		const dbPathFile = path.join(app.getAppPath(),'../',filePath)
		console.log("dbPathFile : " + dbPathFile)
		if (!fs.existsSync(dbPathFile)){
			console.log("no DB file... ", dbPathFile)
			fs.writeFileSync(dbPathFile, '');
		} else {
			console.log('db file exists.');
		}
		db[dbName] = new Datastore({ filename: dbPathFile, autoload: false })
		await db[dbName].loadDatabase();
	}
	dbLoad('habits', 'items.db')
	dbLoad('order', 'order.db')
	let dbHabitOrder

	ipcMain.on('data_find', function (event, arg) {
		console.log('Main data_find');

		// Habit オーダ順
		let orderDb
		db.order.find({}).exec((err, order) => {
			orderDb = order[0].habitOrder
		})
		dbHabitOrder = orderDb

		// Habit データ
		db.habits.find({}).exec((err, habits) => {
			console.log("db.habits.find()")
			if (err) {
				// event.sender.send('callback_ipc', 'alert from Main precess!');
				console.error("data_find - error")
				return
			}
			if (habits.length === 0) {
				console.log('db no data')
				return
			}

			// const comparison = (a, b) => {
			// 	return a.habitKey - b.habitKey
			// }
			// docs.sort(comparison)
			// event.sender.send('show_itemList', docs);

			let new_docs = orderDb.map(order => {
				for(let i=0 ; i < habits.length ; i++){
					if(habits[i].habitKey == order){
						// console.log('habits[i]: ', habits[i]);
						return habits[i]
					}
				}
			})
			// console.log('new_docs : ', new_docs)
	
			event.sender.send('show_itemList', new_docs, orderDb);
		})
	});
	
	ipcMain.on('data_add', function (event, keyIndex, habitOrder) {
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
		db.habits.insert(doc, (err, newDoc) => {})

		console.log('habitOrder before update: ', habitOrder);
		habitOrder.splice(habitOrder.length, 0, keyIndex + 1)
		console.log('habitOrder after update: ', habitOrder);
		// db.order.update({$not: { habitOrder: 0 }}, {$set: { habitOrder: habitOrder}}, { multi: true }, (err, newDoc) => {})
		db.order.update({}, {$set: { habitOrder: habitOrder}}, { multi: true }, (err, newDoc) => {})
		dbHabitOrder = habitOrder
		
	})

	// 習慣 名称変更
	ipcMain.on('data_change_Name', function (event, arg) {
		console.log("db data_change_Name()")
		db.habits.update({ habitKey: arg.habitKey }, { $set: { habitName: arg.habitName } }, {}, function (err, newDoc) {
			if (err) {
				console.log('err update: ' + err);
			}
			//event.sender.send('callback_ipc', 'Done update!')
		})
	})

	// 習慣 曜日On/Off 変更
	ipcMain.on('data_change_Day', function (event, arg) {
		console.log("db data_change_Day()")
		db.habits.update({ habitKey: arg.habitKey }, { $set: { habitDays: arg.habitDays } }, {}, function (err, newDoc) {
			if (err) {
				console.log('err update: ' + err);
			}
			//event.sender.send('callback_ipc', 'Done update!')
		})
	})

	// 習慣 行削除
	ipcMain.on('data_delete_Habit', (event, arg) => {
		console.log("db data_delete_Habit()")
		const data_delete_Habit = async () => {
			await db.habits.remove({ habitKey: arg.habitKey }, {}, function (err, newDoc) {
				if (err) {
					console.log('err update: ' + err);
				}
			})
			
			// Habit オーダ順
			// dbLoad('order', 'order.db')
			let orderDb
			orderDb = dbHabitOrder
			console.log('dbHabitOrder: ', dbHabitOrder);
			// console.log('db.order', db.order);
			// db.order.find({}).exec((err, order) => {
			// 	if(err){
			// 		console.log('err: ', err)
			// 	}
			// 	console.log('order: ', order);
			// 	orderDb = order[0].habitOrder
			// })
			// console.log('orderDb: ', orderDb);
			orderDb.splice(orderDb.indexOf(arg.habitKey), 1)
			console.log('orderDb: ', orderDb);
			db.order.update({}, {$set: { habitOrder: orderDb}}, { multi: true }, (err, newDoc) => {})
		}
		data_delete_Habit()
	})

	// 全ての習慣 全曜日 Offに変更
	ipcMain.on('data_clear_AllDays', function(event, arg) {
		console.log("db data_clear_AllDays()")
		const days = { monday:false,tuesday:false,wednesday:false,thirsday:false,friday:false,sataday:false,sunday:false }
		db.habits.update({}, { $set: { habitDays: days } }, {multi: true}, function (err, newDoc) {
			if (err) {
				console.log('err update: ' + err);
			}
			//event.sender.send('callback_ipc', 'Done update!')
		})
	})

	// 全ての習慣 １曜日On/Off 切り替え
	ipcMain.on('data_change_OneDaysAll', function (event, arg) {
		console.log("db data_change_OneDaysAll()")
		db.habits.find({}).exec((err, docs) => {
			let obj = {}
			docs.forEach(habits => {
				obj = Object.assign(habits.habitDays, {...habits.habitDays, [arg.className]:arg.onOff})
				console.log("habits.habitKey: " + habits.habitKey)
				console.log(obj)
				db.habits.update({ habitKey: habits.habitKey }, { $set: { habitDays: obj } }, {}, function (err, newDoc) {
					if (err) {
						console.log('err update: ' + err);
					}
					//event.sender.send('callback_ipc', 'Done update!')
				})
			})
		})
	})

	// 習慣 順序の更新
	ipcMain.on('data_reorder_habits', function (event, newOrder) {
		console.log("db data_reorder_habits() - newOrder", newOrder)  //not defined ?
		db.order.update({}, { $set: { habitOrder: newOrder } }, { multi: true}, (err, newDoc) => {})
		dbHabitOrder = newOrder
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
