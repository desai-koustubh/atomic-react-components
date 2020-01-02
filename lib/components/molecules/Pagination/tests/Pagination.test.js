import React from 'react';
import { shallow, render, mount } from 'enzyme';
import styled, { css } from 'styled-components';

import expectExport from 'expect';
import { shallowEqual } from 'recompose';
import Pagination, { PaginationVanilla } from '../index';

const alwaysFalse = () => {expect(1).toEqual(0)};
describe('<Pagination />', () => {
  let PaginationComponent = '';
  beforeEach(() => {
    PaginationComponent = shallow(<Pagination>Test</Pagination>);
  });
  it('should take inherited styles', () => {
    PaginationComponent = shallow(<Pagination styles={{ background:"#00ff00"}}>Test</Pagination>);
    expect(PaginationComponent.html()).not.toBe(null);
  });
  it('should accept an array',alwaysFalse);
  it('should not show any buttons if page size is 1',alwaysFalse);
  it('should show buttons when pages are more than 1',alwaysFalse);
  it('should contain a next button',alwaysFalse);
  it('should contain a previous button',alwaysFalse);
  it('should contain a Goto Last page button',alwaysFalse);
  it('should contain a goto 1st page button',alwaysFalse);
  it('should contain a max-pages property',alwaysFalse);
  it('should contain a min-page propery',alwaysFalse);
  it('goto first page button should be displayed if page size is more than 5',alwaysFalse);
  it('goto last page button should be displayed if page size is greater than max-pages',alwaysFalse);
  it('should contain a smartPaginate flag',alwaysFalse);
});
