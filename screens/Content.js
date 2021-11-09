import React from "react"
import ContentLayout from "../components/main/ContentLayout"
import { gql, useQuery } from "@apollo/client"
import {userId} from "../screens/User"
import { tokenDecodeId } from "../apollo"

// query 연결
const CONTENT_QUERY = gql`
  query seeContents($userId: Int!) {
  seeContents(userId:$userId){
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
const Content = ({userId}) => {

  const {loading, error, data} = useQuery(CONTENT_QUERY,{
  
  });
  console.log("===============")
  console.log(data) 
 
  console.log("===============")
  
  
  return (
    <ContentLayout>

    </ContentLayout>
  )
}

export default Content
