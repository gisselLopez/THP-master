import { Image, Text ,StyleSheet, View, ScrollView,Picker,TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import '../../global.js';


const uri = 'https://www.photos-elsoar.com/wp-content/images/Hotel-Bell-On-Counter.jpg';
//const profilePicture = 'https://www.intermundial.es/blog/wp-content/uploads/2011/09/problemas-hotel.jpg'


export default function GuardarHabitacion ({navigation}) {
  
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

    const [tipoHList, setTipoHList] = useState(null)
    const [PisoList, setPisoList] = useState(null)
    const [idTipo, setidTipo] = useState(1)
    const [idPiso, setidPiso] = useState(1)

  



  


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


  
  console.log(tipoHList);
  console.log(PisoList)
  
    
  const guardarHabitacions = async () => {
  
      if (!idPiso || !idTipo ){
        console.log("Escriba los datos completos");
        Alert.alert("Trivago", "Escriba los datos completos");
      }
      
      else {
        try {
            const registrarHabitacion = await fetch(
              'http://' + global.ip + ':4002/api/habitacion/guardar', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                idPiso: idPiso,
                idTipo: idTipo,
              
                
              }),
    
            }
    
            );
          
            const json = await registrarHabitacion.json();
            console.log(json);
            var mensaje = "";
            mensaje += json.msj;
              for(var i = 0; i < json.length; i++)
              {
                mensaje += (i+1) + '.' + json[i].msg + "\n";
              }
              Alert.alert("Trivago",  mensaje);
              console.log(mensaje);
          

        } catch (error) {
          console.log(error);

        }
      } 
  };

  if(tipoHList != null && PisoList != null)
  {
    let dataArr = Array.from(tipoHList);
    let dataArr2 = Array.from(PisoList);
 console.log("******************");
  console.log(dataArr);
  console.log("***222222222222222222222222*****");
  console.log(dataArr2);
  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={[styles.image, StyleSheet.absoluteFill]} />

      <ScrollView>
        <BlurView intensity={30}>
          <View style={styles.habitacion}>
            <Text style={{ fontSize: 40, marginBottom: 20, fontWeight: 'bold', color: 'white' }}>Crear Habitacion</Text>
            
            <View>
              <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Tipo Habitación</Text>
              <Picker
                selectedValue={idTipo}
                style= {[styles.input , { color: 'white' }]} 
                onValueChange={(itemValue, itemIndex) => setidTipo(itemValue)}
              >
                
    
                {dataArr.map((tipo) => {
                  return <Picker.Item key={tipo.id.toString()} value={tipo.id.toString()} label={tipo.tipoHabitacion} />
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
                  return <Picker.Item key={type.id.toString()} value={type.id.toString()} label={"Piso #"+type.numPiso.toString()} />
                })}
                
              </Picker>
            </View>

           <View>
           
           
           </View>
           <TouchableOpacity onPress={guardarHabitacions} style={[styles.button, {backgroundColor: '#053378'}]}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Crear</Text>
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