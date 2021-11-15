import React from "react"
import LogoLayout from "../components/main/LogoLayout"
import ButtonTemp from "../components/main/ButtonTemp"

const Main = ({ navigation }) => {
  const goLogin = () => navigation.navigate("Login")
  const goRegister = () => navigation.navigate("Register")
  return (
    <LogoLayout>
      <ButtonTemp onPress={goLogin} text="Login" />
      <ButtonTemp onPress={goRegister} text="Register" />
    </LogoLayout>
  )
}

export default Main
