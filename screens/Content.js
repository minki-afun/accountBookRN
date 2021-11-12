import React from "react"
import ContentLayout from "../components/main/ContentLayout"
import { gql, useQuery } from "@apollo/client"
import { userId } from "../screens/User"
import { tokenDecodeId } from "../apollo"
import { Button, FlatList, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import styled from "styled-components"
import ListItem from "../components/ListItem"

// query 연결
const CONTENT_QUERY = gql`
  query seeContents($userId: Int!) {
    seeContents(userId: $userId) {
      id
      product
      price
      sign
      text
      date
      total
      plusTotal
      minusTotal
      createdAt
      updatedAt
    }
  }
`

const Content = ({ navigation }) => {
  const AddContent = () => navigation.navigate("CreateContent")
  // const DetailContent = () => navigation.navigate("DetailContent")
  const { loading, error, data } = useQuery(CONTENT_QUERY, {
    variables: { userId: tokenDecodeId() },
  })
  // console.log(data)
  if (loading) {
    return (
      <View>
        <Text>"Loading..."</Text>
      </View>
    )
  }
  // if (error) {
  //   return (
  //     <View>
  //       <Text>"ERROR"</Text>
  //     </View>
  //   )
  // }
  // const renderContents = ({ item }) => (

  //   <DataContainer>
  //     <DataTouchable
  //      onPress={DetailContent}
  //     >
  //       <DataWrapper>
  //         <DataSub>{item.date}</DataSub>
  //         <DataSub>{item.product}</DataSub>
  //         <DataSub>{item.price}</DataSub>
  //       </DataWrapper>
  //     </DataTouchable>
  //   </DataContainer>
  // )

  return (
    <ContentLayout>
      <SafeAreaView>
        <FlatList
          ListHeaderComponent={
            <DataWrapper>
              <DataTitle>날짜</DataTitle>
              <DataTitle>목록</DataTitle>
              <DataTitle>금액</DataTitle>
            </DataWrapper>
          }
          data={data?.seeContents}
          renderItem={({ item }) => {
            return <ListItem item={item} navigation={navigation} />
          }}
          // renderItem={renderContents}
          keyExtractor={(data) => data?.id}
          onPress={AddContent}
        />
        <Button title="가계부 추가" onPress={AddContent} />
      </SafeAreaView>
    </ContentLayout>
  )
}

export default Content

const DataContainer = styled.View`
  margin-top: 5px;
  display: flex;
  text-align: right;
  flex-direction: column;
`
const DataWrapper = styled.View`
  flex-direction: row;
  justify-content: space-around;
  text-align: right;
`
const DataTouchable = styled.TouchableOpacity`
  text-align: right;
  border-top-color: #b9b7bd;
  border-top-width: 1px;
  &:last-child {
    border-bottom-color: #b9b7bd;
    border-bottom-width: 1px;
  }
  margin-bottom: 2px;
  padding-top: 2px;
`
const DataTitle = styled.Text`
  text-align: right;
  font-size: 18px;
  font-weight: bold;
  margin: 0 15px 15px 15px;
`
const DataSub = styled.Text`
  margin: 5px 15px 5px 10px;
  font-size: 18px;
  text-align: right;
`
