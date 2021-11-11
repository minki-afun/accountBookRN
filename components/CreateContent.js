import { useMutation } from "@apollo/client"
import gql from "graphql-tag"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import styled from "styled-components"
import { View, Text } from "react-native"

CREATE_CONTENT_MUTATION = gql`
  mutation addContents(
    $product: String!
    $price: Int!
    $text: String
    $date: Int!
    $sign: Boolean
    $userId: Int
  ) {
    addContents(
      product: $product
      price: $price
      text: $text
      date: $date0
      sign: $sign
      userId: $userId
    ) {
      result
      error
    }
  }
`
const CreateContent = ({ navigation }) => {
  // React Native에 Form형식은 없지만 대용으로 useForm 가능
  const { register, handleSubmit, setValue, watch } = useForm()
  // 제출 후 데이터 결과 및 처리과정
  const onCompleted = (data) => {
    const {
      addContents: { result, error },
    } = data
    const { product, price, text, date, sign, userId } = watch()
    if (result) {
      navigation.navigate("Content")
    } else {
      alert(error)
    }
  }
  // graphql 연결
  const [createContentMutation, { loading }] = useMutation(
    CREATE_CONTENT_MUTATION,
    {
      onCompleted,
    }
  )
  const submitData = (data) => {
    if (!loading) {
      createContentMutation({
        variables: {
          ...data,
        },
      })
    }
  }
  // 필수 항목 표시
  useEffect(() => {
    register("pruduct", {
      required: true,
    })
    register("price", {
      required: true,
    })
    register("date", {
      required: true,
    })
    register("text", {
      required: false,
    })
    register("sign", {
      required: false,
    })
    register("userId", {
      required: false,
    })
  }, [register])

  return (
    <AddContainer>
      <AddContentText
        value={watch("product")}
        placeholder="표기될 거래 내용명"
        placeholderTextColor="rgba(0,0,0,0.6)"
        returnKeyType="next"
        autoCapitalize="none"
        onSubmitEditing={handleSubmit(submitData)}
        onChangeText={(text) => setValue("product", text)}
      />
    </AddContainer>
  )
  // return (
  //   <View>
  //     <Text>Hi</Text>
  //   </View>
  // )
}

export default CreateContent

const AddContainer = styled.View``
const AddContentText = styled.TextInput`
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
