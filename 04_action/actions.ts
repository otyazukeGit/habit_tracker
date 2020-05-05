/****** Actions ******/
export const addHabit = () => {
	return {type: 'ADD_Habit'}
}
export const modHabit = (key:number, name:string) => {
	return {type: 'UPDATE_Habit', habitKey:key, habitName: name}
}
export const switchHabitAllDays = (onOff:boolean, className:string) => {
	return {type: 'Switch_Habit_AllDays', onOff: onOff, className:className}
}
export const switchHabitDay = (key:number, onOff:boolean, className:string) => {
	return {type: 'Switch_Habit_Day', habitKey:key, onOff: onOff, className:className}
}
export const setStoreByNedb = (nedb:object) => {
	return {type: 'SetStoreByNedb', nedb:nedb}
}
