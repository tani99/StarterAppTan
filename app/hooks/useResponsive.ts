/**
 * useResponsive Hook
 * 
 * React hook for responsive design that updates on orientation/dimension changes
 */

import { useState, useEffect } from "react"
import { Dimensions, ScaledSize } from "react-native"
import {
  getDeviceType,
  DeviceType,
  isTablet,
  isPhone,
  isLandscape,
  isPortrait,
  getScreenWidth,
  getScreenHeight,
  getOrientation,
} from "../utils/responsive"

export interface ResponsiveInfo {
  deviceType: DeviceType
  isTablet: boolean
  isPhone: boolean
  isLandscape: boolean
  isPortrait: boolean
  width: number
  height: number
  orientation: "portrait" | "landscape"
}

/**
 * Hook to get responsive information with automatic updates
 */
export function useResponsive(): ResponsiveInfo {
  const [dimensions, setDimensions] = useState(() => Dimensions.get("window"))

  useEffect(() => {
    const onChange = ({ window }: { window: ScaledSize }) => {
      setDimensions(window)
    }

    const subscription = Dimensions.addEventListener("change", onChange)

    return () => {
      subscription?.remove()
    }
  }, [])

  return {
    deviceType: getDeviceType(),
    isTablet: isTablet(),
    isPhone: isPhone(),
    isLandscape: isLandscape(),
    isPortrait: isPortrait(),
    width: dimensions.width,
    height: dimensions.height,
    orientation: getOrientation(),
  }
}

/**
 * Hook to get responsive value that updates automatically
 */
export function useResponsiveValue<T>(phoneValue: T, tabletValue: T): T {
  const { isTablet: tablet } = useResponsive()
  return tablet ? tabletValue : phoneValue
}

/**
 * Hook to detect orientation changes
 */
export function useOrientation(): "portrait" | "landscape" {
  const { orientation } = useResponsive()
  return orientation
}

/**
 * Hook to detect if screen is tablet
 */
export function useIsTablet(): boolean {
  const { isTablet: tablet } = useResponsive()
  return tablet
}

/**
 * Hook to get screen dimensions that update on change
 */
export function useScreenDimensions(): { width: number; height: number } {
  const { width, height } = useResponsive()
  return { width, height }
}

