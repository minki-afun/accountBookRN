import React from "react"
import { View, Text, ActivityIndicator } from "react-native"
import styled from "styled-components/native"

const ButtonTemp = ({ onPress, disabled, text, loading }) => {
  return (
    <Button disabled={disabled} onPress={onPress}>
      <ButtonText>{text}</ButtonText>
    </Button>
  )
}

export default ButtonTemp

const Button = styled.TouchableOpacity`
  background-color: rosybrown;
  padding: 15px 10px;
  margin-top: 20px;
  width: 60%;
  padding: 15px 10px;
  border-radius: 7px;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`

const ButtonText = styled.Text`
  text-align: center;
  font-weight: 800;
  font-size: 15px;
  color: white;
`
