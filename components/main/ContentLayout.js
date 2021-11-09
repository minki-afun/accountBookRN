import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useEffect, useState } from "react"
import { View, Text, Button } from "react-native"
import { isLoggedInVar, logUserOut, tokenVar } from "../../apollo"
import styled from "styled-components/native"


function ContentLayout() {
  return (
    <Container>
    <Wrapper>
      <WrapperInner>
        <AppTitle>
          <Text>수입</Text>
        </AppTitle>
        <AppSub1>0</AppSub1>
      </WrapperInner>

      <WrapperInner>
        <AppTitle>
          <Text>지출</Text>
        </AppTitle>
        <AppSub2>0</AppSub2>
      </WrapperInner>

      <WrapperInner>
        <AppTitle>
          <Text>합계</Text>
        </AppTitle>
        <AppSub3>0</AppSub3>
      </WrapperInner>

    </Wrapper>
    <Card>
      <AddButton title="가계부 등록" onPress={() => Submit()}>
      </AddButton>
    </Card>
  </Container>
  )
}

  const Container = styled.View`
    flex: 1;
    background-color: #444444;
  `
  const Wrapper = styled.View`
    margin-top: 30;
    margin-bottom: 10;
    margin-left: 30;
    margin-right: 30;
    flex-direction: row;
    justify-content: space-between;
    text-align: center;
  `
  const WrapperInner = styled.View`
    text-align: center;
    padding: 0;
  `
  const AppTitle = styled.Text`
    color: #fff;
    font-size: 18;
    font-weight: 500;
  `
  const AppSub1 = styled.Text`
    color: tomato;
    margin-bottom: 10;
    margin-top: 7;
    text-align: center;
    justify-content: center;
    font-weight: 500;
    font-size: 18;
  `
  const AppSub2 = styled.Text`
    font-size: 18;
    font-weight: 500;
    color: #7EC8E3;
    margin-bottom: 10;
    margin-top: 7;
    text-align: center;
    justify-content: center;
  `
  const AppSub3 = styled.Text`
    margin-top: 7;
    font-size: 18;
    font-weight: 500;
    text-align: center;
    justify-content: center;
    color: #fff;
    margin-bottom: 10;
  `
  const Card = styled.View`
    background-color: #fff;
    flex: 2;
    border-top-left-radius: 10;
    border-top-right-radius: 10;
    margin-right: 10;
    margin-left: 10;
  `
  const AddButton = styled.Button`
    flex: 1;
    /* font-size:2; */
    border: 1px solid blue;
    /* border-radius: 1; */
     
  `
export default ContentLayout