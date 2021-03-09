import React from 'react';
import { Text, View, FlatList } from 'react-native';
import Icons from "react-native-vector-icons/MaterialIcons";
import styled from 'styled-components/native';
import Colors from '../constants/colors';

const StopsScreen = ({ route }) => {

  const { source, destination, number, stops } = route.params.busstats;
  // console.log(route.params);

  return <SSCreen>
    <TopContainer>
      <BusNumer>
        {number}
      </BusNumer>
      <Row>
        <SrcDestNames>
          {source}
        </SrcDestNames>
        <Icons name="arrow-right-alt" size={36} color="#FFFFFF" />
        <SrcDestNames>
          {destination}
        </SrcDestNames>
      </Row>
    </TopContainer>
    <BottomContainer>
      <ButStop>
        Bus stops
      </ButStop>
      <FlatList
        data={stops}
        renderItem={({ item }) => <StopsContainer key={item.name} crossed={item.crossed} >
          {item.crossed ? <Icons size={18} name="radio-button-checked" color={Colors.green} />
            : <Icons size={18} name="radio-button-unchecked" color={Colors.green} />}
          <Time>{item.crossed ? "Crossed" : item.eta}</Time>
          <StopName>{item.name}</StopName>
        </StopsContainer>}
      />
    </BottomContainer>
  </SSCreen>
}

const SSCreen = styled.View`
flex : 1;
backgroundColor : ${Colors.blue};
`
const TopContainer = styled.View`
height : 150px;
display : flex;
flexDirection : column;
alignItems : center;
justifyContent: center;
`

const BusNumer = styled.Text`
fontSize : 24px;
fontWeight : bold;
color : #FFFFFF;
paddingBottom : 16px;
`

const Row = styled.View`
display : flex;
flexDirection : row;
`

const SrcDestNames = styled.Text`
paddingHorizontal : 8px;
fontSize : 24px;
fontWeight : bold;
color : #FFFFFF;
`

const BottomContainer = styled.View`
flex : 1;
flexDirection : column;
alignItems : center;
backgroundColor : #FFFFFF;
borderTopLeftRadius : 50px;
borderTopRightRadius : 50px;
paddingHorizontal : 24px;
paddingTop : 8px;
`

const ButStop = styled.Text`
fontSize : 18px;
fontWeight : bold;
textAlign : center;
color : #000000;
marginBottom : 8px;
`

const StopsContainer = styled.View`
display : flex;
flexDirection : row;
paddingVertical : 16px;
opacity :  ${props => props.crossed ? 0.4 : 1}
`

const StopName = styled.Text`
fontSize : 18px;
paddingHorizontal : 16px;
`

const Time = styled.Text`
fontSize : 18px;
paddingHorizontal : 16px;
`


export default StopsScreen;