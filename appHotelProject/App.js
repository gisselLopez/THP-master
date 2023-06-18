/*
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import Login from './src/componentes/login';
import RegistrarCliente from './src/componentes/registrarCliente';
import RegistrarReservacion from './src/componentes/registrarReservacion';
import ModificarMiCuenta from './src/componentes/modificarMiCuenta';
import RecuperarContrasenia from './src/componentes/recuperarContrasenia';

export default function App() {
  return (
   <RegistrarReservacion ></RegistrarReservacion >
  );
}
*/


import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/componentes/login';
import Dashboard from './src/componentes/menu.js';
import TipoHabitacion from './src/componentes/TipoHabitacion';
import {TiposHabitaciones} from './src/componentes/TiposHabitaciones';
import TipoHabitacionModificar from './src/componentes/TipoHabitacionModificar';
import { RegistrarReservacion } from './src/componentes/registrarReservacion';
import { RoomsList } from './src/componentes/RoomsList';
import { RoomsDetails } from './src/componentes/RoomsDetails';
import { MisReservaciones } from './src/componentes/misResrvaciones';
import { DetalleReservacion } from './src/componentes/detalleReservacion';
import { DetalleHabitacion } from './src/componentes/DetalleHabitacion';
import RecuperarContrasenia from './src/componentes/recuperarContrasenia';
import  GuardarHabitacion from './src/componentes/guardarHabitacion';
import  {HabitacionListado} from './src/componentes/habitacionlistado';
import {habitacionModificarEliminar} from './src/componentes/HabitacionModificarEliminar';
import { habitacionListado } from './src/componentes/HSlistado';
import { serviciohabitacionListado } from './src/componentes/ServicioHabitacionListado';
import RegistrarServicio from './src/componentes/servicios';
import {ServiciosDisponiblesListado} from './src/componentes/ServiciosDisponiblesListado';
import {Servicioslistado} from './src/componentes/Servicioslistado';
import {serviciosModificarEliminar} from './src/componentes/serviciosModificarEliminar';

import ModificarCuentaE from './src/componentes/modificarEmpleado';
import RegistrarEmpleado from './src/componentes/registrarEmpleado';
import { ListaEmpleado } from './src/componentes/ListarEmpleados';
import { ListarFacturas } from './src/componentes/EmListFactura2';


import ModificarMiCuenta from './src/componentes/modificarMiCuenta';
import RegistrarCliente from './src/componentes/registrarCliente';
import { ListaCliente } from './src/componentes/ListarClientes';

import { GuardarFactura } from './src/componentes/EmInFactura';
import DashboardFactura  from './src/componentes/menuFactura';
import DashboardEmpleado from './src/componentes/menuEmp';

import DashboardTipoPago from './src/componentes/menuTipoPago';
import DashboardTipoHabitacion from './src/componentes/menuTipoHabitacion';

import { GuardarTipoPago } from './src/componentes/EmPaymentType';
import { ListarTipoPago } from './src/componentes/EMPrueba';

import DashboardPiso from './src/componentes/menuPiso';
import { ListarPisos } from './src/componentes/EmListPiso2';
import { GuardarPiso } from './src/componentes/EmInPiso';
import { ModificarPiso } from './src/componentes/EMUpdPiso';
import DashboardHabitacion from './src/componentes/menuHabitaciones';
import DashboardServicio from './src/componentes/menuServicio';
import DashboarEmpleadoSA from './src/componentes/menuEmpleadoSA';
import DashboardEmpleadoAdmin from './src/componentes/menuEmpSA';

import modificarClienteEmpleado from './src/componentes/modificarClienteEmpleado';
import ModificarEmpleadoAdmin from './src/componentes/modificarEmpleadoAdmin';




const Stack = createNativeStackNavigator();

/*
export default function App() {
  return (

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Habitaciones' component={RegistrarReservacion} 
          />
          
          
        </Stack.Navigator>
      </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20
  }
});
*/

