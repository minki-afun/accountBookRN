import React, { useState } from "react"
import { View, Text, Button } from "react-native"
import { Modal } from "react-native-modals"
import styled from "styled-components/native"

const Wrapper = () => {
  const [isModalVisible, setModalVisible] = useState(false)
  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }
  return (
    <View style={{ flex: 1 }}>
      <Button title="버전정보" onPress={toggleModal} />
      <Modal visible={isModalVisible}>
        <ModalView>
          <ShowText>Ver. 0.0.1</ShowText>
          <ButtonShow title="확인" onPress={toggleModal} />
        </ModalView>
      </Modal>
    </View>
  )
}

export default Wrapper

const ModalView = styled.View`
  width: 180px;
  padding: 10px 10px;
  align-items: center;
  justify-content: center;
`

const ShowText = styled.Text`
  margin-bottom: 5px;
  padding: 10px 10px;
`

const ButtonShow = styled.Button``
