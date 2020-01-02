import React, {useState, useEffect} from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import defaultConfig from './Pagination.mock';

// Import Styled Component to showcase variations
import Pagination, { PaginationVanilla } from '.';

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
storiesOf('Molecules/Pagination', module)
  .addParameters({ jest: ['Pagination', 'PaginationVanilla'] })
  .add('Pagination', () => 
  <table>
    <Pagination 
      render={comp} 
      items={defaultConfig.slice(0,10)}
      size="3"
    ></Pagination>
</table>);
// .add('Pagination', () => Pagination(()=><div>Hiya</div>)({kiko:'mimo'}));
