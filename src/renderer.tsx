import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {Provider, connect} from 'react-redux'
import * as Actions from '../04_action/actions'

let wk :string = "ABC!"

/**
 * 親コンポーネントクラス用 Props
 */
interface Props0 {
	initialState?: initialStateType,
	habitName : number,
	countUp1: Function
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
				<h1>Hello React!!</h1>
				<div>this.props.value1(コンポーネント自体のprops from Store)  -> {this.props.habitName}</div>
				<button onClick={() => this.props.countUp1()}>CountUP first(固定値1UP)</button>
			</div>
		)
	}
}

// Storeに入れるstate用タイプ
interface initialStateType {
	habitName: string,
}

/**
 * Storeに入れるstate
 */
const initialState:initialStateType = {
	habitName: "Name",
}

/**
 * Reducer 
 * @param state  初期state will be into Store
 * @param action 更新メソッド分岐名称、第２引数以降はセット用値
 */
const reducer = (state = initialState , action) => {
		switch(action.type){
		case 'ADD1':
			return Object.assign({}, state, { habitName: "Named" })
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
		habitName : state.habitName,
	}
 }
/**
 * アプリに(Reducerを呼び出す)dispatch(関数)情報を渡して連携
 */
const mapDispatchToProps = (dispatch) => {
	return {
		countUp1 : () => dispatch(Actions.actionAdd1()),
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
