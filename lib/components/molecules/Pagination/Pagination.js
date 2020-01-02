// @flow

import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import classnames from 'classnames';
import { getDisplayName } from '../../../core/utils/getDisplayName';
import styles from './Pagination.style';
//import type { Props } from './types';
type Props = {
  children:Array | string
}
const Pagination = (props: Props): Node => {
  return <div>Hi</div>;
};
Pagination.defaultProps = {
  children: '',
};
export default styled(Pagination)`
  ${styles};
`;
export { Pagination as PaginationVanilla };
