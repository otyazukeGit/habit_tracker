import * as React from 'react'
import {habitDaysType} from '../00_type/typs'

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
export class HabitLane extends React.Component<PropsHabit, StateHabit> {
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
