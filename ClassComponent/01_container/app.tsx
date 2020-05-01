import * as React from 'react'
import {habitDaysType, initialStateType} from '../00_type/typs'
import {HabitHeader} from '../02_component/header'
import {HabitFooter} from '../02_component/footer'
import {HabitLane} from '../02_component/habitLane'

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
export class App extends React.Component<Props0, State0> {
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
