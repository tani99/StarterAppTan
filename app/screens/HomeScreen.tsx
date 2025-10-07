/**
 * HomeScreen
 * 
 * Main dashboard after authentication with cards, navigation, and user content
 */

import React, { useState, useCallback } from "react"
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Screen } from "../components/Screen"
import { Text } from "../components/Text"
import { Container } from "../components/Container"
import { Spacer } from "../components/Spacer"
import { Card } from "../components/Card"
import { Icon, IconPresets } from "../components/Icon"
import { SkeletonCard, SkeletonList } from "../components/Skeleton"
import { EmptyState } from "../components/EmptyState"
import { useAuth } from "../context/AuthContext"
import { colors, spacing, typography } from "../theme"
import { AppStackParamList } from "../navigators/navigationTypes"

type HomeScreenProps = NativeStackScreenProps<AppStackParamList, "Home">

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { user } = useAuth()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  /**
   * Handle pull-to-refresh
   */
  const onRefresh = useCallback(async () => {
    setIsRefreshing(true)
    // Simulate data fetch
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsRefreshing(false)
  }, [])

  /**
   * Navigate to profile
   */
  const navigateToProfile = () => {
    navigation.navigate("Profile")
  }

  /**
   * Get first name from display name
   */
  const getFirstName = (): string => {
    if (!user?.displayName) return "there"
    return user.displayName.split(" ")[0]
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary[500]}
            colors={[colors.primary[500]]}
          />
        }
      >
        <Container>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.appTitle}>FASHION</Text>
            </View>
            <TouchableOpacity
              onPress={navigateToProfile}
              style={styles.profileButton}
              accessibilityLabel="Go to profile"
              accessibilityRole="button"
            >
              {IconPresets.person({ size: "lg", color: colors.text.primary })}
            </TouchableOpacity>
          </View>

          <Spacer size="xl" />

          {/* Welcome Message */}
          <View style={styles.welcomeSection}>
            <Text style={styles.greeting}>Hey {getFirstName()}! 👋</Text>
            <Spacer size="xs" />
            <Text style={styles.welcomeMessage}>Ready to discover your style?</Text>
          </View>

          <Spacer size="xxl" />

          {isLoading ? (
            // Loading state with skeleton
            <>
              <SkeletonList count={3} itemType="card" />
            </>
          ) : (
            <>
              {/* Quick Stats Section */}
              <Text style={styles.sectionTitle}>Quick Stats</Text>
              <Spacer size="md" />

              <View style={styles.statsContainer}>
                <StatCard
                  icon="favorite"
                  title="0"
                  subtitle="Favorites"
                  color={colors.secondary[500]}
                />
                <Spacer size="md" direction="horizontal" />
                <StatCard
                  icon="shopping-bag"
                  title="0"
                  subtitle="Orders"
                  color={colors.primary[500]}
                />
              </View>

              <Spacer size="xxl" />

              {/* Featured Sections */}
              <Text style={styles.sectionTitle}>Explore</Text>
              <Spacer size="md" />

              <Card variant="elevated" style={styles.exploreCard}>
                <View style={styles.exploreCardContent}>
                  <View style={styles.exploreIconContainer}>
                    <Icon name="auto-awesome" size="xl" color={colors.primary[500]} />
                  </View>
                  <View style={styles.exploreTextContainer}>
                    <Text style={styles.exploreCardTitle}>Trending Now</Text>
                    <Text style={styles.exploreCardSubtitle}>
                      Discover the latest fashion trends
                    </Text>
                  </View>
                  <Icon name="chevron-right" size="lg" color={colors.text.tertiary} />
                </View>
              </Card>

              <Spacer size="md" />

              <Card variant="elevated" style={styles.exploreCard}>
                <View style={styles.exploreCardContent}>
                  <View style={styles.exploreIconContainer}>
                    <Icon name="category" size="xl" color={colors.secondary[500]} />
                  </View>
                  <View style={styles.exploreTextContainer}>
                    <Text style={styles.exploreCardTitle}>Collections</Text>
                    <Text style={styles.exploreCardSubtitle}>
                      Browse curated fashion collections
                    </Text>
                  </View>
                  <Icon name="chevron-right" size="lg" color={colors.text.tertiary} />
                </View>
              </Card>

              <Spacer size="md" />

              <Card variant="elevated" style={styles.exploreCard}>
                <View style={styles.exploreCardContent}>
                  <View style={styles.exploreIconContainer}>
                    <Icon name="local-offer" size="xl" color={colors.accent[500]} />
                  </View>
                  <View style={styles.exploreTextContainer}>
                    <Text style={styles.exploreCardTitle}>Special Offers</Text>
                    <Text style={styles.exploreCardSubtitle}>
                      Exclusive deals just for you
                    </Text>
                  </View>
                  <Icon name="chevron-right" size="lg" color={colors.text.tertiary} />
                </View>
              </Card>

              <Spacer size="xxl" />

              {/* Recent Activity Section */}
              <Text style={styles.sectionTitle}>Recent Activity</Text>
              <Spacer size="md" />

              <EmptyState
                icon={{ name: "history", color: colors.text.tertiary }}
                title="No Activity Yet"
                description="Start exploring and your activity will appear here"
              />

              <Spacer size="xl" />
            </>
          )}
        </Container>
      </ScrollView>
    </Screen>
  )
}

/**
 * Stat Card Component
 */
interface StatCardProps {
  icon: string
  title: string
  subtitle: string
  color: string
}

const StatCard = ({ icon, title, subtitle, color }: StatCardProps) => {
  return (
    <Card variant="elevated" style={styles.statCard}>
      <View style={[styles.statIconContainer, { backgroundColor: `${color}15` }]}>
        <Icon name={icon} size="lg" color={color} />
      </View>
      <Spacer size="sm" />
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statSubtitle}>{subtitle}</Text>
    </Card>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: spacing.md,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  appTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.text.primary,
    letterSpacing: 2,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.background.card,
    alignItems: "center",
    justifyContent: "center",
    ...StyleSheet.flatten({
      shadowColor: colors.neutral.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    }),
  },
  welcomeSection: {
    alignItems: "flex-start",
  },
  greeting: {
    ...typography.heading2,
    color: colors.text.primary,
  },
  welcomeMessage: {
    ...typography.body1,
    color: colors.text.secondary,
  },
  sectionTitle: {
    ...typography.heading5,
    color: colors.text.primary,
    letterSpacing: 1,
  },
  statsContainer: {
    flexDirection: "row",
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    paddingVertical: spacing.lg,
  },
  statIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  statTitle: {
    ...typography.heading3,
    color: colors.text.primary,
  },
  statSubtitle: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  exploreCard: {
    padding: spacing.md,
  },
  exploreCardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  exploreIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  exploreTextContainer: {
    flex: 1,
    marginLeft: spacing.md,
  },
  exploreCardTitle: {
    ...typography.heading6,
    color: colors.text.primary,
    marginBottom: 2,
  },
  exploreCardSubtitle: {
    ...typography.body2,
    color: colors.text.secondary,
  },
})

