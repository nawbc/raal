import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Component from '../lib/exports';
import * as serviceWorker from './serviceWorker';
import './index.scss';

<<<<<<< HEAD
class MuguetLib extends React.Component<any> {
=======
class RaalLib extends React.Component<any> {
>>>>>>> fix webpack can't use compass, add sourcemap for css when babel

	state = {
		displayTest: false
	}

	render() {
		return (
			<>
				{
					this.state.displayTest ? null :
<<<<<<< HEAD
						<div className="muguet-container">
							<div className="animationWrapper">
								<div className="muguet-left-leaf common" />
								<div className="muguet-right-leaf common" />
								<div className="muguet-branch-leaf common" />
=======
						<div className="raal-container">
							<div className="animationWrapper">
								<div className="raal-left-leaf common" />
								<div className="raal-right-leaf common" />
								<div className="raal-branch-leaf common" />
>>>>>>> fix webpack can't use compass, add sourcemap for css when babel
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

<<<<<<< HEAD
ReactDOM.render(<MuguetLib />, document.getElementById('root'));
=======
ReactDOM.render(<RaalLib />, document.getElementById('root'));
>>>>>>> fix webpack can't use compass, add sourcemap for css when babel

serviceWorker.unregister();

