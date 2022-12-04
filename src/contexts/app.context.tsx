import { createContext, useState } from 'react'
import { User } from 'src/types'
import { getAccessTokenFromLS, getProfileFromLS } from 'src/utils'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
}

const initialValueAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null
}
export const AppContext = createContext<AppContextInterface>(initialValueAppContext)
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialValueAppContext.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialValueAppContext.profile)
  const value = {
    isAuthenticated,
    setIsAuthenticated,
    profile,
    setProfile
  }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
