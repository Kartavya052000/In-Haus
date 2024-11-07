import React from 'react';
import Svg, { Path } from 'react-native-svg';
// Haus Icon
export const BackIcon = ({ color = "#333232" }) => (
  <Svg xmlns="http://www.w3.org/2000/Svg" width="28" height="28" fill="none">
    <Path fill={color} fillRule="evenodd" d="M11.667 2.333a9.333 9.333 0 0 0-9.334 9.334v4.666a9.333 9.333 0 0 0 9.334 9.334h4.666a9.333 9.333 0 0 0 9.334-9.334v-4.666a9.333 9.333 0 0 0-9.334-9.334h-4.666Zm4.385 8.343a1.167 1.167 0 0 0-1.771-1.519l-3.5 4.084a1.167 1.167 0 0 0 0 1.518l3.5 4.084a1.167 1.167 0 1 0 1.771-1.519L13.203 14l2.85-3.324Z" clipRule="evenodd" />
  </Svg>
);

// Camera Icon
export const CameraIcon = ({ color = "#333232" }) => (
  <Svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/Svg">
    <Path fill={color} fillRule="evenodd" d="M15 3C15.5046 2.99984 15.9906 3.19041 16.3605 3.5335C16.7305 3.87659 16.9572 4.34684 16.995 4.85L17 5C17 5.24493 17.09 5.48134 17.2527 5.66437C17.4155 5.84741 17.6397 5.96434 17.883 5.993L18 6H19C19.7652 5.99996 20.5015 6.29233 21.0583 6.81728C21.615 7.34224 21.9501 8.06011 21.995 8.824L22 9V18C22 18.7652 21.7077 19.5015 21.1827 20.0583C20.6578 20.615 19.9399 20.9501 19.176 20.995L19 21H5C4.23479 21 3.49849 20.7077 2.94174 20.1827C2.38499 19.6578 2.04989 18.9399 2.005 18.176L2 18V9C1.99996 8.23479 2.29233 7.49849 2.81728 6.94174C3.34224 6.38499 4.06011 6.04989 4.824 6.005L5 6H6C6.26522 6 6.51957 5.89464 6.70711 5.70711C6.89464 5.51957 7 5.26522 7 5C6.99984 4.49542 7.19041 4.00943 7.5335 3.63945C7.87659 3.26947 8.34685 3.04284 8.85 3.005L9 3H15Z" clipRule="evenodd" />
  </Svg>
);

// Calendar Icon
export const CalendarIcon = ({ color = "#333232" }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/Svg">
    <Path d="M2 9C2 6.23858 4.23858 4 7 4H17C19.7614 4 22 6.23858 22 9H2Z" fill={color}/>
    <Path d="M6 3C6 2.44772 6.44772 2 7 2C7.55228 2 8 2.44772 8 3V5C8 5.55228 7.55228 6 7 6C6.44772 6 6 5.55228 6 5V3Z" fill={color}/>
    <Path d="M17 3C17 2.44772 17.4477 2 18 2C18.5523 2 19 2.44772 19 3V5C19 5.55228 18.5523 6 18 6C17.4477 6 17 5.55228 17 5V3Z" fill={color}/>
    <Path fillRule="evenodd" clipRule="evenodd" d="M22 10H2V18C2 20.2091 3.79086 22 6 22H18C20.2091 22 22 20.2091 22 18V10ZM5 12C4.44772 12 4 12.4477 4 13V15C4 15.5523 4.44772 16 5 16H7C7.55228 16 8 15.5523 8 15V13C8 12.4477 7.55228 12 7 12H5Z" fill={color}/>
  </Svg>
);

// MealAI Icon
export const MealAIIcon = ({ color = "#333232" }) => (
  <Svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/Svg">
    <Path d="M15.5 3C15.3623 3 15.226 3.00556 15.0911 3.01648C14.3233 1.24178 12.5567 0 10.5 0C8.44331 0 6.67665 1.24178 5.90888 3.01648C5.77403 3.00556 5.63766 3 5.5 3C2.73858 3 0.5 5.23858 0.5 8C0.5 10.0503 1.7341 11.8124 3.5 12.584V14H17.5V12.584C19.2659 11.8124 20.5 10.0503 20.5 8C20.5 5.23858 18.2614 3 15.5 3Z" fill={color}/>
    <Path d="M3.5 16H17.5V18C17.5 19.1046 16.6046 20 15.5 20H5.5C4.39543 20 3.5 19.1046 3.5 18V16Z" fill={color}/>
  </Svg>
);

