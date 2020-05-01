import {createStore} from 'redux'
import {reducer} from './reducer'
import {initialState} from './initialState'

/**
 * ストアの作成
 *  作り上げたReducer と Storeに注入するstate(コンポーネントのpropsに入る)
 */
export const store = createStore(reducer, initialState)

/**
 * アプリにstate情報を渡して連携
 */
// export const mapStateToProps = (state /*, ownProps*/) => {
// 	return {
// 		keyIndex: state.keyIndex,
// 		habits : state.habits,
// 		footerDays: state.footerDays
// 	}
//  }

/**
 * アプリに(Reducerを呼び出す)dispatch(関数)情報を渡して連携
 */
// export const mapDispatchToProps = (dispatch) => {
// 	return {
// 		addHabit : () => dispatch(Actions.addHabit()),
// 		modHabit : (key:number, name:string) => dispatch(Actions.modHabit(key, name)),
// 		switchHabitAllDays : (onOff:boolean, className:string) => dispatch(Actions.switchHabitAllDays(onOff, className)),
// 		switchHabitDay : (key:number, onOff:boolean, className:string) => dispatch(Actions.switchHabitDay(key, onOff, className))
// 	}
// }
