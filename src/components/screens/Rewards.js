import { View, Text ,StyleSheet, Platform, Alert, Dimensions,StatusBar} from 'react-native'


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
const { height } = Dimensions.get("window");
import Colors from "../../components/Colors/Colors";
import RewardsCards1 from '../Cards/RewardsCards1';
import { ScrollView } from 'react-native-gesture-handler';
import { MY_PROFILE } from '../../graphql/mutations/authMutations';

export default function Rewards() {
  const [drawerVisible, setDrawerVisible] = useState(true);
const [isVisible,setIsVisible]=useState(false)
const[activeTab,setActiveTab]=useState("My Rewards")
const [rewardDetails,setDetails] =useState([])
const [token,setToken]=useState('')
const [rewardPoints,setRewardPoints]=useState(0)
const [shouldFetchRewards, setShouldFetchRewards] = useState(false); // New state to trigger fetch

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
          fetchPoints(token)
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
  
const navigation =useNavigation();
  const handleTabChange = (optionName) => {
    
    setActiveTab(optionName)
  };

  const handleCreate = () => {
    navigation.navigate('CreateReward',{undefined})
   
  };

// -- to get user points---
  const [fetchUserPoints, { loading, error }] = useLazyQuery(MY_PROFILE, {
    fetchPolicy: "network-only", // Forces fresh data fetch from network

    onCompleted: (data) => {
      // console.log("+++++++++++",data.myProfile.points)
      setRewardPoints(data.myProfile.points)  
    },
    onError: (error) => {
      console.error('Error fetching group:', error.message);
    },
  });

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
  return (
    <View style={styles.container}>
       <LinearGradient
        colors={[ "rgba(255, 223, 247, 1)","rgba(253, 183, 235, 1)"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.headerBackground}
      />
      <View style={styles.contentContainer}>
        <Typography
          variant="H4"
          style={[
            styles.headerTitle,
            { textAlign: "center", color: "#891E6E" },
          ]} // Ajusta el color para igualar el diseño
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
            options={optionsFromDatabase}
            containerColor={Colors.Secondary.Gray[100]} // Cambia el color del contenedor
            activeColor={"#FFDFF7"} // Color activo igual que en `Haus`
            inactiveColor={"#FFF"} // Color inactivo si es necesario (opcional)
            textColor={"#B74044"} // Color de texto igual que en `Haus`
            onTabChange={handleTabChange} // Manejador de cambio de pestaña
          />
        </View>
      
{activeTab =="My Rewards"&&(

<RewardsCards1 currentPoints={rewardPoints}/>
)}

   
      <MyRewards
       text={activeTab =="My Rewards"?"My":"Assigned"}
       setIsVisible={setIsVisible}
        list ={'myRewards'} 
        setDetails={setDetails}
        shouldFetchRewards={shouldFetchRewards} // Pass down trigger
        onFetchRewardsComplete={() => setShouldFetchRewards(false)} // Reset after fetch
        />

   
      <BottomSwipeableDrawer isVisible={isVisible} setIsVisible={setIsVisible} rewardDetails={rewardDetails} rewardPoints={rewardPoints} />
      </View>
  )
}
const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   paddingHorizontal: 16,
  //   paddingVertical: 24,
  //   backgroundColor: '#fff',
  //   paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 60, // Add padding to avoid the notch or island
  // },
  container: {
    backgroundColor: "#F2F2F2",
    flex: 1,
    paddingHorizontal: 16,
  },
  contentContainer: {
    alignItems: "center",
    marginTop: height * 0.12,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 16,
  },
  headerBackground: {
    height: height * 0.19,
    left: 0,
    position: "absolute",
    top: 0,
    width: "120%",
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  addMealButton: {
    position: 'absolute',
    right: 0,
    top: -10,
    // padding: 8,
  },
  addMealContainer: {
    width: 40,
    height: 40,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.Secondary.Pink[500],
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
  optionTabsContainer: {
    alignItems: "center",
    width: "100%",
    marginVertical: 16,
  },
  rewardCardContainer:{
    borderRadius:16
  },
  rewards_points:{
    backgroundColor:"lightblue"
  }
  });