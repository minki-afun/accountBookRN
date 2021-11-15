import { gql, useQuery } from "@apollo/client"
import React from "react"
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
    <Container>
      <MoneyContainer>
        <MoneyTitle>수입</MoneyTitle>
        <MoneyWon>{data?.seeBalance ? data?.seeBalance.plusTotal : 0}</MoneyWon>
      </MoneyContainer>
      <MoneyContainer>
        <MoneyTitle>지출</MoneyTitle>
        <MoneyWon1>
          {data?.seeBalance ? data?.seeBalance.minusTotal : 0}
        </MoneyWon1>
      </MoneyContainer>
      <MoneyContainer>
        <MoneyTitle>합계</MoneyTitle>
        <MoneyWon2>{data?.seeBalance ? data?.seeBalance.total : 0}</MoneyWon2>
      </MoneyContainer>
    </Container>

    // <BalanceView>
    //   <TitleText>누적잔액</TitleText>
    //   <TitleTextDiv>합계</TitleTextDiv>
    //   <TextBody style={{ color: "black" }}>{data?.seeBalance.total}</TextBody>
    //   <TitleTextDiv>수입</TitleTextDiv>
    //   <TextBody style={{ color: "red" }}>{data?.seeBalance.plusTotal}</TextBody>
    //   <TitleTextDiv>지출</TitleTextDiv>
    //   <TextBody style={{ color: "blue" }}>
    //     {data?.seeBalance.minusTotal}
    //   </TextBody>
    // </BalanceView>
  )
}

export default Balance

const Container = styled.View`
  flex-direction: row;
  justify-content: center;
`
const MoneyContainer = styled.View`
  padding: 15px 10px;
  margin: 10px 15px;
  /* border: 1px solid gray; */
  border-radius: 15px;
`

const MoneyTitle = styled.Text`
  font-size: 20px;
  font-weight: 400;
`

const MoneyWon = styled.Text`
  font-size: 20px;
  margin-top: 10px;
  font-weight: 500;
  color: tomato;
`

const MoneyWon1 = styled.Text`
  font-size: 20px;
  margin-top: 10px;
  font-weight: 500;
  color: #7ec8e3;
`

const MoneyWon2 = styled.Text`
  font-size: 20px;
  margin-top: 10px;
  font-weight: 500;
`
// const BalanceView = styled.View`
//   width: 100%;
//   margin: 0 auto;
//   /* background-color: rgba(50, 80, 170, 0.3); */
//   margin-top: 20px;
//   border-radius: 20px;
//   padding: 15px 7px;
// `
// const TitleText = styled.Text`
//   /* color: white; */
//   font-weight: 800;
//   font-size: 30px;
//   margin-bottom: 20px;
// `

// const TitleTextDiv = styled.Text`
//   /* color: white; */
//   font-weight: 600;
//   font-size: 30px;
//   margin-bottom: 5px;
// `

// const TextBody = styled.Text`
//   /* color: white; */
//   font-weight: 500;
//   font-size: 25px;
//   text-align: right;
//   padding-right: 10px;
// `
