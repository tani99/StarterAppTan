/**
 * Animation Utilities
 * 
 * Centralized animation constants and helper functions
 */

import { Animated, Easing } from "react-native"

/**
 * Animation durations in milliseconds
 */
export const AnimationDuration = {
  fast: 150,
  normal: 250,
  slow: 350,
  verySlow: 500,
} as const

/**
 * Easing functions
 */
export const AnimationEasing = {
  default: Easing.bezier(0.25, 0.1, 0.25, 1),
  easeIn: Easing.in(Easing.ease),
  easeOut: Easing.out(Easing.ease),
  easeInOut: Easing.inOut(Easing.ease),
  spring: Easing.elastic(1),
} as const

/**
 * Scale values for press animations
 */
export const AnimationScale = {
  pressDown: 0.95,
  pressUp: 1,
  bounce: 1.05,
} as const

/**
 * Fade animation helper
 */
export function fadeIn(
  animatedValue: Animated.Value,
  duration: number = AnimationDuration.normal,
  callback?: () => void
) {
  Animated.timing(animatedValue, {
    toValue: 1,
    duration,
    easing: AnimationEasing.easeOut,
    useNativeDriver: true,
  }).start(callback)
}

export function fadeOut(
  animatedValue: Animated.Value,
  duration: number = AnimationDuration.normal,
  callback?: () => void
) {
  Animated.timing(animatedValue, {
    toValue: 0,
    duration,
    easing: AnimationEasing.easeIn,
    useNativeDriver: true,
  }).start(callback)
}

/**
 * Slide animation helper
 */
export function slideIn(
  animatedValue: Animated.Value,
  toValue: number = 0,
  duration: number = AnimationDuration.normal,
  callback?: () => void
) {
  Animated.timing(animatedValue, {
    toValue,
    duration,
    easing: AnimationEasing.easeOut,
    useNativeDriver: true,
  }).start(callback)
}

export function slideOut(
  animatedValue: Animated.Value,
  toValue: number,
  duration: number = AnimationDuration.normal,
  callback?: () => void
) {
  Animated.timing(animatedValue, {
    toValue,
    duration,
    easing: AnimationEasing.easeIn,
    useNativeDriver: true,
  }).start(callback)
}

/**
 * Scale animation helper
 */
export function scaleIn(
  animatedValue: Animated.Value,
  toValue: number = 1,
  duration: number = AnimationDuration.fast,
  callback?: () => void
) {
  Animated.spring(animatedValue, {
    toValue,
    friction: 5,
    tension: 100,
    useNativeDriver: true,
  }).start(callback)
}

/**
 * Bounce animation helper
 */
export function bounceAnimation(
  animatedValue: Animated.Value,
  callback?: () => void
) {
  Animated.sequence([
    Animated.timing(animatedValue, {
      toValue: AnimationScale.bounce,
      duration: AnimationDuration.fast,
      easing: AnimationEasing.easeOut,
      useNativeDriver: true,
    }),
    Animated.timing(animatedValue, {
      toValue: AnimationScale.pressUp,
      duration: AnimationDuration.fast,
      easing: AnimationEasing.easeIn,
      useNativeDriver: true,
    }),
  ]).start(callback)
}

/**
 * Pulse animation (for loading states)
 */
export function pulseAnimation(
  animatedValue: Animated.Value,
  minOpacity: number = 0.3,
  maxOpacity: number = 1,
  duration: number = AnimationDuration.slow
) {
  return Animated.loop(
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: maxOpacity,
        duration,
        easing: AnimationEasing.easeInOut,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: minOpacity,
        duration,
        easing: AnimationEasing.easeInOut,
        useNativeDriver: true,
      }),
    ])
  )
}

/**
 * Shake animation (for errors)
 */
export function shakeAnimation(
  animatedValue: Animated.Value,
  callback?: () => void
) {
  Animated.sequence([
    Animated.timing(animatedValue, {
      toValue: 10,
      duration: 50,
      useNativeDriver: true,
    }),
    Animated.timing(animatedValue, {
      toValue: -10,
      duration: 50,
      useNativeDriver: true,
    }),
    Animated.timing(animatedValue, {
      toValue: 10,
      duration: 50,
      useNativeDriver: true,
    }),
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }),
  ]).start(callback)
}

/**
 * Stagger animation helper
 * Animates multiple items with a delay between each
 */
export function staggerAnimation(
  animatedValues: Animated.Value[],
  staggerDelay: number = 100,
  callback?: () => void
) {
  const animations = animatedValues.map((value, index) =>
    Animated.timing(value, {
      toValue: 1,
      duration: AnimationDuration.normal,
      delay: index * staggerDelay,
      easing: AnimationEasing.easeOut,
      useNativeDriver: true,
    })
  )

  Animated.parallel(animations).start(callback)
}
