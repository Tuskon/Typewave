import AsyncStorage from '@react-native-async-storage/async-storage';


export const store_username = async(value)=> {

    try{
 
        await AsyncStorage.setItem('username',value)
        

    }catch(e){

        console.warn("Não foi possível salvar o valor")

    }
}

export const store_email = async(value)=> {

    try{
 
        await AsyncStorage.setItem('email',value)
        

    }catch(e){

        console.warn("Não foi possível salvar o valor")

    }
}

export const store_timer = async(value)=> {

    try{
        
        await AsyncStorage.setItem('timer',value)

    }catch(e){

        console.warn("Não foi possível salvar o valor")

    }
}

