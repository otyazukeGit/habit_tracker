import * as React from 'react'

export class HabitHeader extends React.Component<{}> {
	constructor(props){
		super(props)
	}

	render(){
		return (
			<tr className="habitLane">
				<th></th>
				<th>
					<div className="days">
						<div className="dayItem">Mon</div>
						<div className="dayItem">Tue</div>
						<div className="dayItem">Wed</div>
						<div className="dayItem">Thr</div>
						<div className="dayItem">Fri</div>
						<div className="dayItem">Sat</div>
						<div className="dayItem">Sun</div>
					</div>
				</th>
			</tr>
		)
	}
}
