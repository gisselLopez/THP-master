import React, { Component } from 'react';
import { TouchableOpacity, FlatList, View, Platform, Text, Alert } from 'react-native';
import  {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  {useEffect} from 'react';
import { TiposPagos } from './EmListPaymentType2';
export function  ListarTipoPago({route, navigation}) {
  
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


    const [tipoPago, setTipoPago] = useState(null)
    const listarFactura = async () => {
        try {
          var token = JSON.parse(await AsyncStorage.getItem('Token'));

         
          let response = await fetch('http://' + global.ip + ':4002/api/tipopago/listar', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              //'Authorization': 'Bearer ' + token,
            },
          
          
      });
          let json = await response.json();
            
            
            if(json != "")
            {
              setTipoPago(json.msj);
            }
            else
            {
              setTipoPago([]);
            }
            
        
        } catch (error) {
          console.error(error);
        }
      };

      useState(() => 
    { 
      listarFactura();
    }, []);
    
    /*
     useEffect(() => {
      let interval
  
      const updateCounter = () => {
        listarFactura();
      }
  
      interval = setInterval(() => {
        updateCounter()
      }, 1000)
  
      return () => {
        // Clear the interval when component is unmounted
        clearInterval(interval)
      }
    }, [])
    */
   console.log("**************************");
   console.log(tipoPago);
    function renderR({item: factura}) {

        return (
          <TiposPagos {...factura} 
          
          
          />
        );
      }

 
   

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
  }
  


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