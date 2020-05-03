import * as React from 'react'
import { useDispatch } from 'react-redux'
import * as Actions from '../04_action/actions'

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
		props.dispatch(Actions.switchHabitAllDays(e.target.checked, e.target.className))
	}

	return (
		<tr>
			<td style={{textAlign:"right"}}>All on/off</td>
			<td>
				<div className="days">
					<div className="dayItemFooter"><input type="checkbox" className="monday" checked={props.footerDays.monday} onChange={e => switchDay(e)}/></div>
					<div className="dayItemFooter"><input type="checkbox" className="tuesday" checked={props.footerDays.tuesday} onChange={switchDay}/></div>
					<div className="dayItemFooter"><input type="checkbox" className="wednesday" checked={props.footerDays.wednesday} onChange={switchDay}/></div>
					<div className="dayItemFooter"><input type="checkbox" className="thirsday" checked={props.footerDays.thirsday} onChange={switchDay}/></div>
					<div className="dayItemFooter"><input type="checkbox" className="friday" checked={props.footerDays.friday} onChange={switchDay}/></div>
					<div className="dayItemFooter"><input type="checkbox" className="sataday" checked={props.footerDays.sataday} onChange={switchDay}/></div>
					<div className="dayItemFooter"><input type="checkbox" className="sunday" checked={props.footerDays.sunday} onChange={switchDay}/></div>
				</div>
			</td>
		</tr>
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
