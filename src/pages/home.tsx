import React from 'react';
import { View } from 'react-native';
import Icons from "react-native-vector-icons/MaterialIcons";
import styled from 'styled-components/native';
import Colors from '../constants/colors';

const HomeScreen = () => {
  return (
    <>
      <HScreen>
        <SearchBoxContainer>
          <FromInput placeholder={"From : Source location"} />
          <ToInput placeholder={"From : Destination location"} />
          <SearchButton >
            <View style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center"
            }} >
              <SearchText >Search</SearchText>
              <Icons name="search" size={18} color="#FFFFFF" />
            </View>
          </SearchButton>
          <AvailableBuses>
            Available buses
        </AvailableBuses>
        </SearchBoxContainer>
        <BusListContainer>
          <BusTile>
            <BusNumber>
              54F
            </BusNumber>
            <View style={{
              display: "flex",
              flexDirection: "row"
            }} >
              <CurrenLocation>
                Adayar
            </CurrenLocation>
              <ETA>
                25 mins
            </ETA>
            </View>
          </BusTile>
        </BusListContainer>
      </HScreen>
    </>
  );
};

const SearchBoxContainer = styled.View`
paddingHorizontal : 24px;
`

const HScreen = styled.View`
  flex : 1
  backgroundColor : #FFFFFF;     
`

const FromInput = styled.TextInput`
marginVertical : 8px;
height : 48px;
fontSize : 18px;
fontWeight : bold;
paddingHorizontal : 8px;
borderColor: transparent;
backgroundColor : ${Colors.smoke};
`

const ToInput = styled.TextInput`
marginVertical : 8px;
height : 48px;
fontSize : 18px;
paddingHorizontal : 8px;
fontWeight : bold;
borderColor: transparent;
backgroundColor : ${Colors.smoke};
`

const SearchButton = styled.TouchableOpacity`
marginVertical : 12px;
borderRadius : 8px;
height : 40px;
justifyContent : center;
alignItems : center;
backgroundColor : ${Colors.blue};
`

const SearchText = styled.Text`
fontWeight : bold;
fontSize : 18px;
color : #FFFFFF;
marginRight : 8px;
`

const AvailableBuses = styled.Text`
fontSize : 18px;
fontWeight : 700;
paddingVertical : 8px;
`

const BusListContainer = styled.View`
flex : 1;
paddingTop : 8px;
backgroundColor : ${Colors.smoke};
paddingHorizontal : 24px;
`

const BusTile = styled.View`
height : 80px;
backgroundColor : #FFFFFF;
borderRadius : 8px;
marginVertical : 8px;
paddingVertical : 16px;
paddingHorizontal : 16px;
`

const BusNumber = styled.Text`
fontSize : 20px;
fontWeight : bold;
`
const CurrenLocation = styled.Text`
fontSize : 16px;
paddingRight : 8px;
fontWeight : bold;

`
const ETA = styled.Text`
fontSize : 16px;
fontWeight : bold;
opacity : 0.6;
`

export default HomeScreen;