import { ReactNode } from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"

import { Button } from "@/components/Button"
import { LoadingIndicator } from "@/components/LoadingIndicator"
import { Screen, ScreenProps } from "@/components/Screen"
import { Text, TextProps } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

export interface FormScreenProps extends Omit<ScreenProps, "children"> {
  /**
   * The title text to display in the header section.
   */
  title?: string
  /**
   * Optional title text properties for i18n and styling.
   */
  titleProps?: TextProps
  /**
   * The subtitle text to display below the title.
   */
  subtitle?: string
  /**
   * Optional subtitle text properties for i18n and styling.
   */
  subtitleProps?: TextProps
  /**
   * Form content to render (typically form fields).
   */
  children?: ReactNode
  /**
   * Callback function triggered when the form is submitted.
   */
  onSubmit?: () => void | Promise<void>
  /**
   * Text to display on the submit button. Defaults to "Submit".
   */
  submitText?: string
  /**
   * Whether the form is in a loading state (disables submit button).
   */
  isLoading?: boolean
  /**
   * Optional cancel button text. If provided, shows a cancel button.
   */
  cancelText?: string
  /**
   * Callback function triggered when the cancel button is pressed.
   */
  onCancel?: () => void
  /**
   * General error message to display above the form buttons.
   */
  errorMessage?: string
  /**
   * Success message to display above the form buttons.
   */
  successMessage?: string
  /**
   * Optional style override for the header container.
   */
  headerStyle?: StyleProp<ViewStyle>
  /**
   * Optional style override for the form content container.
   */
  formStyle?: StyleProp<ViewStyle>
  /**
   * Optional style override for the button container.
   */
  buttonContainerStyle?: StyleProp<ViewStyle>
  /**
   * Optional style override for the submit button.
   */
  submitButtonStyle?: StyleProp<ViewStyle>
  /**
   * Optional style override for the cancel button.
   */
  cancelButtonStyle?: StyleProp<ViewStyle>
  /**
   * Whether to disable the submit button. Overrides isLoading state.
   */
  submitDisabled?: boolean
}

/**
 * FormScreen is a template component that provides a consistent layout structure
 * for form-based screens throughout the app. It includes a header section with title
 * and subtitle, a form content area, and a button section with submit/cancel handling.
 *
 * This template supports all Screen presets (fixed, scroll, auto) and maintains
 * consistent theming, spacing, and form interaction patterns across the application.
 *
 * @param props - The properties for the FormScreen component
 * @returns JSX.Element - The rendered FormScreen component
 *
 * @example
 * ```tsx
 * <FormScreen
 *   title="Create Account"
 *   subtitle="Fill in your details"
 *   preset="scroll"
 *   onSubmit={handleSubmit}
 *   submitText="Create Account"
 *   isLoading={isCreating}
 *   cancelText="Cancel"
 *   onCancel={() => navigation.goBack()}
 *   errorMessage={error}
 * >
 *   <TextField label="Name" value={name} onChangeText={setName} />
 *   <TextField label="Email" value={email} onChangeText={setEmail} />
 * </FormScreen>
 * ```
 */
export function FormScreen(props: FormScreenProps) {
  const {
    title,
    titleProps,
    subtitle,
    subtitleProps,
    children,
    onSubmit,
    submitText = "Submit",
    isLoading = false,
    cancelText,
    onCancel,
    errorMessage,
    successMessage,
    headerStyle,
    formStyle,
    buttonContainerStyle,
    submitButtonStyle,
    cancelButtonStyle,
    submitDisabled = false,
    ...screenProps
  } = props

  const { themed } = useAppTheme()

  const handleSubmit = () => {
    if (!isLoading && !submitDisabled && onSubmit) {
      onSubmit()
    }
  }

  const handleCancel = () => {
    if (!isLoading && onCancel) {
      onCancel()
    }
  }

  const isSubmitDisabled = isLoading || submitDisabled

  return (
    <Screen {...screenProps}>
      {/* Header Section */}
      {(title || subtitle) && (
        <View style={[themed($headerContainer), headerStyle]}>
          {title && (
            <Text preset="heading" text={title} style={themed($titleText)} {...titleProps} />
          )}
          {subtitle && (
            <Text
              preset="subheading"
              text={subtitle}
              style={themed($subtitleText)}
              {...subtitleProps}
            />
          )}
        </View>
      )}

      {/* Form Content */}
      <View style={[themed($formContainer), formStyle]}>
        {children}

        {/* Success Message */}
        {successMessage && (
          <View style={themed($successContainer)}>
            <Text preset="formHelper" text={successMessage} style={themed($successText)} />
          </View>
        )}

        {/* Error Message */}
        {errorMessage && (
          <View style={themed($errorContainer)}>
            <Text preset="formHelper" text={errorMessage} style={themed($errorText)} />
          </View>
        )}

        {/* Button Section */}
        <View style={[themed($buttonContainer), buttonContainerStyle]}>
          {/* Submit Button */}
          <Button
            text={submitText}
            preset="filled"
            onPress={handleSubmit}
            disabled={isSubmitDisabled}
            style={[themed($submitButton), submitButtonStyle]}
            RightAccessory={isLoading ? (props) => <LoadingIndicator {...props} /> : undefined}
          />

          {/* Cancel Button */}
          {cancelText && (
            <Button
              text={cancelText}
              preset="default"
              onPress={handleCancel}
              disabled={isLoading}
              style={[themed($cancelButton), cancelButtonStyle]}
            />
          )}
        </View>
      </View>
    </Screen>
  )
}

// Styled components using ThemedStyle
const $headerContainer: ThemedStyle<ViewStyle> = (theme) => ({
  paddingHorizontal: theme.spacing.lg,
  paddingTop: theme.spacing.md,
  paddingBottom: theme.spacing.lg,
})

const $titleText: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.text,
  marginBottom: theme.spacing.xs,
})

const $subtitleText: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.textDim,
})

const $formContainer: ThemedStyle<ViewStyle> = (theme) => ({
  flex: 1,
  paddingHorizontal: theme.spacing.lg,
})

const $successContainer: ThemedStyle<ViewStyle> = (theme) => ({
  backgroundColor: theme.colors.palette.accent100,
  borderRadius: theme.spacing.xs,
  padding: theme.spacing.md,
  marginBottom: theme.spacing.md,
})

const $successText: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.palette.accent500,
})

const $errorContainer: ThemedStyle<ViewStyle> = (theme) => ({
  backgroundColor: theme.colors.errorBackground,
  borderRadius: theme.spacing.xs,
  padding: theme.spacing.md,
  marginBottom: theme.spacing.md,
})

const $errorText: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.error,
})

const $buttonContainer: ThemedStyle<ViewStyle> = (theme) => ({
  marginTop: theme.spacing.lg,
  gap: theme.spacing.md,
})

const $submitButton: ThemedStyle<ViewStyle> = (_theme) => ({
  // Submit button uses default filled preset styling
})

const $cancelButton: ThemedStyle<ViewStyle> = (_theme) => ({
  // Cancel button uses default preset styling
})
