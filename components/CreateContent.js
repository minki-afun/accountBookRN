import { gql, useMutation } from "@apollo/client"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import styled from "styled-components"
import { View, Text, Button } from "react-native"
import ButtonTemp from "./main/ButtonTemp"

const CREATE_CONTENT_MUTATION = gql`
  mutation addContents(
    $product: String!
    $price: Int!
    $text: String
    $date: Int! # $sign: Boolean
  ) # $userId: Int
  {
    addContents(
      product: $product
      price: $price
      text: $text
      date: $date # sign: $sign
    ) # userId: $userId
    {
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
    console.log(data)
    const {
      addContents: { result, error },
    } = data
    console.log("area2")
    // const { product, price, text, date, sign, userId } = watch()
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
    console.log(data)
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
    register("product", {
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
        value={watch("date")}
        placeholder="거래 날짜"
        placeholderTextColor="rgba(0,0,0,0.6)"
        returnKeyType="next"
        autoCapitalize="none"
        keyboardType="numeric"
        onChangeText={(text) => setValue("date", text)}
      />
      <AddContentText
        value={watch("product")}
        placeholder="표기될 거래 내용명"
        placeholderTextColor="rgba(0,0,0,0.6)"
        returnKeyType="next"
        autoCapitalize="none"
        onChangeText={(text) => setValue("product", text)}
      />
      <AddContentText
        value={watch("price")}
        placeholder="금액"
        placeholderTextColor="rgba(0,0,0,0.6)"
        returnKeyType="next"
        autoCapitalize="none"
        keyboardType="numeric"
        onChangeText={(text) => setValue("price", text)}
      />
      <AddContentSub
        value={watch("text")}
        placeholder="거래 내용"
        placeholderTextColor="rgba(0,0,0,0.6)"
        returnKeyType="next"
        autoCapitalize="none"
        onChangeText={(text) => setValue("text", text)}
      />
      <BtnWrapper>
        <BtnClose onPress={() => navigation.navigate("Content")}>
          <BtnText>Close</BtnText>
        </BtnClose>
        <ButtonTemp
          text="Submit"
          disabled={false}
          onPress={handleSubmit(submitData)}
        />
        {/* <BtnSubmit
          onPress={handleSubmit(submitData)}
        >
          <BtnText>Submit</BtnText>
        </BtnSubmit> */}
      </BtnWrapper>
    </AddContainer>
  )
}

export default CreateContent

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
