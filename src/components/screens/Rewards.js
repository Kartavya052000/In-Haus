import { View, Text, StyleSheet, Platform, Alert, Dimensions, StatusBar, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Typography from '../typography/Typography';
import { TouchableOpacity } from 'react-native';
import { AddIcon } from '../icons/icons';
import OptionTabs from '../TabsNavigators/OptionTabs/OptionTabs';
import GradientSlider from '../sliders/GradientSlider';
import MyRewards from '../Cards/MyRewards';
import Layout from '../Drawer/RedeemDrawer';
import RedeemDrawer from '../Drawer/RedeemDrawer';
import { Button } from 'react-native-web';
import BottomSwipeableDrawer from '../Drawer/BottomSwipeableDrawer';
import { useNavigation } from '@react-navigation/native';
import { GET_GROUP } from '../../graphql/mutations/taskMutations';
import * as SecureStore from 'expo-secure-store';
import { useLazyQuery, useMutation } from '@apollo/client';
import { REDEEM_REWARD } from '../../graphql/mutations/rewardsMutations';
import { LinearGradient } from "expo-linear-gradient";
import LottieView from 'lottie-react-native';  // Import Lottie
const { height } = Dimensions.get("window");
import Colors from "../../components/Colors/Colors";
import RewardsCards1 from '../Cards/RewardsCards1';
import { MY_PROFILE } from '../../graphql/mutations/authMutations';
import { io } from 'socket.io-client';

export default function Rewards() {
  const [drawerVisible, setDrawerVisible] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("My Rewards");
  const [rewardDetails, setDetails] = useState([]);
  const [token, setToken] = useState('');
  const [rewardPoints, setRewardPoints] = useState(0);
  const [userid, SetUserId] = useState("");
  const [shouldFetchRewards, setShouldFetchRewards] = useState(false);
  const [loading, setLoading] = useState(false); // State for loader visibility
  const navigation = useNavigation();


  // Socket connection
  const socket = io('http://api.in-haus.ca:4000', {
    transports: ['websocket', 'polling'],
  });

  useEffect(() => {
    if (userid) {
      socket.on('connect', () => {
        console.log('Connected to Socket.IO server');
        socket.emit('joinRoom', userid);
      });

      socket.on('rewardCreated', (reward) => {
        console.log('New reward created:', reward);
        setLoading(true); // Show loader when reward is created
        setTimeout(() => {
          setShouldFetchRewards(true); // Trigger fetch rewards
          setLoading(false); // Hide loader after 3 seconds
        }, 3000);
      });

      return () => {
        socket.off('connect');
        socket.off('rewardCreated');
      };
    }
  }, [userid]);

  // Fetch user points
  const [fetchUserPoints, { loading: fetchLoading, error }] = useLazyQuery(MY_PROFILE, {
    fetchPolicy: "network-only", 
    onCompleted: (data) => {
      setRewardPoints(data.myProfile.points);
    },
    onError: (error) => {
      console.error('Error fetching group:', error.message);
    },
  });

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await SecureStore.getItemAsync('authToken');
        const points = await SecureStore.getItemAsync('points');
        const id = await SecureStore.getItemAsync('userid');
        if (id) SetUserId(id);
        if (points) setRewardPoints(points);
        if (token) {
          setToken(token);
          fetchPoints(token);
        }
      } catch (error) {
        console.error('Error retrieving auth token:', error);
      }
    };
    getToken();
  }, []);

  const fetchPoints = async (token) => {
    if (token) {
      fetchUserPoints({
        context: {
          headers: {
            Authorization: `${token}`,
          },
        },
      });
    }
  };
  useEffect(() => {
    console.log(rewardDetails,"list")
    if (rewardDetails && Object.keys(rewardDetails).length > 0) {
      // Alert.alert("Rewards details updated!");
      redeemRewardsData(token)
    }
  }, [rewardDetails]);
  const [redeemRewards, { loading: RewardLoading, error: RewardError, data: RewardData }] = useMutation(REDEEM_REWARD, {
    onCompleted: (data) => {
      // Handle successful completion here
      console.log("Reward redeemed successfully!", data);
      setShouldFetchRewards(true)
      fetchUserPoints(token)
      // You can also show a success message or update local state
    },
    onError: (error) => {
      // Handle any errors that occur during the mutation
      Alert.alert("Error while redeeming the reward")
      console.error("Error redeeming reward:", error);
      // You can show an error message or handle it accordingly
    }
  });  
  const redeemRewardsData = async (token) => {
    redeemRewards({
      context: {
        headers: {
          Authorization: `${token}`, // Use token passed as argument
        },
      },
      variables: {
        rewardId: rewardDetails?.id, // Replace with actual groupID if necessary
      },
    });
  };
 

  const handleTabChange = (optionName) => {
    setActiveTab(optionName);
  };

  const handleCreate = () => {
    navigation.navigate("CreateReward");

  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(255, 223, 247, 1)", "rgba(253, 183, 235, 1)"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.headerBackground}
      />
      <View style={styles.contentContainer}>
        <Typography
          variant="H4"
          style={[styles.headerTitle, { textAlign: "center", color: "#891E6E" }]}
        >
          Rewards
        </Typography>
        <TouchableOpacity
          style={styles.addMealButton}
          onPress={() => handleCreate()}
        >
          <View style={styles.addMealContainer}>
            <AddIcon color="#FFFFFF" style={styles.addIcon} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.optionTabsContainer}>
        <OptionTabs
          options={[{ name: 'My Rewards' }, { name: 'Edit Rewards' }]}
          containerColor={Colors.Secondary.Gray[100]}
          activeColor={"#FFDFF7"}
          inactiveColor={"#FFF"}
          textColor={"#B74044"}
          onTabChange={handleTabChange}
        />
      </View>

      {activeTab === "My Rewards" && (
        <RewardsCards1 currentPoints={rewardPoints} />
      )}

      <MyRewards
        text={activeTab === "My Rewards" ? "My" : "Assigned"}
        setIsVisible={setIsVisible}
        list={'myRewards'}
        setDetails={setDetails}
        shouldFetchRewards={shouldFetchRewards}
        onFetchRewardsComplete={() => setShouldFetchRewards(false)}
        style={styles.rewardCardContainer}
      />

      {/* Show loader with JSON animation */}
      {loading && (
  <View style={styles.loaderContainer}>
    <LottieView 
      source={require('../../../assets/animations/wave1.json')} // Your JSON animation file
      autoPlay
      loop
      style={styles.loaderAnimation}
    />
    <Image
      source={require('../../../assets/Images/alexa3.png')} // Alexa image behind the animation
      style={styles.loaderImage}
    />
  </View>
)}

      <BottomSwipeableDrawer
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        Details={rewardDetails}
        rewardPoints={rewardPoints}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F2F2F2",
    flex: 1,
    paddingHorizontal: 16,
  },
  contentContainer: {
    alignItems: "center",
    marginTop: height * 0.12,
  },
  headerTitle: {
    fontWeight: 'bold',
    lineHeight: 28,
    fontSize: 24,
  },
  addMealButton: {
    position: 'absolute',
    right: 0,
    top: -10,
  },
  addMealContainer: {
    width: 40,
    height: 40,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.Secondary.Pink[500],
  },
  optionTabsContainer: {
    alignItems: "center",
    width: "100%",
    marginVertical: 16,
  },
  rewardCardContainer: {
    borderRadius: 16,
  },
  headerBackground: {
    height: height * 0.19,
    left: 0,
    position: "absolute",
    top: 0,
    width: "120%",
  },
  loaderContainer: {
    position: 'absolute',
    top: '50%',   // Center the loader vertically
    left: '50%',  // Center the loader horizontally
    transform: [{ translateX: -150 }, { translateY: -150 }], // Offset to make sure it's perfectly centered
    width: 300,  // Define a width for the container
    height: 300, // Define a height for the container
    justifyContent: 'center',  // Center the content vertically
    alignItems: 'center',      // Center the content horizontally
    zIndex: 1, // Ensure loader is on top
  },
  loaderImage: {
    width: 150,  // Adjust the size of the image
    height: 150, // Adjust the size of the image
    resizeMode: 'contain',
    position: 'absolute', // Image should be behind the animation
    zIndex: 0, // Image goes behind the animation
  },
  loaderAnimation: {
    width: 900,  // Adjust the size of the animation to your preference
    height: 400, // Adjust the size of the animation to your preference
    position: 'absolute',  // Ensure animation stays in the center
    zIndex: 1,  // Animation goes above the image
  },
});
