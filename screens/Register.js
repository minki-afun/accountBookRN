import { gql, useMutation } from "@apollo/client"
import React, { useEffect, useRef } from "react"
import { useForm, useWatch } from "react-hook-form"
import { Text, View } from "react-native"
import styled from "styled-components/native"
import ButtonTemp from "../components/main/ButtonTemp"
import LogoLayout from "../components/main/LogoLayout"

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount($email: String!, $password: String!) {
    createAccount(email: $email, password: $password) {
      result
      error
    }
  }
`

const Register = ({ navigation }) => {
  // React Native에 Form형식은 없지만 대용으로 useForm 가능
  const { register, handleSubmit, setValue, watch } = useForm()
  // 해당 input 입력 후 다음 input으로 자동이동
  const passwordRef = useRef()
  const onNext = (nextOne) => {
    nextOne?.current?.focus()
  }
  // 제출 후 데이터 결과 및 처리과정
  const onCompleted = (data) => {
    const {
      createAccount: { result, error },
    } = data
    const { email, password } = watch()
    if (result) {
      navigation.navigate("Login", {
        email,
        password,
      })
    } else {
      alert(error)
    }
  }
  // graphql 연결
  const [createAccountMutation, { loading }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    }
  )
  // 데이터 처리
  const onData = (data) => {
    if (!loading) {
      createAccountMutation({
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
        text="register"
        disabled={!watch("email") || !watch("password")}
        onPress={handleSubmit(onData)}
      />
    </LogoLayout>
  )
}

export default Register

const TextInput = styled.TextInput`
  width: 60%;
  padding: 15px 7px;
  margin-bottom: 8px;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 800;
  margin-bottom: ${(props) => (props.lastOne ? 15 : 8)}px;
  background-color: rgba(250, 150, 100, 0.3);
  color: rgba(0, 0, 0, 0.6);
`
