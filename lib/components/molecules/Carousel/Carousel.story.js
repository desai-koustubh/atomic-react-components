import React from 'react';
import { storiesOf } from '@storybook/react';

import defaultConfig from './Carousel.mock';
import Image from '../../atoms/Image';
import image1 from '../../../static/images/dummies/1280.png';
import image2 from '../../../static/images/dummies/960.png';
import image3 from '../../../static/images/dummies/640.png';
import image4 from '../../../static/images/dummies/320.png';
import Icon from '../../atoms/Icon';

// Import Styled Component to showcase variations
import Carousel, { CarouselVanilla } from '.';

storiesOf('Molecules/Carousel', module)
  .addParameters({ jest: ['Carousel', 'CarouselVanilla'] })
  .add('Carousel Vanilla', () => (
    <CarouselVanilla {...defaultConfig}>
      <CarouselVanilla.SlideWrapper>
        <CarouselVanilla.Slide>
          <Image src={image1} alt="1.jpg" />
        </CarouselVanilla.Slide>
        <CarouselVanilla.Slide>
          <Image src={image2} alt="2.jpg" />
        </CarouselVanilla.Slide>
        <CarouselVanilla.Slide>
          <Image src={image3} alt="3.jpg" />
        </CarouselVanilla.Slide>
        <CarouselVanilla.Slide>
          <Image src={image4} alt="4.jpg" />
        </CarouselVanilla.Slide>
      </CarouselVanilla.SlideWrapper>
      <CarouselVanilla.Controls />
    </CarouselVanilla>
  ))
  .add('Carousel', () => (
    <Carousel {...defaultConfig}>
      <Carousel.Prev>
        <Icon id="leftArrow" />
      </Carousel.Prev>
      <Carousel.SlideWrapper className="fade">
        <Carousel.Slide>
          <Image src={image1} alt="1280 x 1280" />
        </Carousel.Slide>
        <Carousel.Slide>
          <Image src={image2} alt="960 x 960" />
        </Carousel.Slide>
        <Carousel.Slide>
          <Image src={image3} alt="640 x 640" />
        </Carousel.Slide>
        <Carousel.Slide>
          <Image src={image4} alt="320 x 320" />
        </Carousel.Slide>
      </Carousel.SlideWrapper>
      <Carousel.Dots />
      <Carousel.Next>
        <Icon id="rightArrow" />
      </Carousel.Next>
      <Carousel.AnimationController />
    </Carousel>
  ));
