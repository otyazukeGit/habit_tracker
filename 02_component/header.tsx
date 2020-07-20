import * as React  from 'react'
// import {useSelector} from 'react-redux'
import {RowHabit, CellHabitName, CellDelButton, HeaderHabitDays, CellHabitDays} from './styledUI'

/// 関数コンポーネント実装
export const HabitHeader = () => {
	return (
		<RowHabit>
			<CellHabitName className="basic_bg">Habit</CellHabitName>
			<CellDelButton className="basic_bg"> </CellDelButton>
			<CellHabitDays className="habitLaneHeader">
				<HeaderHabitDays>Mon</HeaderHabitDays>
				<HeaderHabitDays>Tue</HeaderHabitDays>
				<HeaderHabitDays>Wed</HeaderHabitDays>
				<HeaderHabitDays>Thr</HeaderHabitDays>
				<HeaderHabitDays>Fri</HeaderHabitDays>
				<HeaderHabitDays>Sat</HeaderHabitDays>
				<HeaderHabitDays>Sun</HeaderHabitDays>
			</CellHabitDays>
		</RowHabit>
	)
}

/// クラスコンポーネント実装
// export class HabitHeader extends React.Component<{}> {
// 	constructor(props){
// 		super(props)
// 	}

// 	render(){
// 		return (
// 			<tr>
// 				<th></th>
// 				<th>
// 					<div className="days habitLaneHeader">
// 						<div className="dayItemHeader">Mon</div>
// 						<div className="dayItemHeader">Tue</div>
// 						<div className="dayItemHeader">Wed</div>
// 						<div className="dayItemHeader">Thr</div>
// 						<div className="dayItemHeader">Fri</div>
// 						<div className="dayItemHeader">Sat</div>
// 						<div className="dayItemHeader">Sun</div>
// 					</div>
// 				</th>
// 			</tr>
// 		)
// 	}
// }
