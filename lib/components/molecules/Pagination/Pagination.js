// @flow

import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import classnames from 'classnames';
import { getDisplayName } from '../../../core/utils/getDisplayName';
import styles from './Pagination.style';
import { noop } from '@babel/types';
import Button from '../../atoms/Button';
import List from '../List';
import Para from '../../atoms/Para'

type Props = {
  size:number,
  render:Function,
  items:Array,
  showFirstAndLastButton?:Boolean,
  showNextAndPrevButton?:Boolean,
  showPages?:Boolean,
  minPageButtonsToShow?:number,
  maxPageButtonsToShow?:number,
  labelForWordPage?:String,
  labelForWordOf?:String,
  labeForWordPrevious?:string,
  labeForWordNext:string
}
const Pagination = ({size,className,render,items,...others}: Props): Node => {
  const [page,of] = [others.labelForWordPage,others.labelForWordOf];
  const [currentPage,setCurrentPage] = useState(1);
  const rowsPerPage = parseInt(size,10);
  const start = (currentPage - 1)*rowsPerPage;
  const end = start+rowsPerPage;
  const activeRows = items.slice(start,end);
  const noOfPages = Math.ceil(items.length/rowsPerPage);
  const buttons = Array(noOfPages)
                  .fill('')
                  .map((_,i)=><li><Button key={i} onClick={()=>setCurrentPage(i+1)}>{others.labelForWordPage} {i+1}</Button></li>);
  
  return <div>
    {render({rows:activeRows})}
    {others.showFirstAndLastButton && <Button disabled={currentPage==1} onClick={()=>setCurrentPage(1)}>Yo goto first</Button>}
    {others.showNextAndPrevButton && <Button  disabled={currentPage==1} onClick={()=>setCurrentPage(currentPage-1)}>Yo prev btn</Button>}
    <Para style={{display:"inline"}}>Showing Page {currentPage} of {noOfPages}</Para>
    {(others.showPages) && <List ListType="ul" inline={true}>{buttons}</List>}
    {others.showNextAndPrevButton && <Button disabled={currentPage==noOfPages} onClick={()=>setCurrentPage(currentPage+1)}>Yo next btn</Button>}
    {others.showFirstAndLastButton && <Button  disabled={currentPage==noOfPages} onClick={()=>setCurrentPage(noOfPages)}>Yo goto last</Button>}
  </div>;
};
Pagination.defaultProps = {
  size:5,
  render:noop,
  items:[],
  showFirstAndLastButton:true,
  showNextAndPrevButton:true,
  showPages:false,
  minPageButtonsToShow:-Infinity,
  maxPageButtonsToShow:Infinity,
  labelForWordPage:'Page',
  labelForWordOf:'of',
  labeForWordPrevious:'Previous',
  labeForWordNext:'Next'
};
export default styled(Pagination)`
  ${styles};
`;
export { Pagination as PaginationVanilla };