// Rewards Icon
export const RewardsIcon = ({ color = "#333232" }) => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/Svg">
    <Path fillRule="evenodd" clipRule="evenodd" d="M8 0C3.58172 0 0 3.58172 0 8V12C0 16.4183 3.58172 20 8 20H12C16.4183 20 20 16.4183 20 12V8C20 3.58172 16.4183 0 12 0H8ZM10.7675 4.55763C10.5259 3.81412 9.47406 3.81412 9.23248 4.55763L8.36932 7.21417C8.26128 7.54668 7.95143 7.7718 7.60181 7.7718H4.80856C4.02679 7.7718 3.70174 8.77219 4.33421 9.23171L6.59399 10.8735C6.87684 11.079 6.9952 11.4433 6.88716 11.7758L6.024 14.4323C5.78242 15.1758 6.6334 15.7941 7.26587 15.3346L9.52565 13.6928C9.8085 13.4873 10.1915 13.4873 10.4744 13.6928L12.7341 15.3346C13.3666 15.7941 14.2176 15.1758 13.976 14.4323L13.1128 11.7758C13.0048 11.4433 13.1232 11.079 13.406 10.8735L15.6658 9.23171C16.2983 8.77219 15.9732 7.7718 15.1914 7.7718H12.3982C12.0486 7.7718 11.7387 7.54668 11.6307 7.21417L10.7675 4.55763Z" fill={color}/>
  </Svg>
);

// Profile Icon
export const ProfileIcon = ({ color = "#333232" }) => (
  <Svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/Svg">
    <Path d="M15.5 3C15.3623 3 15.226 3.00556 15.0911 3.01648C14.3233 1.24178 12.5567 0 10.5 0C8.44331 0 6.67665 1.24178 5.90888 3.01648C5.77403 3.00556 5.63766 3 5.5 3C2.73858 3 0.5 5.23858 0.5 8C0.5 10.0503 1.7341 11.8124 3.5 12.584V14H17.5V12.584C19.2659 11.8124 20.5 10.0503 20.5 8C20.5 5.23858 18.2614 3 15.5 3Z" fill={color}/>
    <Path d="M3.5 16H17.5V18C17.5 19.1046 16.6046 20 15.5 20H5.5C4.39543 20 3.5 19.1046 3.5 18V16Z" fill={color}/>
  </Svg>
);

export const AddIcon = ({ color = "#333232" }) => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/Svg">
    <Path fillRule="evenodd" clipRule="evenodd" d="M0 8C0 3.58172 3.58172 0 8 0H12C16.4183 0 20 3.58172 20 8V12C20 16.4183 16.4183 20 12 20H8C3.58172 20 0 16.4183 0 12V8ZM10 5C10.5523 5 11 5.44772 11 6V9H14C14.5523 9 15 9.44771 15 10C15 10.5523 14.5523 11 14 11H11V14C11 14.5523 10.5523 15 10 15C9.44771 15 9 14.5523 9 14V11H6C5.44771 11 5 10.5523 5 10C5 9.44771 5.44771 9 6 9H9V6C9 5.44772 9.44771 5 10 5Z" fill={color}/>
  </Svg>
);

