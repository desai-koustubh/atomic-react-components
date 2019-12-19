import { css, keyframes } from 'styled-components';

const fadeKeyFrame = keyframes`
  0% {opacity: 0;}
  100% {opacity: 100%;}
`;

export default css`
  display: flex;
  flex-direction: column;

  .carousel-section {
    display: flex;
    width: ${props => props.width};
    height: ${props => props.height};
  }

  .slide {
    flex: 0 0 100%;
    display: none;

    &.active {
      display: block;
    }
  }

  .carousel-dots {
    ul {
      display: flex;
      justify-content: center;
    }
  }

  .fade {
    .active {
      animation: ${fadeKeyFrame} ${props => props.slideAnimationTime / 1000}s linear;
    }
  }

  .dots {
    border-radius: 50%;
    text-indent: -1000px;
    overflow: hidden;
    width: 10px;
    height: 10px;
    padding: 0;
    min-height: initial;
    margin: ${props => props.theme.spacing.UNIT_1};
  }

  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;
