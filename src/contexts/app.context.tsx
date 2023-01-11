import { createContext, useState } from 'react'
import { ExtendedPurchase, User } from 'src/types'
import { getAccessTokenFromLS, getProfileFromLS } from 'src/utils'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  extendedPurchases: ExtendedPurchase[]
  setExtendedPurchases: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>
}

const initialValueAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  extendedPurchases: [],
  setExtendedPurchases: () => null
}
export const AppContext = createContext<AppContextInterface>(initialValueAppContext)
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchase[]>(
    initialValueAppContext.extendedPurchases
  )
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialValueAppContext.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialValueAppContext.profile)
  const value = {
    isAuthenticated,
    setIsAuthenticated,
    profile,
    setProfile,
    extendedPurchases,
    setExtendedPurchases
  }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
