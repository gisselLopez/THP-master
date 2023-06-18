

export function getProducts() {
    
    
    const listarHabitaciones = async function() {
        const jsondata = await fetch(
            'http://192.168.0.18:4002/api/reservacion/listarHabitacionesDisponibles', {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              }
  
            }
          );
        const data = await jsondata.json();
        return data;
    }

    
    const PRODUCTS = [
      {
          id: 100,
          tipoHabitacion: 'ReactProX Headset',
          precio: 350,
          
          description: 'A headset combines a headphone with microphone. Headsets are made with either a single-earpiece (mono) or a double-earpiece (mono to both ears or stereo).'
      },
      {
          id: 101,
          tipoHabitacion: 'FastLane Toy Car',
          precio: 600,
        
          description: 'A model car, or toy car, is a miniature representation of an automobile. Other miniature motor vehicles, such as trucks, buses, or even ATVs, etc. are often included in this general category.'
      },
      {
          id: 102,
          tipoHabitacion: 'SweetHome Cupcake',
          precio: 2,
          
          description: 'A cupcake (also British English: fairy cake; Hiberno-English: bun; Australian English: fairy cake or patty cake[1]) is a small cake designed to serve one person.'
      }
  ];
  
    
    return PRODUCTS;
    
}



