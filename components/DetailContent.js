import { gql, useQuery } from "@apollo/client"
import React from 'react'
import { Button, FlatList, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components'
import { tokenDecodeId } from '../apollo'
import ContentLayout from './main/ContentLayout'

const DETAIL_CONTENT_QUERY = gql`
  query detailContent($id:Int!){
    detailContent(id:$id){
    id
    date
    product
    price
    text
    userId
    createdAt
    updatedAt
    }
  }
`

const DetailContent = ({navigation, route})=> {
  console.log(route.params.item)
  const {date, id, price, product, text, createdAt, updatedAt} = route.params.item
  const EditContent = () => navigation.navigate("EditContent")
  const {loading, error, data} = useQuery(DETAIL_CONTENT_QUERY, {
    variables:{userId: tokenDecodeId()}
  })
    if(loading){
      return(
        <View>
          <Text>"Loading..."</Text>
        </View>
      )
    }
    if(error){
      <View>
        <Text>"ERROR"</Text>
      </View>
    }
  return (
    <DetailContainer>
      <DetailWrapper>
        <ContentBox>
          <ContentTitle>Id: 
          <ContentSub>{id}</ContentSub>
          </ContentTitle>
        </ContentBox>
        <ContentBox>
          <ContentTitle>거래 날짜: </ContentTitle>
          <ContentSub>{date}</ContentSub>
        </ContentBox>
        <ContentBox>
          <ContentTitle>거래명: </ContentTitle>
          <ContentSub>{product}</ContentSub>
        </ContentBox>
        <ContentBox>
          <ContentTitle>금액: </ContentTitle>
          <ContentSub>{price}</ContentSub>
        </ContentBox>
        <ContentBox>
          <ContentTitle>내용: </ContentTitle>
          <ContentSub>{text}</ContentSub>
        </ContentBox>
        <ContentBox>
          <ContentTitle>최초작성일: </ContentTitle>
          <ContentSub>{createdAt}</ContentSub>
        </ContentBox>
        <ContentBox>
          <ContentTitle>수정일: </ContentTitle>
          <ContentSub>{updatedAt}</ContentSub>
        </ContentBox>

      </DetailWrapper>
      <BtnWrapper>
        <BtnClose onPress={()=> navigation.navigate("Content")}>
          <BtnText>Close</BtnText>
        </BtnClose>
        <BtnSubmit onPress={()=>navigation.navigate("EditContent")} >
          <BtnText>Edit</BtnText>
        </BtnSubmit>
      </BtnWrapper>
    </DetailContainer>
  )
}


export default DetailContent

const DetailContainer = styled.View`
  width: 90%;
  height: 80%;
  margin:auto;
  `
const DetailWrapper = styled.View`
  margin-bottom: 20px;
`
const ContentBox = styled.Text`
  border-radius:5px;
  background-color: #D4F1F4;
  height:6%;
  margin-bottom:20px;
  justify-content:center;
  border:1px solid #000;
  height: 30px;
  `
const ContentTitle = styled.Text`
  text-align:left;
  font-size:18px;
  font-weight:800;
  
  `
const ContentSub = styled.Text`
  text-align:center;
  font-weight:400;
  font-size:18px;
`
const BtnSubmit = styled.TouchableOpacity`
  background-color: #75E6DA;
  padding: 15px 7px;
  width: 100px;
  border-radius: 10px;
`
const BtnClose = styled.TouchableOpacity`
  background-color: #4C5270;
  padding: 15px 7px;
  width: 100px;
  border-radius: 10px;
  `
  const BtnText = styled.Text`
  font-weight: bold;
  text-align:center;
  color:#fff;
  font-size:20px;
  `
const BtnWrapper = styled.View`
  flex-direction:row;
  justify-content:space-around;
  `