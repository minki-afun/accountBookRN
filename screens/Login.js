import { gql, useMutation } from "@apollo/client"
import React, { useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { Text, View } from "react-native"
import styled from "styled-components/native"
import { logUserIn } from "../apollo"
import ButtonTemp from "../components/main/ButtonTemp"
import LogoLayout from "../components/main/LogoLayout"

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      result
      token
      error
    }
  }
`

const Login = ({ route: { params } }) => {
  // React Native에 Form형식은 없지만 대용으로 useForm 가능
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      email: params?.email,
      password: params?.password,
    },
  })
  // 해당 input 입력 후 다음 input으로 자동이동
  const passwordRef = useRef()
  // 제출 후 데이터 결과 및 처리과정
  const onCompleted = async (data) => {
    const {
      login: { result, token },
    } = data
    if (result) {
      await logUserIn(token)
    }
  }
  // grapql 연결
  const [logInMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  })
  const onNext = (nextOne) => {
    nextOne?.current?.focus()
  }
  const onData = (data) => {
    if (!loading) {
      logInMutation({
        variables: {
          ...data,
        },
      })
    }
  }
  // 필수 항목 표시
  useEffect(() => {
    register("email", {
      required: true,
    })
    register("password", {
      required: true,
    })
  }, [register])

  return (
    <LogoLayout>
      <TextInput
        value={watch("email")}
        placeholder="Email"
        placeholderTextColor="rgba(0,0,0,0.6)"
        returnKeyType="next"
        autoCapitalize="none"
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue("email", text)}
      />
      <TextInput
        value={watch("password")}
        ref={passwordRef}
        placeholder="Password"
        placeholderTextColor="rgba(0,0,0,0.6)"
        secureTextEntry
        returnKeyType="done"
        lastone={true}
        onSubmitEditing={handleSubmit(onData)}
        onChangeText={(text) => setValue("password", text)}
      />
      <ButtonTemp
        text="Login"
        disabled={!watch("email") || !watch("password")}
        onPress={handleSubmit(onData)}
      />
    </LogoLayout>
  )
}

export default Login

const TextInput = styled.TextInput`
  width: 60%;
  padding: 15px 7px;
  margin-bottom: 8px;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 800;
  margin-bottom: ${(props) => (props.lastOne ? 15 : 8)}px;
  background-color: rgba(50, 120, 200, 0.3);
  color: rgba(0, 0, 0, 0.6);
`
