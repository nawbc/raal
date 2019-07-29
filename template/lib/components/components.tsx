import * as React from 'react';
import './style/components.css';

export default class Component extends React.Component<any> {
	componentWillMount() {
		const a: Array<any> = Object.keys({ name: 'test' });
		const b = Promise.resolve(() => {});
		b.then(() => {});
	}
	render() {
		return <div className="muguet">create-muguet-lib</div>;
	}
}