export const IndianIcon = ({ color = "#333232" }) => (
<Svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={24}
      fill="none"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.707 12.574c0 2.018-2.783 3.654-6.215 3.654-3.433 0-6.216-1.636-6.216-3.654S9.059 8.92 12.492 8.92c3.432 0 6.215 1.636 6.215 3.654zm-4.144-2.088a.52.52 0 01-.518.522.52.52 0 01-.518-.522.52.52 0 01.519-.522.52.52 0 01.517.522zm-3.625 4.698a.52.52 0 00.518-.522.52.52 0 00-.518-.522.52.52 0 00-.518.522.52.52 0 00.518.522zm-.518-3.654a.52.52 0 01-.518.522.52.52 0 01-.518-.522.52.52 0 01.518-.522.52.52 0 01.518.522zm4.661 2.61a.52.52 0 00.518-.522.52.52 0 00-.518-.522.52.52 0 00-.518.522.52.52 0 00.518.522z"
        fill={color}
      />
      <Path
        d="M12.492 17.272c1.866 0 3.607-.442 4.917-1.212 1.284-.755 2.334-1.951 2.334-3.486 0-.159-.011-.314-.033-.465.105.482.12.988.033 1.51 0 3.17-3.246 5.741-7.251 5.741-4.005 0-6.735-2.614-7.252-5.742a3.997 3.997 0 01.033-1.51 3.293 3.293 0 00-.033.466c0 1.535 1.05 2.73 2.335 3.486 1.309.77 3.05 1.212 4.917 1.212z"
        fill={color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.361 12.938c.174.404.189.866.021 1.367-.329.988-1.101 1.518-1.905 1.769-.792.247-1.658.243-2.317.149l.595-1.039c.56.08.81.08 1.41-.107.589-.183 1.034-.524 1.227-1.102.097-.291.07-.486.01-.623-.063-.147-.19-.287-.383-.412a2.578 2.578 0 00-1.22-.366l-.522-1.044c.43 0 1.708.145 2.309.534.308.199.606.482.775.874zm-19.721 0c-.175.404-.19.866-.022 1.367.329.988 1.101 1.518 1.905 1.769.792.247 1.658.243 2.317.149l-.595-1.039c-.56.08-.81.08-1.41-.107-.589-.183-1.034-.524-1.227-1.102-.097-.291-.07-.486-.01-.623.063-.147.19-.287.383-.412a2.57 2.57 0 011.22-.366l.522-1.044c-.429 0-1.708.145-2.309.534-.308.199-.605.482-.775.874zm5.864-6.961a.21.21 0 01.134.264l-.11.337a.755.755 0 00.184.768c.312.313.423.775.285 1.195l-.11.337a.21.21 0 01-.398-.13l.11-.337a.755.755 0 00-.183-.769 1.174 1.174 0 01-.286-1.194l.11-.337a.21.21 0 01.264-.134zm8.103 0a.21.21 0 01.134.264l-.11.337a.755.755 0 00.184.768c.313.313.423.775.286 1.195l-.11.337a.21.21 0 11-.398-.13l.11-.337a.755.755 0 00-.184-.769 1.174 1.174 0 01-.286-1.194l.11-.337a.21.21 0 01.264-.134zm-4.285-.965a.25.25 0 01.16.316l-.131.402a.902.902 0 00.22.917c.373.374.504.925.34 1.427l-.131.402a.25.25 0 11-.475-.155l.131-.402a.902.902 0 00-.22-.918 1.402 1.402 0 01-.34-1.427l.13-.402a.25.25 0 01.316-.16z"
        fill={color}
      />
    </Svg>
);

 export const JapaneseIcon  = ({ color = "#333232" }) => (
  <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={24}
      fill="none"
    
    >
      <Path
        d="M14.833 5c0 .276-.895.5-2 .5-1.104 0-2-.224-2-.5s.896-.5 2-.5c1.105 0 2 .224 2 .5z"
        fill={color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.833 10.5V5c0-1.657-2.238-3-5-3-2.761 0-5 1.343-5 3v5.5c0 1.657 2.239 3 5 3 2.762 0 5-1.343 5-3zm-1.979-4.236c.745-.447.98-.925.98-1.264 0-.34-.235-.817-.98-1.264-.724-.435-1.79-.736-3.02-.736-1.231 0-2.297.301-3.022.736-.744.447-.979.925-.979 1.264 0 .34.235.817.98 1.264.724.435 1.79.736 3.02.736s2.297-.301 3.021-.736z"
        fill={color}
      />
      <Path
        d="M19.833 12.5c0 .276-.895.5-2 .5-1.104 0-2-.224-2-.5s.896-.5 2-.5c1.105 0 2 .224 2 .5zm-10 0c0 .276-.895.5-2 .5-1.104 0-2-.224-2-.5s.896-.5 2-.5c1.105 0 2 .224 2 .5z"
        fill={color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.833 18v-5.5c0-1.657-2.238-3-5-3-2.761 0-5 1.343-5 3V18c0 1.657 2.239 3 5 3 2.762 0 5-1.343 5-3zm-1.979-4.236c.745-.447.98-.925.98-1.264 0-.34-.235-.817-.98-1.264-.724-.435-1.79-.736-3.02-.736-1.231 0-2.297.301-3.022.736-.744.447-.979.925-.979 1.264 0 .34.235.817.98 1.264.724.435 1.79.736 3.02.736s2.297-.301 3.021-.736z"
        fill={color}
      />
      <Path
        d="M19.833 12.5c0 .276-.895.5-2 .5-1.104 0-2-.224-2-.5s.896-.5 2-.5c1.105 0 2 .224 2 .5z"
        fill={color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.833 18v-5.5c0-1.657-2.238-3-5-3-2.761 0-5 1.343-5 3V18c0 1.657 2.239 3 5 3 2.762 0 5-1.343 5-3zm-1.979-4.236c.745-.447.98-.925.98-1.264 0-.34-.235-.817-.98-1.264-.724-.435-1.79-.736-3.02-.736-1.231 0-2.297.301-3.022.736-.744.447-.979.925-.979 1.264 0 .34.235.817.98 1.264.724.435 1.79.736 3.02.736s2.297-.301 3.021-.736z"
        fill={color}
      />
    </Svg>

);
 export const LatamIcon  = ({ color = "#333232" }) => ( 
  <Svg
  xmlns="http://www.w3.org/2000/svg"
  width={25}
  height={24}
  fill="none"
>
  <Path
    d="M19.383 10.998c1.069 1.059 1.336 1.912 1.336 2.206 1.78-2.471-.149-3.971-1.336-4.413 1.069.706.445 1.765 0 2.207zM8.7 8.35l-1.335-.441c2.849-3.178 5.342-1.324 6.232 0-1.78-.442-3.858 0-4.897.441zm-5.341 9.267c0-4.874 3.986-8.826 8.902-8.826 4.917 0 8.903 3.952 8.903 8.826v.19a.697.697 0 01-.7.693H4.058a.696.696 0 01-.699-.694v-.189zm-.445-2.647c.445-2.207.89-3.09 2.226-3.972-.594-.147-1.959-.177-2.671.883-.712 1.059 0 2.5.445 3.089zm2.671-4.414c.89-.882 2.077-1.765 2.67-1.765-1.78-1.412-2.819-.294-3.116.442l-.445.882.89.441zm15.579 3.531l.445.883c.712-.354.593-1.619.445-2.207l-.445.883-.445.441zm-7.122-6.178c2.493 0 4.303 1.765 4.896 2.647.712-.352-.296-1.03-.89-1.323l.246-.488a.883.883 0 00-.796-1.278h-.785l-.14-.55a.893.893 0 00-1.357-.52l-.284.188c-1.068-1.06-1.632-.441-1.78 0 .712.353.89 1.03.89 1.324z"
    fill={color}
  />
</Svg>
);
 export const ItalianIcon  = ({ color = "#333232" }) => (  
  <Svg
  xmlns="http://www.w3.org/2000/svg"
  width={25}
  height={24}
  fill="none"
>
  <Path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M9.293 3L2.57 20.483a1 1 0 001.264 1.303l17.96-6.286c0-4.167-2.5-12.5-12.5-12.5zm5.5 12.5a3 3 0 100-6 3 3 0 000 6zm-4-6a1 1 0 11-2 0 1 1 0 012 0zm-3.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
    fill={color}
  />
</Svg>
);
 export const VietnameseIcon  = ({ color = "#333232" }) => (
  <Svg
  xmlns="http://www.w3.org/2000/svg"
  width={25}
  height={24}
  fill="none"
>
  <Path
    d="M21.19 10.17H4.477a.641.641 0 00-.643.645.647.647 0 00.643.646h.1l.43 2.821a5.797 5.797 0 003.97 4.652v.741a.324.324 0 00.322.323h7.071a.32.32 0 00.322-.323v-.74a5.797 5.797 0 003.97-4.653l.43-2.821h.1a.642.642 0 00.642-.646.647.647 0 00-.642-.645zM9.838 8.233a.32.32 0 00.321-.323c0-.62.048-.921.099-1.24.052-.33.107-1.676.107-2.347A.323.323 0 0010.043 4a.32.32 0 00-.321.323c0 .62-.048 1.925-.099 2.244-.053.33-.107.672-.107 1.343a.324.324 0 00.322.323zm1.928 0a.32.32 0 00.322-.323c0-.62.048-.921.098-1.24.053-.33.107-1.676.107-2.347A.324.324 0 0011.972 4a.32.32 0 00-.322.323c0 .62-.048 1.925-.098 2.244-.053.33-.107.672-.107 1.343a.323.323 0 00.321.323zm1.929 0a.32.32 0 00.321-.323c0-.62.048-.921.099-1.24.053-.33.107-1.676.107-2.347A.324.324 0 0013.9 4a.32.32 0 00-.321.323c0 .62-.048 1.925-.099 2.244-.052.33-.107.672-.107 1.343a.323.323 0 00.322.323zm1.928 0a.32.32 0 00.322-.323c0-.62.048-.921.098-1.24.053-.33.108-1.676.108-2.347A.324.324 0 0015.829 4a.32.32 0 00-.321.323c0 .62-.049 1.925-.1 2.244-.052.33-.106.672-.106 1.343a.323.323 0 00.321.323z"
    fill={color}
  />
</Svg>
);
export const FiltersIcon = ({ color = "#333232" }) => (
  <Svg
  xmlns="http://www.w3.org/2000/svg"
  width={24}
  height={24}
  fill="none"
>
  <Path
    d="M18 8a2 2 0 100-4 2 2 0 000 4zM5 5a1 1 0 000 2h9a1 1 0 100-2H5zm0 6a1 1 0 100 2h1a1 1 0 100-2H5zm-1 7a1 1 0 011-1h5a1 1 0 110 2H5a1 1 0 01-1-1zm10-7a1 1 0 100 2h5a1 1 0 100-2h-5zm3 7a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zm-5-6a2 2 0 11-4 0 2 2 0 014 0zm2 8a2 2 0 100-4 2 2 0 000 4z"
    fill="#fff"
  />
</Svg>
);

export const ChineseIcon = ({ color = "#333232" }) => (
<Svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={24}
      fill="none"
    >
      <Path
        d="M4.492 9.877a.465.465 0 00-.425.277l-1.86 4.197a.465.465 0 10.85.379l.841-1.898 1.395 8.389a.93.93 0 00.918.779h11.447a.93.93 0 00.917-.78l1.453-8.74 1.267 2.286a.464.464 0 10.813-.453l-2.326-4.196a.465.465 0 00-.406-.24H4.492z"
        fill={color}
      />
      <Path
        d="M17.05 9.877l3.708-4.956a.923.923 0 00-.085-1.204.917.917 0 00-1.437.178l-3.581 5.982h1.395zm1.157-7.523l-.223-.167a.93.93 0 00-1.408.367L13.33 9.877h.93l4.164-6.26a.934.934 0 00-.216-1.263z"
        fill={color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.26 4.282L12.4 8.945H4.491c0-1.492 1.24-1.865 1.86-1.865.373-2.238 2.016-2.176 2.791-1.865.745-.373 1.55.155 1.86.466.373-.373.776-.156.931 0 .465-1.399 1.395-1.865 2.326-1.399zm-3.256 3.264a.466.466 0 11-.931.001.466.466 0 01.93-.001zM8.678 7.08a.466.466 0 100-.932.466.466 0 000 .932z"
        fill={color}
      />
    </Svg>
);

export const SearchIcon = ({ color = "#8E8D8D" }) => (
  <Svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/Svg">
    <Path fill={color} fillRule="evenodd" d="M8.333 1.667a6.667 6.667 0 0 0-6.666 6.666v3.334a6.667 6.667 0 0 0 6.666 6.666h3.334a6.667 6.667 0 0 0 6.666-6.666V8.333a6.667 6.667 0 0 0-6.666-6.666H8.333Zm4.375 8.02c0 .652-.207 1.257-.559 1.75l1.037 1.037a.503.503 0 1 1-.712.712l-1.037-1.037a3.02 3.02 0 1 1 1.27-2.462Z"  clipRule="evenodd" />
  </Svg>
);
export const GoBackIcon = ({ color = "#333232" }) => (
  <Svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/Svg">
    <Path fill={color} fillRule="evenodd" d="M8 0a8 8 0 0 0-8 8v4a8 8 0 0 0 8 8h4a8 8 0 0 0 8-8V8a8 8 0 0 0-8-8H8Zm3.76 7.15a1 1 0 1 0-1.52-1.3l-3 3.5a1 1 0 0 0 0 1.3l3 3.5a1 1 0 0 0 1.52-1.3L9.316 10l2.442-2.85Z" clipRule="evenodd" />
  </Svg>
)

export const smileIcon = ({ color = "#333232" }) => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/Svg">
    <Path fillRule="evenodd" clipRule="evenodd" d="M10 20C15.5228 20 20 15.5229 20 10C20 4.47714 15.5228 0 10 0C4.47717 0 0 4.47714 0 10C0 15.5229 4.47717 20 10 20ZM14 10C15.1046 10 16 9.10458 16 8C16 6.89542 15.1046 6 14 6C12.8954 6 12 6.89542 12 8C12 9.10458 12.8954 10 14 10ZM8 8C8 9.10458 7.10455 10 6 10C4.89545 10 4 9.10458 4 8C4 6.89542 4.89545 6 6 6C7.10455 6 8 6.89542 8 8ZM6.78082 12.3753C6.43585 11.9441 5.80652 11.8741 5.37531 12.2191C4.94403 12.5641 4.87408 13.1935 5.21912 13.6247C7.6701 16.6884 12.3298 16.6884 14.7808 13.6247C15.1259 13.1935 15.0559 12.5641 14.6247 12.2191C14.1934 11.8741 13.5641 11.9441 13.2191 12.3753C11.5688 14.4382 8.43121 14.4382 6.78082 12.3753Z" fill={color}/>
  </Svg>
);

export const mehIcon = ({ color = "#333232" }) => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/Svg">
    <Path fillRule="evenodd" clipRule="evenodd" d="M10 20C15.5228 20 20 15.5229 20 10C20 4.47714 15.5228 0 10 0C4.47717 0 0 4.47714 0 10C0 15.5229 4.47717 20 10 20ZM14 10C15.1046 10 16 9.10458 16 8C16 6.89542 15.1046 6 14 6C12.8954 6 12 6.89542 12 8C12 9.10458 12.8954 10 14 10ZM8 8C8 9.10458 7.10455 10 6 10C4.89545 10 4 9.10458 4 8C4 6.89542 4.89545 6 6 6C7.10455 6 8 6.89542 8 8ZM13.2191 15.5472C13.5641 15.9784 14.1934 16.0484 14.6246 15.7033C15.0559 15.3583 15.1259 14.729 14.7808 14.2978C12.3298 11.234 7.6701 11.234 5.21912 14.2978C4.87408 14.729 4.94403 15.3583 5.37524 15.7033C5.80652 16.0484 6.43585 15.9784 6.78082 15.5472C8.43115 13.4843 11.5687 13.4843 13.2191 15.5472Z" fill={color}/>
  </Svg>
);

export const frownIcon = ({ color = "#333232" }) => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/Svg">
    <Path fillRule="evenodd" clipRule="evenodd" d="M10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10Zm4-10a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM8 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm5.22 7.547a1 1 0 1 0 1.56-1.25c-2.45-3.063-7.11-3.063-9.56 0a1 1 0 1 0 1.56 1.25 4.123 4.123 0 0 1 6.44 0Z" fill={color}/>
</Svg>
);
// export const AddIcon = ({ fill = '#333232'}) => (
//   <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <Path fillRule="evenodd" clipRule="evenodd" d="M0 8C0 3.58172 3.58172 0 8 0H12C16.4183 0 20 3.58172 20 8V12C20 16.4183 16.4183 20 12 20H8C3.58172 20 0 16.4183 0 12V8ZM10 5C10.5523 5 11 5.44772 11 6V9H14C14.5523 9 15 9.44771 15 10C15 10.5523 14.5523 11 14 11H11V14C11 14.5523 10.5523 15 10 15C9.44771 15 9 14.5523 9 14V11H6C5.44771 11 5 10.5523 5 10C5 9.44771 5.44771 9 6 9H9V6C9 5.44772 9.44771 5 10 5Z" fill={fill} />
//   </Svg>
// );

export const OpenIcon = ({ color = "#333232" }) => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/Svg">
    <Path fillRule="evenodd" clipRule="evenodd" d="M8 0C3.58172 0 0 3.58172 0 8V12C0 16.4183 3.58172 20 8 20H12C16.4183 20 20 16.4183 20 12V8C20 3.58172 16.4183 0 12 0H8ZM7.15081 8.24073C6.73148 7.88131 6.10018 7.92987 5.74076 8.3492C5.38134 8.76852 5.4299 9.39982 5.84923 9.75924L9.34923 12.7592C9.72372 13.0802 10.2763 13.0802 10.6508 12.7592L14.1508 9.75924C14.5701 9.39982 14.6187 8.76852 14.2593 8.3492C13.8999 7.92987 13.2686 7.88131 12.8492 8.24073L10 10.6829L7.15081 8.24073Z" fill={color}/>
  </Svg>
);

export const CloseIcon = ({ color = "#333232" }) => (
  <Svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/Svg">
    <Path fillRule="evenodd" clipRule="evenodd" d="M8.333 1.667a6.667 6.667 0 0 0-6.666 6.666v3.334a6.667 6.667 0 0 0 6.666 6.666h3.334a6.667 6.667 0 0 0 6.666-6.666V8.333a6.667 6.667 0 0 0-6.666-6.666H8.333Zm4.041 9.799a.833.833 0 0 0 1.085-1.265l-2.917-2.5a.833.833 0 0 0-1.084 0L6.54 10.2a.833.833 0 1 0 1.085 1.265L10 9.431l2.374 2.035Z" fill={color}/>
  </Svg>
);

export const TextIcon = ({ color = "#333232" }) => (
  <Svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/Svg">
    <Path fillRule="evenodd" clipRule="evenodd" d="M8 0a8 8 0 0 0-8 8v4a8 8 0 0 0 8 8h4a8 8 0 0 0 8-8V8a8 8 0 0 0-8-8H8ZM5 4a1 1 0 0 0 0 2h10a1 1 0 1 0 0-2H5ZM4 15a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Zm1-6a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H5Z" fill={color}/>
  </Svg>
);

export const HausIcon = ({ color = "#333232" }) => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/Svg">
    <Path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58172 0 0 3.58172 0 8V12C0 16.4183 3.58172 20 8 20H12C16.4183 20 20 16.4183 20 12V8C20 3.58172 16.4183 0 12 0H8ZM4.04904 15.1045L4 7.94531C3.99952 7.87421 4.03542 7.8078 4.09517 7.76926L9.88735 4.03318C9.95574 3.98907 10.0436 3.98893 10.1121 4.03283L15.9043 7.74385C15.9639 7.78206 16 7.84801 16 7.91883V15.1022C16 15.251 15.8481 15.3516 15.711 15.2935L14.4123 14.7425C14.3355 14.7099 14.2856 14.6346 14.2856 14.5512V9.03296C14.2856 8.96369 14.2511 8.89897 14.1936 8.86038L10.1413 6.14244C10.0713 6.09547 9.97986 6.09547 9.90983 6.14244L5.85762 8.86038C5.80009 8.89897 5.76557 8.96369 5.76557 9.03296V14.5512C5.76557 14.6346 5.7157 14.7099 5.63892 14.7425L4.338 15.2944C4.20152 15.3523 4.05006 15.2527 4.04904 15.1045Z" fill={color}/>
  </Svg>
);

