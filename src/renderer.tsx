import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {App} from '../01_container/app'
import {HelpPageA, HelpPageB} from '../02_component/HelpPages'
import { Route, Switch, Link, HashRouter } from "react-router-dom"

// Store.state/dispatchをコンポーネントと連結させる
// React Hooksではconnectは使用しない
// const AppConnected = connect(mapStateToProps, mapDispatchToProps)(App)

//最終的なDOMへのレンダリング. ここでStore本体を渡している。
//ReactDOM.render(<App/>, document.getElementById('root'))
ReactDOM.render(
		// <Provider store={store}>
		// 	<AppConnected/>
		// </Provider>
		// <App/>
		/* HashRouter is for on Electron instead react-router-dom.BrowserRouter */
		<HashRouter>
			<App/>
			<ul>
				<li><Link to="/a">ヘルプ</Link></li>
				{/* <li><Link to="/b">HelpPageB</Link></li> */}
			</ul>
			
			<Switch>
				<Route exact path="/a"><HelpPageA/></Route>
				{/* <Route exact path="/b"><HelpPageB/></Route> */}
			</Switch>
		</HashRouter>
		, document.getElementById('root')
	)
