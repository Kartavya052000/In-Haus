import { useQuery, useMutation } from '@apollo/client';
import { GET_GROUP, GET_TASK, GET_USER_TASK, GET_MY_TASK, TASK_COMPLETE } from '../../graphql/mutations/taskMutations';

// Function to get tasks data
export const fetchTasksData = async (groupId, userId, startDate) => {
  // My tasks
  const { data: myTasksData, loading: myTasksLoading, error: myTasksError } = useQuery(GET_MY_TASK);
  if (myTasksLoading) console.log("Loading my tasks...");
  if (myTasksError) console.error("Error loading my tasks:", myTasksError);
  if (myTasksData) console.log("My Tasks:", myTasksData.getMyTasksInGroup);

  // Group tasks by date
  const { data: groupTasksData, loading: groupTasksLoading, error: groupTasksError } = useQuery(GET_GROUP, {
    variables: { groupId, startDate },
  });
  if (groupTasksLoading) console.log("Loading group tasks...");
  if (groupTasksError) console.error("Error loading group tasks:", groupTasksError);
  if (groupTasksData) console.log("Group Tasks by Date:", groupTasksData.getGroup.filteredTasks);

  // User's tasks in the group by date
  const { data: userTasksData, loading: userTasksLoading, error: userTasksError } = useQuery(GET_USER_TASK, {
    variables: { groupId, userId, startDate },
  });
  if (userTasksLoading) console.log("Loading user tasks in group...");
  if (userTasksError) console.error("Error loading user tasks in group:", userTasksError);
  if (userTasksData) console.log("User Tasks in Group by Date:", userTasksData.getUserTasksInGroup.filteredTasks);

  // Completed tasks - assuming we mark a task as complete by calling the TASK_COMPLETE mutation
  const [completeTask, { data: completedTaskData, loading: completedTaskLoading, error: completedTaskError }] = useMutation(TASK_COMPLETE);
  
  const completeTaskById = async (taskId) => {
    try {
      const { data } = await completeTask({ variables: { taskId } });
      console.log("Completed Task:", data.completeTask);
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  return {
    myTasksData: myTasksData?.getMyTasksInGroup,
    groupTasksData: groupTasksData?.getGroup.filteredTasks,
    userTasksData: userTasksData?.getUserTasksInGroup.filteredTasks,
    completeTaskById,
  };
};
