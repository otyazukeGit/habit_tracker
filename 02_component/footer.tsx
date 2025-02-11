import * as React from 'react'
import * as Actions from '../04_action/actions'
import { ipcRenderer } from 'electron'
import {RowHabit, CellHabitName, CellDelButton, CellHabitDays, HabitDays} from './styledUI'

interface PropsFooter {
	footerDays:{
		monday:boolean,
		tuesday:boolean,
		wednesday:boolean,
		thirsday:boolean,
		friday:boolean,
		sataday:boolean,
		sunday:boolean
	},
	dispatch:Function,
}

/// 関数コンポーネント実装
export const HabitFooter: React.FC<PropsFooter> = (props) => {

	const switchDay = (e) => {
		// update NeDB
		ipcRenderer.send('data_change_OneDaysAll', {className:e.target.className, onOff:e.target.checked})
		// update Store
		props.dispatch(Actions.switchHabitAllDays(e.target.checked, e.target.className))
	}

	return (
		<RowHabit>
			<CellHabitName style={{textAlign:"right"}}>All on/off</CellHabitName>
			<CellDelButton> </CellDelButton>
			<CellHabitDays>
				<HabitDays className="dayItemFooter"><input type="checkbox" className="monday" checked={props.footerDays.monday} onChange={e => switchDay(e)}/></HabitDays>
				<HabitDays className="dayItemFooter"><input type="checkbox" className="tuesday" checked={props.footerDays.tuesday} onChange={switchDay}/></HabitDays>
				<HabitDays className="dayItemFooter"><input type="checkbox" className="wednesday" checked={props.footerDays.wednesday} onChange={switchDay}/></HabitDays>
				<HabitDays className="dayItemFooter"><input type="checkbox" className="thirsday" checked={props.footerDays.thirsday} onChange={switchDay}/></HabitDays>
				<HabitDays className="dayItemFooter"><input type="checkbox" className="friday" checked={props.footerDays.friday} onChange={switchDay}/></HabitDays>
				<HabitDays className="dayItemFooter"><input type="checkbox" className="sataday" checked={props.footerDays.sataday} onChange={switchDay}/></HabitDays>
				<HabitDays className="dayItemFooter"><input type="checkbox" className="sunday" checked={props.footerDays.sunday} onChange={switchDay}/></HabitDays>
			</CellHabitDays>
		</RowHabit>
	)
}


/// クラスコンポーネント実装
// export class HabitFooter extends React.Component<PropsFooter, {}> {
// 	constructor(props){
// 		super(props)
// 	}

// 	switchDay(e){
// 		this.props.switchHabitAllDays(e.target.checked, e.target.className)
// 	}

// 	render(){
// 		return (
// 			<tr>
// 				<td style={{textAlign:"right"}}>切り替え</td>
// 				<td>
// 					<div className="days">
// 						<div className="dayItemFooter"><input type="checkbox" className="monday" checked={this.props.footerDays.monday} onChange={this.switchDay.bind(this)}/></div>
// 						<div className="dayItemFooter"><input type="checkbox" className="tuesday" checked={this.props.footerDays.tuesday} onChange={this.switchDay.bind(this)}/></div>
// 						<div className="dayItemFooter"><input type="checkbox" className="wednesday" checked={this.props.footerDays.wednesday} onChange={this.switchDay.bind(this)}/></div>
// 						<div className="dayItemFooter"><input type="checkbox" className="thirsday" checked={this.props.footerDays.thirsday} onChange={this.switchDay.bind(this)}/></div>
// 						<div className="dayItemFooter"><input type="checkbox" className="friday" checked={this.props.footerDays.friday} onChange={this.switchDay.bind(this)}/></div>
// 						<div className="dayItemFooter"><input type="checkbox" className="sataday" checked={this.props.footerDays.sataday} onChange={this.switchDay.bind(this)}/></div>
// 						<div className="dayItemFooter"><input type="checkbox" className="sunday" checked={this.props.footerDays.sunday} onChange={this.switchDay.bind(this)}/></div>
// 					</div>
// 				</td>
// 			</tr>
// 		)
// 	}
// }
