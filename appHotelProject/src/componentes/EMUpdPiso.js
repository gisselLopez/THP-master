import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Button, Alert,Picker } from 'react-native';
import { BlurView } from 'expo-blur';
import { useState, useEffect } from 'react';
import '../../global.js';
import AsyncStorage from '@react-native-async-storage/async-storage';


import DatePicker from 'react-native-datepicker'
const uri = 'https://www.photos-elsoar.com/wp-content/images/Hotel-Bell-On-Counter.jpg';
const profilePicture = 'https://www.intermundial.es/blog/wp-content/uploads/2011/09/problemas-hotel.jpg'


export function ModificarPiso ({navigation,route}) {

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

  const [numPiso, setNumPiso] = useState(null)
  const [capacidad, setCapacidad] = useState(null)
  const [estado, setEstado] = useState("Activo")
 

  const {idT} = route.params;

  const listarPiso = async () => {
    try {
      let response = await fetch('http://' + global.ip + ':4002/api/piso/buscar?id=' + idT,);
      let json = await response.json();

      console.log(json);
      
      setNumPiso(json[0].numPiso.toString());
      setCapacidad(json[0].capacidad.toString());
      setEstado(json[0].estado)
     
    
      
    } catch (error) {
      console.error(error);
    }
  };

  useState(() => 
    { 
      listarPiso();
    }, []);
  
  const actualizarPiso = async () => {
    
    if (!numPiso || !capacidad || !estado) {
      console.log("Escriba los datos completos");
      Alert.alert("Trivago", "Escriba los datos completos");
    }
    
    else {
      try {
        
        const modificarPiso = await fetch(
          'http://' + global.ip + ':4002/api/piso/modificar?id=' + idT, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            numPiso: numPiso,
            capacidad: capacidad,
            estado: estado
          }),

        }

        );
       
        const json2 = await modificarPiso.json();
       
        console.log("*************");
        console.log(json2);

        if(json2.data.id)
        {
          
          Alert.alert('Trivago', json2.msj, [
                    
            { text: 'OK', onPress: () =>  {navigation.navigate('ListarPisos');} },
          ]
          );
      }
      else
      {
        
            var mensaje = "";
              for(var i = 0; i < json2.length; i++)
              {
                mensaje += (i+1) + '.' + json2[i].msg + "\n";
              }
              Alert.alert("Trivago", json2.msj);
              console.log(mensaje);
            
       
      }

      } catch (error) {
        console.log(error);

      }
    }
  };

  

  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={[styles.image, StyleSheet.absoluteFill]} />

      <ScrollView>
        <BlurView intensity={30}>
          <View style={styles.factura}>
            <Text style={{ fontSize: 30, marginBottom: 20, fontWeight: 'bold', color: 'white' }}>Editar Piso</Text>
            
            <View>
              <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Numero de piso</Text>
              <TextInput keyboardType={'numeric'} value={numPiso} onChangeText={setNumPiso} style={styles.input} placeholder="Numero de piso" />
            </View>

            <View>
              <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Capacidad</Text>
              <TextInput value={capacidad} keyboardType={'numeric'} onChangeText={setCapacidad} style={styles.input} placeholder="Capacidad" />
            </View>

            

            <View>
              <Text style={{ fontSize: 15, fontWeight: '400', color: 'white' }}>Estado</Text>
              <Picker
                selectedValue={estado}
                style= {[styles.input, { color: 'white' }]} 
                onValueChange={(itemValue, itemIndex) => setEstado(itemValue)}
              >
                <Picker.Item  label="Activo" value= "Activo"/> 
                <Picker.Item  label="Inactivo" value= "Inactivo"/>
              </Picker>

           </View>

            <TouchableOpacity onPress={actualizarPiso} style={[styles.button, { backgroundColor: '#053378' }]}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Modificar</Text>
            </TouchableOpacity>

          
          </View>
        </BlurView>
      </ScrollView>
    </View>
  );

};


const styles = StyleSheet.create({
  containerCmb: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center"
  },
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
    height: 430,
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
