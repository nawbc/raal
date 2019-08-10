import React from 'react';
import { shallow, mount } from 'enzyme';
// import renderer from 'react-test-renderer';
import Components from '../components';


describe('A suite', function () {

	it('should be selectable by class "raal"', function () {
		expect(shallow(<Components />).is('.raal')).toBe(true);
	});

	it('should mount in a full DOM', function () {
		expect(mount(<Components />).find('.raal').length).toBe(1);
	});

	it('Snapshot', () => {
		// const component = renderer.create(<Components />);
		// const componentInstance = testRenderer.root;
		// testInstance.findByProps({ id: 'click1-button' }).props.onClick();
		// testInstance.findByProps({ className: 'clickText' })

		// let snapshot = component.toJSON();
		// expect(snapshot).toMatchSnapshot();
		// snapshot.props.onClick();
		// snapshot = component.toJSON();
		// expect(snapshot).toMatchSnapshot();
	});
});


