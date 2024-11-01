import { View, Text } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import MyRewards from '../components/Cards/MyRewards'
export default function RewardsList() {
    const route =useRoute();
    const {list} = route.params
  return (
    <View>
      <Text>{list=="myRewards"?"My Rewards": "Rewards History"}</Text>
      <MyRewards list={list} />
    </View>
  )
}