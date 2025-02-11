/****** Actions ******/
export const addHabit = () => {
	return {type: 'ADD_Habit'}
}
export const modHabit = (key:number, name:string) => {
	return {type: 'UPDATE_Habit', habitKey:key, habitName: name}
}
export const delHabit = (key:number) => {
	return {type: 'DELETE_Habit', habitKey:key}
}
export const clearHabitAllDays = () => {
	return {type: 'Clear_Habit_AllDays'}
}
export const switchHabitAllDays = (onOff:boolean, className:string) => {
	return {type: 'Switch_Habit_AllDays', onOff: onOff, className:className}
}
export const switchHabitDay = (key:number, onOff:boolean, className:string) => {
	return {type: 'Switch_Habit_Day', habitKey:key, onOff: onOff, className:className}
}
export const setStoreByNedb = (nedb:object, order:number[]) => {
	return {type: 'SetStoreByNedb', nedb:nedb, order:order}
}
export const reorderHabit = (order:number[]) => {
	return {type: 'Reorder_Habit', order:order}	
}
