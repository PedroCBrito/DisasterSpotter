import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, Image, Pressable, KeyboardAvoidingView, Platform } from 'react-native';



export default function Login(props) {

<text> home admin </text>
    





   

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
        marginTop: 150

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



    },

    imageLogo: {
        width: 275,
        height: 250,
        alignSelf: 'center',
        marginTop: 50,

    },

    cabecalhoLogin: {
        fontSize: 15,
        color: 'gray',


    },

    register: {
        fontSize: 16,
        color: '#262950',
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        marginTop: 7,

    },

    forgotPassword: {

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

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#252E38',
        marginRight: 60,
        marginLeft: 60,
        height: 50
    },

    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },


});