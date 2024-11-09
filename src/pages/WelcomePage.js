import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Daughter from "../../assets/WelcomeImages/Daughter.jpg";
import Dad from "../../assets/WelcomeImages/Dad.jpg";
import Mom from "../../assets/WelcomeImages/Mom.jpg";
import Son from "../../assets/WelcomeImages/Son.jpg";
import { SafeAreaView } from 'react-native-safe-area-context';
import Typography from '../components/typography/Typography';
import { useNavigation } from '@react-navigation/native';

export default function WelcomePage() {
  const [activeIndex, setActiveIndex] = useState(0); // Track the active slide
  const navigation = useNavigation();
  const slides = [
    {
      title: "Create and Organize chores for your household",
      image: Daughter,
    },
    {
      title: "Share family events and important reminders",
      image: Dad,
    },
    {
      title: "Get access to recipes and plan your meals and groceries",
      image: Mom,
    },
    {
      title: "Plan and organize your family activities seamlessly",
      image: Son,
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{item.title}</Text>
      </View>

      {/* Render dots as pagination indicators */}
      <View style={styles.dotContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index ? styles.activeDot : null,
            ]}
          />
        ))}
      </View>

      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Typography variant="H2" align="center" style={styles.heading}>Welcome to in-Haus</Typography>
          <Typography variant="H4" align="center" style={styles.subheading}>AI powered app that simplifies your household management</Typography>
          
          <Carousel
            loop
            width={300}
            height={300}
            data={slides}
            autoPlay={true}
            renderItem={renderItem}
            scrollAnimationDuration={1500}
            onSnapToItem={(index) => setActiveIndex(index)} // Update active index on slide change
          />
  <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.replace("SignUp")}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
          <Text style={styles.loginText}>
            Already have an account?
            <TouchableOpacity onPress={()=> navigation.replace("Login")}>
              <Text style={styles.loginLink}> Log In here</Text>
            </TouchableOpacity>
          </Text>
        </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: "1%",
  },
  heading: {
    marginTop: 40,
    marginBottom: 8,
  },
  subheading: {
    marginTop: 30,
    marginBottom: 60,   
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    height: 140 ,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#E7DFF5',
    borderRadius:16,
    paddingHorizontal: 16, // Add some padding if needed for text spacing
  },
  title: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    width: '100%',
  },
  dotContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#497DF6',
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
  },
  bottomContainer:{
  marginBottom:100,
  },
  button: {
    backgroundColor: '#497DF6',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems:'center',
    width:250
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginText: {
    fontSize: 14,
    color: '#555',
    marginTop: 10,
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  loginLink: {
    color: '#497DF6',
    fontWeight: 'bold',
  },
});
