// import { View, Text } from 'react-native'
// import React, { useEffect } from 'react'
// import { GoogleSignin,GoogleSigninButton,statusCodes } from '@react-native-google-signin/google-signin'

// export default function GoogleLogIN() {
//     const configureGoogleSignIn=() =>{
//         GoogleSignin.configure({
//             webClientId:"1005216917077-vrt5u9qpfc500o3elooqjj2omalub7l4.apps.googleusercontent.com",
//             androidClientId:"1005216917077-4ovbjjf8j5rathecjjqp2ba1j1gstpo6.apps.googleusercontent.com",
//             iosClientId:"1005216917077-n1eja2rrp1s2qb6k4t6gnl717v80s6ua.apps.googleusercontent.com",
//         })
//     }
//     useEffect(()=>{
//         configureGoogleSignIn();
//     })
//     const signIn =() =>{
//   console.log("Hit");
  
//     }
//   return (
//     <View>
//       <Text>googleSignin</Text>
//       <GoogleSigninButton size={GoogleSigninButton.Size.Standard} color={GoogleSigninButton.Color.Dark} onPress={signIn}/>
//     </View>
//   )
// }

import React, { useState, useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleLogIN() {
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:"1005216917077-vrsst5u9qpfc500o3elooqjj2omalub7l4.apps.googleusercontent.com",
    androidClientId:"1005216917077ss-4ovbjjf8j5rathecjjqp2ba1j1gstpo6.apps.googleusercontent.com",
    iosClientId:"1005216917077-n1ejssa2rrp1s2qb6k4t6gnl717v80s6ua.apps.googleusercontent.com",
    redirectUri: AuthSession.makeRedirectUri({
      useProxy: true, // Set to true when using Expo Go
    }),  });

    useEffect(() => {
      console.log('Response:', response);
      
      if (response?.type === 'success') {
        const { authentication } = response;
        getUserInfo(authentication.accessToken);
      } else if (response?.type === 'error') {
        console.error("Authentication error:", response.params.error, response.params.error_description);
      }
    }, [response]);
    
    

  const getUserInfo = async (token) => {
    const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const user = await response.json();
    setUserInfo(user);
  };

  return (
    <View>
      {userInfo ? (
        <Text>Welcome, {userInfo.name}</Text>
      ) : (
        <Button
          title="Sign in with Google"
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
        />
      )}
    </View>
  );
}
