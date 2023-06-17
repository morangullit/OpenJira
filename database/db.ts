import mongoose from 'mongoose';


const monogoConnection = {
    isConnected: 0
}

export const connect = async () => {
    if ( monogoConnection.isConnected === 1) {
        console.log('Ya estamos connection')
        return;
    }

    if(mongoose.connections.length > 0) {
        monogoConnection.isConnected = mongoose.connections[0].readyState;

        if(monogoConnection.isConnected === 1){
            console.log( 'Usando connection anterior' );
            return;
        } 

        await mongoose.disconnect();
    }

      

    await mongoose.connect( process.env.MONGO_URL || '' );
    monogoConnection.isConnected = 1;
    console.log( 'Conectado a MongoDB:', process.env.MONGO_URL )
}


export const disconnect = async() => {

    if(process.env.NODE_ENV === 'development') return;

    if( monogoConnection.isConnected === 0 ) return;

    
    await mongoose.disconnect();
    monogoConnection.isConnected = 0;
    console.log( 'Desconectado a MongoDB' );

}












