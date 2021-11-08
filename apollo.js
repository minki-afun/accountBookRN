import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const isLoggedInVar = makeVar(false)
export const tokenVar = makeVar("")

// 로그인시 스토리지에 토큰과 로그인 여부 넣기
export const logUserIn = async (token) => {
  await AsyncStorage.multiSet([
    ["token", token],
    ["loggedIn", "yes"],
  ])
  isLoggedInVar(true)
  tokenVar(token)
}

// 로그아웃시 스토리지 파괴
export const logUserOut = async () => {
  await AsyncStorage.removeItem("token")
  await AsyncStorage.removeItem("loggedIn")
  isLoggedInVar(false)
  tokenVar("")
}

// 아폴로 연결
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
})
export default client