export const MealIcon = ({ color = "#333232" }) => (
  <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={24}
      fill="none"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.167 22c5.522 0 10-4.477 10-10s-4.478-10-10-10c-5.523 0-10 4.477-10 10s4.477 10 10 10zm-4-16h.8v4a.8.8 0 00.8-.8V6h.8v4a.8.8 0 00.8-.8V6h.8v4.4a2 2 0 01-1.42 1.914l.092 1.366a8.611 8.611 0 01.122 1.842l.006.078h-.008c-.056 1.357-.39 2.4-.792 2.4-.403 0-.737-1.043-.792-2.4h-.008l.005-.078a9.855 9.855 0 01-.005-.322c0-.56.047-1.082.128-1.52l.09-1.366A2 2 0 018.168 10.4V6zm8 4c0-1.767-1.517-4-2.4-4v11.41a.59.59 0 101.178-.02l-.15-4.222c.775-.22 1.372-1.555 1.372-3.168z"
        fill={color}
      />
    </Svg>
);

export const DessertIcon = ({ color = "#333232" }) => (
  <Svg width="21" height="19" fill="none" xmlns="http://www.w3.org/2000/Svg">
    <Path d="M6.00002 11C4.00002 11 3 10.6758 2 10.3424l1.34705 7.1843c.08869.473.50166.8157.98288.8157H9L6.00002 11ZM14.5 6c-6.4-.4-8.33332 2.84242-8.49998 4.3424C4.16668 10.3424.5 9.74244.5 7.34244c0-2.4 2.00001-2.66667 3.00002-2.5-.5-2.5 2-3.5 3-3.5.58317 0 .67038-.5314.61025-1.013136-.02552-.204425.16812-.3905829.35777-.3101432C9.52302.890738 10.3446 2.56557 10.5 3.34241c2.8-.4 3.8333 1.49092 4 2.65759Z" fill={color}/>
    <Path d="M20.4752 11.1875c.0164-.1137.0248-.2288.0248-.3451 0-2.20913-3.0221-3.99996-6.75-3.99996S7 8.63327 7 10.8424c0 .1163.00836.2314.02478.3451.1546-.4787 1.01453-.8451 2.05212-.8451.62037 0 1.1771.131 1.5577.3386.3806-.2076.9374-.3386 1.5577-.3386.6203 0 1.1771.131 1.5577.3386.3806-.2076.9374-.3386 1.5577-.3386.6203 0 1.1771.131 1.5577.3386.3806-.2076.9374-.3386 1.5577-.3386 1.0376 0 1.8975.3664 2.0521.8451ZM9.5 11.3424c-1.10457 0-2 .4478-2 1l2.24359 5.3847c.15527.3726.51941.6153.92311.6153h1.3113l-1.4569-4.8563c-.0794-.2645.0707-.5432.3352-.6226.2645-.0793.5433.0708.6226.3353l1.5 5c.0144.0478.0212.0961.0212.1436H13.5v-5c0-.2761.2238-.5.5-.5.2761 0 .5.2239.5.5v5h.4999c0-.0475.0068-.0958.0212-.1436l1.5-5c.0793-.2645.3581-.4146.6226-.3353.2645.0794.4146.3581.3352.6226l-1.4569 4.8563h.8113c.4037 0 .7678-.2427.9231-.6153L20 12.3424c0-.5522-.8954-1-2-1-.473 0-.9076.0821-1.25.2194-.3424-.1373-.777-.2194-1.25-.2194-.5973 0-1.1335.131-1.5.3386-.3665-.2076-.9027-.3386-1.5-.3386s-1.1335.131-1.5.3386c-.3665-.2076-.9027-.3386-1.5-.3386Z" fill={color}/>
  </Svg>
);

