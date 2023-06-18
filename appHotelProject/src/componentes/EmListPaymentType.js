import { Image, Text ,StyleSheet, View, ScrollView,Picker,TouchableOpacity, TextInput, Button, Alert, FlatList } from 'react-native';
import { BlurView } from 'expo-blur';
import { useState } from 'react';
import '../../global.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { TiposPagos } from './EmListPaymentType2';

import  {useEffect} from 'react';


const uri = 'https://www.photos-elsoar.com/wp-content/images/Hotel-Bell-On-Counter.jpg';
const profilePicture = 'https://www.intermundial.es/blog/wp-content/uploads/2011/09/problemas-hotel.jpg'


export function ListarTiposPago ({navigation}) {

  useEffect(() => {
      
    buscarUsuario();
    
    }, [true]);
  
    const buscarUsuario = async () => {
      var logeado = JSON.parse(await AsyncStorage.getItem('Token'));
    if(!logeado){
        console.log("Usuario no autenticado");
        
        Alert.alert('Trivago', "Debe iniciar sesion", [
                
          { text: 'OK', onPress: () =>  {navigation.navigate('Login');} },
        ]);
          
    }
  };


  const [tipoPago, setTipoPago] = useState("Efectivo")


    console.log("************");
    console.log(tipoPago);
  const ListartTiposPago = async () => {
  
    if (!tipoPago ) {
      console.log("Escriba los datos completos");
      Alert.alert("Trivago", "Escriba los datos completos");
    }
    else {
      try {
       
          const listarTipoPago = await fetch(
            'http://' + global.ip + ':4002/api/tipopago/listar', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              
              tipoPago: tipoPago,
            }),
  
        }

        );
         
          const json = await listarTipoPago.json();
         
  
          if(json.data.id)
          {
      
            Alert.alert('Trivago', json.msj, [
                    
              { text: 'OK', onPress: () =>  {navigation.navigate('DashboardTipoPago');} },
            ]
            );
          }
          else
          {
            Alert.alert("Trivago",  json.msj);
          }
   
        }catch (error) {
        console.error(error);
         }
   }

   function renderR({item: factura}) {
    return (
      <TiposPagos {...factura} 
    
      onPress2={() => {
        navigation.navigate('DetalleReservacion', {
          idR: factura.idReservacion
        });
      }}
      
      />
    );
  }

   
   
};


  return (
    <View style={styles.componentContainerStyle}>
          <View style={styles.contentContainerStyle}>
            <FlatList
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index}
              data={tipoPago}
              renderItem={ renderR }
              ListFooterComponent={() => <View style={{ height: 11 }}/>}
            />
          </View>
    </View>
  );

};


const styles = {
    componentContainerStyle: {
      flex: 1,
      backgroundColor: 'rgb(235,235,235)',
    },
    contentContainerStyle: {
      flex: 1,
      paddingLeft: 10,
      paddingRight: 10,
    },
    buttonContainerStyle: {
      height: 70,
      marginTop: 11,
      width: '100%',
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 15,
      paddingBottom: 3,
      flexDirection: 'row',
      backgroundColor: 'white',
      borderWidth: Platform.OS === 'ios' ? .5 : 0,
      borderRadius: 2,
      borderColor:  Platform.OS === 'ios' ? 'rgb(225, 225, 225)' : 'rgba(0,0,0,.0)',
      
      
      // shadow
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 1,
      },
      shadowOpacity: 0.15,
      shadowRadius: 2.5,
  
      elevation: 2,
    },
  
    reservacion: {
      fontSize: 15,
      fontWeight: 'bold',
      
    },
  
    detalle: {
      
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      marginLeft: 120,
      color: 'blue'
      
    },
  
    detalle2: {
      
      color: '#a0a8a8'
      
    },
  }