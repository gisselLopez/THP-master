
import { useState } from 'react';
import { useEffect } from 'react';
import {
  Text, 
  Image, 
  View, 
  ScrollView, 
  SafeAreaView, 
  Button, 
  StyleSheet,
  Alert,
  TextInput,
  TouchableOpacity,
  Picker,
  selectedValue
  } from 'react-native';
  import { BlurView } from 'expo-blur';
//import { getProduct } from '../services/ProductsService.js';
//import { CartContext } from '../CartContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
const uri = 'https://www.hmi-online.com/uploads/newsarticle/4750396/images/472575/small/table.jpg';

import '../../global.js';

export function  habitacionModificarEliminar({route,navigation}) {
  
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

  const { id } = route.params;
  const [tipoHList, setTipoHList] = useState(null)
  const [PisoList, setPisoList] = useState(null)
  const [idTipo, setidTipo] = useState(null)
  const [idPiso, setidPiso] = useState(null)
  const [estado, setEstado] = useState(null)
  


  const listarCmbTipoHabitacion = async() => 
  {
    try
    {
      let response = await fetch('http://' + global.ip + ':4002/api/tipoHabitacion/listar');
      let data = await response.json();
    
      
      setTipoHList(data);
      
      
    }
    catch(error)
    {
      console.log(error);
    }
  }


  useState(() => {
    listarCmbTipoHabitacion();
  }, [])


  const listarCmbPiso = async() => 
  {
    try
    {
      let response = await fetch('http://' + global.ip + ':4002/api/piso/listar');
      let data = await response.json();
    
      
      setPisoList(data);
      
      
    }
    catch(error)
    {
      console.log(error);
    }
  }


  useState(() => {
    listarCmbPiso();
  }, [])
  

  
  const listarHabitaciones = async () => {
    try {

      let response = await fetch('http://' + global.ip + ':4002/api/habitacion/listarUnahabitacion?id=' +  id);
      let json = await response.json();
     // console.log("***********************************************************");
      console.log(json);
      setidTipo(json.idTipo.toString());
      setidPiso(json.idPiso.toString());
      setEstado(json.estado);
     
    } catch (error) {
      console.error(error);
    }
  };
    useState(() => 
    { 
        listarHabitaciones();
    }, []);




  

    

    const desactivar = async () => {
      if (!idTipo || !idPiso || !estado ) {
        console.log("Escriba los datos completos");
        Alert.alert("Trivago", "Escriba los datos completos");
      }
      else {
        try {

            const desactivarHabitacion = await fetch(
              'http://' + global.ip + ':4002/api/habitacion/eliminar?id=' + id, {
              method: 'PUT',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                //'Authorization': 'Bearer ' + token,
              },
              body: JSON.stringify({
                estado: estado,
                
              }),
  
            }
  
            );
  
  
            const json2 = await desactivarHabitacion.json();
  
            if (json2.data) {
              /*Alert.alert("Trivago", json2.msj);
              console.log(json2.msj);*/
  
              Alert.alert('Trivago', 'Registros guardados', [
  
                { text: 'OK', onPress: () => { navigation.navigate('HabitacionListado'); } },
              ])
            }
            else {
              var mensaje = "";
              for (var i = 0; i < json2.length; i++) {
                mensaje += (i + 1) + '.' + json2[i].msg + "\n";
              }
              Alert.alert("Trivago", mensaje);
              console.log(mensaje);
  
  
            }
            //Alert.alert("Trivago", json2.msj);
  
  
            //Alert.alert("Trivago", json2[0].msg);
            //console.log(json2[0].msg);
        
          
         
          
  
        } catch (error) {
          console.log(error);
  
        }
      }
    };

    const modificarHabitaciones = async () => {
      if (!idTipo || !idPiso || !estado ) {
        console.log("Escriba los datos completos");
        Alert.alert("Trivago", "Escriba los datos completos");
      }
      else {
        try {

            const modificarHabitacion = await fetch(
              'http://' + global.ip + ':4002/api/habitacion/modificar?id=' + id, {
              method: 'PUT',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                //'Authorization': 'Bearer ' + token,
              },
              body: JSON.stringify({
                idTipo: idTipo,
                idPiso: idPiso,
                estado: estado,
               
                
              }),
  
            }
  
            );
  
  
            const json2 = await modificarHabitacion.json();
  
            if (json2.data) {
              /*Alert.alert("Trivago", json2.msj);
              console.log(json2.msj);*/
  
              Alert.alert('Trivago', 'Registros guardados', [
  
                { text: 'OK', onPress: () => { navigation.navigate('HabitacionListado'); } },
              ])
            }
            else {
              var mensaje = "";
              for (var i = 0; i < json2.length; i++) {
                mensaje += (i + 1) + '.' + json2[i].msg + "\n";
              }
              Alert.alert("Trivago", mensaje);
              console.log(mensaje);
  
  
            }
            //Alert.alert("Trivago", json2.msj);
  
  
            //Alert.alert("Trivago", json2[0].msg);
            //console.log(json2[0].msg);
        
          
         
          
  
        } catch (error) {
          console.log(error);
  
        }
      }
    };
    
  


    
   
    //console.log(servicios)
    //const verServicio = async () => {
     // Alert.alert("Trivago", estado );
     // }

   // const [selectedValue, setSelectedValue] = useState("Inactivo");
   if(tipoHList != null && PisoList != null){
    
        let dataArr = Array.from(tipoHList);
        let dataArr2 = Array.from(PisoList);
       console.log("**********************************")
        console.log(estado);
        return (
            <View style={styles.container}>
                <Image source={{ uri }} style={[styles.image, StyleSheet.absoluteFill]} />
    
                <ScrollView>
                <BlurView intensity={30}>
                    <View style={styles.habitacion}>
                    <Text style={{ fontSize: 40, marginBottom: 20, fontWeight: 'bold', color: 'white' }}>Opcion Habitacion</Text>
                    
                    <View>
                        <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Tipo Habitación</Text>
                        <Picker
                        selectedValue={idTipo}
                        style= {[styles.input , { color: 'white' }]} 
                        onValueChange={(itemValue, itemIndex) => setidTipo(itemValue)}
                        >
                        
            
                        {dataArr.map((tipo) => {
                            return <Picker.Item key={tipo.id.toString()} value={tipo.id.toString()} label={tipo.tipoHabitacion.toString()} />
                        })}
                        
                        </Picker>
        
                    </View>
        
                    <View>
                        <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Piso</Text>
                        <Picker
                        selectedValue={idPiso}
                        style= {[styles.input , { color: 'white' }]} 
                        onValueChange={(itemValue, itemIndex) => setidPiso(itemValue)}
                        >
                        
            
                        {dataArr2.map((type) => {
                            return <Picker.Item key={type.id.toString()} value={type.id.toString()} label={type.numPiso.toString()} />
                        })}
                        
                        </Picker>
                    </View>
        
                    <View>
                        <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Estado</Text>
                        <Picker
                            selectedValue={estado}
                            style= {[styles.input , { color: 'white' }]} 
                            onValueChange={(itemValue, itemIndex) => setEstado(itemValue)}
                        >
                            
                            <Picker.Item  label="Disponible" value= "Disponible"/> 
                            <Picker.Item  label="Fuera de servicio" value= "Fuera de servicio"/>
                        </Picker>
                    </View>
                    <TouchableOpacity onPress={modificarHabitaciones} style={[styles.button, {backgroundColor: '#053378'}]}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Modificar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={desactivar} style={[styles.button, { backgroundColor: '#FF0000' }]}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Eliminar Habitacion</Text>
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
    habitacion: {
      width: 400,
      height: 480,
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
  }
      );