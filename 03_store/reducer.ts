import {initialState} from './initialState'
import {initialStateType} from '../00_type/typs'

/// Typescript type union(|のこと) オブジェクト型だとうまいこと動かない...
// type ActionType =
//   {
// 		// type: 'ADD_Habit'
// 		type: string
//     }
//   | {
// 		// type: 'UPDATE_Habit'
// 		type: string,
// 		habitKey: number,
// 		habitName: string
//     }
//   | {
// 		// type: 'Switch_Habit_AllDays'
// 		type: string,
// 		className: string,
// 		onOff: boolean
//     }
//   | {
// 		// type: 'Switch_Habit_Day'
// 		type: string,
// 		habitKey: number,
// 		className: string,
// 		onOff: boolean
// 	 }

/**
 * Reducer 
 * @param state  初期state will be into Store
 * @param action 更新メソッド分岐名称、第２引数以降はセット用値
 */
export const reducer = (state:initialStateType = initialState , action) => {
		let newMap
		switch(action.type){
			case 'ADD_Habit':
				console.log("ADD_Habit()")
				return Object.assign({}, state, { 
					keyIndex: state.keyIndex + 1,
					habits: state.habits.concat({
						habitKey:state.keyIndex + 1, 
						habitName:"", 
						// habitDays:[false,false,false,false,false,false,false]
						habitDays:{
							monday:false,
							tuesday:false,
							wednesday:false,
							thirsday:false,
							friday:false,
							sataday:false,
							sunday:false
						}
					})  // pushだとstate変更になるので、Reactが変更感知しないっぽい.
				})
			case 'UPDATE_Habit':
				console.log("UPDATE_Habit()")
				newMap = state.habits.map((habit)=>{
					// return {
					// 	habitKey: habit.habitKey,
					// 	habitName: habit.habitKey === action.habitKey ? action.habitName : habit.habitName
					// }
					if(habit.habitKey === action.habitKey){
						// return {habitKey: habit.habitKey, habitName: action.habitName, habitDays:habit.habitDays}
						return {...habit, habitName: action.habitName}
					}else {
						return {...habit}
					}
				})
				return Object.assign({}, state, { habits: newMap })
			case 'Switch_Habit_AllDays':
				console.log("Switch_Habit_AllDays()")
				let new_habits = state.habits.map(habit => {
					return {...habit, habitDays:Object.assign(habit.habitDays, {[action.className]:action.onOff})}
				})
				let new_footerDays = Object.assign({}, state.footerDays, {[action.className]:action.onOff})
				return Object.assign({}, state, { 
					habits: new_habits,
					footerDays: new_footerDays})
			case 'Switch_Habit_Day':
				console.log("Switch_Habit_Day()")
				newMap = state.habits.map((habit)=>{
					if(habit.habitKey === action.habitKey){
						return {...habit, habitDays:Object.assign(habit.habitDays, {[action.className]:action.onOff})}
					}else {
						return {...habit}
					}
				})
				return Object.assign({}, state, { habits: newMap })
			default:
				return state
	}
}
