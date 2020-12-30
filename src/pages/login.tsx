import React, { useState } from 'react';
import { ActivityIndicator } from "react-native";
import styled from 'styled-components/native';
import Colors from '../constants/colors';

interface Props {
  setUserLogin: any
}

const LoginScreen = ({ setUserLogin }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const _logInUser = () => {
    setLoading(true);
    setTimeout(() => {
      setUserLogin(true);
    }, 3000);
  }
  return (
    <>
      <Screen>
        {
          loading ? <ActivityIndicator size={50} color={Colors.blue} /> :
            <SignInButton onPress={_logInUser} activeOpacity={0.3} >
              <SignInText>Log in</SignInText>
            </SignInButton>
        }
      </Screen>
    </>
  );
};

const Screen = styled.View`
  flex: 1;
  paddingHorizontal : 32px;
  paddingBottom: 64px;
  justifyContent : flex-end;
`


const SignInButton = styled.TouchableOpacity`
borderRadius : 8px;
height : 40px;
justifyContent : center;
alignItems : center;
backgroundColor : ${Colors.blue};
`

const SignInText = styled.Text`
fontWeight : bold;
fontSize : 18px;
color : white;
`


export default LoginScreen;
