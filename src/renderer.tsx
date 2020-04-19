import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {Provider, connect} from 'react-redux'
import {store, mapStateToProps, mapDispatchToProps} from '../03_store/store'
import {App} from '../01_container/app'

// Store.state/dispatchをコンポーネントと連結させる
const AppConnected = connect(mapStateToProps, mapDispatchToProps)(App)

//最終的なDOMへのレンダリング. ここでStore本体を渡している。
//ReactDOM.render(<App/>, document.getElementById('root'))
ReactDOM.render(
		<Provider store={store}>
			<AppConnected/>
		</Provider>
		, document.getElementById('root')
	)
