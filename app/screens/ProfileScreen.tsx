import React from "react"
import { View, ViewStyle } from "react-native"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"

export const ProfileScreen = () => {
  return (
    <Screen style={$container}>
      <View style={$centerContent}>
        <Text text="Profile Screen" style={$title} />
      </View>
    </Screen>
  )
}

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: "#FFFFFF",
}

const $centerContent: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const $title = {
  fontSize: 24,
  fontWeight: "bold" as const,
}
