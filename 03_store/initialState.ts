import {initialStateType} from '../00_type/typs'

/**
 * Storeに入れるstate
 */
export const initialState:initialStateType = {
	keyIndex:1,
	habits: [{
		habitKey:1,
		habitName:"",
		// habitDays:[false,false,false,false,false,false,false]
		habitDays:{
			monday:false,
			tuesday:false,
			wednesday:false,
			thirsday:false,
			friday:false,
			sataday:false,
			sunday:false
		},
	}],
	footerDays:{
		monday:false,
		tuesday:false,
		wednesday:false,
		thirsday:false,
		friday:false,
		sataday:false,
		sunday:false
	},
	habitOrder:[]
}
