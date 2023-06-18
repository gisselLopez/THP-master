import { Image, Text ,StyleSheet, View, ScrollView,Picker,TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { useState,useEffect } from 'react';
import '../../global.js';
import AsyncStorage from '@react-native-async-storage/async-storage';


const uri = 'https://www.photos-elsoar.com/wp-content/images/Hotel-Bell-On-Counter.jpg';
const profilePicture = 'https://www.intermundial.es/blog/wp-content/uploads/2011/09/problemas-hotel.jpg'


export function GuardarFactura ({navigation}) {

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

  
  const [reservacion, setReservacion] = useState(null)
  const [tipoPagoList, setTipoPagoList] = useState(null)
  const [tipoPago, setTipoPago] = useState(1)
  



  


  const listarCmbTipoPago = async() => 
  {
    try
    {
      let response = await fetch('http://' + global.ip + ':4002/api/tipopago/listar');
      let data = await response.json();
    
      
      setTipoPagoList(data.msj);
      
      
    }
    catch(error)
    {
      console.log(error);
    }
  }


  useState(() => {
    listarCmbTipoPago();
  }, [])

  


  /*
  while(true)
  {
    useState(() => {
      listarCmbTipoPago();
    }, [])
    if(tipoPago == null)
    {
      break;
    }
  }
  */


  
  console.log(tipoPagoList);
  
    
  const guardarFactura = async () => {
  
    if (!reservacion || !tipoPago) {
      console.log("Escriba los datos completos");
      Alert.alert("Trivago", "Escriba los datos completos");
    }
    
    else {
      try {
        let response = await fetch('http://' + global.ip + ':4002/api/reservacion/buscar?id=' + reservacion);
        let data = await response.json();
        console.log(data);
        if(data.msj != "Null")
        {
          if(data[0].estado != "Cancelado")
          {
            const registrarFactura = await fetch(
              'http://' + global.ip + ':4002/api/factura/guardar', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                idReservacion: reservacion,
                idTipoPago: tipoPago,
                
              }),
    
            }
    
            );
          
            const json = await registrarFactura.json();
          
    
            if(json.data.id)
            {
        
              Alert.alert('Trivago', json.msj, [
                      
                { text: 'OK', onPress: () =>  {navigation.navigate('DashboardFactura');} },
              ]
              );
            }
            else
            {
              Alert.alert("Trivago",  json.msj);
            }
          }
          else
          {
            Alert.alert("Trivago",  "La reservacion que esta intentando facturar esta cancelada");
          }
        

        }
        else
          {
            Alert.alert("Trivago",  "El codigo de la reservación ingresado no existe");
          }
        

      } catch (error) {
        console.log(error);

      }
    }
  };
  if(tipoPagoList != null)
  {
    let dataArr = Array.from(tipoPagoList);
  console.log("******************");
  console.log(dataArr);
  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={[styles.image, StyleSheet.absoluteFill]} />

      <ScrollView>
        <BlurView intensity={30}>
          <View style={styles.factura}>
            <Text style={{ fontSize: 40, marginBottom: 20, fontWeight: 'bold', color: 'white' }}>Crear Factura</Text>
            
            <View>
              <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Rerservacion</Text>
              <TextInput keyboardType={'numeric'} value={reservacion} onChangeText={setReservacion} style={styles.input} placeholder="Reservacion" />
            </View>

           

            <View>
              <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Tipo Pago</Text>
              <Picker
                selectedValue={tipoPago}
                style= {[styles.input , { color: 'white' }]} 
                onValueChange={(itemValue, itemIndex) => setTipoPago(itemValue)}
              >
                
    
                {dataArr.map((tipo) => {
                  return <Picker.Item key={tipo.id.toString()} value={tipo.id} label={tipo.tipoPago} />
                })}
                
              </Picker>

           </View>
      

            <TouchableOpacity onPress={guardarFactura} style={[styles.button, { backgroundColor: '#053378' }]}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Crear Factura</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </ScrollView>
    </View>
  );
}
else
{
  return null;
}

};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  factura: {
    width: 380,
    height: 350,
    marginTop: 110,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 1,
    marginVertical: 30
  },
  input: {
    width: 250,
    height: 40,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ffffff90',
    marginBottom: 20
  },
  button: {
    width: 250,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderColor: '#fff',
    borderWidth: 1
  }

});
