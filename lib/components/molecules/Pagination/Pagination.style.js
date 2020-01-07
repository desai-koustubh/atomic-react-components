import { css } from 'styled-components';

export default css`
/*${props => (props.variation === `primary` ? `${props.theme.colors.CTA_PRIMARY};` : ``)};
  ${props => (props.variation === `secondary` ? `${props.theme.colors.CTA_SECONDARY};` : ``)};
  ${props => (props.variation === `tertiary` ? `${props.theme.colors.CTA_TERTIARY};` : ``)};*/
  ${props => props.theme.colors.CTA_PRIMARY}
  ${props => props.theme.typography.FONT_DEFAULT}
  min-width:500px;
  padding:5px;
  .inline{display:inline;}
  .align-right{float:right;clear:both;}
  .align-left{padding-right:20px;}
  .select-box{margin:0 5px;}

  ${props => props.inheritedStyles ? props.inheritedStyles : ''};
`;
