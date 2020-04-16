/****** Actions ******/
export const addHabit = () => {
	return {type: 'ADD_Habit'}
}
export const modHabit = (key:number, name:string) => {
	return {type: 'UPDATE_Habit', habitKey:key, habitName: name}
}

