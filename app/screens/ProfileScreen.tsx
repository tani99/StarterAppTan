/**
 * ProfileScreen
 * 
 * User profile screen with edit functionality, logout, and settings
 */

import React, { useState, useEffect } from "react"
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Screen } from "../components/Screen"
import { Text } from "../components/Text"
import { Button } from "../components/Button"
import { TextField } from "../components/TextField"
import { Container } from "../components/Container"
import { Spacer } from "../components/Spacer"
import { Card } from "../components/Card"
import { Link } from "../components/Link"
import { Dialog } from "../components/Dialog"
import { Toast } from "../components/Toast"
import { Icon, IconPresets } from "../components/Icon"
import { useAuth } from "../context/AuthContext"
import { colors, spacing, typography } from "../theme"
import { validateName } from "../utils/validation"
import { AppStackParamList } from "../navigators/navigationTypes"

type ProfileScreenProps = NativeStackScreenProps<AppStackParamList, "Profile">

export const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const { user, updateProfile, signOut } = useAuth()

  // Edit mode state
  const [isEditMode, setIsEditMode] = useState(false)
  const [displayName, setDisplayName] = useState("")
  const [displayNameError, setDisplayNameError] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  // Logout dialog state
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  // Discard changes dialog state
  const [showDiscardDialog, setShowDiscardDialog] = useState(false)

  // Toast state
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState<"success" | "error">("success")

  // Initialize display name from user
  useEffect(() => {
    if (user?.displayName) {
      setDisplayName(user.displayName)
    }
  }, [user])

  /**
   * Toggle edit mode
   */
  const handleEditToggle = () => {
    if (isEditMode) {
      // Check if there are unsaved changes
      if (displayName !== user?.displayName) {
        setShowDiscardDialog(true)
        return
      }
    }
    setIsEditMode(!isEditMode)
    setDisplayNameError("")
  }

  /**
   * Cancel edit mode and discard changes
   */
  const handleDiscardChanges = () => {
    setDisplayName(user?.displayName || "")
    setDisplayNameError("")
    setIsEditMode(false)
    setShowDiscardDialog(false)
  }

  /**
   * Save profile changes
   */
  const handleSaveChanges = async () => {
    // Validate display name
    const validation = validateName(displayName, "Display name")
    if (!validation.isValid) {
      setDisplayNameError(validation.error || "")
      return
    }

    setIsSaving(true)

    try {
      const result = await updateProfile({ displayName: displayName.trim() })

      if (result.success) {
        setIsEditMode(false)
        setToastType("success")
        setToastMessage("Profile updated successfully!")
        setShowToast(true)
      } else {
        const errorMessage =
          typeof result.error === "string"
            ? result.error
            : result.error?.message || "Failed to update profile."
        setToastType("error")
        setToastMessage(errorMessage)
        setShowToast(true)
      }
    } catch (error) {
      setToastType("error")
      setToastMessage("An unexpected error occurred.")
      setShowToast(true)
    } finally {
      setIsSaving(false)
    }
  }

  /**
   * Handle change password
   */
  const handleChangePassword = () => {
    // Navigate to ForgotPassword screen
    // Note: In a real app, you might want a separate change password flow
    setToastType("success")
    setToastMessage("Password reset email will be sent to your email.")
    setShowToast(true)
  }

  /**
   * Confirm logout
   */
  const handleLogoutConfirm = () => {
    setShowLogoutDialog(true)
  }

  /**
   * Handle logout
   */
  const handleLogout = async () => {
    setIsLoggingOut(true)
    setShowLogoutDialog(false)

    try {
      await signOut()
      // Navigation will be handled automatically by auth state change
    } catch (error) {
      setToastType("error")
      setToastMessage("Failed to sign out. Please try again.")
      setShowToast(true)
      setIsLoggingOut(false)
    }
  }

  /**
   * Navigate back to home
   */
  const navigateBack = () => {
    navigation.goBack()
  }

  return (
    <Screen preset="fixed" style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Container>
          {/* Header with back button */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={navigateBack}
              style={styles.backButton}
              accessibilityLabel="Go back"
              accessibilityRole="button"
            >
              {IconPresets.back({ size: "lg", color: colors.text.primary })}
            </TouchableOpacity>
          </View>

          <Spacer size="xl" />

          {/* User Info */}
          <View style={styles.profileHeader}>
            <Text style={styles.userName}>{user?.displayName || "User"}</Text>
            <Spacer size="xs" />
            <Text style={styles.userEmail}>{user?.email}</Text>
          </View>

          <Spacer size="xl" />

          {/* Profile Information Card */}
          <Text style={styles.sectionTitle}>Profile Information</Text>
          <Spacer size="md" />

          <Card variant="elevated">
            {/* Display Name Field */}
            <TextField
              label="Display Name"
              placeholder="Enter your name"
              value={displayName}
              onChangeText={(text) => {
                setDisplayName(text)
                if (displayNameError) setDisplayNameError("")
              }}
              error={displayNameError}
              disabled={!isEditMode || isSaving}
              leftIcon={IconPresets.person({ size: "md", color: colors.text.secondary })}
            />

            <Spacer size="md" />

            {/* Email Field (Read-only) */}
            <TextField
              label="Email"
              placeholder="Email address"
              value={user?.email || ""}
              onChangeText={() => {}}
              disabled={true}
              leftIcon={IconPresets.email({ size: "md", color: colors.text.secondary })}
            />

            <Spacer size="lg" />

            {/* Edit/Save/Cancel Buttons */}
            {!isEditMode ? (
              <Button
                variant="outline"
                size="large"
                onPress={handleEditToggle}
                fullWidth
              >
                EDIT PROFILE
              </Button>
            ) : (
              <View style={styles.editActions}>
                <Button
                  variant="outline"
                  size="large"
                  onPress={handleEditToggle}
                  style={styles.editActionButton}
                  disabled={isSaving}
                >
                  CANCEL
                </Button>
                <Spacer size="md" direction="horizontal" />
                <Button
                  variant="primary"
                  size="large"
                  onPress={handleSaveChanges}
                  loading={isSaving}
                  style={styles.editActionButton}
                >
                  SAVE
                </Button>
              </View>
            )}
          </Card>

          <Spacer size="xxl" />

          {/* Actions Section */}
          <Text style={styles.sectionTitle}>Actions</Text>
          <Spacer size="md" />

          <Card variant="elevated">
            {/* Change Password */}
            <TouchableOpacity
              style={styles.actionItem}
              onPress={handleChangePassword}
              disabled={isEditMode}
            >
              <View style={styles.actionIconContainer}>
                {IconPresets.lock({ size: "md", color: colors.text.secondary })}
              </View>
              <Text style={[styles.actionText, isEditMode && styles.actionTextDisabled]}>
                Change Password
              </Text>
              <Icon name="chevron-right" size="md" color={colors.text.tertiary} />
            </TouchableOpacity>

            <Spacer size="sm" />

            {/* Logout */}
            <TouchableOpacity
              style={styles.actionItem}
              onPress={handleLogoutConfirm}
              disabled={isEditMode || isLoggingOut}
            >
              <View style={styles.actionIconContainer}>
                <Icon name="logout" size="md" color={colors.error[500]} />
              </View>
              <Text style={[styles.actionTextDestructive, (isEditMode || isLoggingOut) && styles.actionTextDisabled]}>
                Logout
              </Text>
              <Icon name="chevron-right" size="md" color={colors.text.tertiary} />
            </TouchableOpacity>
          </Card>

          <Spacer size="xl" />
        </Container>
      </ScrollView>

      {/* Logout Confirmation Dialog */}
      <Dialog
        visible={showLogoutDialog}
        title="Logout"
        message="Are you sure you want to logout?"
        variant="default"
        icon={{ name: "logout", color: colors.text.secondary }}
        primaryAction={{
          text: "Logout",
          onPress: handleLogout,
          variant: "destructive",
        }}
        secondaryAction={{
          text: "Cancel",
          onPress: () => setShowLogoutDialog(false),
        }}
        onDismiss={() => setShowLogoutDialog(false)}
      />

      {/* Discard Changes Dialog */}
      <Dialog
        visible={showDiscardDialog}
        title="Discard Changes?"
        message="You have unsaved changes. Are you sure you want to discard them?"
        variant="default"
        icon={{ name: "warning", color: colors.warning[500] }}
        primaryAction={{
          text: "Discard",
          onPress: handleDiscardChanges,
          variant: "destructive",
        }}
        secondaryAction={{
          text: "Keep Editing",
          onPress: () => setShowDiscardDialog(false),
        }}
        onDismiss={() => setShowDiscardDialog(false)}
      />

      {/* Toast Notification */}
      <Toast
        visible={showToast}
        message={toastMessage}
        type={toastType}
        onDismiss={() => setShowToast(false)}
        position="top"
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background.secondary,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing.xl,
  },
  header: {
    paddingTop: spacing.md,
  },
  backButton: {
    padding: spacing.xs,
    marginLeft: -spacing.xs,
  },
  profileHeader: {
    alignItems: "flex-start",
  },
  userName: {
    ...typography.heading2,
    color: colors.text.primary,
  },
  userEmail: {
    ...typography.body1,
    color: colors.text.secondary,
  },
  sectionTitle: {
    ...typography.heading6,
    color: colors.text.primary,
    letterSpacing: 1,
  },
  editActions: {
    flexDirection: "row",
  },
  editActionButton: {
    flex: 1,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm,
  },
  actionIconContainer: {
    width: 40,
    marginRight: spacing.sm,
  },
  actionText: {
    ...typography.body1Medium,
    color: colors.text.primary,
    flex: 1,
  },
  actionTextDestructive: {
    ...typography.body1Medium,
    color: colors.error[500],
    flex: 1,
  },
  actionTextDisabled: {
    opacity: 0.5,
  },
})
