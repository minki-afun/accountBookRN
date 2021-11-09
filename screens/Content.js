
import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useEffect, useState } from "react"
import { View, Text, Button } from "react-native"
import { isLoggedInVar, logUserOut, tokenVar } from "../apollo"
import styled from "styled-components"
import ContentLayout from "../components/main/ContentLayout"
import { gql, useMutation, useQuery } from "@apollo/client"

// query 연결
const CONTENT_QUERY = gql`
  query seeContents($id: Int!) {
  seeContents(id:$id){
    product
    price
    sign
    date
    total
    plusTotal
    minusTotal
  }
}
`

const Content = () => { 
  const {loading, error, data} = useQuery(CONTENT_QUERY,{
    variables: {
      id: 2
    }
  });
  
  console.log("===============")
  console.log(loading);
  console.log(error);
  console.log(data);
  console.log("===============")
  
  // let test = ``;
  // if(seeContents(id)){
  // test = product.seeContents.map((item, index) => {
  //   <Text key={index}>{item.id} / {item.product}</Text>
  // })
  // }
  return (
    <ContentLayout>
      {/* {test} */}
    </ContentLayout>
  )
}

export default Content
