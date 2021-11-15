import React from 'react'
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { CommonActions } from "@react-navigation/routers"
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { tokenDecodeId } from '../apollo'

const DELETE_CONTENT_MUTATION = gql`
  mutation deleteContent($id:Int!){
  deleteContent(id:$id){
    result
    error
  }
}
`
const DeleteContents = ({navigation, dltid}) => {
  const {register, handleSubmit, setValue, watch} = useForm()
  // 제출 후 데이터 결과 및 처리과정
  const onCompleted = (data) => {
    const {
      deleteContent: {result, error},
    } = data
    if(result){
      navigation.navigate("Content");
    }else{
      alert(error)
    }
  }
  // grapql 연결
  const [deleteContentMutation, {loading}] = useMutation(
    DELETE_CONTENT_MUTATION,
    {
      onCompleted
    }
  )
  console.log('1111111++++',dltid)
  const onData = (data) => {
    // console.log(data)
    if(!loading){ 
        deleteContentMutation({
          variables:{
            id: dltid,
          }
        })
    }
  }
  
  return(
    <BtnDelete onPress={handleSubmit(onData)}>
      <BtnText>Delete</BtnText>
    </BtnDelete>
  )
}


export default DeleteContents

const BtnDelete = styled.TouchableOpacity`
  background-color: tomato;
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