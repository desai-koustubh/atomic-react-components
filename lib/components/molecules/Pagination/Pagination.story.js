import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import defaultConfig from './Pagination.mock';

// Import Styled Component to showcase variations
import Pagination, { PaginationVanilla } from '.';

const Pag = styled(Pagination)`
  border-radius: 2px;
`;
storiesOf('Molecules/Pagination', module)
  .addParameters({ jest: ['Pagination', 'PaginationVanilla'] })
  .add('Pagination', () => <Pag inheritedStyles={{ background: 'grey' }}>heyo</Pag>);
// .add('Pagination', () => Pagination(()=><div>Hiya</div>)({kiko:'mimo'}));
