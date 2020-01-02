import { css } from 'styled-components';

export default css`
  ${props => {
    console.log('wAJA', props.inheritedStyles);
    const k = props.inheritedStyles ? props.inheritedStyles : '';
    return k;
  }};
`;
