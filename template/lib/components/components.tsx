import * as React from 'react';
import './style/components.scss';

export default class Component extends React.Component<any> {
	state = {
		switch: false,
	};

	componentWillMount() {
		const b = Promise.resolve(() => { });
		b.then(() => { });
	}
	render() {
		return (
			<div
				className="muguet"
				onClick={() => {
					this.setState({
						switch: !this.state.switch,
					});
				}}
			>
				{this.state.switch ? <span>love&nbsp;</span> : ''} create-muguet-lib
			</div>
		);
	}
}
