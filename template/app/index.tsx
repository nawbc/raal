import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Component from '../lib/exports';
import * as serviceWorker from './serviceWorker';
import './index.scss';

class MuguetLib extends React.Component<any> {

	state = {
		displayTest: false
	}

	render() {
		return (
			<>
				{
					this.state.displayTest ? null :
						<div className="muguet-container">
							<div className="animationWrapper">
								<div className="muguet-left-leaf common" />
								<div className="muguet-right-leaf common" />
								<div className="muguet-branch-leaf common" />
								<h1>raal - react app and lib</h1>
							</div>
						</div>
				}
				<div>
					<button
						id="testButton"
						onClick={() => this.setState({ displayTest: !this.state.displayTest })}
					>Show Test</button>
					{this.state.displayTest ? <Component /> : null}
				</div>
			</>
		);
	}
}

ReactDOM.render(<MuguetLib />, document.getElementById('root'));

serviceWorker.unregister();

