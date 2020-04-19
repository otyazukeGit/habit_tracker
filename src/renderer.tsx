import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {Provider, connect} from 'react-redux'
import * as Actions from '../04_action/actions'
import {HabitFooter} from '../02_component/footer'
import {HabitHeader} from '../02_component/header'

interface PropsHabit {
	habitName : string,
	// key: number,  //keyはReactの特別プロパティ  差分レンダリングの為にある。
	habitKey: number,
	habitDays: habitDaysType,
	modHabit: Function,
	switchHabitDay: Function,
}
interface StateHabit {
}
/**
 * 子コンポーネントクラス（習慣）
 */
class HabitLane extends React.Component<PropsHabit, StateHabit> {
	constructor(props){
		super(props)
		this.state = {
			//コンポーネント内の値管理
		}
	}

	changeText(e){ //React input.valueの変更はonChangeで制御
		this.props.modHabit(this.props.habitKey, e.target.value)
	}

	chandeDay(e){
		this.props.switchHabitDay(this.props.habitKey, e.target.checked, e.target.className)
	}

	render() {
		// console.count("HabitLane render ")
		// どれか1行変えたら全行が再レンダリングされる。これが嫌なら[更新]ボタンとかのタイミングでstateを変える。
		// だから更新する時は別にフォームエリアを出すアプリが多いのかな。
		return (
			<tr className="habitLane">
				<td><input type="text" value={this.props.habitName} onChange={this.changeText.bind(this)} id="habitName"/></td>
				<td>
					<div className="days">
						<div className="dayItem"><input type="checkbox" className="monday" checked={this.props.habitDays.monday} onChange={this.chandeDay.bind(this)}/></div>
						<div className="dayItem"><input type="checkbox" className="tuesday" checked={this.props.habitDays.tuesday} onChange={this.chandeDay.bind(this)}/></div>
						<div className="dayItem"><input type="checkbox" className="wednesday" checked={this.props.habitDays.wednesday} onChange={this.chandeDay.bind(this)}/></div>
						<div className="dayItem"><input type="checkbox" className="thirsday" checked={this.props.habitDays.thirsday} onChange={this.chandeDay.bind(this)}/></div>
						<div className="dayItem"><input type="checkbox" className="friday" checked={this.props.habitDays.friday} onChange={this.chandeDay.bind(this)}/></div>
						<div className="dayItem"><input type="checkbox" className="sataday" checked={this.props.habitDays.sataday} onChange={this.chandeDay.bind(this)}/></div>
						<div className="dayItem"><input type="checkbox" className="sunday" checked={this.props.habitDays.sunday} onChange={this.chandeDay.bind(this)}/></div>
					</div>
				</td>
			</tr>
		)
	}
}


/**
 * 親コンポーネントクラス用 Props
 */
interface Props0 {
	initialState?: initialStateType,
	habits: [{
		habitKey:number,
		habitName:string,
		habitDays:habitDaysType,
		footerDays:habitDaysType
	}],
	footerDays: habitDaysType,
	addHabit: Function,
	modHabit: Function,
	switchHabitAllDays: Function,
	switchHabitDay: Function
}
/**
 * 親コンポーネントクラス用 State
 */
interface State0 {
}

/**
 * 基本のコンポーネントクラス（親）
 */
class App extends React.Component<Props0, State0> {
	constructor(props){
		super(props)
	}

	render() {
		return (
			<div>
				<h1>Habit Tracker!!</h1>
				<button onClick={() => this.props.addHabit()}>習慣追加</button>
				<div className="OutBorder">
					<table id="habits">
						<tbody>
							<HabitHeader />
							{this.props.habits.map( (habit)=>{
								return <HabitLane 
									habitName={habit.habitName} 
									key={habit.habitKey} 
									habitKey={habit.habitKey} 
									habitDays={habit.habitDays} 
									modHabit={this.props.modHabit.bind(this)}
									switchHabitDay={this.props.switchHabitDay.bind(this)} />}
							)}
							<HabitFooter footerDays={this.props.footerDays} switchHabitAllDays={this.props.switchHabitAllDays}/>
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}

interface habitDaysType {
		monday:boolean,
		tuesday:boolean,
		wednesday:boolean,
		thirsday:boolean,
		friday:boolean,
		sataday:boolean,
		sunday:boolean
}

// Storeに入れるstate用タイプ
interface initialStateType {
	keyIndex:number,
	habits: [{
		habitKey:number,
		habitName:string
		// habitDays:boolean[]
		habitDays:habitDaysType,
	}],
	footerDays:habitDaysType
}

/**
 * Storeに入れるstate
 */
const initialState:initialStateType = {
	keyIndex:1,
	habits: [{
		habitKey:1,
		habitName:"Name",
		// habitDays:[false,false,false,false,false,false,false]
		habitDays:{
			monday:false,
			tuesday:false,
			wednesday:false,
			thirsday:false,
			friday:false,
			sataday:false,
			sunday:false
		},
	}],
	footerDays:{
		monday:false,
		tuesday:false,
		wednesday:false,
		thirsday:false,
		friday:false,
		sataday:false,
		sunday:false
	}

}

/**
 * Reducer 
 * @param state  初期state will be into Store
 * @param action 更新メソッド分岐名称、第２引数以降はセット用値
 */
const reducer = (state = initialState , action) => {
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

/**
 * ストアの作成
 *  作り上げたReducer と Storeに注入するstate(コンポーネントのpropsに入る)
 */
const store = createStore(reducer, initialState)

/**
 * アプリにstate情報を渡して連携
 */
const mapStateToProps = (state /*, ownProps*/) => {
	return {
		keyIndex: state.keyIndex,
		habits : state.habits,
		footerDays: state.footerDays
	}
 }
/**
 * アプリに(Reducerを呼び出す)dispatch(関数)情報を渡して連携
 */
const mapDispatchToProps = (dispatch) => {
	return {
		addHabit : () => dispatch(Actions.addHabit()),
		modHabit : (key:number, name:string) => dispatch(Actions.modHabit(key, name)),
		switchHabitAllDays : (onOff:boolean, className:string) => dispatch(Actions.switchHabitAllDays(onOff, className)),
		switchHabitDay : (key:number, onOff:boolean, className:string) => dispatch(Actions.switchHabitDay(key, onOff, className))
	}
}

// Store.state/dispatchをコンポーネントと連結させる
const AppConnected = connect(mapStateToProps, mapDispatchToProps)(App)

//最終的なDOMへのレンダリング. ここでStore本体を渡している。
//ReactDOM.render(<App/>, document.getElementById('root'))
ReactDOM.render(
		<Provider store={store}>
			<AppConnected/>
		</Provider>
		, document.getElementById('root')
	)
