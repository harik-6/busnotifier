import { BabelFileModulesMetadata } from '@babel/core';
import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { View } from 'react-native';
import Icons from "react-native-vector-icons/MaterialIcons";
import styled from 'styled-components/native';
import Colors from '../constants/colors';
import { Bus } from '../models/bus.model';
import searchAvailability from './search.service';

interface Props {
  navigation: any
};

const HomeScreen = ({ navigation }: Props) => {
  const [source, setSource] = useState("");
  // const [destination, setDistination] = useState("");
  const [nobus, setNoBus] = useState(false);
  const [buslist, setbuslist] = useState<Array<Bus>>([]);
  const [isloading, setLoading] = useState(false);

  const searchBusRoute = () => {
    setNoBus(false);
    setLoading(true);
    const buses: Array<any> = searchAvailability(source);
    setTimeout(() => {
      setLoading(false);
      if (buses.length == 0) {
        setNoBus(true);
        return;
      }
      setbuslist(buses);
    }, 3000)
  }

  const getFormattedEta = (dateFuture: any) => {
    const dateNow: any = new Date();
    const seconds: number = Math.floor((dateFuture - (dateNow)) / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    hours = hours - (days * 24);
    minutes = minutes - (days * 24 * 60) - (hours * 60);
    return minutes;
  }

  const handleChange = (e: any) => {
    setSource(e);
  }

  return (
    <>
      <HScreen>
        <SearchBoxContainer>
          <SearchByBusNUmber>
            Enter bus number
          </SearchByBusNUmber>
          <FromInput
            value={source}
            onChangeText={handleChange}
            placeholder={"Search by bus number"} />
          {/* <ToInput
            value={destination}
            onChange={(e: any) => setDistination(e.target.value)}
            placeholder={"To : Destination location"} /> */}
          <SearchButton onPress={searchBusRoute} >
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
            {buslist.length > 0 ? "Available buses" : ""}
          </AvailableBuses>
        </SearchBoxContainer>
        {
          isloading ? <NoBusContainer>
            <ActivityIndicator size={50} color={Colors.blue} />
          </NoBusContainer> :

            nobus ? (
              <NoBusContainer>
                <NoBusText>Sorry, No buses available for the selected bus number</NoBusText>
              </NoBusContainer>
            ) : buslist.length === 0 ? (
              <NoBusContainer>
                <NoBusText>Search by bus number by check availability</NoBusText>
              </NoBusContainer>
            ) : (
                  <BusListContainer>
                    {
                      buslist.map((bus, index) => (
                        <BusTile key={bus.currentStop + index}>
                          <View style={{
                            display: 'flex',
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between"
                          }} >
                            <View>
                              <Row style={{
                                alignItems: "center"
                              }} >
                                <BusNumber>
                                  {bus.number}
                                </BusNumber>
                                <Icons name="location-on" size={16} color={Colors.blue} />
                                <CurrenLocation>
                                  {bus.currentStop}
                                </CurrenLocation>
                              </Row>
                              <ETA>
                                {bus.eta + " Minutes"}
                              </ETA>
                            </View>
                            <Row>
                              <IconPressable onPress={() => {
                                navigation.navigate("Stops", { busstats: bus })
                              }} >
                                <Icons name="navigate-next" size={24} color={Colors.blue} />
                              </IconPressable>
                              <IconPressable >
                                <Icons name="notifications-none" size={24} color={Colors.blue} />
                              </IconPressable>
                            </Row>
                          </View>
                        </BusTile>
                      ))
                    }
                  </BusListContainer>
                )
        }

      </HScreen >
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
marginBottom : 12px;
height : 48px;
fontSize : 18px;
fontWeight : bold;
paddingHorizontal : 8px;
borderColor: transparent;
backgroundColor : ${Colors.smoke};
`

const SearchByBusNUmber = styled.Text`
fontSize : 20px;
fontWeight : bold;
lineHeight : 32px;
marginVertical : 8px;
`

// const ToInput = styled.TextInput`
// marginVertical : 8px;
// height : 48px;
// fontSize : 18px;
// paddingHorizontal : 8px;
// fontWeight : bold;
// borderColor: transparent;
// backgroundColor : ${Colors.smoke};
// `

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
paddingRight: 8px;
fontWeight : bold;
`
const CurrenLocation = styled.Text`
fontSize : 16px;
fontWeight : bold;
`

const ETA = styled.Text`
fontSize : 16px;
fontWeight : bold;
opacity : 0.6;
`

const Row = styled.View`
display : flex;
flexDirection : row;
`

const IconPressable = styled.Pressable`
paddingHorizontal : 4px;
`

const NoBusContainer = styled.View`
flex:1;
display:flex;
flexDirection:row;
justifyContent:center;
alignItems:center;
paddingHorizontal : 32px;
`

const NoBusText = styled.Text`
fontSize : 20px;
fontWeight : bold;
`

export default HomeScreen;
