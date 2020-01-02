// @flow

import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import classnames from 'classnames';
import { getDisplayName } from '../../../core/utils/getDisplayName';
import styles from './Pagination.style';

type Props = {
  size:number,
  render:Function,
  items:Array
}
const Pagination = ({size,className,render,items,...others}: Props): Node => {
  const [currentPage,setCurrentPage] = useState(1);
  const rowsPerPage = parseInt(size,10);
  const start = (currentPage - 1)*rowsPerPage;
  const end = start+rowsPerPage;
  const activeRows = items.slice(start,end);
  const pageLength = Math.ceil(items.length/rowsPerPage);
  const buttons = Array(pageLength)
                  .fill('')
                  .map((_,i)=><button key={i} onClick={()=>setCurrentPage(i+1)}>Page {i+1}</button>);
  
  return <div>
    {render({rows:activeRows})}
    <div>{buttons}</div>
  </div>;
};
Pagination.defaultProps = {
  items:[],
  size:5
};
export default styled(Pagination)`
  ${styles};
`;
export { Pagination as PaginationVanilla };
