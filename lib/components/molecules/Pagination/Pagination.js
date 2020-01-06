// @flow

import React, { useState, useEffect, useLayoutEffect } from 'react';

import styled from 'styled-components';
import classnames from 'classnames';
import { getDisplayName } from '../../../core/utils/getDisplayName';
import styles from './Pagination.style';
import { noop } from '@babel/types';
import Button from '../../atoms/Button';
import List from '../List';
import Para from '../../atoms/Para'
import Select from '../../atoms/Select';
import Label from '../../atoms/Label'


const getStartAndEndIndex=(currentPage,pageSize)=>{
  const rowsPerPage = parseInt(pageSize,10);
  const start = (currentPage - 1)*rowsPerPage;
  const end = start + rowsPerPage;
  return [start,end];
};
const getNoOfPages=(items,pageSize)=>Math.ceil(items.length/pageSize);
const getNumberArray=num=>new Array(num).fill('').map((_,i)=>i+1);
const ButtonCTA = ({disabled,clickHandler,args,text})=> <Button disabled={disabled} onClick={()=>clickHandler(args)}>{text}</Button>
const SelectCTA = (preText,postText,options,value,onChangeHandler)=>
<div style={{display:"inline"}}>
  <Label for="">{preText}
    <Select 
      id="" 
      options={options} 
      value={value} 
      onChange={(e)=>onChangeHandler(e.target.value)}/>
    {postText}
  </Label>
</div>

type Props = {
  size:Number,
  itemsPerPage:Array,
  renderRows:Function,
  items:Array,
  showFirstAndLastButton?:Boolean,
  showNextAndPrevButton?:Boolean,
  labelForWordPage?:String,
  labelForWordOf?:String,
  labeForWordPrevious?:string,
  labeForWordNext:string
}

const Pagination = ({
  size,
  itemsPerPage,
  className,
  renderRows,
  items,
  showFirstAndLastButton,
  showNextAndPrevButton,
  labeForWordNext,
  labeForWordPrevious,
  labelForWordOf,
  labelForWordPage,
  ...others}: Props): Node => {

  const [page,of] = [others.labelForWordPage,others.labelForWordOf];
  const [currentPage,setCurrentPage] = useState(1);
  const [pageSize,setPageSize] = useState(itemsPerPage[0]);
  const [start,end] = getStartAndEndIndex(currentPage,pageSize);
  const activeRows = items.slice(start,end);
  const [noOfPages,setNoOfPages] = useState(getNoOfPages(items,pageSize));
  const [numberArray, setNumberArray] = useState(getNumberArray(noOfPages));

  /*When rows per page are changed 
    1. change current page to 1
    2. recalculate no of pages
    3. update numberArray as per previous
  */
  useEffect(()=>{
    setCurrentPage(1);
    setNoOfPages(getNoOfPages(items,pageSize));
    setNumberArray(getNumberArray(noOfPages));
  },[pageSize]);
  
  return <div>
    {renderRows({rows:activeRows})}
    {SelectCTA("Items per page","",itemsPerPage,pageSize,setPageSize)}
    
    {showFirstAndLastButton && ButtonCTA({disabled:currentPage==1,clickHandler:setCurrentPage,args:1,text:'First'})}
    {showNextAndPrevButton && ButtonCTA({disabled:currentPage==1,clickHandler:setCurrentPage,args:currentPage-1,text:labeForWordPrevious})}
       
    {showNextAndPrevButton && ButtonCTA({disabled:currentPage==noOfPages,clickHandler:setCurrentPage,args:currentPage+1,text:labeForWordNext})}
    {showFirstAndLastButton && ButtonCTA({disabled:currentPage==noOfPages,clickHandler:setCurrentPage,args:noOfPages,text:'Last'})}
    <Para className="inline">Showing {start+1} to {end} {labelForWordOf} {items.length} items</Para>
    {SelectCTA(labelForWordPage,`${labelForWordOf} ${noOfPages}`,numberArray,currentPage,setCurrentPage)}
    
  </div>;
};
Pagination.defaultProps = {
  size:5,
  itemsPerPage:[5,10,15],
  renderRows:noop,
  items:[],
  showFirstAndLastButton:true,
  showNextAndPrevButton:true,
  labelForWordPage:'Page',
  labelForWordOf:'of',
  labeForWordPrevious:'Previous',
  labeForWordNext:'Next'
};
export default styled(Pagination)`
  ${styles};
`;
export { Pagination as PaginationVanilla };
