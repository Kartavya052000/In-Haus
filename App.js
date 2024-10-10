import { StyleSheet, Text, View } from 'react-native';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import SignUp from './src/pages/SignUp';
import Login from './src/pages/Login';

export default function App() {
  const client = new ApolloClient({
    uri: 'http://172.20.10.3:4000/graphql', // Replace with your machine's IP address
    cache: new InMemoryCache(),
    headers: {
      'Content-Type': 'application/json',
    },
    // connectToDevTools: true, // Enable Apollo DevTools

  });

  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <Text>asd</Text>
        <SignUp />
        <Login />
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