export const BreakfastIcon = ({ color = "#333232" }) => ( 
  <Svg width="19" height="16" fill="none" xmlns="http://www.w3.org/2000/Svg">
    <Path d="M15.5001 0c.6073.00024154 1.2003.184813 1.7005.529309s.884.832691 1.1008 1.400031c.2167.56735.2562 1.18711.1131 1.77736-.1431.59025-.4619 1.12317-.9144 1.5283V14c0 .5304-.2107 1.0391-.5858 1.4142S16.0305 16 15.5001 16h-12c-.53043 0-1.03914-.2107-1.41421-.5858S1.5001 14.5304 1.5001 14V5.236c-.44171-.39504-.756526-.91205-.904745-1.4858-.148218-.57376-.123194-1.17856.071916-1.73811C.86238 1.45254 1.21884.96331 1.69167.60611 2.1645.24891 2.73253.0397449 3.3241.00500011h12.176V0Z" fill={color}/>
  </Svg>
);

export const SnacksIcon = ({ color = "#333232" }) => (
  <Svg
  xmlns="http://www.w3.org/2000/svg"
  width={25}
  height={24}
  fill="none"
>
  <Path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M12.167 3.5c0 1.029.497 1.912 1.207 2.296A3.59 3.59 0 0013.167 7c0 2.21 2.014 4 4.5 4a4.86 4.86 0 002.68-.787c.164.304.43.544.752.676A9 9 0 1112.167 3h.04a3.04 3.04 0 00-.04.5zm-2 7.5a2 2 0 11-4 0 2 2 0 014 0zm-1 5a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 11-2 0 1 1 0 012 0zm-3.5-4a.5.5 0 110 1 .5.5 0 010-1zm-.5-3.5a.5.5 0 10-1 0 .5.5 0 001 0z"
    fill={color}
  />
</Svg>
);

