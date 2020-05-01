import * as React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {habitDaysType, initialStateType} from '../00_type/typs'
import {HabitHeader} from '../02_component/header'
import {HabitFooter} from '../02_component/footer'
import {HabitLane} from '../02_component/habitLane'
import {initialState} from '../03_store/initialState'
import {reducer} from '../03_store/reducer'
import * as Actions from '../04_action/actions'

// (Hooks)propsに入れ込まないので、Appクラスにprops型定義が必要なくなる。
/**
 * 親コンポーネントクラス用 Props
 */
//  interface Props0 {
// 	initialState?: initialStateType,
// 	habits: [{
// 		habitKey:number,
// 		habitName:string,
// 		habitDays:habitDaysType,
// 		footerDays:habitDaysType
// 	}],
// 	footerDays: habitDaysType,
// 	addHabit: Function,
// 	modHabit: Function,
// 	switchHabitAllDays: Function,
// 	switchHabitDay: Function
// }
/**
 * 親コンポーネントクラス用 State
 */
// interface State0 {
// 	initialState?: initialStateType,
// 	habits: [{
// 		habitKey:number,
// 		habitName:string,
// 		habitDays:habitDaysType,
// 		footerDays:habitDaysType
// 	}],
// 	footerDays: habitDaysType,
// 	addHabit: Function,
// 	modHabit: Function,
// 	switchHabitAllDays: Function,
// 	switchHabitDay: Function
// }

/**
 * 基本の関数コンポーネント（親）
 */
export const App = () => {
	
	const [state, dispatch] = React.useReducer(reducer, initialState)

	const addHabit = () => {
		dispatch(Actions.addHabit())
	}

	return (
		<div>
			<h1>Habit Tracker!!</h1>
			<button onClick={addHabit}>習慣追加</button>
			<div className="OutBorder">
				<table id="habits">
					<tbody>
						<HabitHeader/>
						{state.habits.map( (habit) => {
							return <HabitLane 
								habitName={habit.habitName} 
								key={habit.habitKey} 
								habitKey={habit.habitKey} 
								habitDays={habit.habitDays} 
								dispatch={dispatch} />}
						)}
						<HabitFooter footerDays={state.footerDays} dispatch={dispatch}/>
					</tbody>
				</table>
			</div>
		</div>
	)
}


 /**
 * 基本のコンポーネントクラス（親）
 */
// export class App extends React.Component<Props0, State0> {
// 	constructor(props){
// 		super(props)
// 		initialState = useSelector(state => state.initialState)
// 	}

// 	render() {
// 		return (
// 			<div>
// 				<h1>Habit Tracker!!</h1>
// 				<button onClick={() => this.props.addHabit()}>習慣追加</button>
// 				<div className="OutBorder">
// 					<table id="habits">
// 						<tbody>
// 							<HabitHeader />
// 							{this.props.habits.map( (habit)=>{
// 								return <HabitLane 
// 									habitName={habit.habitName} 
// 									key={habit.habitKey} 
// 									habitKey={habit.habitKey} 
// 									habitDays={habit.habitDays} 
// 									modHabit={this.props.modHabit.bind(this)}
// 									switchHabitDay={this.props.switchHabitDay.bind(this)} />}
// 							)}
// 							<HabitFooter footerDays={this.props.footerDays} switchHabitAllDays={this.props.switchHabitAllDays}/>
// 						</tbody>
// 					</table>
// 				</div>
// 			</div>
// 		)
// 	}
// }
