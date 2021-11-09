import jwt_decode from "jwt-decode"
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
  split,
} from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import { setContext } from "@apollo/client/link/context"
import {
  getMainDefinition,
  offsetLimitPagination,
} from "@apollo/client/utilities"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { createUploadLink } from "apollo-upload-client"

export const isLoggedInVar = makeVar(false)
export const tokenVar = makeVar("")
export const tokenDecodeId = makeVar("")

// 로그인시 스토리지에 토큰과 로그인 여부 넣기
export const logUserIn = async (token) => {
  await AsyncStorage.setItem("token", token)
  isLoggedInVar(true)
  tokenVar(token)
  getTokenDecode()
}

// 로그아웃시 스토리지 파괴
export const logUserOut = async () => {
  // await AsyncStorage.multiRemove(["token"])
  await AsyncStorage.removeItem("token")
  isLoggedInVar(false)
  tokenVar("")
  tokenDecodeId("")
}

// token decode
export const getTokenDecode = async () => {
  const token = await AsyncStorage.getItem("token")
  tokenDecodeId(jwt_decode(token).id)
}

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  }
})

// 아폴로 연결
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default client
