import { View, Image, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Typography from '../typography/Typography';
import { useNavigation } from '@react-navigation/native';
import TabsNavigation from '../TabsNavigators/TabsNavigation';
import { GET_GROUP } from "../../graphql/mutations/taskMutations";
import * as SecureStore from 'expo-secure-store'; 
import { useLazyQuery } from '@apollo/client';
import { GET_USER__REDEEMED_REWARD_LIST, GET_USER_REWARD_LIST } from '../../graphql/mutations/rewardsMutations';

export default function MyRewards({ text, setIsVisible, list, setDetails,shouldFetchRewards, onFetchRewardsComplete }) {
  const navigation = useNavigation();
  const [members, setMembers] = useState([]);
  const [authToken, setAuthToken] = useState(null);
  const [rewards, setRewards] = useState([]);
  const [redeemRewards, setRedeemRewards] = useState({});
  
  const handleRedirect = (item) => {
    if (text === "My") {
      setIsVisible(true);
      setDetails(item);
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
            fetchUserRedeemRewards(token);
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

  const [fetchRewards] = useLazyQuery(GET_USER_REWARD_LIST, {
    fetchPolicy: "network-only", // Forces fresh data fetch from network
    onCompleted: (data) => {
      // console.log(data.getUserRewardList,"USERRR")
      setRewards(data.getUserRewardList);
    },
    onError: (error) => {
      console.error('Error fetching user rewards:', error.message);
    },
  });

  const fetchUserRewards = async (token) => {
    console.log(token)
    fetchRewards({
      context: {
        headers: {
          Authorization: `${token}`,
        },
      },
    });
  };

  const [fetchRedeemedRewards] = useLazyQuery(GET_USER__REDEEMED_REWARD_LIST, {
    onCompleted: (data) => {
      setRedeemRewards(data.getRedeemedRewards);
    },
    onError: (error) => {
      console.error('Error fetching redeemed rewards:', error.message);
    },
  });

  const fetchUserRedeemRewards = async (token) => {
    fetchRedeemedRewards({
      context: {
        headers: {
          Authorization: `${token}`,
        },
      },
    });
  };
  useEffect(() => {
    if (shouldFetchRewards && authToken) {
      console.log("Hit")
      fetchUserRewards(authToken); // Trigger fetch when shouldFetchRewards changes
      fetchUserRedeemRewards(authToken)
      onFetchRewardsComplete(); // Reset fetch trigger in parent
    }
  }, [shouldFetchRewards, authToken]);
  const [fetchGroup] = useLazyQuery(GET_GROUP, {
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
          Authorization: `${token}`,
        },
      },
      variables: {
        groupID: "test",
      },
    });
  };

  const renderRewardItem = ({ item }) => (
    <View style={styles.rewardContainer}>
      <Image
        source={{ uri: 'https://download.logo.wine/logo/PlayStation/PlayStation-Logo.wine.png' }}
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
        source={{ uri: 'https://download.logo.wine/logo/PlayStation/PlayStation-Logo.wine.png' }}
        style={styles.rewardImage}
      />
      <View style={styles.rewardDetails}>
        <Typography variant="SH4" color="#000">{item.name}</Typography>
        <Typography variant="Caption" color="#888">{item.pointsAssigned} points</Typography>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      {(members.length > 0 && text !== "My") && (
        <TabsNavigation
          users={members}
          activeColor="black"
          inactiveColor="gray"
          style={styles.members}
        />
      )}
      
      <View style={styles.parentRewardContainer}>
        <View style={styles.header}>
          <Typography variant="SH3" color="#000">{text} Rewards</Typography>
          <TouchableOpacity onPress={handleDetailsList}>
            <Typography variant="BodyS" color="#000">See All</Typography>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={rewards} 
          renderItem={renderRewardItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.rewardList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Typography variant="BodyS" color="#888">No rewards found.</Typography>
            </View>
          }
        />
      </View>
      
      <View style={styles.parentRewardContainer}>
        <View style={styles.header}>
          <Typography variant="SH3" color="#000">Redeemed Rewards</Typography>
          <TouchableOpacity onPress={handleDetailsList}>
            <Typography variant="BodyS" color="#000">See All</Typography>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={redeemRewards} 
          renderItem={renderRedeemRewardItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.rewardList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Typography variant="BodyS" color="#888">No rewards found.</Typography>
            </View>
          }
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginTop: 40,
  },
  members: {
    marginBottom: 20,
  },
  parentRewardContainer: {
    backgroundColor: "#fff",
    marginTop: 16,
    padding: 10,
    borderRadius: 16,
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
    backgroundColor: "#fff",
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
    height: 140,
    backgroundColor: "#FCFAFA",
  },
});