export const SaladIcon = ({ color = "#333232" }) => ( 
  <Svg width="21" height="16" fill="none" xmlns="http://www.w3.org/2000/Svg">
    <Path d="M.5515 7.13889c-.213425-.66076.263143-1.34311.93805-1.34311H19.5104c.675 0 1.1515.68235.9381 1.34311l-.555 1.71815H1.10647L.5515 7.13889ZM1.60086 9.87747H19.4813l-.4953 1.18713C17.7366 14.0596 14.88 16 11.7204 16H9.60511c-2.81345 0-5.41518-1.5422-6.83279-4.0501L1.60086 9.87747ZM6.54483 5.28557C4.56724 2.83655 1.76566 2.90458.61207 3.24472l.4944 2.04085h1.48319c0-.17007.09888-.51021.49439-.51021.39552 0 .824.34014.9888.51021h2.47198ZM19.3991 2.73451c.3956 1.2245-.1648 2.04085-.4944 2.55106h-1.9775c.3296-.17007.3835-.8225 0-1.02043-.7911-.40816-1.648.51021-1.9776 1.02042h-2.9664c1.5821-3.26535 5.6031-3.06127 7.4159-2.55105ZM11.4888 4.26515c-.3955 0-.4944.68029-.4944 1.02043l-2.96638-.00001-.9888-1.02043c.1648-.17006.29664-.61225 1.48319-1.02042 1.18656-.40817 2.63679.51022 2.96639 1.02043ZM11.9832 3.75495c-.4944-1.02043-.9888-1.02042-.9888-1.02042.4944-.51022-.6592-1.70071-1.48319-2.040852C10.6978-.12266 11.6536.353535 11.9832.693677c.1648-.340142.4944-1.02043 1.9776-.510211.839.288625.4944.850364.4944 1.020434.3955-.408171 1.1536.17007 1.4832.51021-1.4832 0-3.4608 1.02041-3.9552 2.04084Z" fill={color}/>
    <Path d="M10.0056 2.73452c-2.3731-.81634-3.29597.34014-3.46077 1.02042-2.3731-1.63267-3.95517-1.36056-4.44957-1.02043.79103-.81634 1.64799-1.02042 1.97759-1.02042.16479-.34014.79103-1.020424 1.97758-1.020424s1.81279.340144 1.97759.510214c1.58207 0 1.97758 1.02043 1.97758 1.53064Z" fill={color}/>
  </Svg>
);

