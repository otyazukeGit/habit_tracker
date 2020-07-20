import * as React from 'react'
import {HabitHeader} from '../02_component/header'
import {HabitFooter} from '../02_component/footer'
import {HabitLane} from '../02_component/habitLane'
import {initialState} from '../03_store/initialState'
import {reducer} from '../03_store/reducer'
import * as Actions from '../04_action/actions'
import { ipcRenderer } from 'electron'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { Button } from '@material-ui/core';
import styled from 'styled-components'


// (Hooks)propsに入れ込まないので、Appクラスにprops型定義が必要なくなる。
/**
 * 親コンポーネントクラス用 Props
 */
//  interface Props0 {
// 	initialState?: initialStateType,
// 	habits: [{
// 		habitKey:number,
// 		habitName:string,
// 		habitDays:habitDaysType,
// 		footerDays:habitDaysType
// 	}],
// 	footerDays: habitDaysType,
// 	addHabit: Function,
// 	modHabit: Function,
// 	switchHabitAllDays: Function,
// 	switchHabitDay: Function
// }
/**
 * 親コンポーネントクラス用 State
 */
// interface State0 {
// 	initialState?: initialStateType,
// 	habits: [{
// 		habitKey:number,
// 		habitName:string,
// 		habitDays:habitDaysType,
// 		footerDays:habitDaysType
// 	}],
// 	footerDays: habitDaysType,
// 	addHabit: Function,
// 	modHabit: Function,
// 	switchHabitAllDays: Function,
// 	switchHabitDay: Function
// }

/**
 * 基本の関数コンポーネント（親）
 */
export const App = () => {
	
	const [state, dispatch] = React.useReducer(reducer, initialState)

	const addHabit = () => {
		console.log('addHabit');
		// insert into NeDB
		ipcRenderer.send('data_add', state.keyIndex, state.habitOrder)	
		// insert into Store
		dispatch(Actions.addHabit())
	}
	
	const clearHabitAllDays = () => {
		// update NeDB
		ipcRenderer.send('data_clear_AllDays')
		// update Store
		dispatch(Actions.clearHabitAllDays())
	}

	const onDragEnd = result => {
		console.log('onDragEnd result: ', result);
		const { destination, source, draggableId, type } = result
		if (!destination) {
			return;
		}
		if (destination.droppableId === source.droppableId
			&& destination.index === source.index) {
			return;
		}

		let newOrder = state.habitOrder
		newOrder.splice(source.index, 1)
		newOrder.splice(destination.index, 0, Number(draggableId))

		// update NeDB
		ipcRenderer.send('data_reorder_habits', newOrder)
		// update Store
		dispatch(Actions.reorderHabit(newOrder))
		
	}

	let sortedHabits = []
	state.habitOrder.map( (order, index) => {
		for(let i=0 ; i < state.habits.length ; i++){
			let habit = state.habits[i]
			if(habit.habitKey == order){
				sortedHabits.push(habit)
			}
		}
	})

	React.useEffect(() => {
		console.log("effect")
		ipcRenderer.on('show_itemList', (event, items, order) => {
			dispatch(Actions.setStoreByNedb(items, order))
		})
		ipcRenderer.send('data_find', 'dummy')
	}, [dispatch])

	const Rows = styled.div`
		color: inherit;
	`

	return (
		<div>
			<h1>Habit Tracker</h1>
			<Button onClick={addHabit} variant="contained" color="primary">Add</Button>
			　
			<Button onClick={clearHabitAllDays} variant="contained" color="primary">Clear check</Button>
			<br/>
			<div className="outBorder">
				<DragDropContext onDragEnd={onDragEnd}>
						<HabitHeader/>
						<Droppable droppableId="habitList"  type="task">
							{(provided, snapshot) => (
								<Rows
									ref={provided.innerRef} 
									{...provided.droppableProps}
									// {/* isDraggingOver={snapshot.isDraggingOver} */}
									className="habitLane"
								>
									{sortedHabits.map( (habit, index) => (
										<HabitLane 
											habitName={habit.habitName} 
											key={habit.habitKey} 
											habitKey={habit.habitKey} 
											habitDays={habit.habitDays} 
											dispatch={dispatch}
											index={index}
										/>)
									)}
									{provided.placeholder}
								</Rows>
							)}
						</Droppable>
						<HabitFooter footerDays={state.footerDays} dispatch={dispatch}/>
				</DragDropContext>
			</div>
		</div>
	)
}


 /**
 * 基本のクラスコンポーネント（親）
 */
// export class App extends React.Component<Props0, State0> {
// 	constructor(props){
// 		super(props)
// 		initialState = useSelector(state => state.initialState)
// 	}

// 	render() {
// 		return (
// 			<div>
// 				<h1>Habit Tracker!!</h1>
// 				<button onClick={() => this.props.addHabit()}>習慣追加</button>
// 				<div className="OutBorder">
// 					<table id="habits">
// 						<tbody>
// 							<HabitHeader />
// 							{this.props.habits.map( (habit)=>{
// 								return <HabitLane 
// 									habitName={habit.habitName} 
// 									key={habit.habitKey} 
// 									habitKey={habit.habitKey} 
// 									habitDays={habit.habitDays} 
// 									modHabit={this.props.modHabit.bind(this)}
// 									switchHabitDay={this.props.switchHabitDay.bind(this)} />}
// 							)}
// 							<HabitFooter footerDays={this.props.footerDays} switchHabitAllDays={this.props.switchHabitAllDays}/>
// 						</tbody>
// 					</table>
// 				</div>
// 			</div>
// 		)
// 	}
// }
