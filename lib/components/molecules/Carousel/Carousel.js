// @flow
/**
 * Carousel
 */
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

import stylesCarousel from './Carousel.style';
import {
  CarouselProps,
  AnimationProps,
  GetListProps,
  SlideWrapperProps,
  SlideProps,
  NavControllerProps,
} from './types';
import List from '../List';
import Button from '../../atoms/Button';
import useInterval from './useInterval.hook';
import CarouselContext from './CarouselContext';

/**
 * Rendering carousel dots
 *
 * @return HTML
 *   Wrapper with UL | OL
 */
const GetList = ({ btnType, thumbnails }: GetListProps): Node => {
  const { slideIndex, setSlideIndex, slides } = useContext(CarouselContext);
  const allSlides = [];

  for (let id = 0; id < slides.length; id += 1) {
    allSlides.push(
      <li key={id} className={classnames('item', { active: id === slideIndex })}>
        <Button onClick={() => setSlideIndex(id)} className={classnames('icon', btnType)}>
          {thumbnails[id] || id + 1}
        </Button>
      </li>
    );
  }

  return allSlides;
};

/**
 * ListWrapper for dots.
 */
const ListWrapper = ({ ...props }) => {
  return (
    <List>
      <GetList {...props} />
    </List>
  );
};

/**
 * Increase the slide count.
 *
 * @param {Number} type
 *   Type of navigation control.
 * @param {Number} setIndex
 *   Increase the count of slide.
 * @param {Number} currentIndex
 *   Show current active slide number.
 */
const handleNavController = (type, setIndex, currentIndex) => {
  setIndex(type === 'next' ? currentIndex + 1 : currentIndex - 1);
};

/**
 * Increase slide count on key press over next navigation button.
 *
 * @param {Object} e
 *   event parameter
 * @param {function} setIndex
 *   increase the slide index.
 * @param {Number} currentIndex
 *   Show current active slide number.
 */
const handleKeyPress = (e, setIndex, currentIndex) => {
  if (e.key === 'ArrowRight') {
    handleNavController('next', setIndex, currentIndex);
  } else if (e.key === 'ArrowLeft') {
    handleNavController('prev', setIndex, currentIndex);
  }

  return null;
};

/**
 * Provides HTML for navigation button.
 *
 * @param {Object} type
 *   type of navigation controller.
 */
const NavController = ({ type, children, ...others }: NavControllerProps): Node => {
  const { setSlideIndex, slideIndex, slides } = useContext(CarouselContext);

  return (
    <div className={classnames('nav-action', type)} {...others}>
      <Button
        onClick={() => handleNavController(type, setSlideIndex, slideIndex)}
        onKeyUp={e => handleKeyPress(e, setSlideIndex, slideIndex)}
        disabled={type === 'next' ? slideIndex === slides.length - 1 : slideIndex === 0}
        aria-disabled={type === 'next' ? slideIndex === slides.length - 1 : slideIndex === 0}
      >
        {children || type}
      </Button>
    </div>
  );
};

/**
 * Aria Live Update for Accessibility.
 *
 * @param {Number} slideIndex
 *   Active slide number.
 * @param {Number} slides
 *   All slides.
 */
const AriaLiveUpdate = () => {
  const { slideIndex, slides } = useContext(CarouselContext);

  return (
    <div className="hidden" aria-live="polite" aria-atomic="true" tabIndex="-1">
      {`Item ${slideIndex + 1} of ${slides.length}`}
    </div>
  );
};

/**
 * Carousel Controls.
 */
const CarouselControls = ({ ...props }) => {
  return (
    <div className="carousel-controls">
      <NavController type="next" />
      <NavController type="prev" />
      <AriaLiveUpdate />
      <Animation {...props} />
    </div>
  );
};

/**
 * Play and Pause icon to handle slide animation.
 */
const Animation = ({ className, playLabel, pauseLabel }: AnimationProps): Node => {
  const { setAnimationRunning, isAnimationRunning } = useContext(CarouselContext);

  const handleAnimation = () => {
    setAnimationRunning(!isAnimationRunning);
  };

  return (
    <div className={classnames('animation-panel', className)} aria-label="animation-controller">
      <Button onClick={handleAnimation}>{isAnimationRunning ? pauseLabel : playLabel}</Button>
    </div>
  );
};

