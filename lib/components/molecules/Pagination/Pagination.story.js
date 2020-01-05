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
  showPages:boolean('showPages: Boolean',false),
  render:comp,
  items:defaultConfig.slice(0,10),
  size:number('size of items per page',4),
  onChange: action('onChange'),
})
storiesOf('Molecules/Pagination', module)
  .addDecorator(withKnobs)
  .addDecorator(story => <div className="kiko">{story()}</div>)
  .addParameters({ jest: ['Pagination', 'PaginationVanilla'] })
  
  .add('Pagination', () => 
  <table>
    <Pagination {...props()}/>
</table>);
