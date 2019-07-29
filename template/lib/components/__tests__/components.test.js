import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Components from '../components';

describe('A suite', function () {
	it('should render without throwing an error', function () {
		expect(shallow(<Components />).contains(<div className="muguet">create-muguet-lib</div>)).toBe(true);
	});

	it('should be selectable by class "foo"', function () {
		expect(shallow(<Components />).is('.muguet')).toBe(true);
	});

	it('should mount in a full DOM', function () {
		expect(mount(<Components />).find('.muguet').length).toBe(1);
	});

	it('should render to static HTML', function () {
		expect(render(<Components />).text()).toEqual('create-muguet-lib');
	});
});