/**
 * Carousel Main Element.
 *
 * @param {Element} children
 *   Wraps all tha carousel elements.
 *
 * @return Carousel.
 */
const Carousel = ({
  children,
  className,
  controls,
  autoplay,
  slideTransitionTime,
  slideAnimationTime,
  ...others
}: CarouselProps): Node => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [slides, setSlidesContent] = useState([]);
  const [isAnimationRunning, setAnimationRunning] = useState(autoplay);

  useInterval(
    () => {
      const currentIndex = slideIndex !== slides.length - 1 ? slideIndex : -1;
      setSlideIndex(currentIndex + 1);
    },
    isAnimationRunning ? slideTransitionTime : null
  );

  const value = {
    slides,
    slideIndex,
    setSlideIndex,
    setSlidesContent,
    isAnimationRunning,
    setAnimationRunning,
  };

  return (
    <section className={classnames('carousel-wrapper', className)} {...others}>
      <CarouselContext.Provider value={value}>
        {children}
        {controls && <CarouselControls />}
      </CarouselContext.Provider>
    </section>
  );
};

/**
 * Slide Wrapper.
 *
 * @param {Array} children
 *   Wraps all the slides.
 *
 * @return All slides in single wrapper.
 */
Carousel.SlideWrapper = ({ children, className, ...others }: SlideWrapperProps): Node => {
  const { isAnimationRunning, setAnimationRunning, setSlidesContent } = useContext(CarouselContext);
  let currentAnimationStatus = true;
  setSlidesContent(children);

  const handleMouseEnter = () => {
    if (isAnimationRunning) {
      currentAnimationStatus = true;
      setAnimationRunning(!currentAnimationStatus);
    } else {
      currentAnimationStatus = false;
    }
  };

  const handleMouseLeave = () => {
    if (currentAnimationStatus) {
      currentAnimationStatus = false;
      setAnimationRunning(!currentAnimationStatus);
    }

    return null;
  };

  return (
    <div
      className={classnames('carousel-section', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...others}
    >
      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child, { id: index });
      })}
    </div>
  );
};

/**
 * Slide Container.
 *
 * @param {Element} children
 *   Will wraps the slide content.
 *
 * @return Single slide with wrapper.
 */
Carousel.Slide = ({ children, id, className }: SlideProps): Node => {
  const { slideIndex } = useContext(CarouselContext);

  return (
    <div className={classnames('slide', { active: id === slideIndex }, className)}>{children}</div>
  );
};

/**
 * Dots Navigation.
 *
 * @param {Element} children
 *   Will wraps the slide content.
 *
 * @return Single slide with wrapper.
 */
Carousel.Dots = ({ className, btnType, thumbnails }: GetListProps): Node => {
  return (
    <div className={classnames('carousel-dots', className)}>
      <ListWrapper btnType={btnType} thumbnails={thumbnails} />
    </div>
  );
};

/**
 * Next Navigation.
 */
Carousel.Next = ({ ...props }) => <NavController type="next" {...props} />;

/**
 * Previous Navigation.
 */
Carousel.Prev = ({ ...props }) => <NavController type="prev" {...props} />;

/**
 * Animation Play/Pause Button.
 */
Carousel.AnimationController = ({ ...props }) => <Animation {...props} />;

/**
 * Carousel Controls
 */
Carousel.Controls = ({ ...props }) => <CarouselControls {...props} />;

Animation.defaultProps = {
  playLabel: 'play',
  pauseLabel: 'pause',
};

Carousel.Dots.defaultProps = {
  thumbnails: [],
};

Carousel.defaultProps = {
  controls: false,
  autoplay: false,
  slideTransitionTime: 3000,
};

Carousel.Slide.displayName = 'Slide';
Carousel.Dots.displayName = 'Dots';

export default styled(Carousel)`
  ${stylesCarousel};
`;

export { Carousel as CarouselVanilla };
