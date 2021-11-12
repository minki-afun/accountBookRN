import jwt_decode from "jwt-decode"
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
  split,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import {
  getMainDefinition,
  offsetLimitPagination,
} from "@apollo/client/utilities"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { createUploadLink } from "apollo-upload-client"
import { ApolloLink } from "apollo-boost"
import { onError } from "apollo-link-error"

// Apollo error 잡기
const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message))
})

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

// apollo 서버 연결 URL
const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
})

// 헤더에 token값 넣기
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
  // link: authLink.concat(httpLink),
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
})

export default client
