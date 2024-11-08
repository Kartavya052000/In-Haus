import { View, Text ,StyleSheet, Platform, Alert, StatusBar} from 'react-native'
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

export default function Rewards() {
  const [drawerVisible, setDrawerVisible] = useState(true);
const [isVisible,setIsVisible]=useState(false)
const[activeTab,setActiveTab]=useState("My Rewards")
const [rewardDetails,setDetails] =useState([])
const [token,setToken]=useState('')
const [rewardPoints,setRewardPoints]=useState(0)
// -----OPTION TABS ----
  const optionsFromDatabase = [
    { name: 'My Rewards' },
    { name: 'Edit Rewards' },
  ];
  useEffect(() => { 
    const getToken = async () => {
      try {
        const token = await SecureStore.getItemAsync('authToken'); 
        const points = await SecureStore.getItemAsync('points'); 
        if(points){
          setRewardPoints(points)
        }
        if (token) {
          setToken(token);
          console.log('Token retrieved:', token);
        } else {
          console.error('No auth token found');
        }
      } catch (error) {
        console.error('Error retrieving auth token:', error);
      }
    };

    getToken();
  }, []);
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
  
const navigation =useNavigation();
  const handleTabChange = (optionName) => {
    
    setActiveTab(optionName)
  };

  const handleCreate = () => {
    navigation.navigate('CreateReward',{undefined})
   
  };

  return (
    <View style={styles.container}>
    <View style={styles.headerContainer}>
        <Typography variant="H4" style={[styles.headerTitle]}>Rewards</Typography>
        <TouchableOpacity style={styles.addMealButton} onPress={() => handleCreate()}>
          <View style={styles.addMealContent}>
            <View style={{ width: 4 }} />
            <AddIcon style={styles.addIcon} />
          </View>
        </TouchableOpacity>
      </View>
      <OptionTabs
        options={optionsFromDatabase}
        activeColor="#ccc" // Color for the selected option
        inactiveColor="#f9f9f9" // Color for inactive options
        textColor="#333" // Text color
        onTabChange={handleTabChange} // Handle tab change
      />
{activeTab =="My Rewards"&&(
 <View  style={styles.rewards_points}>
 <Text style={styles.text}>Rewards</Text>
 <Text style={styles.text}>{rewardPoints}/5000</Text>
</View>
)}
     

      <MyRewards text={activeTab =="My Rewards"?"My":"Assigned"}setIsVisible={setIsVisible} list ={'myRewards'} setDetails={setDetails} />
   
      <BottomSwipeableDrawer isVisible={isVisible} setIsVisible={setIsVisible} rewardDetails={rewardDetails} rewardPoints={rewardPoints} />
      </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 60, // Add padding to avoid the notch or island
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 16,
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  addMealButton: {
    position: 'absolute',
    right: 0,
    padding: 8,
  },
  addMealContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -2, // Adjust alignment to match the text and icon height
  },
  addMealText: {
    lineHeight: 17, // Align the text vertically with the icon
  },
  addIcon: {
    marginBottom: -2, // Adjust icon alignment to match the text height
  },
  rewards_points:{
    backgroundColor:"lightblue"
  }
  });