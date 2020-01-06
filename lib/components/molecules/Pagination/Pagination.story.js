import React, {useState, useEffect} from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import defaultConfig from './Pagination.mock';

// Import Styled Component to showcase variations
import Pagination, { PaginationVanilla } from '.';
import {
  withKnobs,
  array,
  boolean,
  number,
  text,
} from '@storybook/addon-knobs';
 
const comp = props=> {
  const {rows} = props;
  return <table>
  <thead>
    <tr><th>First Name</th><th>Last Name</th></tr>
  </thead>
  <tbody>
    {rows.map(row=><tr><td key={row.id}>{row.first_name}</td><td>{row.last_name}</td></tr>)}
  </tbody>
</table>
}
const props = () =>({
  itemsPerPage:array('items per page (sizes)',[2,3,4,5]),
  size:number('size',3),
  showPages:boolean('Show Pages?',false),
  showFirstAndLastButton:boolean('Show First and Last Buttons?',false),
  showNextAndPrevButton:boolean('Show Next and Prev Buttons?',false),
  renderRows:comp,
  items:defaultConfig,
  onChange: action('onChange')
})
storiesOf('Molecules/Pagination', module)
  .addDecorator(withKnobs)
  .addDecorator(story => <div className="kiko">{story()}</div>)
  .addParameters({ jest: ['Pagination', 'PaginationVanilla'] })
  
  .add('Pagination', () => 
  <table>
    <Pagination {...props()}/>
</table>);
