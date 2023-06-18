import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions
} from 'react-native';

import  {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import { Ionicons } from '@expo/vector-icons';
//import { AntDesign } from '@expo/vector-icons';

//const Stack = createNativeStackNavigator();

//const tab = createBottomTabNavigator();
export default function DashboardEmpleado({navigation}) {
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

const cerrarSesion = async() => 
{
  await AsyncStorage.removeItem('Cliente');
  await AsyncStorage.removeItem('Token');
  await AsyncStorage.removeItem('Empleado');
  Alert.alert('Trivago', 'Gracias por usar la aplicacion', [
                
    { text: 'OK', onPress: () =>  {navigation.navigate('Login');} },
  ])
}

const subjects = [
  { id: 1, name: 'Clientes', nav:'ListaCliente',color:'#6eccfc' ,img: 'https://cdn-icons-png.flaticon.com/512/3126/3126647.png'},
  { id: 2, name: 'Habitaciones',nav:'DashboardHabitacion',color:'#6eccfc' ,  img:'https://cdn-icons-png.flaticon.com/512/3159/3159436.png' },
  { id: 3, name: 'Tipo' ,nav:'DashboardTipoHabitacion',color:'#6eccfc' ,name2:'habitaciones', img:'https://cdn-icons-png.flaticon.com/512/489/489870.png' },
  { id: 4, name: 'Servicios', nav:'DashboardServicio' ,color:'#6eccfc',img:'https://cdn-icons-png.flaticon.com/512/10/10674.png' },
  { id: 5, name: 'Pisos', nav: 'DashboardPiso',color:'#6eccfc',img:'https://cdn-icons-png.flaticon.com/512/3409/3409453.png' },
  { id: 6, name: 'Tipo Pago',nav:'DashboardTipoPago',color:'#6eccfc' , img:'https://cdn-icons-png.flaticon.com/512/4564/4564877.png' },
  { id: 7, name: 'Facturas',nav:'DashboardFactura',color:'#6eccfc'  , img:'https://cdn-icons-png.flaticon.com/512/856/856159.png' },
  { id: 8, name: 'Mi Cuenta',nav:'ModificarCuentaE',color:'#6eccfc' , img:'https://cdn-icons-png.flaticon.com/512/61/61205.png' },
  //{id:9, name:'Salir', nav: {cerrarSesion}   ,color:'#F54021' ,  img:'https://cdn-icons-png.flaticon.com/512/660/660350.png'}
];

const cardGap = 16;

const cardWidth = (Dimensions.get('window').width - cardGap * 3) / 2;
   
  
    return (
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            backgroundColor: '#000000'
          }}
   
        >
          {subjects.map((subject, i) => {
            return (
              <View
                key={subject.id}
               
                style={{
                  marginTop: cardGap,
                  marginLeft: i % 2 !== 0 ? cardGap : 0,
                  width: cardWidth,
                  height: 170,
                  backgroundColor: 'white',
                  borderRadius: 16,
                  shadowOpacity: 0.2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: subject.color,
                }}
              >

                
                <TouchableOpacity onPress={() => navigation.navigate(subject.nav) }>
                  
                  
                  <Image 
                     source={{
                      uri: subject.img,
                    }}
                    style={styles.buttonIcon}
                    
                  />
                   
                    <Text style={styles.buttonText}>{subject.name}</Text>
                    <Text style={styles.buttonText}>{subject.name2}</Text>
                </TouchableOpacity>


            

              </View>
            );
            
          })}
            <TouchableOpacity 
            style={[styles.botoncerrarsesion]}
            onPress={cerrarSesion}
            >
            <Text style={styles.buttonText1}>Cerrar Sesion</Text>
            </TouchableOpacity>



        </View>
      </ScrollView>
    );
  }



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
  },
  headerContainer: {
    flex: 2,
    width: '100%',
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 25,
  },
  menuImg: {
    width: 20,
    height: 20,
    backgroundColor: 'black',
  },
  userContainer: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    alignItems: 'center',
  },
  avatarContainer: {
    flexDirection: 'row',
    paddingRight: 15,
  },
  avatarImg: {
    width: 40,
    height: 40,
    backgroundColor: 'black',
  },
  usernameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  backgroundImg: {
    zIndex: -1,
    position: 'absolute',
    width: '100%',
  },
  btnLayout: {
    flex: 5,
    width: '100%',
    alignItems: 'center',
    marginTop:20,
    
  },
  buttonContainer: {
    width: '80%',
    height: '25%',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonIcon: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  }, 
  buttonContainer2: {
    width: '80%',
    height: '10%',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText1: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }, 

  botoncerrarsesion:{
    marginTop: 10,
    marginLeft: 10,
    width: 200,
    height: 80,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowOpacity: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F54021',
  },
 
  
});
