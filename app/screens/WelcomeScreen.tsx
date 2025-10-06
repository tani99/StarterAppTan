/**
 * WelcomeScreen
 * 
 * Landing screen with hero section, app description, and authentication CTAs
 */

import React, { useEffect, useRef } from "react"
import {
  View,
  StyleSheet,
  ScrollView,
  Animated,
  ViewStyle,
} from "react-native"
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
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
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
              {/* App Icon/Logo */}
              <View style={styles.logoContainer}>
                <Icon
                  name="checkroom"
                  family="material"
                  size={80}
                  color={colors.primary[500]}
                />
              </View>

              <Spacer size="lg" />

              {/* App Name */}
              <Text style={styles.appName}>FashionApp</Text>

              <Spacer size="xs" />

              {/* Tagline */}
              <Text style={styles.tagline}>Your Style, Your Way</Text>

              <Spacer size="xl" />

              {/* Description */}
              <Text style={styles.description}>
                Discover the latest fashion trends, create your perfect wardrobe, and express your unique style.
              </Text>
            </View>

            <Spacer size="xxxl" />

            {/* Features List */}
            <View style={styles.features}>
              <FeatureItem
                icon="favorite"
                title="Personalized Style"
                description="Get recommendations tailored to your taste"
              />
              <Spacer size="lg" />
              <FeatureItem
                icon="category"
                title="Curated Collections"
                description="Browse carefully selected fashion pieces"
              />
              <Spacer size="lg" />
              <FeatureItem
                icon="shopping-bag"
                title="Easy Shopping"
                description="Shop seamlessly with secure checkout"
              />
            </View>

            <Spacer size="xxxl" />

            {/* Call-to-Action Buttons */}
            <View style={styles.ctaContainer}>
              <Button
                variant="primary"
                size="large"
                onPress={navigateToRegister}
                fullWidth
                accessibilityLabel="Create Account"
              >
                Create Account
              </Button>

              <Spacer size="md" />

              <Button
                variant="outline"
                size="large"
                onPress={navigateToLogin}
                fullWidth
                accessibilityLabel="Sign In"
              >
                Sign In
              </Button>
            </View>

            <Spacer size="lg" />

            {/* Footer text */}
            <Text style={styles.footer}>
              By continuing, you agree to our Terms of Service and Privacy Policy
            </Text>
          </Animated.View>
        </Container>
      </ScrollView>
    </Screen>
  )
}

/**
 * Feature Item Component
 * Displays a feature with icon, title, and description
 */
interface FeatureItemProps {
  icon: string
  title: string
  description: string
}

const FeatureItem = ({ icon, title, description }: FeatureItemProps) => {
  return (
    <View style={styles.featureItem}>
      <View style={styles.featureIcon}>
        <Icon
          name={icon}
          family="material"
          size="lg"
          color={colors.primary[500]}
        />
      </View>
      <View style={styles.featureText}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background.primary,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    paddingVertical: spacing.xl,
  } as ViewStyle,
  content: {
    flex: 1,
    justifyContent: "center",
  },
  hero: {
    alignItems: "center",
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary[50],
    alignItems: "center",
    justifyContent: "center",
  },
  appName: {
    ...typography.heading1,
    color: colors.text.primary,
    textAlign: "center",
  },
  tagline: {
    ...typography.heading5,
    color: colors.text.secondary,
    textAlign: "center",
  },
  description: {
    ...typography.body1,
    color: colors.text.secondary,
    textAlign: "center",
    maxWidth: 400,
  },
  features: {
    width: "100%",
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary[50],
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    ...typography.heading6,
    color: colors.text.primary,
    marginBottom: spacing.xxs,
  },
  featureDescription: {
    ...typography.body2,
    color: colors.text.secondary,
  },
  ctaContainer: {
    width: "100%",
  },
  footer: {
    ...typography.caption,
    color: colors.text.tertiary,
    textAlign: "center",
  },
})
