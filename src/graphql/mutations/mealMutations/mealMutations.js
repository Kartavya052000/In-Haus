import { gql } from "@apollo/client";

export const CREATE_MEAL = gql`
  mutation CreateMeal(
    $userId: ID!,
    $mealName: String!,
    $mealType: MealType!,
    $date: String!,
    $portions: Int,
    $ingredients: [IngredientInput!]
  ) {
    createMeal(
      userId: $userId,
      mealName: $mealName,
      mealType: $mealType,
      date: $date,
      portions: $portions,
      ingredients: $ingredients
    ) {
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

export const UPDATE_MEAL = gql`
  mutation UpdateMeal(
    $mealId: ID!,
    $mealDetails: MealInput!
  ) {
    updateMeal(
      mealId: $mealId,
      mealDetails: $mealDetails
    ) {
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

export const DELETE_MEAL = gql`
  mutation DeleteMeal($mealId: ID!) {
    deleteMeal(mealId: $mealId) {
      success
      message
    }
  }
`;
