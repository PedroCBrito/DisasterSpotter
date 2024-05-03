import React from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, Image, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import logo from './Login/DisasterSpotter.png';
import { useRoute } from '@react-navigation/native';



export default function Send(props) {
    const route = useRoute();
    const idAccount = route.params.id;

    return (

        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: 'white' }}
            behavior={Platform.OS == 'ios' ? "padding" : "height"}
            
        >
            <ScrollView style={{ width: "100%" }}>

                <View style={styles.topContainer}>
                    <Image
                        style={styles.imageLogo}
                        source={logo}
                    />
                </View>
                <View style={styles.midContainer}>
                    
                        <Text style={styles.texto}>Denuncia enviada com sucesso!</Text>
                    


                        <Text style={styles.textoBaixo}>Obrigado por ajudar a manter uma cidade melhor </Text>
                </View>

                <View style={styles.bottomContainer}>
                    

                    <Pressable style={styles.goBack} onPress={() => props.navigation.navigate('HomeUser', { id: idAccount })}>
                        <Text style={styles.back}>Voltar</Text>
                    </Pressable>
                </View>

            </ScrollView>
        </KeyboardAvoidingView>





    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        width: "100%",
        flexDirection: 'column',
        

    },
    bottomContainer: {
        flex: 1,
        justifyContent: "flex-end",
        width: "100%",
        marginTop: 20

    },

    topContainer: {
        flex: 1.5,
        justifyContent: "flex-start",
        alignItems: "center",

        width: "100%"

    },


    midContainer: {
        flex: 100,
        marginTop: 25,
        justifyContent: "center",
        width: "100%",
        alignItems:"center"



    },

    imageLogo: {
        width: 275,
        height: 250,
        alignSelf: 'center',
        marginTop: 50,

    },

    texto: {
        fontSize: 20,
        color: 'gray',


    },

    textoBaixo: {
        flex: 1,
        fontSize: 20,
        color: 'gray',
        marginTop: 330,
        textAlign: 'center',
    },

    back: {
        fontSize: 16,
        color: '#262950',
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        marginTop: 15,

    },

    goBack: {

        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 2,
        elevation: 3,
        marginRight: 25,
        marginLeft: 25,

    },

    cabecalhoBoxEmail: {
        fontSize: 14,
        color: 'gray',
        marginLeft: 50,
        marginBottom: 2
    },

    cabecalhoBoxPassword: {
        fontSize: 14,
        color: 'gray',
        marginLeft: 50,
        marginBottom: 2,
        marginTop: 35
    },

    placeholder: {
        borderWidth: 1,
        height: 50,
        borderRadius: 4,
        borderColor: 'black',
        fontSize: 12,
        marginRight: 50,
        marginLeft: 50,
        padding: 10

    },





});