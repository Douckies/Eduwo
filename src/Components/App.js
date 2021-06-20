import Header from './Header';
import Footer from './Footer';
import Body from './Body';
import '../Style/appStyle.css';
import DisplaySelectedCity from './DisplaySelectedCity';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
	return (
		<div className="appStyle">
			<Router>
				<Header />
				<Route path="/" exact component={Body} />
				<Route path="/city/:slug" exact component={DisplaySelectedCity} />
			</Router>
			<Footer />
		</div>
	);
}

export default App;
