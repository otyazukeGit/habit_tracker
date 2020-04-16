import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {Provider, connect} from 'react-redux'
import * as Actions from '../04_action/actions'


interface PropsHabit {
	habitName : string,
	// key: number,  //keyはReactの特別プロパティ  差分レンダリングの為にある。
	habitKey: number,
	modHabit: Function
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

	changeText(e){
		this.props.modHabit(this.props.habitKey, e.target.value)
	}

	render() {
		// console.count("HabitLane render ")
		// どれか1行変えたら全行が再レンダリングされる。これが嫌なら[更新]ボタンとかのタイミングでstateを変える。
		// だから更新する時は別にフォームエリアを出すアプリが多いのかな。
		return (
			<tr className="habitLane">
				<td><input type="text" value={this.props.habitName} onChange={this.changeText.bind(this)} id="habitName"/></td>
				<td>　　</td>
				<td>
					<div className="days">
						<div className="dayItem monday"><input type="checkbox"/></div>
						<div className="dayItem tuesday"><input type="checkbox"/></div>
						<div className="dayItem wednesday"><input type="checkbox"/></div>
						<div className="dayItem thirsday"><input type="checkbox"/></div>
						<div className="dayItem friday"><input type="checkbox"/></div>
						<div className="dayItem sataday"><input type="checkbox"/></div>
						<div className="dayItem sunday"><input type="checkbox"/></div>
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
		habitName:string
	}],
	addHabit: Function,
	modHabit: Function
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
							{this.props.habits.map( (habit)=>{return <HabitLane habitName={habit.habitName} key={habit.habitKey} habitKey={habit.habitKey} modHabit={this.props.modHabit.bind(this)} />})}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}

// Storeに入れるstate用タイプ
interface initialStateType {
	keyIndex:number,
	habits: [{
		habitKey:number,
		habitName:string
	}],
}

/**
 * Storeに入れるstate
 */
const initialState:initialStateType = {
	keyIndex:1,
	habits: [{
		habitKey:1,
		habitName:"Name"
	}],
}

/**
 * Reducer 
 * @param state  初期state will be into Store
 * @param action 更新メソッド分岐名称、第２引数以降はセット用値
 */
const reducer = (state = initialState , action) => {
		switch(action.type){
			case 'ADD_Habit':
				return Object.assign({}, state, { 
					keyIndex: state.keyIndex + 1,
					habits: state.habits.concat({habitKey:state.keyIndex + 1, habitName:""})  // pushだとstate変更になるので、Reactが変更感知しないっぽい.
				})
			case 'UPDATE_Habit':
				let newMap = state.habits.map((habit)=>{
					// return {
					// 	habitKey: habit.habitKey,
					// 	habitName: habit.habitKey === action.habitKey ? action.habitName : habit.habitName
					// }
					if(habit.habitKey === action.habitKey){
						return {habitKey: habit.habitKey, habitName: action.habitName}
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
	}
 }
/**
 * アプリに(Reducerを呼び出す)dispatch(関数)情報を渡して連携
 */
const mapDispatchToProps = (dispatch) => {
	return {
		addHabit : () => dispatch(Actions.addHabit()),
		modHabit : (key:number, name:string) => dispatch(Actions.modHabit(key, name))
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
