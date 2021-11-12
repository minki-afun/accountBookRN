import React from 'react'
import { Text, View } from 'react-native'
import styled from 'styled-components'

const ListItem = ({item, navigation}) => {
  const DetailContent = () => navigation.navigate("DetailContent",{
    item
  })

return (
    <DataContainer>
      <DataTouchable
       onPress={DetailContent}
      >
        <DataWrapper>
          <DataSub>{item.date}</DataSub>
          <DataSub>{item.product}</DataSub>
          <DataSub>{item.price}</DataSub>
        </DataWrapper>
      </DataTouchable>
    </DataContainer>
)
  
}

export default ListItem

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
