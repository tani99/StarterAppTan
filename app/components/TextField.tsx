/**
 * TextField Component
 * 
 * A customizable text input component with label, error states, and icon support
 */

import React, { useState } from "react"
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from "react-native"
import { colors, spacing, typography, borderRadius, borderWidth } from "../theme"

export interface TextFieldProps extends Omit<TextInputProps, "style"> {
  /**
   * Label text displayed above the input
   */
  label?: string

  /**
   * Placeholder text
   */
  placeholder?: string

  /**
   * Current value of the input
   */
  value: string

  /**
   * Callback when the text changes
   */
  onChangeText: (text: string) => void

  /**
   * Error message to display below the input
   */
  error?: string

  /**
   * Helper text to display below the input
   */
  helperText?: string

  /**
   * Whether the field is disabled
   * @default false
   */
  disabled?: boolean

  /**
   * Icon to display on the left side
   */
  leftIcon?: React.ReactNode

  /**
   * Icon to display on the right side
   */
  rightIcon?: React.ReactNode

  /**
   * Whether this is a password field with show/hide toggle
   * @default false
   */
  secureTextEntry?: boolean

  /**
   * Whether to show character counter
   * @default false
   */
  showCharacterCount?: boolean

  /**
   * Maximum character length
   */
  maxLength?: number

  /**
   * Custom container style
   */
  containerStyle?: ViewStyle

  /**
   * Custom input style
   */
  inputStyle?: TextStyle

  /**
   * Custom label style
   */
  labelStyle?: TextStyle
}

export function TextField({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  helperText,
  disabled = false,
  leftIcon,
  rightIcon,
  secureTextEntry = false,
  showCharacterCount = false,
  maxLength,
  containerStyle,
  inputStyle,
  labelStyle,
  ...textInputProps
}: TextFieldProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const hasError = Boolean(error)
  const showPasswordToggle = secureTextEntry
  const isSecureEntry = secureTextEntry && !isPasswordVisible

  // Determine border color based on state
  const getBorderColor = () => {
    if (hasError) return colors.border.error
    if (isFocused) return colors.border.focus
    return colors.border.default
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Label */}
      {label && (
        <Text style={[styles.label, labelStyle, disabled && styles.labelDisabled]}>
          {label}
        </Text>
      )}

      {/* Input Container */}
      <View
        style={[
          styles.inputContainer,
          { borderColor: getBorderColor() },
          disabled && styles.inputContainerDisabled,
        ]}
      >
        {/* Left Icon */}
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

        {/* Text Input */}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.text.tertiary}
          secureTextEntry={isSecureEntry}
          editable={!disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          maxLength={maxLength}
          style={[
            styles.input,
            inputStyle,
            disabled && styles.inputDisabled,
          ]}
          {...textInputProps}
        />

        {/* Right Icon or Password Toggle */}
        {showPasswordToggle ? (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.rightIcon}
            accessibilityLabel={isPasswordVisible ? "Hide password" : "Show password"}
            accessibilityRole="button"
          >
            <Text style={styles.passwordToggleText}>
              {isPasswordVisible ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        ) : rightIcon ? (
          <View style={styles.rightIcon}>{rightIcon}</View>
        ) : null}
      </View>

      {/* Bottom Section: Error/Helper Text and Character Count */}
      {(hasError || helperText || showCharacterCount) && (
        <View style={styles.bottomSection}>
          <View style={styles.messageContainer}>
            {hasError && <Text style={styles.errorText}>{error}</Text>}
            {!hasError && helperText && (
              <Text style={styles.helperText}>{helperText}</Text>
            )}
          </View>
          {showCharacterCount && maxLength && (
            <Text style={styles.characterCount}>
              {value.length}/{maxLength}
            </Text>
          )}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.label,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  labelDisabled: {
    color: colors.text.disabled,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: borderWidth.thin,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background.primary,
    paddingHorizontal: spacing.md,
    minHeight: 48,
  },
  inputContainerDisabled: {
    backgroundColor: colors.background.secondary,
    borderColor: colors.border.light,
  },
  input: {
    ...typography.input,
    flex: 1,
    color: colors.text.primary,
    paddingVertical: spacing.sm,
    textAlignVertical: 'center',
  },
  inputDisabled: {
    color: colors.text.disabled,
  },
  leftIcon: {
    marginRight: spacing.xs,
  },
  rightIcon: {
    marginLeft: spacing.xs,
  },
  passwordToggleText: {
    ...typography.body2Medium,
    color: colors.text.link,
  },
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: spacing.xs,
  },
  messageContainer: {
    flex: 1,
  },
  errorText: {
    ...typography.caption,
    color: colors.text.error,
  },
  helperText: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  characterCount: {
    ...typography.caption,
    color: colors.text.tertiary,
    marginLeft: spacing.xs,
  },
})

