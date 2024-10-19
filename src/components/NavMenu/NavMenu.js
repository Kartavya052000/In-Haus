// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
// import { HausIcon, CalendarIcon, MealAIIcon, RewardsIcon, ProfileIcon } from '../icons/icons';
// import Typography from '../typography/Typography'; // Importar Typography personalizado

// function HausScreen() { return null; }
// function CalendarScreen() { return null; }
// function MealAIScreen() { return null; }
// function RewardsScreen() { return null; }
// function ProfileScreen() { return null; }

// const Tab = createBottomTabNavigator();

// const NavMenu = () => {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color, size }) => {
//             let IconComponent;
//             if (route.name === 'Haus') {
//               IconComponent = <HausIcon />;
//             } else if (route.name === 'Calendar') {
//               IconComponent = <CalendarIcon />;
//             } else if (route.name === 'MealAI') {
//               IconComponent = <MealAIIcon />;
//             } else if (route.name === 'Rewards') {
//               IconComponent = <RewardsIcon />;
//             } else if (route.name === 'Profile') {
//               IconComponent = <ProfileIcon />;
//             }

//             return (
//               <>
//                 {IconComponent}
//                 <Typography variant="SH5" color={color} align="center">
//                   {/* {route.name} */}
//                 </Typography>
//               </>
//             );
//           },
//           tabBarLabelStyle: { fontSize: 12 },
//           tabBarStyle: {
//             paddingVertical: 10,
//             height: 70,
//           },
//         })}
//       >
//         <Tab.Screen name="Haus" component={HausScreen} />
//         <Tab.Screen name="Calendar" component={CalendarScreen} />
//         <Tab.Screen name="MealAI" component={MealAIScreen} />
//         <Tab.Screen name="Rewards" component={RewardsScreen} />
//         <Tab.Screen name="Profile" component={ProfileScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// };

// export default NavMenu;
