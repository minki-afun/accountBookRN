import React from "react"
import { gql, useMutation } from "@apollo/client"
import { useForm } from "react-hook-form"
import styled from "styled-components"
import { CommonActions } from "@react-navigation/routers"
import { useState } from "react"

const EDIT_CONTENT_MUTATION = gql`
  mutation editContent(
    $id: Int!
    $product: String!
    $price: Int!
    $text: String
    $date: Int!
  ) {
    editContent(
      id: $id
      product: $product
      price: $price
      text: $text
      date: $date
    ) {
      result
      error
    }
  }
`

const EditContent = ({ navigation, route }) => {
  // console.log(route)
  const { register, handleSubmit, setValue, watch } = useForm()

  const onCompleted = (data) => {
    const {
      editContent: { result, error },
    } = data
    if (result) {
      navigation.dispatch(CommonActions.navigate("Content"))
    } else {
      alert(error)
    }
  }

  const [editContentMutation, { loading }] = useMutation(
    EDIT_CONTENT_MUTATION,
    {
      onCompleted,
    }
  )
  const onData = (data) => {
    // console.log(data)
    if (!loading) {
      try {
        editContentMutation({
          variables: {
            id: Number(route?.params?.id),
            date: Number(data.date),
            price: Number(data.price),
            product: data.product,
            text: data.text,
            sign: data.sign,
          },
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
  //수입 지출 표시를 위한 Boolean 값 변환
  const [isEnabled, setIsEnabled] = useState(false)
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
      <BtnToggle
        onPress={() => {
          setIsEnabled(!isEnabled)
          setValue("sign", isEnabled)
        }}
      >
        <BtnText>{isEnabled ? "지출" : "수입"}</BtnText>
      </BtnToggle>
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
    </AddContainer>
  )
}

export default EditContent

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
  /* white-space:normal; */
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
const BtnToggle = styled.TouchableOpacity`
  background-color: ${(props) => (props.isEnabled ? "#75e6da" : "#4c5270")};
  width: 100px;
  height: 30px;
  border-radius: 5px;
  text-align: center;
  justify-content: center;
  margin: auto;
  margin-bottom: 10px;
`
const ContentBox = styled.View`
  border-radius: 5px;
  background-color: #d4f1f4;
  margin-bottom: 20px;
  border: 1px solid #000;
  height: 30px;
`
const ContentTitle = styled.Text`
  text-align: left;
  font-size: 18px;
  font-weight: 800;
  padding: 3px 7px;
`
const ContentSub = styled.Text`
  text-align: center;
  font-weight: 400;
  font-size: 18px;
`
