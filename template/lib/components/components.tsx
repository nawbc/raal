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
			>
				<div
					className='test test-click'
				>
					<h2>click test</h2>
					<button
						id='click1-button'
						onClick={() => {
							this.setState({
								switch: !this.state.switch,
							});
						}}
					>click</button>
					<p className='clickText'>
						{this.state.switch ? <span>love&nbsp;</span> : ''}raal
					</p>
				</div>
				<div
					className='test test-form'
				>
					<h2>form test</h2>
					<form>
						<p>
							<label htmlFor="username"></label><input id='username' type="text" placeholder='username' />
						</p>
						<p>
							<label htmlFor="password"></label><input id='password' type="password" placeholder='password' />
						</p>
						<button type="button">Login</button>
					</form>
				</div>
			</div>
		);
	}
}
