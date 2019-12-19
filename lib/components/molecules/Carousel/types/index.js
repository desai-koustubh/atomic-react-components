// @flow
import type { Node } from 'react';

export type CarouselProps = {
  children: Node,
  slideTransitionTime?: Number,
  slideAnimationTime?: Number,
  autoplay?: Boolean,
  controls?: Boolean,
};

export type SlideWrapperProps = {
  children: Node,
  className?: String,
};

export type SlideProps = {
  children: Node,
  className?: String,
};

export type AnimationProps = {
  children?: Node,
  className?: String,
  onPlay?: Function,
  onPause?: Function,
  playLabel?: any,
  pauseLabel?: any,
};

export type NavControllerProps = {
  children?: Node,
  className?: String,
  type: String,
};

export type GetListProps = {
  btnType?: String,
};

export type NextController = {
  btnType?: String,
};

export type PrevController = {
  btnType?: String,
};
