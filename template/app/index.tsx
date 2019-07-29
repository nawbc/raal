import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

class MuguetLib extends React.Component<any> {
	render() {
		return (
			<div className="muguet-container">
				<div className="animationWrapper">
					<div className="muguet-left-leaf common" />
					<div className="muguet-right-leaf common" />
					<div className="muguet-branch-leaf common" />
					<h1>create-muguet-lib</h1>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<MuguetLib />, document.getElementById('root'));
