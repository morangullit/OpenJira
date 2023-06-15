import mongoose from 'mongoose';


const mongooConnection = {
    isConnected: 0
}

export const connect = async () => {
    if ( mongooConnection.isConnected === 1) {
        console.log('Ya estamos connection')
        return;
    }

    if(mongoose.connections.length > 0) {
        mongooConnection.isConnected = mongoose.connections[0].readyState;

        if(mongooConnection.isConnected === 1){
            console.log( 'Usando connection anterior' );
            return;
        } 

        await mongoose.disconnect();
    }

      

    await mongoose.connect( process.env.MONGO_URL || '' );
    mongooConnection.isConnected = 1;
    console.log( 'Conectado a MongoDB:', process.env.MONGO_URL )
}


export const disconnect = async() => {

    if(process.env.NODE_ENV === 'development') return;

    if( mongooConnection.isConnected === 0 ) return;

    await mongoose.disconnect();
    console.log( 'Desconectado a MongoDB' );

}