export const SoupIcon = ({ color = "#333232" }) => (
  <Svg width="19" height="16" fill="none" xmlns="http://www.w3.org/2000/Svg">
    <Path d="M17.9 6.2H1a.6.6 0 0 0-.6.6.6.6 0 0 0 .6.7h.1l.5 2.8c.3 2.2 1.9 4 4 4.6v.8a.3.3 0 0 0 .3.3h7a.3.3 0 0 0 .4-.3v-.8c2-.6 3.6-2.4 4-4.6l.4-2.8a.6.6 0 0 0 .7-.7.6.6 0 0 0-.6-.6Zm-11.4-2a.3.3 0 0 0 .3-.3L7 2.7A26.7 26.7 0 0 0 7 0a.3.3 0 0 0-.5.2A26.2 26.2 0 0 1 6.2 4a.3.3 0 0 0 .3.3Zm2 0a.3.3 0 0 0 .3-.3V2.7a26.7 26.7 0 0 0 0-2.6.3.3 0 0 0-.5.2A26.2 26.2 0 0 1 8.1 4a.3.3 0 0 0 .3.3Zm1.9 0a.3.3 0 0 0 .3-.3V2.7a26.7 26.7 0 0 0 0-2.6.3.3 0 0 0-.5.2A26.2 26.2 0 0 1 10 4a.3.3 0 0 0 .4.3Zm1.9 0a.3.3 0 0 0 .3-.3l.1-1.2a26.7 26.7 0 0 0 0-2.6.3.3 0 0 0-.5.2A26.2 26.2 0 0 1 12 4a.3.3 0 0 0 .3.3Z" fill={color}/>
  </Svg>
);
