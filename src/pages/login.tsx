import React from 'react';
import styled from 'styled-components/native';
import Colors from '../constants/colors';

interface Props {
  setUserLogin: any
}

const LoginScreen = ({ setUserLogin }: Props) => {
  return (
    <>
      <Screen>
        <SignInButton onPress={() => {
          setUserLogin(true);
        }} activeOpacity={0.3} >
          <SignInText>Log in</SignInText>
        </SignInButton>
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
`


export default LoginScreen;
