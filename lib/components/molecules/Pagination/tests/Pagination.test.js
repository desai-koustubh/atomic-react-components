import React from 'react';
import { shallow, render, mount } from 'enzyme';
import styled, { css } from 'styled-components';

import expectExport from 'expect';
import { shallowEqual } from 'recompose';
import Pagination, { PaginationVanilla } from '../index';

describe('<Pagination />', () => {
  let PaginationComponent = '';
  beforeEach(() => {
    PaginationComponent = shallow(<Pagination>Test</Pagination>);
  });
  it('should take inherited styles', () => {
    PaginationComponent = shallow(
      <Pagination inheritedStyles={{ background: '#00ff00' }}>Test</Pagination>
    );
    expect(PaginationComponent.html()).not.toBe(null);
  });
  it('should not render inherited styles when no styles are passed', () => {
    PaginationComponent = shallow(<Pagination>Test</Pagination>);
    expect(PaginationComponent.html()).not.toBe(null);
  });
});
