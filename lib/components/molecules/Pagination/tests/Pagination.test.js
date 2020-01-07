import React from 'react';
import { shallow, render, mount } from 'enzyme';
import styled, { css } from 'styled-components';

import expectExport from 'expect';
import { shallowEqual } from 'recompose';
import Pagination, { PaginationVanilla } from '../index';
import {getNoOfPages,getNumberArray,getStartAndEndIndex,ButtonCTA,SelectCTA} from '../Pagination';
const alwaysFalse = () => {expect(1).toEqual(0)};
describe('<Pagination />', () => {
  let PaginationComponent = '';
  beforeEach(() => {
    PaginationComponent = shallow(<Pagination>Test</Pagination>);
  });
  it('should take inherited styles', () => {
    PaginationComponent = shallow(<Pagination>Test</Pagination>);
    expect(PaginationComponent.html()).not.toBe(null);
  });
  it('getNoOfPages should calculate number of pages from array and page size',()=>{
    const arr = [1,2,3,4,5,6,7];
    expect(getNoOfPages(arr,1)).toEqual(7);
    expect(getNoOfPages(arr,2)).toEqual(4);
  });
  it('getStartAndEndIndex return the start and end index of row',()=>{
    let currentPage = 5;
    let pageSize = 20;
    let [start,end] = getStartAndEndIndex(currentPage,pageSize);
    expect(start).toBe(80);
    expect(end).toBe(100);
    // currentPage = 3;
    // pageSize = 4;
    // [start,end] = getStartAndEndIndex(currentPage,page);
    // expect(start).toBe(8);
    // expect(end).toBe(13);
  })
  it('getNumberArray should return an array from number',()=>{
    expect(getNumberArray(4).toString()).toBe([1,2,3,4].toString());
    expect(getNumberArray(3).toString()).toBe([1,2,3].toString());
  });
  it('ButtonCTA should return a Button',()=>{
    let button = ButtonCTA({disabled:true, clickHandler:()=>{},args:'',text:''});
    expect(button).toBeTruthy();
  })
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
