import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./views/Login/Login.js";
import Home from "./views/Home.js";
import Register from "./views/Register.js";
import ForgotPassword from "./views/ForgotPassword.js";
import Avaliate from "./views/Avaliate.js";
import Info from "./views/Info.js";
import Certificate from "./views/Certificate.js";
import { onAuthStateChanged } from 'firebase/auth';
import { firebase_auth } from './components/config.jsx';
import { User } from 'firebase/auth';



function App() {

  const Stack = createNativeStackNavigator();

  const [user, setUser] = useState();


  useEffect(() => {
    onAuthStateChanged(firebase_auth, (user) => {
      setUser(user);
    });

  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen options={{ title: "", headerTransparent: true }} name="Home" component={Home} />
        ) : (
          <Stack.Screen options={{ headerTransparent: true, headerShown: false }} name="Login" component={Login} />
        )}
        <Stack.Screen options={{ title: "", headerTransparent: true }} name="Register" component={Register} />
        <Stack.Screen options={{ title: "", headerTransparent: true }} name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen options={{ title: "", headerTransparent: true }} name="Avaliate" component={Avaliate} />
        <Stack.Screen options={{ title: "", headerTransparent: true }} name="Info" component={Info} />
        <Stack.Screen options={{ title: "", headerTransparent: true }} name="Certificate" component={Certificate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  bigRed: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 30,
  },
});

export default App;