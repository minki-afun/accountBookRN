import React from "react"
import { gql, useMutation } from "@apollo/client"
import { useForm } from "react-hook-form"
import styled from "styled-components"
import { View, Text, Button } from "react-native"
import ButtonTemp from "./main/ButtonTemp"

const CREATE_CONTENT_MUTATION = gql`
  mutation addContents(
    $product: String!
    $price: Int!
    $text: String
    $date: Int! # $sign: Boolean # $userId: Int
  ) {
    addContents(
      product: $product
      price: $price
      text: $text
      date: $date # sign: $sign # userId: $userId
    ) {
      result
      error
    }
  }
`

const CreateContents = ({ navigation }) => {
  const { register, handleSubmit, setValue, watch } = useForm()
  const onCompleted = (data) => {
    const {
      addContents: { result, error },
    } = data
    if (result) {
      navigation.navigate("Content", {})
    } else {
      alert(error)
    }
  }
  // const updateContents = (cache, result) => {
  //   const {
  //     data: {
  //       addContents: { result, error}
  //     }
  //   }
  // }
  const [createContentMutation, { loading }] = useMutation(
    CREATE_CONTENT_MUTATION,
    {
      onCompleted,
    }
  )
  const onData = (data) => {
    if (!loading) {
      console.log("data : ", data)
      try {
        createContentMutation({
          variables: {
            date: Number(data.date),
            price: Number(data.price),
            product: data.product,
            text: data.text,
          },
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <Views>
      <TextInput
        value={watch("product")}
        placeholder="Product"
        autoCapitalize="none"
        onChangeText={(text) => setValue("product", text)}
      />
      <TextInput
        value={watch("date")}
        placeholder="Date"
        autoCapitalize="none"
        onChangeText={(text) => setValue("date", text)}
      />
      <TextInput
        value={watch("price")}
        placeholder="Price"
        autoCapitalize="none"
        onChangeText={(text) => setValue("price", text)}
      />
      <TextInput
        value={watch("text")}
        placeholder="Text"
        autoCapitalize="none"
        onChangeText={(text) => setValue("text", text)}
      />
      <ButtonTemp text="제출" disabled={false} onPress={handleSubmit(onData)} />
    </Views>
  )
}

export default CreateContents

const TextInput = styled.TextInput`
  width: 60%;
  padding: 15px 7px;
  margin-bottom: 8px;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 800;
  /* margin-bottom: ${(props) => (props.lastOne ? 15 : 8)}px; */
  background-color: rgba(50, 120, 200, 0.3);
  color: rgba(0, 0, 0, 0.6);
`
const Views = styled.View`
  margin-top: 150px;
`
