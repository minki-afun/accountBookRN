import React from "react"
import { gql, useMutation } from "@apollo/client"
import { useForm } from "react-hook-form"
import styled from "styled-components"
import { View, Text, Button } from "react-native"
import ButtonTemp from "./main/ButtonTemp"

const EDIT_CONTENT_MUTATION = gql`
  mutation editContent(
    $id:Int!, 
    $product:String!, 
    $price:Int!, 
    $text:String, 
    $date:Int!
    ) {
    editContent(
      id:$id,
      product:$product,
      price:$price,
      text:$text,
      date:$date
    ){
      result
      error
    }
  }
`

const EditContent = ({navigation}) => {
  const {register, handleSubmit, setValue, watch} = useForm()
  const onCompleted = (data) => {
    const {
      editContent: {result, error},
    } = data
    if(result) {
      navigation.novigate("DetailContent",{})
    } else {
      alert(error)
    }
  }
}

export default EditContent
