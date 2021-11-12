import React from "react"
import { gql, useMutation } from "@apollo/client"
import { useForm } from "react-hook-form"
import styled from "styled-components"
import { View, Text, Button } from "react-native"
import ButtonTemp from "./main/ButtonTemp"
import { CommonActions } from "@react-navigation/native"

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
      navigation.dispatch(CommonActions.navigate("Content"))
      // navigation.navigate("Content")
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
    <AddContainer>
      <AddContentText
        value={watch("date")}
        placeholder="거래 날짜"
        autoCapitalize="none"
        onChangeText={(text) => setValue("date", text)}
      />
      <AddContentText
        value={watch("product")}
        placeholder="표기될 거래 내용명"
        autoCapitalize="none"
        onChangeText={(text) => setValue("product", text)}
      />
      <AddContentText
        value={watch("price")}
        placeholder="금액"
        autoCapitalize="none"
        onChangeText={(text) => setValue("price", text)}
      />
      <AddContentSub
        value={watch("text")}
        placeholder="거래 내용"
        autoCapitalize="none"
        onChangeText={(text) => setValue("text", text)}
      />
      <BtnWrapper>
        <BtnClose onPress={() => navigation.navigate("Content")}>
          <BtnText>Close</BtnText>
        </BtnClose>
        <BtnSubmit onPress={handleSubmit(onData)}>
          <BtnText>Submit</BtnText>
        </BtnSubmit>
      </BtnWrapper>
      {/* <ButtonTemp text="제출" disabled={false} onPress={handleSubmit(onData)} /> */}
    </AddContainer>
  )
}

export default CreateContents

// const TextInput = styled.TextInput`
//   width: 60%;
//   padding: 15px 7px;
//   margin-bottom: 8px;
//   border-radius: 5px;
//   font-size: 15px;
//   font-weight: 800;
//   /* margin-bottom: ${(props) => (props.lastOne ? 15 : 8)}px; */
//   background-color: rgba(50, 120, 200, 0.3);
//   color: rgba(0, 0, 0, 0.6);
// `
// const Views = styled.View`
//   margin-top: 150px;
// `

const AddContainer = styled.View`
  justify-content: center;
  text-align: center;
  margin: auto;
`
const AddContentText = styled.TextInput`
  padding: 15px 7px;
  margin-bottom: 10px;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 800;
  margin-bottom: ${(props) => (props.lastOne ? 15 : 8)}px;
  background-color: #d4f1f4;
  color: rgba(0, 0, 0, 0.6);
  height: 40px;
  border-width: 1px;
  width: 250px;
  text-align: center;
  padding: 10px;
`
const AddContentSub = styled.TextInput`
  padding: 15px 7px;
  margin-bottom: 8px;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 800;
  margin-bottom: ${(props) => (props.lastOne ? 15 : 8)}px;
  background-color: #d4f1f4;
  color: rgba(0, 0, 0, 0.6);
  height: 300px;
  border-width: 1px;
  width: 250px;
  text-align: center;
  white-space:normal;
`

const BtnSubmit = styled.TouchableOpacity`
  background-color: #75e6da;
  padding: 15px 7px;
  width: 100px;
  border-radius: 10px;
`
const BtnClose = styled.TouchableOpacity`
  background-color: #4c5270;
  padding: 15px 7px;
  width: 100px;
  border-radius: 10px;
`
const BtnText = styled.Text`
  font-weight: bold;
  text-align: center;
  color: #fff;
  font-size: 20px;
`
const BtnWrapper = styled.View`
  flex-direction: row;
  justify-content: space-around;
`
