/**
 * Skeleton Component
 * 
 * Animated shimmer/pulse effect placeholder for loading states
 */

import React, { useEffect, useRef } from "react"
import {
  View,
  Animated,
  StyleSheet,
  ViewStyle,
  Easing,
} from "react-native"
import { colors, borderRadius, spacing } from "../theme"

export type SkeletonVariant = "text" | "circle" | "rectangle"

export interface SkeletonProps {
  /**
   * Variant of the skeleton
   * @default "text"
   */
  variant?: SkeletonVariant

  /**
   * Width of the skeleton
   */
  width?: number | string

  /**
   * Height of the skeleton
   */
  height?: number

  /**
   * Border radius (only for rectangle variant)
   */
  borderRadius?: number

  /**
   * Custom style
   */
  style?: ViewStyle

  /**
   * Animation type
   * @default "pulse"
   */
  animation?: "pulse" | "wave"
}

export function Skeleton({
  variant = "text",
  width,
  height,
  borderRadius: customBorderRadius,
  style,
  animation = "pulse",
}: SkeletonProps) {
  const animatedValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const animate = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ])
      ).start()
    }

    animate()
  }, [animatedValue])

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  })

  // Determine dimensions and border radius based on variant
  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case "text":
        return {
          width: width || "100%",
          height: height || 16,
          borderRadius: borderRadius.sm,
        } as ViewStyle
      case "circle":
        const circleSize = typeof width === "number" ? width : height || 40
        return {
          width: circleSize,
          height: circleSize,
          borderRadius: circleSize / 2,
        } as ViewStyle
      case "rectangle":
        return {
          width: width || "100%",
          height: height || 100,
          borderRadius: customBorderRadius ?? borderRadius.md,
        } as ViewStyle
      default:
        return {}
    }
  }

  return (
    <Animated.View
      style={[
        styles.skeleton,
        getVariantStyle(),
        { opacity },
        style,
      ]}
    />
  )
}

/**
 * SkeletonText Component
 * Multiple lines of text skeleton
 */
export interface SkeletonTextProps {
  /**
   * Number of lines
   * @default 3
   */
  lines?: number

  /**
   * Width of the last line (percentage of full width)
   * @default 60
   */
  lastLineWidth?: number

  /**
   * Spacing between lines
   */
  spacing?: number

  /**
   * Custom style for container
   */
  style?: ViewStyle
}

export function SkeletonText({
  lines = 3,
  lastLineWidth = 60,
  spacing: customSpacing = spacing.xs,
  style,
}: SkeletonTextProps) {
  return (
    <View style={style}>
      {Array.from({ length: lines }).map((_, index) => {
        const isLastLine = index === lines - 1
        return (
          <Skeleton
            key={index}
            variant="text"
            width={isLastLine ? `${lastLineWidth}%` : "100%"}
            style={{ marginBottom: index < lines - 1 ? customSpacing : 0 }}
          />
        )
      })}
    </View>
  )
}

/**
 * SkeletonCard Component
 * Complete card skeleton with avatar, title, and description
 */
export interface SkeletonCardProps {
  /**
   * Whether to show avatar
   * @default true
   */
  showAvatar?: boolean

  /**
   * Custom style for container
   */
  style?: ViewStyle
}

export function SkeletonCard({ showAvatar = true, style }: SkeletonCardProps) {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.cardHeader}>
        {showAvatar && (
          <Skeleton variant="circle" width={40} style={styles.avatar} />
        )}
        <View style={styles.cardHeaderText}>
          <Skeleton variant="text" height={16} width="60%" />
          <Skeleton
            variant="text"
            height={12}
            width="40%"
            style={{ marginTop: spacing.xs }}
          />
        </View>
      </View>
      <Skeleton
        variant="rectangle"
        height={120}
        style={{ marginTop: spacing.sm }}
      />
      <SkeletonText
        lines={2}
        style={{ marginTop: spacing.sm }}
      />
    </View>
  )
}

/**
 * SkeletonList Component
 * List of skeleton items
 */
export interface SkeletonListProps {
  /**
   * Number of items
   * @default 3
   */
  count?: number

  /**
   * Type of skeleton items
   * @default "card"
   */
  itemType?: "card" | "text"

  /**
   * Custom style for container
   */
  style?: ViewStyle
}

export function SkeletonList({
  count = 3,
  itemType = "card",
  style,
}: SkeletonListProps) {
  return (
    <View style={style}>
      {Array.from({ length: count }).map((_, index) => {
        if (itemType === "card") {
          return <SkeletonCard key={index} />
        }
        return (
          <SkeletonText
            key={index}
            lines={2}
            style={{ marginBottom: spacing.md }}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: colors.neutral[200],
  },
  card: {
    padding: spacing.md,
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    marginRight: spacing.sm,
  },
  cardHeaderText: {
    flex: 1,
  },
})

