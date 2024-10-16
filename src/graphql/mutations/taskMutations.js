import { gql } from "@apollo/client";

export const CREATE_TASK = gql`
  mutation createTask(
    $taskName: String!,
    $startDate: String!,
    $endDate: String!,
    $repeat: String!,
    $assignedTo: ID!,
    $points: Int!,
    $type: String!
  ) {
    createTask(
      taskName: $taskName,
      startDate: $startDate,
      endDate: $endDate,
      repeat: $repeat,
      assignedTo: $assignedTo,
      points: $points,
      type: $type
    ) {
      id
      taskName
      startDate
      endDate
      repeat
      assignedTo {
        id
        username
      }
      points
      type
      createdBy {
        id
        username
      }
    }
  }
`;

export const GET_GROUP = gql`
  query GetGroup($groupId: ID!) {
    getGroup(groupId: $groupId) {
      id
      groupName
      members {
        id
        username
      }
      filteredTasks {
        id
        taskName
        startDate
        endDate
        assignedTo {
          id
          username
        }
      }
    }
  }
`;

export const EDIT_TASK = gql`
  mutation editTask(
    $taskId: ID!,
    $updatedTaskDetails: UpdatedTaskInput!
  ) {
    editTask(
      taskId: $taskId,
      updatedTaskDetails: $updatedTaskDetails
    ) {
      id
      taskName
      startDate
      endDate
      repeat
      points
      type
      assignedTo {
        id
        username
      }
      createdBy {
        id
        username
      }
    }
  }
`;


export const GET_TASK = gql`
  query GetTask($taskId: ID!) {
    getTask(taskId: $taskId) {
      id
      taskName
      startDate
      endDate
      repeat
      points
      type
      assignedTo {
        id
        username
      }
      createdBy {
        id
        username
      }
    }
  }
`;
