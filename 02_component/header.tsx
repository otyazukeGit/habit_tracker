import * as React  from 'react'
import {useSelector} from 'react-redux'

// 試し
// type Props = {keyIndex:number}

/// 関数コンポーネント実装
export const HabitHeader = () => {
// export const HabitHeader: React.FC<Props> = (props) => {   // 試し
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
					{/* <div>{props.keyIndex}</div>   //試し  */}
				</div>
			</th>
		</tr>
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
