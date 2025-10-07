/**
 * WelcomeScreen
 * 
 * Bold, fashion-forward landing screen with gradient background and editorial styling
 */

import React, { useEffect, useRef } from "react"
import {
  View,
  StyleSheet,
  ScrollView,
  Animated,
  ViewStyle,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Screen } from "../components/Screen"
import { Text } from "../components/Text"
import { Button } from "../components/Button"
import { Container } from "../components/Container"
import { Spacer } from "../components/Spacer"
import { Icon } from "../components/Icon"
import { colors, spacing, typography } from "../theme"
import { AuthStackParamList } from "../navigators/navigationTypes"

type WelcomeScreenProps = NativeStackScreenProps<AuthStackParamList, "Welcome">

export const WelcomeScreen = ({ navigation }: WelcomeScreenProps) => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(30)).current

  useEffect(() => {
    // Smooth fade-in and slide-up animation on mount
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  const navigateToLogin = () => {
    navigation.navigate("Login")
  }

  const navigateToRegister = () => {
    navigation.navigate("Register")
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["top", "bottom"]} style={styles.screen}>
      <LinearGradient
        colors={[colors.primary[500], colors.secondary[500]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Container style={styles.container}>
            <Animated.View
              style={[
                styles.content,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              {/* Hero Section */}
              <View style={styles.hero}>
                {/* App Icon/Logo - White on gradient */}
                <View style={styles.logoContainer}>
                  <Icon
                    name="checkroom"
                    family="material"
                    size={100}
                    color={colors.neutral.white}
                  />
                </View>

                <Spacer size="xl" />

                {/* App Name - Bold, Editorial Style */}
                <Text style={styles.appName}>FASHION</Text>
                <Text style={styles.appNameSecondary}>APP</Text>

                <Spacer size="md" />

                {/* Tagline */}
                <Text style={styles.tagline}>YOUR STYLE, YOUR WAY</Text>

                <Spacer size="xxl" />

                {/* Description */}
                <Text style={styles.description}>
                  Step into a world of endless style possibilities. Discover trends, create looks, and express yourself.
                </Text>
              </View>

              <Spacer size="massive" />

              {/* Features List - Minimal & Bold */}
              <View style={styles.features}>
                <FeatureItem
                  icon="auto-awesome"
                  title="CURATED"
                  description="Hand-picked collections just for you"
                />
                <Spacer size="xl" />
                <FeatureItem
                  icon="trending-up"
                  title="TRENDING"
                  description="Stay ahead with the latest trends"
                />
                <Spacer size="xl" />
                <FeatureItem
                  icon="flash-on"
                  title="INSTANT"
                  description="Shop and style in seconds"
                />
              </View>

              <Spacer size="massive" />

              {/* Call-to-Action Buttons */}
              <View style={styles.ctaContainer}>
                <Button
                  variant="secondary"
                  size="large"
                  onPress={navigateToRegister}
                  fullWidth
                  accessibilityLabel="Create Account"
                  style={styles.primaryButton}
                >
                  CREATE ACCOUNT
                </Button>

                <Spacer size="md" />

                <Button
                  variant="outline"
                  size="large"
                  onPress={navigateToLogin}
                  fullWidth
                  accessibilityLabel="Sign In"
                  style={styles.outlineButton}
                  textStyle={styles.outlineButtonText}
                >
                  SIGN IN
                </Button>
              </View>

              <Spacer size="xl" />

              {/* Footer text */}
              <Text style={styles.footer}>
                By continuing, you agree to our Terms & Privacy Policy
              </Text>
            </Animated.View>
          </Container>
        </ScrollView>
      </LinearGradient>
    </Screen>
  )
}

/**
 * Feature Item Component - Minimal, Editorial Style
 */
interface FeatureItemProps {
  icon: string
  title: string
  description: string
}

const FeatureItem = ({ icon, title, description }: FeatureItemProps) => {
  return (
    <View style={styles.featureItem}>
      <Icon
        name={icon}
        family="material"
        size="lg"
        color={colors.neutral.white}
      />
      <Spacer size="sm" direction="horizontal" />
      <View style={styles.featureText}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.primary[500],
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    paddingVertical: spacing.xxl,
  } as ViewStyle,
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  hero: {
    alignItems: "center",
    width: "100%",
  },
  logoContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  appName: {
    fontSize: 52,
    fontWeight: "800",
    color: colors.neutral.white,
    textAlign: "center",
    letterSpacing: 8,
  },
  appNameSecondary: {
    fontSize: 52,
    fontWeight: "200",
    color: colors.neutral.white,
    textAlign: "center",
    letterSpacing: 16,
    marginTop: -8,
  },
  tagline: {
    ...typography.body1Medium,
    color: colors.neutral.white,
    textAlign: "center",
    letterSpacing: 4,
    opacity: 0.9,
  },
  description: {
    ...typography.body1,
    color: colors.neutral.white,
    textAlign: "center",
    maxWidth: 320,
    opacity: 0.85,
    lineHeight: 26,
  },
  features: {
    width: "100%",
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.neutral.white,
    marginBottom: spacing.xxs,
    letterSpacing: 2,
  },
  featureDescription: {
    ...typography.body2,
    color: colors.neutral.white,
    opacity: 0.8,
  },
  ctaContainer: {
    width: "100%",
  },
  primaryButton: {
    backgroundColor: colors.neutral.white,
    shadowColor: colors.neutral.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  outlineButton: {
    borderWidth: 2,
    borderColor: colors.neutral.white,
    backgroundColor: "transparent",
  },
  outlineButtonText: {
    color: colors.neutral.white,
  },
  footer: {
    ...typography.caption,
    color: colors.neutral.white,
    textAlign: "center",
    opacity: 0.7,
  },
})
