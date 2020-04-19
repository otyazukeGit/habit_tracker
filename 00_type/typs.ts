export interface habitDaysType {
	monday:boolean,
	tuesday:boolean,
	wednesday:boolean,
	thirsday:boolean,
	friday:boolean,
	sataday:boolean,
	sunday:boolean
}

// Storeに入れるstate用タイプ
export interface initialStateType {
	keyIndex:number,
	habits: [{
		habitKey:number,
		habitName:string
		// habitDays:boolean[]
		habitDays:habitDaysType,
	}],
	footerDays:habitDaysType
}
