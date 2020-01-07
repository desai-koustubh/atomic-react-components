// @flow

import React, { useState, useEffect, useLayoutEffect } from 'react';

import styled from 'styled-components';
import classnames from 'classnames';
import styles from './Pagination.style';
import { noop } from '@babel/types';
import Button from '../../atoms/Button';
import List from '../List';
import Para from '../../atoms/Para'
import Select from '../../atoms/Select';
import Label from '../../atoms/Label'

//This function is used to get the start and end indexes based on currentPage and pageSize
const getStartAndEndIndex=(currentPage,pageSize)=>{
  const rowsPerPage = parseInt(pageSize,10);
  const start = (currentPage - 1)*rowsPerPage;
  const end = start + rowsPerPage;
  return [start,end];
};
const getNoOfPages=(items,pageSize)=>Math.ceil(items.length/pageSize);
const getNumberArray=num=>new Array(num).fill('').map((_,i)=>i+1);
const ButtonCTA = ({disabled,clickHandler,args,text})=> <Button disabled={disabled} onClick={()=>clickHandler(args)}>{text}</Button>
const SelectCTA = (preText,postText,options,value,onChangeHandler,classes="")=>
<div className={classnames('inline',classes)}>
  <Label for="">{preText}
    <Select 
      id="" 
      options={options} 
      value={value} 
      onChange={(e)=>onChangeHandler(e.target.value)}
      className="select-box"/>
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
  labeForWordNext?:string,
  labelForWordShowing?:string,
  labelForWordFirst?:string,
  labelForWordLast?:string,
  labelForPhraseItemsPerPage?:string
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
  labelForWordShowing,
  labelForWordFirst,
  labelForWordLast,
  labelForPhraseItemsPerPage,
  ...others}: Props): Node => {

  const [page,of] = [others.labelForWordPage,others.labelForWordOf];
  const [currentPage,setCurrentPage] = useState(1);
  const [pageSize,setPageSize] = useState(itemsPerPage[0]);
  const [start,end] = getStartAndEndIndex(currentPage,pageSize);
  const activeRows = items.slice(start,end);
  const [noOfPages,setNoOfPages] = useState(getNoOfPages(items,pageSize));
  const [numberArray, setNumberArray] = useState(getNumberArray(noOfPages));

  /*This function is called when rows per page are changed. It does the following
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
    <div className={classnames('paginationRibbon', className)}>
    {SelectCTA(labelForPhraseItemsPerPage,"",itemsPerPage,pageSize,setPageSize,"align-left")}
    
    {showFirstAndLastButton && ButtonCTA({disabled:currentPage==1,clickHandler:setCurrentPage,args:1,text:labelForWordFirst})}
    {showNextAndPrevButton && ButtonCTA({disabled:currentPage==1,clickHandler:setCurrentPage,args:currentPage-1,text:labeForWordPrevious})}
       
    {showNextAndPrevButton && ButtonCTA({disabled:currentPage==noOfPages,clickHandler:setCurrentPage,args:currentPage+1,text:labeForWordNext})}
    {showFirstAndLastButton && ButtonCTA({disabled:currentPage==noOfPages,clickHandler:setCurrentPage,args:noOfPages,text:labelForWordLast})}
<Para className="inline"><span className="sr-only">{labelForWordShowing}</span>{start+1}-{end} {labelForWordOf} {items.length}</Para>
    {SelectCTA(labelForWordPage,`${labelForWordOf} ${noOfPages}`,numberArray,currentPage,setCurrentPage,"align-right")}
    </div>
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
  labeForWordNext:'Next',
  labelForWordShowing:'Showing',
  labelForWordFirst:'First',
  labelForWordLast:'Last',
  labelForPhraseItemsPerPage:'Items per page',
};
export default styled(Pagination)`
  ${styles};
`;
export { Pagination as PaginationVanilla };
export {getNoOfPages,getNumberArray,getStartAndEndIndex,ButtonCTA,SelectCTA};
