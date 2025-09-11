import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react"

import {
  authService,
  AuthUser,
  AuthState,
  LoginCredentials,
  RegisterCredentials,
  PasswordResetRequest,
  AuthResult,
} from "@/services/auth"
import * as storage from "@/utils/storage"

/**
 * Auth context interface defining what the context provides
 */
interface AuthContextType {
  // Auth state
  user: AuthUser | null
  authState: AuthState
  isLoading: boolean
  isInitializing: boolean

  // Auth actions
  signIn: (credentials: LoginCredentials) => Promise<AuthResult<AuthUser>>
  signUp: (credentials: RegisterCredentials) => Promise<AuthResult<AuthUser>>
  signOut: () => Promise<AuthResult>
  sendPasswordReset: (request: PasswordResetRequest) => Promise<AuthResult>
  updateProfile: (updates: { displayName?: string; photoURL?: string }) => Promise<AuthResult>

  // Utility functions
  isAuthenticated: boolean
}

/**
 * Auth context instance
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * Storage keys for auth persistence
 */
const AUTH_STORAGE_KEYS = {
  USER: "auth.user",
  STATE: "auth.state",
} as const

/**
 * Auth Provider Props
 */
interface AuthProviderProps {
  children: ReactNode
}

/**
 * Authentication Context Provider
 * Manages auth state and provides auth methods to child components
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [authState, setAuthState] = useState<AuthState>(AuthState.LOADING)
  const [isInitializing, setIsInitializing] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isSigningIn, setIsSigningIn] = useState(false)

  /**
   * Persists auth state to storage
   */
  const persistAuthState = async (authUser: AuthUser | null, state: AuthState) => {
    try {
      await storage.save(AUTH_STORAGE_KEYS.USER, authUser)
      await storage.save(AUTH_STORAGE_KEYS.STATE, state)
    } catch (error) {
      console.warn("Failed to persist auth state:", error)
    }
  }

  /**
   * Restores auth state from storage
   */
  const restoreAuthState = async () => {
    try {
      const savedUser = (await storage.load(AUTH_STORAGE_KEYS.USER)) as AuthUser | null
      const savedState = (await storage.load(AUTH_STORAGE_KEYS.STATE)) as AuthState | null

      if (savedUser && savedState && Object.values(AuthState).includes(savedState)) {
        setUser(savedUser)
        setAuthState(savedState)
      }
    } catch (error) {
      console.warn("Failed to restore auth state:", error)
    }
  }

  /**
   * Handles auth state changes from Firebase
   */
  const handleAuthStateChange = useCallback(
    async (authUser: AuthUser | null, state: AuthState) => {
      setUser(authUser)
      setAuthState(state)
      // Always clear initializing state after first auth state change
      setIsInitializing(false)

      // Only clear loading state if we're not in the middle of a sign-in operation
      if (!isSigningIn) {
        setIsLoading(false)
      }

      // Persist the new state
      await persistAuthState(authUser, state)
    },
    [isSigningIn],
  )

  /**
   * Initialize auth context
   */
  useEffect(() => {
    let isMounted = true

    const initializeAuth = async () => {
      // First, try to restore from storage
      await restoreAuthState()

      // Then set up the auth state listener
      const unsubscribe = authService.onAuthStateChange((authUser, state) => {
        if (isMounted) {
          handleAuthStateChange(authUser, state)
        }
      })

      // Check current auth state immediately
      const currentUser = authService.getCurrentUser()
      const currentState = currentUser ? AuthState.AUTHENTICATED : AuthState.UNAUTHENTICATED

      if (isMounted) {
        handleAuthStateChange(currentUser, currentState)
      }

      // Return cleanup function
      return unsubscribe
    }

    const cleanup = initializeAuth()

    return () => {
      isMounted = false
      cleanup.then((unsub) => unsub?.())
    }
  }, [handleAuthStateChange])

  /**
   * Sign in wrapper with loading state
   */
  const signIn = async (credentials: LoginCredentials): Promise<AuthResult<AuthUser>> => {
    setIsSigningIn(true)
    setIsLoading(true)
    try {
      const result = await authService.signIn(credentials)

      // Always clear signing in state and loading state for failed attempts
      if (!result.success) {
        setIsSigningIn(false)
        setIsLoading(false)
      } else {
        // For successful sign ins, Firebase auth state change will handle loading state
        setIsSigningIn(false)
      }
      return result
    } catch (error) {
      console.error("AuthContext signIn error:", error)
      setIsSigningIn(false)
      setIsLoading(false)
      throw error
    }
  }

  /**
   * Sign up wrapper with loading state
   */
  const signUp = async (credentials: RegisterCredentials): Promise<AuthResult<AuthUser>> => {
    setIsLoading(true)
    try {
      const result = await authService.signUp(credentials)
      // Only keep loading if sign up was successful
      // Failed sign ups should clear loading immediately
      if (!result.success) {
        setIsLoading(false)
      }
      return result
    } catch (error) {
      setIsLoading(false)
      throw error
    }
  }

  /**
   * Sign out wrapper with loading state and cleanup
   */
  const signOut = async (): Promise<AuthResult> => {
    console.log("[AuthContext] signOut called")
    setIsLoading(true)
    try {
      console.log("[AuthContext] Calling authService.signOut...")
      const result = await authService.signOut()
      console.log("[AuthContext] authService.signOut result:", result)

      // Clear persisted state on successful sign out
      if (result.success) {
        console.log("[AuthContext] Clearing storage...")
        await storage.remove(AUTH_STORAGE_KEYS.USER)
        await storage.remove(AUTH_STORAGE_KEYS.STATE)
      }

      return result
    } finally {
      console.log("[AuthContext] Setting isLoading to false")
      setIsLoading(false)
    }
  }

  /**
   * Password reset wrapper
   */
  const sendPasswordReset = async (request: PasswordResetRequest): Promise<AuthResult> => {
    return await authService.sendPasswordReset(request)
  }

  /**
   * Profile update wrapper
   */
  const updateProfile = async (updates: {
    displayName?: string
    photoURL?: string
  }): Promise<AuthResult> => {
    const result = await authService.updateUserProfile(updates)

    // If successful, update local user state
    if (result.success && user) {
      const updatedUser: AuthUser = {
        ...user,
        displayName: updates.displayName ?? user.displayName,
        photoURL: updates.photoURL ?? user.photoURL,
      }
      setUser(updatedUser)
      await persistAuthState(updatedUser, authState)
    }

    return result
  }

  /**
   * Context value
   */
  const contextValue: AuthContextType = {
    // State
    user,
    authState,
    isLoading,
    isInitializing,

    // Actions
    signIn,
    signUp,
    signOut,
    sendPasswordReset,
    updateProfile,

    // Utils
    isAuthenticated: authState === AuthState.AUTHENTICATED,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

/**
 * Hook to access auth context
 * Throws error if used outside AuthProvider
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}

/**
 * Hook to check if user is authenticated (convenience hook)
 */
export const useIsAuthenticated = (): boolean => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated
}

/**
 * Hook to get current user (convenience hook)
 */
export const useCurrentUser = (): AuthUser | null => {
  const { user } = useAuth()
  return user
}
