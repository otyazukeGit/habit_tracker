import * as React from 'react'

interface PropsFooter {
	footerDays:{
		monday:boolean,
		tuesday:boolean,
		wednesday:boolean,
		thirsday:boolean,
		friday:boolean,
		sataday:boolean,
		sunday:boolean
	}
	switchHabitAllDays: Function,
}

export class HabitFooter extends React.Component<PropsFooter, {}> {
	constructor(props){
		super(props)
	}

	switchDay(e){
		this.props.switchHabitAllDays(e.target.checked, e.target.className)
	}

	render(){
		return (
			<tr className="habitLane">
				<td style={{textAlign:"right"}}>切り替え</td>
				<td>
					<div className="days">
						<div className="dayItem"><input type="checkbox" className="monday" checked={this.props.footerDays.monday} onChange={this.switchDay.bind(this)}/></div>
						<div className="dayItem"><input type="checkbox" className="tuesday" checked={this.props.footerDays.tuesday} onChange={this.switchDay.bind(this)}/></div>
						<div className="dayItem"><input type="checkbox" className="wednesday" checked={this.props.footerDays.wednesday} onChange={this.switchDay.bind(this)}/></div>
						<div className="dayItem"><input type="checkbox" className="thirsday" checked={this.props.footerDays.thirsday} onChange={this.switchDay.bind(this)}/></div>
						<div className="dayItem"><input type="checkbox" className="friday" checked={this.props.footerDays.friday} onChange={this.switchDay.bind(this)}/></div>
						<div className="dayItem"><input type="checkbox" className="sataday" checked={this.props.footerDays.sataday} onChange={this.switchDay.bind(this)}/></div>
						<div className="dayItem"><input type="checkbox" className="sunday" checked={this.props.footerDays.sunday} onChange={this.switchDay.bind(this)}/></div>
					</div>
				</td>
			</tr>
		)
	}
}
