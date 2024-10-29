import { View, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Typography from '../typography/Typography';
import { useNavigation } from '@react-navigation/native';
import TabsNavigation from '../TabsNavigators/TabsNavigation';
import { GET_GROUP } from "../../graphql/mutations/taskMutations";
import * as SecureStore from 'expo-secure-store'; 
import { useLazyQuery } from '@apollo/client';
import { GET_USER__REDEEMED_REWARD_LIST, GET_USER_REWARD_LIST } from '../../graphql/mutations/rewardsMutations';

export default function MyRewards({ text, setIsVisible, list,setDetails }) {
  const navigation = useNavigation();
  const [members, setMembers] = useState([]);
  const [authToken, setAuthToken] = useState(null);
  const [rewards, setRewards] = useState([]);
  const [redeemRewards, setRedeemRewards] = useState({});
  
  
  const handleRedirect = (item) => {
    console.log(item,"ITEM")
    if (text === "My") {
      setIsVisible(true); // Open modal or set visibility
      setDetails(item)
    } else {
      navigation.navigate("CreateReward", { text });
    }
  };
  
  const handleDetailsList = () => {
    navigation.navigate("RewardsList", { list });
  };

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await SecureStore.getItemAsync('authToken'); 
        if (token) {
          setAuthToken(token);
          fetchGroupData(token);
          if (text === "My") {
            fetchUserRewards(token);
            fetchUserRedeemRewards(token)
          }
        } else {
          console.error('No auth token found');
        }
      } catch (error) {
        console.error('Error retrieving auth token:', error);
      }
    };
    getToken();
  }, []);
// ---------FETCH REWARDS-----
  const [fetchRewards, { loading: rewardLoading, error: rewardError, data: rewardData }] = useLazyQuery(GET_USER_REWARD_LIST, {
    onCompleted: (data) => {
      setRewards(data.getUserRewardList,"DTTTTTT");
      // console.log(data, "DATA");
    },
    onError: (error) => {
      console.error('Error fetching user rewardss:', error.message);
    },
  });

  const fetchUserRewards = async (token) => {
    fetchRewards({
      context: {
        headers: {
          Authorization: `${token}`, // Use token in headers
        },
      },
    });
  };
// -----FETCH REWARDS END-------

// ---------FETCH REDEEMED REWARDS-----
const [fetchRedeemedRewards, { loading: rewardRedeemLoading, error: rewardRedeemError, data: rewardRedeemData }] = useLazyQuery(GET_USER__REDEEMED_REWARD_LIST, {
  onCompleted: (data) => {
    setRedeemRewards(data.getRedeemedRewards);
    console.log(data, "Redeem");
  },
  onError: (error) => {
    console.error('Error fetching user rewards:', error.message);
  },
});

const fetchUserRedeemRewards = async (token) => {
  fetchRedeemedRewards({
    context: {
      headers: {
        Authorization: `${token}`, // Use token in headers
      },
    },
  });
};
// -----FETCH REDEEMED REWARDS END-------

// -------FETCH GROUP-----
  const [fetchGroup, { loading, error, data }] = useLazyQuery(GET_GROUP, {
    onCompleted: (data) => {
      const transformedMembers = data.getGroup.members.map((member) => ({
        name: member.username,
        id: member.id,
      }));
      setMembers(transformedMembers);   
    },
    onError: (error) => {
      console.error('Error fetching group:', error.message);
    },
  });

  const fetchGroupData = async (token) => {
    fetchGroup({
      context: {
        headers: {
          Authorization: `${token}`, // Use token in headers
        },
      },
      variables: {
        groupID: "test", // Replace with actual groupID if necessary
      },
    });
  };
// -------FETCH GROUP ENDS-----


  const renderRewardItem = ({ item }) => (
    <View style={styles.rewardContainer}>
      <Image
        source={{ uri: 'https://download.logo.wine/logo/PlayStation/PlayStation-Logo.wine.png' }} // Placeholder image
        style={styles.rewardImage}
      />
      <View style={styles.rewardDetails}>
        <Typography variant="SH4" color="#000">{item.name}</Typography>
        <Typography variant="Caption" color="#888">{item.pointsAssigned} points</Typography>
      </View>
      <TouchableOpacity 
        style={styles.redeemButton} 
        onPress={() => handleRedirect(item)}
      >
        <Typography variant="SH4" color="#007AFF">
          {text === "My" ? "Redeem" : "Edit"}
        </Typography>
      </TouchableOpacity>
    </View>
  );

  const renderRedeemRewardItem = ({ item }) => (
    <View style={styles.rewardContainer}>
      <Image
        source={{ uri: 'https://download.logo.wine/logo/PlayStation/PlayStation-Logo.wine.png' }} // Placeholder image
        style={styles.rewardImage}
      />
      <View style={styles.rewardDetails}>
        <Typography variant="SH4" color="#000">{item.name}</Typography>
        <Typography variant="Caption" color="#888">{item.pointsAssigned} points</Typography>
      </View>
      {/* <TouchableOpacity 
        style={styles.redeemButton} 
        onPress={handleRedirect}
      >
        <Typography variant="SH4" color="#007AFF">
          {text === "My" ? "Redeem" : "Edit"}
        </Typography>
      </TouchableOpacity> */}
    </View>
  );

  return (
    <>
      {(members.length > 0 && text !== "My") && (
        <TabsNavigation
          users={members}
          activeColor="black"
          inactiveColor="gray"
          style={styles.members}
        />
      )}
      <View style={styles.header}>
        <Typography variant="SH3" color="#000">{text} Rewards</Typography>
        <TouchableOpacity onPress={handleDetailsList}>
          <Typography variant="BodyS" color="#000">See All</Typography>
        </TouchableOpacity>
      </View>
      
      {/* Rewards List */}
      <FlatList
        data={rewards} 
        renderItem={renderRewardItem}
        keyExtractor={(item) => item.id} // Ensure `id` is a string
        contentContainerStyle={styles.rewardList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Typography variant="BodyS" color="#888">No rewards found.</Typography>
          </View>
        }
        
      />
      <View style={styles.header}>
        <Typography variant="SH3" color="#000">Redeemed Rewards</Typography>
        <TouchableOpacity onPress={handleDetailsList}>
          <Typography variant="BodyS" color="#000">See All</Typography>
        </TouchableOpacity>
      </View>

      <FlatList
        data={redeemRewards} 
        renderItem={renderRedeemRewardItem}
        keyExtractor={(item) => item.id} // Ensure `id` is a string
        contentContainerStyle={styles.rewardList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Typography variant="BodyS" color="#888">No rewards found.</Typography>
          </View>
        }
        
      />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginTop: 40,
  },
  members: {
    marginBottom: 20,
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  rewardImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  rewardDetails: {
    flex: 1,
    marginLeft: 5,
  },
  redeemButton: {
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rewardList: {
    paddingBottom: 20,
  },
  emptyContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});
