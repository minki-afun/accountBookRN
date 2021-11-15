import React from "react"
import styled from "styled-components/native"

const Container = styled.View`
  flex: 1;
`
const Active = styled.ActivityIndicator`
  flex: 1;
  align-items: center;
  justify-content: center;
`

// 로딩시 로딩이미지를 위해 ActivityIndicator 사용
export default function ScreenLayout({ loading, children }) {
  return <Container>{loading ? <Active color="black" /> : children}</Container>
}