function App() {
  return (

    <NavigationContainer>

      <Stack.Navigator>
      
        <Stack.Screen name='Login' component={Login}
          options={({ navigation }) => ({
            title: 'Inicio de Sesión',
            headerTitleStyle: styles.headerTitle,
            headerBackVisible: false

          })} />
          <Stack.Screen name='DashboardEmpleado' component={DashboardEmpleado}
          options={({ navigation }) => ({
            title: 'Menu',
            headerTitleStyle: styles.headerTitle,
            headerBackVisible: false
            
          })} />
          <Stack.Screen name='DashboardEmpleadoAdmin' component={DashboardEmpleadoAdmin}
          options={({ navigation }) => ({
            title: 'Menu ',
            headerTitleStyle: styles.headerTitle,
            headerBackVisible: false
            
          })} />



          <Stack.Screen name='DashboarEmpleadoSA' component={DashboarEmpleadoSA}
          options={({ navigation }) => ({
            title: 'Menu Empleados',
            headerTitleStyle: styles.headerTitle,
            
          })} />


          <Stack.Screen name='habitacionListado' component={habitacionListado}
          options={({ navigation }) => ({
            title: 'Menu',
            headerTitleStyle: styles.headerTitle,
            
          })} />

          <Stack.Screen name='ServiciosDisponiblesListado' component={ServiciosDisponiblesListado}
          options={({ navigation }) => ({
            title: 'Menu',
            headerTitleStyle: styles.headerTitle,
            
          })} />



          <Stack.Screen name='DashboardServicio' component={DashboardServicio}
          options={({ navigation }) => ({
            title: 'Menu Servicio',
            headerTitleStyle: styles.headerTitle,
            
          })} />

          <Stack.Screen name='DashboardHabitacion' component={DashboardHabitacion}
          options={({ navigation }) => ({
            title: 'Menu Habitacion',
            headerTitleStyle: styles.headerTitle,
            
          })} />





          <Stack.Screen name='DashboardTipoHabitacion' component={DashboardTipoHabitacion}
          options={({ navigation }) => ({
            title: 'Menu Tipo Habitacion',
            headerTitleStyle: styles.headerTitle,
            
          })} />
          
         
          

          <Stack.Screen name='GuardarTipoPago' component={GuardarTipoPago}
          options={({ navigation }) => ({
            title: 'Guardar Tipo Pago',
            headerTitleStyle: styles.headerTitle,


          })} />

    <Stack.Screen name='ListarPisos' component={ListarPisos}
    options={({ navigation }) => ({
      title: 'Listar Piso',
      headerTitleStyle: styles.headerTitle,


       })} />
      <Stack.Screen name='GuardarPiso' component={GuardarPiso}
    options={({ navigation }) => ({
      title: 'Guardar Piso',
      headerTitleStyle: styles.headerTitle,


       })} />

      <Stack.Screen name='ModificarPiso' component={ModificarPiso}
    options={({ navigation }) => ({
      title: 'Modificar Piso',
      headerTitleStyle: styles.headerTitle,


       })} /> 

      <Stack.Screen name='ListarTipoPago' component={ListarTipoPago}
          options={({ navigation }) => ({
            title: 'Listar Tipo Pago',
            headerTitleStyle: styles.headerTitle,


          })} />


      <Stack.Screen name='DashboardTipoPago' component={DashboardTipoPago}
      options={({ navigation }) => ({
        title: 'Menu',
        headerTitleStyle: styles.headerTitle,
      })} />

      <Stack.Screen name='DashboardPiso' component={DashboardPiso}
      options={({ navigation }) => ({
        title: 'Menu',
        headerTitleStyle: styles.headerTitle,
      })} />

     


        <Stack.Screen name='ModificarCuentaE' component={ModificarCuentaE}
          options={({ navigation }) => ({
            title: 'Empleado',
            headerTitleStyle: styles.headerTitle,

          })} />
           
         
           
         <Stack.Screen name='ListaEmpleado' component={ListaEmpleado}
          options={({ navigation }) => ({
            title: 'Listado de empleados',
            headerTitleStyle: styles.headerTitle,

          })} />
    
     
        <Stack.Screen name='ListaCliente' component={ListaCliente}
          options={({ navigation }) => ({
            title: 'Listado de clientes',
            headerTitleStyle: styles.headerTitle,

          })} />
        
       

      <Stack.Screen name='TiposHabitaciones' component={TiposHabitaciones}
          options={({ navigation }) => ({
            title: 'Tipos de Habitaciones',
            headerTitleStyle: styles.headerTitle,

          })} />

      <Stack.Screen name='TipoHabitacionModificar' component={TipoHabitacionModificar}
          options={({ navigation }) => ({
            title: 'Modificar Tipo Habitacion',
            headerTitleStyle: styles.headerTitle,

          })} />

     

      <Stack.Screen name='TipoHabitacion' component={TipoHabitacion}
          options={({ navigation }) => ({
            title: 'Guardar Tipo Habitacion ',
            headerTitleStyle: styles.headerTitle,

          })} />
           
          <Stack.Screen name='habitacionModificarEliminar' component={habitacionModificarEliminar}
          options={({ navigation }) => ({
            title: 'Información Habitación',
            headerTitleStyle: styles.headerTitle,

        })} />

      <Stack.Screen name='GuardarFactura' component={GuardarFactura}
          options={({ navigation }) => ({
            title: 'Guardar',
            headerTitleStyle: styles.headerTitle,
            

          })} />
     
      
    <Stack.Screen name='ListarFacturas' component={ListarFacturas}
          options={({ navigation }) => ({
            title: 'Facturas',
            headerTitleStyle: styles.headerTitle,
            

          })} />

      


      <Stack.Screen name='DashboardFactura' component={DashboardFactura}
          options={({ navigation }) => ({
            title: 'Guardar',
            headerTitleStyle: styles.headerTitle,
            

          })} />

     
      <Stack.Screen name='Archvio' component={TipoHabitacion}
          options={({ navigation }) => ({
            title: 'Archivos',
            headerTitleStyle: styles.headerTitle,

          })} />
          
        <Stack.Screen name='RegistrarCliente' component={RegistrarCliente}
          options={({ navigation }) => ({
            title: 'Crear Cuenta',
            headerTitleStyle: styles.headerTitle,
          })} />
           <Stack.Screen name='RegistrarEmpleado' component={RegistrarEmpleado}
          options={({ navigation }) => ({
            title: 'Crear Cuenta',
            headerTitleStyle: styles.headerTitle,
          })} />

        <Stack.Screen name='RecuperarContrasenia' component={RecuperarContrasenia}
          options={({ navigation }) => ({
            title: 'Recuperar Contraseña',
            headerTitleStyle: styles.headerTitle,
          })} />

        <Stack.Screen name='Dashboard' component={Dashboard}
          options={({ navigation }) => ({
            title: 'Menu',
            headerTitleStyle: styles.headerTitle,
            headerBackVisible: false

          })} />

        <Stack.Screen name='MisReservaciones' component={MisReservaciones}
          options={({ navigation }) => ({
            title: 'Mis Reservaciones',
            headerTitleStyle: styles.headerTitle,

          })} />

        <Stack.Screen name='DetalleReservacion' component={DetalleReservacion}
          options={({ navigation }) => ({
            title: 'Detalle de la reservación',
            headerTitleStyle: styles.headerTitle,

          })} />

        <Stack.Screen name='DetalleHabitacion' component={DetalleHabitacion}
          options={({ navigation }) => ({
            title: 'Detalle de la habitación',
            headerTitleStyle: styles.headerTitle,

          })} />

        

        <Stack.Screen name='RegistrarReservacion' component={RegistrarReservacion}
          options={({ navigation }) => ({
            title: 'Reservación',
            headerTitleStyle: styles.headerTitle,

          })} />

        <Stack.Screen name='RoomsList' component={RoomsList}
          options={({ navigation }) => ({
            title: 'Habitaciones disponibles',
            headerTitleStyle: styles.headerTitle,
            headerBackVisible: false

          })} />

        <Stack.Screen name='RoomsDetails' component={RoomsDetails}
          options={({ navigation }) => ({
            title: 'Información de la habitación',
            headerTitleStyle: styles.headerTitle,


          })} />

        <Stack.Screen name='ModificarMiCuenta' component={ModificarMiCuenta}
          options={({ navigation }) => ({
            title: 'Reservación',
            headerTitleStyle: styles.headerTitle,

          })} />
          

          <Stack.Screen name='RegistrarServicio' component={RegistrarServicio}
          options={({ navigation }) => ({
            title: 'Registrar Servicio',
            headerTitleStyle: styles.headerTitle,

          })} />

            <Stack.Screen name='Servicioslistado' component={Servicioslistado}
          options={({ navigation }) => ({
            title: 'Servicios listado',
            headerTitleStyle: styles.headerTitle,

          })} />
             <Stack.Screen name='HabitacionListado' component={HabitacionListado}
          options={({ navigation }) => ({
            title: 'Habitaciones',
            headerTitleStyle: styles.headerTitle,

        })} />
       
       

      <Stack.Screen name='serviciosModificarEliminar' component={serviciosModificarEliminar}
          options={({ navigation }) => ({
            title: 'Editar servicio ',
            headerTitleStyle: styles.headerTitle,

          })} />
           
         


      <Stack.Screen name='serviciohabitacionListado' component={serviciohabitacionListado}
          options={({ navigation }) => ({
            title: 'Servicio Habitacion Listado',
            headerTitleStyle: styles.headerTitle,

          })} />

     

          
           <Stack.Screen name='GuardarHabitacion' component={GuardarHabitacion}
          options={({ navigation }) => ({
            title: 'Guardar Habitacion',
            headerTitleStyle: styles.headerTitle,

        })} />

      <Stack.Screen name='modificarClienteEmpleado' component={modificarClienteEmpleado}
          options={({ navigation }) => ({
            title: 'Editar cliente',
            headerTitleStyle: styles.headerTitle,

        })} />

<Stack.Screen name='ModificarEmpleadoAdmin' component={ModificarEmpleadoAdmin}
          options={({ navigation }) => ({
            title: 'Editar empleado',
            headerTitleStyle: styles.headerTitle,

        })} />

      </Stack.Navigator>
    </NavigationContainer>

  );
}
const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20
  }
});
export default App;
