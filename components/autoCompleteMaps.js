import React,{Component} from 'react';
import { View, Image,Text,StyleSheet, TouchableOpacity, Dimensions, AsyncStorage } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocode from "react-geocode"
import MapView from 'react-native-maps'
const geoApi='***********ENTER YOUR GOOGLE-API HERE************'

Geocode.setApiKey(geoApi)

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
 
export default class GooglePlacesInput extends Component {
   constructor(){
    console.ignoredYellowBox = ['Warning:']
     super()
     this.state={ 
       city:'',
       stae:'',
       country:'',
       latitude:0,
       longitude:0
     }
   }
   
  componentWillUnmount(){
    let cordi={"city":this.state.city,"state":this.state.stae,"country":this.state.country}
    const{params}=this.props.navigation.state;
    params.getHomedata(cordi)
 } 


    render(){
          return (
                    <View style={styles.container}>
                      <View style={styles.loginbox} >
                          <TouchableOpacity onPress={() =>this.props.navigation.goBack()}   >
                            <Image style={styles.img} source={require('../assets/images/back_black.png')}></Image>
                          </TouchableOpacity>
                          <Text style= {{color:"#000",fontSize:16, marginLeft:5, marginTop:0}}>Select Location</Text>
                      </View>
                    <View style={{ flex: 1 }}>

                          <MapView
                            style={{ flex: 1 }}
                            initialRegion={{
                              latitude: this.state.latitude,
                              longitude:this.state.longitude ,
                              latitudeDelta: 0.0922,
                              longitudeDelta: 0.0421
                            }}>
                                <MapView.Marker
                                  coordinate={{latitude: this.state.latitude, longitude: this.state.longitude}}
                                  title={'You are here'}/>
                            </MapView>
                      </View>
                  
                    <View  style={styles.search_box}>
                        <GooglePlacesAutocomplete
                            placeholder='Search Location'
                            minLength={2} 
                            autoFocus={false}
                            returnKeyType={'search'} 
                            listViewDisplayed='auto' 
                            fetchDetails={true}
                            renderDescription={row => row.description} 
                            onPress={(data, details = null) => { 
                                this.setState({latitude:details.geometry.location.lat,longitude:details.geometry.location.lng})
                                addressDetail=data.description.split(',')
                                this.setState({city:addressDetail[0],stae:addressDetail[1],country:addressDetail[2]})
                              }}
                            getDefaultValue={() => ''}
                            query={{
                              key: geoApi,
                              language: 'en', 
                              types: '(cities)'
                            }}
                            styles={{
                              textInputContainer: {
                              width: '100%',
                              backgroundColor: '#ffffff',
                              },
                              description: {
                                fontWeight: 'bold' 
                              },
                              predefinedPlacesDescription: {
                                color: '#1faadb'
                              }
                              }}
                            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
                    />
                </View>
                <View style= {styles.button_gap}>
                  <TouchableOpacity
                      style={styles.loginScreenButton}     
                      onPress={() =>this.props.navigation.goBack()} 
                      undrrrrerlayColor='#fff'>
                      <Text style={styles.loginText}>SET LOCATION</Text>
                  </TouchableOpacity>               
                </View>
            </View>

          )
      }
    }



const styles = StyleSheet.create({
  container: {
    flex: 1,
	marginTop:24,
  },
  loginbox:{
		backgroundColor: "#fff",
		flexDirection:"row",
		padding:15,
		//height:65
	},
  map: {
    flex:1,
    height: screenHeight,
    //marginTop: 120
 },
 search_box: {
	 position: 'absolute',
	 top: 50,
	 left: 0,
	 width: '100%'
 },
   loginScreenButton:{
    fontSize:16,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#004f9a',
    borderRadius:4,
    borderWidth: 1,
    borderColor: '#004f9a',
    
  },
  loginText:{
      color:'#ffffff',
      textAlign:'center',
      fontSize: 20,
    padding: 2,
    fontFamily: "Poppins"
  },
  button_gap: {
	padding: 10,
	position:'absolute',
	left:0,
	bottom: 10,
	width:'100%'
  }
})