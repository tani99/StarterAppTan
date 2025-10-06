import React, { useState } from "react"
import { View, ViewStyle, StyleSheet } from "react-native"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { Button } from "@/components/Button"
import { Container } from "@/components/Container"
import { Spacer } from "@/components/Spacer"
import { useAuth } from "@/context/AuthContext"
import { colors, spacing, typography } from "@/theme"

export const ProfileScreen = () => {
  const { signOut, user } = useAuth()
  const [isSigningOut, setIsSigningOut] = useState(false)

  const handleSignOut = async () => {
    setIsSigningOut(true)
    try {
      await signOut()
    } catch (error) {
      console.error("Sign out error:", error)
    } finally {
      setIsSigningOut(false)
    }
  }

  return (
    <Screen style={styles.screen} preset="scroll">
      <Container style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.title}>Profile Screen</Text>
          <Spacer size="sm" />
          {user && (
            <>
              <Text style={styles.subtitle}>Logged in as:</Text>
              <Text style={styles.email}>{user.email}</Text>
              <Spacer size="xl" />
            </>
          )}
          
          <Button
            variant="destructive"
            onPress={handleSignOut}
            loading={isSigningOut}
            style={styles.signOutButton}
          >
            Sign Out (Temporary)
          </Button>
        </View>
      </Container>
    </Screen>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background.primary,
  },
  container: {
    flex: 1,
  } as ViewStyle,
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
  },
  title: {
    ...typography.heading2,
    color: colors.text.primary,
    textAlign: "center",
  },
  subtitle: {
    ...typography.body1,
    color: colors.text.secondary,
    textAlign: "center",
  },
  email: {
    ...typography.body1Medium,
    color: colors.text.primary,
    textAlign: "center",
  },
  signOutButton: {
    minWidth: 200,
  },
})
