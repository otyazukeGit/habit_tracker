import * as React from 'react'

export class HabitHeader extends React.Component<{}> {
	constructor(props){
		super(props)
	}

	render(){
		return (
			<tr>
				<th></th>
				<th>
					<div className="days habitLaneHeader">
						<div className="dayItemHeader">Mon</div>
						<div className="dayItemHeader">Tue</div>
						<div className="dayItemHeader">Wed</div>
						<div className="dayItemHeader">Thr</div>
						<div className="dayItemHeader">Fri</div>
						<div className="dayItemHeader">Sat</div>
						<div className="dayItemHeader">Sun</div>
					</div>
				</th>
			</tr>
		)
	}
}
