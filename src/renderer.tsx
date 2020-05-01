import * as React from 'react'
import * as ReactDOM from 'react-dom'
// import {Provider, connect} from 'react-redux'
import {Provider} from 'react-redux'
// import {store, mapStateToProps, mapDispatchToProps} from '../03_store/store'
import {store} from '../03_store/store'
import {App} from '../01_container/app'

// Store.state/dispatchをコンポーネントと連結させる
// Redux Hooksではconnectは使用しない
// const AppConnected = connect(mapStateToProps, mapDispatchToProps)(App)

//最終的なDOMへのレンダリング. ここでStore本体を渡している。
//ReactDOM.render(<App/>, document.getElementById('root'))
ReactDOM.render(
		// <Provider store={store}>
		// 	<AppConnected/>
		// </Provider>
		// <Provider store={store}>
		// 	<App/>
		// </Provider>
		<App/>
		, document.getElementById('root')
	)
