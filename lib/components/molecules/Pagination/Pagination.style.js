import { css } from 'styled-components';

export default css`
/*${props => (props.variation === `primary` ? `${props.theme.colors.CTA_PRIMARY};` : ``)};
  ${props => (props.variation === `secondary` ? `${props.theme.colors.CTA_SECONDARY};` : ``)};
  ${props => (props.variation === `tertiary` ? `${props.theme.colors.CTA_TERTIARY};` : ``)};*/
  ${props => props.theme.colors.CTA_PRIMARY}
  ${props => props.theme.typography.FONT_DEFAULT}
  
  padding:5px;
  .inline{display:inline;}
  .align-right{margin-left:20px;}
  .align-left{padding-right:20px;}
  .select-box{margin:0 5px;}
    @media (min-width: 320px) {
      
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .align-left{padding-right:5px;}
      .align-right{}
    }
  ${props => props.inheritedStyles ? props.inheritedStyles : ''};
`;
