import { gql, useQuery, userQuery } from "@apollo/client"
import React from "react"
import { View, Text } from "react-native"
import styled from "styled-components/native"

const LOOK_BALANCE = gql`
  query seeBalance($userId: Int!) {
    seeBalance(userId: $userId) {
      total
      minusTotal
      plusTotal
    }
  }
`

const Balance = ({ userId }) => {
  // apollo useQuery 보기
  const { loading, error, data } = useQuery(LOOK_BALANCE, {
    variables: { userId },
  })
  return (
    <BalanceView>
      <TitleText>누적잔액</TitleText>
      <TitleTextDiv>합계</TitleTextDiv>
      <TextBody style={{ color: "black" }}>{data?.seeBalance.total}</TextBody>
      <TitleTextDiv>수입</TitleTextDiv>
      <TextBody style={{ color: "red" }}>{data?.seeBalance.plusTotal}</TextBody>
      <TitleTextDiv>지출</TitleTextDiv>
      <TextBody style={{ color: "blue" }}>
        {data?.seeBalance.minusTotal}
      </TextBody>
    </BalanceView>
  )
}

export default Balance

const BalanceView = styled.View`
  width: 100%;
  margin: 0 auto;
  background-color: rgba(50, 80, 170, 0.3);
  margin-top: 20px;
  border-radius: 20px;
  padding: 15px 7px;
`
const TitleText = styled.Text`
  color: white;
  font-weight: 800;
  font-size: 30px;
  margin-bottom: 20px;
`

const TitleTextDiv = styled.Text`
  color: white;
  font-weight: 800;
  font-size: 30px;
  margin-bottom: 5px;
`

const TextBody = styled.Text`
  color: white;
  font-weight: 800;
  font-size: 25px;
  text-align: right;
  padding-right: 10px;
`
