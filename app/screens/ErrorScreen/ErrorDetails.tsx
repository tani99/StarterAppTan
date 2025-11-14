import { ErrorInfo } from "react"
import { View, ViewStyle } from "react-native"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"

export interface ErrorDetailsProps {
  error: Error
  errorInfo: ErrorInfo | null
  onReset(): void
}

export function ErrorDetails(props: ErrorDetailsProps) {
  return (
    <Screen safeAreaEdges={["top", "bottom"]} style={$container}>
      <View style={$centerContent}>
        <Text text="Error Details Screen" style={$title} />
        <Text text={`Error: ${props.error.message}`} style={$errorText} />
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
  padding: 20,
}

const $title = {
  fontSize: 24,
  fontWeight: "bold" as const,
  marginBottom: 20,
}

const $errorText = {
  fontSize: 14,
  color: "#FF0000",
  textAlign: "center" as const,
}
