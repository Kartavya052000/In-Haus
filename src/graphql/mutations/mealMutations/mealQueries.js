import { gql } from "@apollo/client";

export const GET_USER_MEALS_BY_DATE = gql`
  query GetUserMealsByDate($userId: ID!, $date: String!) {
    getUserMealsByDate(userId: $userId, date: $date) {
      id
      mealName
      mealType
      date
      portions
      ingredients {
        name
        quantity
      }
    }
  }
`;

export const GET_USER_MEAL_DATES = gql`
  query GetUserMealDates($userId: ID!) {
    getUserMealDates(userId: $userId) {
      dates
    }
  }
`;


