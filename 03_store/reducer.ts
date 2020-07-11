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
		let new_habits
		let new_footerDays
		let newOrder
		switch(action.type){
			case 'SetStoreByNedb':
				console.log('reducer SetStoreByNedb action: ', action);
				newMap = action.nedb.map((line) => {
					return line
				})
				const nextIndex = Math.max(...action.nedb.map(habits => habits.habitKey))
				return Object.assign({}, state, {...state, keyIndex:nextIndex, habits:newMap, habitOrder:action.order})

			case 'ADD_Habit':
				console.log("ADD_Habit()")
				// console.log(' -------------- ');
				// console.log('state.habitOrder: ', state.habitOrder);
				// console.log('state.habitOrder.length: ', state.habitOrder.length);
				// console.log('state.keyIndex: ', state.keyIndex);
				newOrder = state.habitOrder
				newOrder.splice(newOrder.length, 0, state.keyIndex + 1)
				console.log('newOrder: ', newOrder);
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
					}),  // pushだとstate変更になるので、Reactが変更感知しないっぽい.
					habitOrder: newOrder
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

			case 'DELETE_Habit':
				console.log("DELETE_Habit()")
				newMap = state.habits.filter(habit => habit.habitKey !== action.habitKey)
				newOrder = state.habitOrder
				newOrder.splice(newOrder.indexOf(action.habitKey), 1)
				return Object.assign({}, state, { habits: newMap, habitOrder:newOrder })

			case 'Reorder_Habit':
				console.log("Reorder_Habit() - action.order", action.order)
				return Object.assign({}, state, { habitOrder: action.order })

			case 'Clear_Habit_AllDays':
				console.log("Clear_Habit_AllDays()")
				console.log('state.habits')
				console.dir(state.habits)
				new_habits = state.habits.map(habit => {
					return {...habit, habitDays:Object.assign(habit.habitDays,{monday:false,tuesday:false,wednesday:false,thirsday:false,friday:false,sataday:false,sunday:false })}
				})
				console.log('new_habits')
				console.dir(new_habits)
				return Object.assign({}, state, { habits: new_habits })

			case 'Switch_Habit_AllDays':
				console.log("Switch_Habit_AllDays()")
				new_habits = state.habits.map(habit => {
					return {...habit, habitDays:Object.assign(habit.habitDays, {[action.className]:action.onOff})}
				})
				new_footerDays = Object.assign({}, state.footerDays, {[action.className]:action.onOff})
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
