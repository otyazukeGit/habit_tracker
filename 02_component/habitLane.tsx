import * as React from 'react'
import {habitDaysType} from '../00_type/typs'
import * as Actions from '../04_action/actions'

// interface PropsHabit {
// 	habitName : string,
// 	// key: number,  //keyはReactの特別プロパティ  差分レンダリングの為にある。
// 	habitKey: number,
// 	habitDays: habitDaysType,
// 	modHabit: Function,
// 	switchHabitDay: Function,
// }
// interface StateHabit {
// }
/**
 * 子コンポーネントクラス（習慣）
 */
/// 関数コンポーネント実装
export const HabitLane = (props) => {
	const changeText = (e) => { //React input.valueの変更はonChangeで制御
		props.dispatch(Actions.modHabit(props.habitKey, e.target.value))
	}

	const changeDay = (e) => {
		props.dispatch(Actions.switchHabitDay(props.habitKey, e.target.checked, e.target.className))
	}

	return (
		<tr className="habitLane">
			<td><input type="text" className="habitName" value={props.habitName} onChange={(e) => changeText(e)} id="habitName"/></td>
			<td>
				<div className="days">
					<div className="dayItem"><input type="checkbox" className="monday" checked={props.habitDays.monday} onChange={(e) => changeDay(e)}/></div>
					<div className="dayItem"><input type="checkbox" className="tuesday" checked={props.habitDays.tuesday} onChange={(e) => changeDay(e)}/></div>
					<div className="dayItem"><input type="checkbox" className="wednesday" checked={props.habitDays.wednesday} onChange={(e) => changeDay(e)}/></div>
					<div className="dayItem"><input type="checkbox" className="thirsday" checked={props.habitDays.thirsday} onChange={(e) => changeDay(e)}/></div>
					<div className="dayItem"><input type="checkbox" className="friday" checked={props.habitDays.friday} onChange={(e) => changeDay(e)}/></div>
					<div className="dayItem"><input type="checkbox" className="sataday" checked={props.habitDays.sataday} onChange={(e) => changeDay(e)}/></div>
					<div className="dayItem"><input type="checkbox" className="sunday" checked={props.habitDays.sunday} onChange={(e) => changeDay(e)}/></div>
				</div>
			</td>
		</tr>
	)
}

/// クラスコンポーネント実装
// export class HabitLane extends React.Component<PropsHabit, StateHabit> {
// 	constructor(props){
// 		super(props)
// 		this.state = {
// 			//コンポーネント内の値管理
// 		}
// 	}

// 	changeText(e){ //React input.valueの変更はonChangeで制御
// 		this.props.modHabit(this.props.habitKey, e.target.value)
// 	}

// 	chandeDay(e){
// 		this.props.switchHabitDay(this.props.habitKey, e.target.checked, e.target.className)
// 	}

// 	render() {
// 		// console.count("HabitLane render ")
// 		// どれか1行変えたら全行が再レンダリングされる。これが嫌なら[更新]ボタンとかのタイミングでstateを変える。
// 		// だから更新する時は別にフォームエリアを出すアプリが多いのかな。
// 		return (
// 			<tr className="habitLane">
// 				<td><input type="text" className="habitName" value={this.props.habitName} onChange={this.changeText.bind(this)} id="habitName"/></td>
// 				<td>
// 					<div className="days">
// 						<div className="dayItem"><input type="checkbox" className="monday" checked={this.props.habitDays.monday} onChange={this.chandeDay.bind(this)}/></div>
// 						<div className="dayItem"><input type="checkbox" className="tuesday" checked={this.props.habitDays.tuesday} onChange={this.chandeDay.bind(this)}/></div>
// 						<div className="dayItem"><input type="checkbox" className="wednesday" checked={this.props.habitDays.wednesday} onChange={this.chandeDay.bind(this)}/></div>
// 						<div className="dayItem"><input type="checkbox" className="thirsday" checked={this.props.habitDays.thirsday} onChange={this.chandeDay.bind(this)}/></div>
// 						<div className="dayItem"><input type="checkbox" className="friday" checked={this.props.habitDays.friday} onChange={this.chandeDay.bind(this)}/></div>
// 						<div className="dayItem"><input type="checkbox" className="sataday" checked={this.props.habitDays.sataday} onChange={this.chandeDay.bind(this)}/></div>
// 						<div className="dayItem"><input type="checkbox" className="sunday" checked={this.props.habitDays.sunday} onChange={this.chandeDay.bind(this)}/></div>
// 					</div>
// 				</td>
// 			</tr>
// 		)
// 	}
// }
