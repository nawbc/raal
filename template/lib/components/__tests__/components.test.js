import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Components from '../components';


describe('A suite', function () {

	it('should be selectable by class "foo"', function () {
		expect(shallow(<Components />).is('.muguet')).toBe(true);
	});

	it('should mount in a full DOM', function () {
		expect(mount(<Components />).find('.muguet').length).toBe(1);
	});

	// it('should render to static HTML', function () {
	// 	expect(render(<Components />).text()).toEqual('create-muguet-lib');
	// });

	it('Snapshot', () => {
		const component = renderer.create(<Components />);
		let snapshot = component.toJSON();
		expect(snapshot).toMatchSnapshot();

		snapshot.props.onClick();
		snapshot = component.toJSON();
		expect(snapshot).toMatchSnapshot();
	});
});


