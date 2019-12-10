import React from 'react';
import { shallow, render } from 'enzyme';

import { AccordionPanelVanilla } from '../index';

describe('<AccordionPanel />', () => {
  let AccordionPanelComponent = '';
  beforeEach(() => {
    AccordionPanelComponent = shallow(<AccordionPanelVanilla>Test</AccordionPanelVanilla>);
  });

  test('should render correctly', () => {
    expect(AccordionPanelComponent).toMatchSnapshot();
  });
});