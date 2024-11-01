import { gql } from "@apollo/client";

export const CREATE_REWARD = gql`
  mutation createReward(
    $name: String!,
    $pointsAssigned: Int!,
    $expiryDate: String!,
    $assignedTo: ID!,
    $category:String!
  ) {
    createReward(
      name: $name,
      pointsAssigned: $pointsAssigned,
      expiryDate: $expiryDate,
      assignedTo: $assignedTo,
      category: $category
    ) {
      id
      name
      pointsAssigned
      expiryDate
      assignedTo {
        id
        username
      }
      category
      createdBy {
        id
        username
      }
    }
  }
`;

export const GET_USER_REWARD_LIST = gql`
  query getUserRewardList {
    getUserRewardList {
      id
      name
      pointsAssigned
      expiryDate
      category
      assignedTo {
        id
      }
    }
  }
`;

export const GET_USER__REDEEMED_REWARD_LIST = gql`
  query getRedeemedRewards {
    getRedeemedRewards {
      id
      name
      pointsAssigned
      expiryDate
      category
     
    }
  }
`;
export const REDEEM_REWARD = gql`
  mutation redeemReward($rewardId: ID!) {
    redeemReward(rewardId: $rewardId) {
      id
      name
      pointsAssigned
      expiryDate
    
    }
  }
`;
