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
  <Svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/Svg">
    <Path fill-rule="evenodd" clip-rule="evenodd" d="M10.1667 20C15.6895 20 20.1667 15.5228 20.1667 10C20.1667 4.47715 15.6895 0 10.1667 0C4.64381 0 0.166656 4.47715 0.166656 10C0.166656 15.5228 4.64381 20 10.1667 20ZM6.16666 4H6.96665V8C7.40848 8 7.76665 7.64183 7.76665 7.2V4H8.56665V8C9.00848 8 9.36665 7.64183 9.36665 7.2V4H10.1666V8.4C10.1666 9.30252 9.56884 10.0654 8.7476 10.3143L8.83867 11.6802C8.91964 12.1179 8.96665 12.6397 8.96665 13.2C8.96665 13.3088 8.96488 13.4161 8.96143 13.5217L8.96665 13.6H8.95855C8.90309 14.9569 8.56968 16 8.16665 16C7.76363 16 7.43021 14.9569 7.37475 13.6H7.36665L7.37188 13.5217C7.36843 13.4161 7.36665 13.3088 7.36665 13.2C7.36665 12.6397 7.41367 12.1179 7.49464 11.6802L7.5857 10.3143C6.76446 10.0654 6.16666 9.30252 6.16666 8.4V4ZM14.1667 8C14.1667 6.23269 12.6503 4 11.7666 4V15.4107C11.7666 15.7362 12.0305 16 12.3559 16C12.6896 16 12.9568 15.7232 12.9448 15.3897L12.7941 11.1679C13.57 10.9471 14.1667 9.61291 14.1667 8Z" fill={color}/>
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
  <Svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/Svg">
    <Path fill-rule="evenodd" clip-rule="evenodd" d="M9 .5c0 1.02875.49707 1.91238 1.2074 2.29602C10.0726 3.17599 10 3.58044 10 4c0 2.20914 2.0148 4 4.5 4 1.0042 0 1.9315-.29236 2.6802-.78656.1643.30331.4302.54358.7519.67529C17.9769 8.25287 18 8.62375 18 9c0 4.9706-4.0294 9-9 9-4.97058 0-9-4.0294-9-9 0-4.97055 4.02942-9 9-9l.04004.00009155C9.01379.161621 9 .328796 9 .5ZM7 8c0 1.10458-.89539 2-2 2s-2-.89542-2-2 .89539-2 2-2 2 .89542 2 2Zm-1 5c.55225 0 1-.4477 1-1s-.44775-1-1-1-1 .4477-1 1 .44775 1 1 1Zm6 0c0 .5523-.4478 1-1 1s-1-.4477-1-1 .4478-1 1-1 1 .4477 1 1ZM8.5 9c.27612 0 .5.22385.5.5s-.22388.5-.5.5c-.27612 0-.5-.22385-.5-.5s.22388-.5.5-.5ZM8 5.5c0-.27615-.22388-.5-.5-.5-.27612 0-.5.22385-.5.5s.22388.5.5.5c.27612 0 .5-.22385.5-.5Z" fill={color}/>
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

export const SaveIcon = ({ color = "#333232" }) => (
  <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 16C0 17.1046 0.89543 18 2 18H16C17.1046 18 18 17.1046 18 16V5.82843C18 5.29799 17.7893 4.78929 17.4142 4.41421L13.5858 0.585786C13.2107 0.210713 12.702 0 12.1716 0H11V2C11 3.10457 10.1046 4 9 4H5C3.89543 4 3 3.10457 3 2V0H2C0.895431 0 0 0.89543 0 2V16ZM12 10C12 11.6569 10.6569 13 9 13C7.34315 13 6 11.6569 6 10C6 8.34315 7.34315 7 9 7C10.6569 7 12 8.34315 12 10Z"
      fill={color}
    />
  </Svg>
);

export const CleaningIcon = ({ color = "#183AC1" }) => (
  <Svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M17.5 0C16.9477 0 16.5 0.447715 16.5 1C16.5 1.55228 16.9477 2 17.5 2H17.51C18.0623 2 18.51 1.55228 18.51 1C18.51 0.447715 18.0623 0 17.51 0H17.5Z" fill={color} />
    <Path d="M14.5 2C13.9477 2 13.5 2.44772 13.5 3C13.5 3.55228 13.9477 4 14.5 4H14.51C15.0623 4 15.51 3.55228 15.51 3C15.51 2.44772 15.0623 2 14.51 2H14.5Z" fill={color} />
    <Path d="M11.5 4C10.9477 4 10.5 4.44772 10.5 5C10.5 5.55228 10.9477 6 11.5 6H11.51C12.0623 6 12.51 5.55228 12.51 5C12.51 4.44772 12.0623 4 11.51 4H11.5Z" fill={color} />
    <Path d="M17.5 4C16.9477 4 16.5 4.44772 16.5 5C16.5 5.55228 16.9477 6 17.5 6H17.51C18.0623 6 18.51 5.55228 18.51 5C18.51 4.44772 18.0623 4 17.51 4H17.5Z" fill={color} />
    <Path d="M14.5 6C13.9477 6 13.5 6.44772 13.5 7C13.5 7.55228 13.9477 8 14.5 8H14.51C15.0623 8 15.51 7.55228 15.51 7C15.51 6.44772 15.0623 6 14.51 6H14.5Z" fill={color} />
    <Path d="M17.5 8C16.9477 8 16.5 8.44772 16.5 9C16.5 9.55229 16.9477 10 17.5 10H17.51C18.0623 10 18.51 9.55229 18.51 9C18.51 8.44772 18.0623 8 17.51 8H17.5Z" fill={color} />
    <Path d="M4.5 2C3.39543 2 2.5 2.89543 2.5 4V7C1.39543 7 0.5 7.89543 0.5 9V18C0.5 19.1046 1.39543 20 2.5 20H8.5C9.60457 20 10.5 19.1046 10.5 18V9C10.5 7.89543 9.60457 7 8.5 7V6C9.05229 6 9.5 5.55228 9.5 5C9.5 4.44772 9.05229 4 8.5 4C8.5 2.89543 7.60457 2 6.5 2H4.5Z" fill={color} />
  </Svg>
);

export const LaundryIcon = ({ color = "#333232" }) => (
  <Svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.5 2C0.5 0.895431 1.39543 0 2.5 0H14.5C15.6046 0 16.5 0.895431 16.5 2V18C16.5 19.1046 15.6046 20 14.5 20H2.5C1.39543 20 0.5 19.1046 0.5 18V2ZM4.5 3C4.5 3.55228 4.05228 4 3.5 4C2.94772 4 2.5 3.55228 2.5 3C2.5 2.44772 2.94772 2 3.5 2C4.05228 2 4.5 2.44772 4.5 3ZM6.5 4C7.05228 4 7.5 3.55228 7.5 3C7.5 2.44772 7.05228 2 6.5 2C5.94772 2 5.5 2.44772 5.5 3C5.5 3.55228 5.94772 4 6.5 4ZM8.5 3C8.5 2.44772 8.94772 2 9.5 2H13.5C14.0523 2 14.5 2.44772 14.5 3C14.5 3.55228 14.0523 4 13.5 4H9.5C8.94772 4 8.5 3.55228 8.5 3ZM8.5 17C11.2614 17 13.5 14.7614 13.5 12C13.5 9.23858 11.2614 7 8.5 7C5.73858 7 3.5 9.23858 3.5 12C3.5 14.7614 5.73858 17 8.5 17Z"
      fill={color}
    />
  </Svg>
);

export const DishesIcon = ({ color = "#333232" }) => (
  <Svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M17.5 10C17.5 13.866 14.366 17 10.5 17C6.63401 17 3.5 13.866 3.5 10C3.5 6.13401 6.63401 3 10.5 3C14.366 3 17.5 6.13401 17.5 10Z" fill={color} />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.5 20C16.0228 20 20.5 15.5228 20.5 10C20.5 4.47715 16.0228 0 10.5 0C4.97715 0 0.5 4.47715 0.5 10C0.5 15.5228 4.97715 20 10.5 20ZM18.5 10C18.5 14.4183 14.9183 18 10.5 18C6.08172 18 2.5 14.4183 2.5 10C2.5 5.58172 6.08172 2 10.5 2C14.9183 2 18.5 5.58172 18.5 10Z"
      fill={color}
    />
  </Svg>
);


export const HomeworkIcon = ({ color = "#333232" }) => (
  <Svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.5 0C0.947715 0 0.5 0.447715 0.5 1V15C0.5 15.5523 0.947716 16 1.5 16H8.5C9.16667 16 10.5 16.4 10.5 18C10.5 17.3333 10.9 16 12.5 16H19.5C20.0523 16 20.5 15.5523 20.5 15V1C20.5 0.447715 20.0523 0 19.5 0H12.5C11.3954 0 10.5 0.895431 10.5 2C10.5 0.895431 9.60457 0 8.5 0H1.5ZM13 3C12.7239 3 12.5 3.22386 12.5 3.5C12.5 3.77614 12.7239 4 13 4H18C18.2761 4 18.5 3.77614 18.5 3.5C18.5 3.22386 18.2761 3 18 3H13ZM2.5 3.5C2.5 3.22386 2.72386 3 3 3H8C8.27614 3 8.5 3.22386 8.5 3.5C8.5 3.77614 8.27614 4 8 4H3C2.72386 4 2.5 3.77614 2.5 3.5ZM13 6C12.7239 6 12.5 6.22386 12.5 6.5C12.5 6.77614 12.7239 7 13 7H16C16.2761 7 16.5 6.77614 16.5 6.5C16.5 6.22386 16.2761 6 16 6H13ZM2.5 6.5C2.5 6.22386 2.72386 6 3 6H8C8.27614 6 8.5 6.22386 8.5 6.5C8.5 6.77614 8.27614 7 8 7H3C2.72386 7 2.5 6.77614 2.5 6.5ZM13 9C12.7239 9 12.5 9.22386 12.5 9.5C12.5 9.77614 12.7239 10 13 10H15C15.2761 10 15.5 9.77614 15.5 9.5C15.5 9.22386 15.2761 9 15 9H13ZM2.5 9.5C2.5 9.22386 2.72386 9 3 9H8C8.27614 9 8.5 9.22386 8.5 9.5C8.5 9.77614 8.27614 10 8 10H3C2.72386 10 2.5 9.77614 2.5 9.5ZM3 12C2.72386 12 2.5 12.2239 2.5 12.5C2.5 12.7761 2.72386 13 3 13H8C8.27614 13 8.5 12.7761 8.5 12.5C8.5 12.2239 8.27614 12 8 12H3Z"
      fill={color}
    />
  </Svg>
);

export const GroceriesIcon = ({ color = "#333232" }) => (
  <Svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M2.04415 1.36754C2.31638 0.55086 3.08066 0 3.94152 0H17.0585C17.9193 0 18.6836 0.55086 18.9558 1.36754L20.4203 4.81251C20.4729 4.93623 20.5016 5.06951 20.4949 5.20377C20.4249 6.59862 19.6404 7.80518 18.5 8.46487C18.4691 8.48273 18.438 8.50018 18.4066 8.51722C17.8399 8.82511 17.1904 9 16.5 9C15.6654 9 14.8905 8.74441 14.2494 8.30723C14.2308 8.2946 14.2124 8.28182 14.1941 8.26889C13.9391 8.08868 13.7061 7.87938 13.5 7.64582C13.2791 7.89614 13.0273 8.11859 12.7506 8.30723C12.7405 8.31416 12.7303 8.32104 12.7201 8.32787C12.0849 8.75244 11.3214 9 10.5 9C9.66543 9 8.89055 8.74441 8.24937 8.30723C8.23085 8.2946 8.21244 8.28182 8.19414 8.26889C7.93913 8.08868 7.70614 7.87938 7.5 7.64582C7.27907 7.89614 7.0273 8.11859 6.75063 8.30723C6.74047 8.31416 6.73028 8.32104 6.72005 8.32787C6.08488 8.75244 5.32135 9 4.5 9C3.77143 9 3.08835 8.80521 2.5 8.46487C1.35958 7.80518 0.575091 6.59862 0.505101 5.20377C0.498363 5.06951 0.527107 4.93623 0.579702 4.81251L2.04415 1.36754Z"
      fill={color}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.5 10C3.7889 10 3.11246 9.85155 2.5 9.58396V18H1.5C0.947715 18 0.5 18.4477 0.5 19C0.5 19.5523 0.947716 20 1.5 20H19.5C20.0523 20 20.5 19.5523 20.5 19C20.5 18.4477 20.0523 18 19.5 18H18.5V9.58396C17.8875 9.85155 17.2111 10 16.5 10C15.3745 10 14.3353 9.62739 13.5 9.00021C12.6647 9.62739 11.6255 10 10.5 10C9.37447 10 8.33527 9.62739 7.5 9.00021C6.66473 9.62739 5.62553 10 4.5 10ZM14.5 18V13C14.5 11.8954 13.6046 11 12.5 11H8.5C7.39543 11 6.5 11.8954 6.5 13V18H14.5Z"
      fill={color}
    />
  </Svg>
);

export const BuyIcon = ({ color = "#333232" }) => (
  <Svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M1.4316 0C0.917093 0 0.5 0.447715 0.5 1C0.5 1.55228 0.917093 2 1.4316 2H2.3632V3H2.3651C2.36384 3.0213 2.3632 3.04279 2.3632 3.06445V14.1707C1.27771 14.5825 0.5 15.6938 0.5 17C0.5 18.6569 1.75128 20 3.29481 20C4.83834 20 6.08961 18.6569 6.08961 17C6.08961 16.6494 6.03357 16.3128 5.93058 16H10.9067C10.8037 16.3128 10.7476 16.6494 10.7476 17C10.7476 18.6569 11.9989 20 13.5424 20C15.086 20 16.3372 18.6569 16.3372 17C16.3372 15.3431 15.086 14 13.5424 14H4.22641V12H15.5034C15.9781 12 16.3769 11.6169 16.4293 11.1104L17.1609 4.04302C17.2196 3.4753 16.8242 2.97017 16.2931 2.93454L4.22641 2.125V1C4.22641 0.447715 3.80932 0 3.29481 0H1.4316Z"
      fill={color}
    />
  </Svg>
);

export const VacationIcon = ({ color = "#5A518D" }) => (
  <Svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M3.5 2C3.5 0.89543 4.39543 0 5.5 0H9.5C10.6046 0 11.5 0.895431 11.5 2V3H12.5C13.6046 3 14.5 3.89543 14.5 5V7H0.5V5C0.5 3.89543 1.39543 3 2.5 3H3.5V2Z"
      fill={color}
    />
    <Path d="M14.5 9H0.5V13H14.5V9Z" fill={color} />
    <Path
      d="M14.5 15H0.5V17C0.5 18.1046 1.39543 19 2.5 19H3.5C3.5 19.5523 3.94771 20 4.5 20C5.05229 20 5.5 19.5523 5.5 19H9.5C9.5 19.5523 9.94771 20 10.5 20C11.0523 20 11.5 19.5523 11.5 19H12.5C13.6046 19 14.5 18.1046 14.5 17V15Z"
      fill={color}
    />
  </Svg>
);

export const DinnerIcon = ({ color = "#333232" }) => (
  <Svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.5 20C16.0228 20 20.5 15.5228 20.5 10C20.5 4.47715 16.0228 0 10.5 0C4.97715 0 0.5 4.47715 0.5 10C0.5 15.5228 4.97715 20 10.5 20ZM6.5 4H7.3V8C7.74182 8 8.1 7.64183 8.1 7.2V4H8.89999V8C9.34182 8 9.69999 7.64183 9.69999 7.2V4H10.5V8.4C10.5 9.30252 9.90219 10.0654 9.08095 10.3143L9.17201 11.6802C9.25298 12.1179 9.29999 12.6397 9.29999 13.2C9.29999 13.3088 9.29822 13.4161 9.29477 13.5217L9.29999 13.6H9.29189C9.23644 14.9569 8.90302 16 8.49999 16C8.09697 16 7.76355 14.9569 7.7081 13.6H7.7L7.70522 13.5217C7.70177 13.4161 7.7 13.3088 7.7 13.2C7.7 12.6397 7.74701 12.1179 7.82798 11.6802L7.91904 10.3143C7.0978 10.0654 6.5 9.30252 6.5 8.4V4ZM14.5 8C14.5 6.23269 12.9836 4 12.1 4V15.4107C12.1 15.7362 12.3638 16 12.6893 16C13.023 16 13.2901 15.7232 13.2782 15.3897L13.1274 11.1679C13.9034 10.9471 14.5 9.61291 14.5 8Z"
      fill={color}
    />
  </Svg>
);

export const MovieNightIcon = ({ color = "#333232" }) => (
  <Svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M18.5 6.5C18.5 5.94772 18.0523 5.5 17.5 5.5H3.5C2.94772 5.5 2.5 5.94772 2.5 6.5V15.5C2.5 16.0523 2.94772 16.5 3.5 16.5H17.5C18.0523 16.5 18.5 16.0523 18.5 15.5V6.5Z" fill={color} />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.14645 0.146447C6.95118 0.341709 6.95118 0.658291 7.14645 0.853553L9.79289 3.5H2.5C1.39543 3.5 0.5 4.39543 0.5 5.5V16.5C0.5 17.6046 1.39543 18.5 2.5 18.5H18.5C19.6046 18.5 20.5 17.6046 20.5 16.5V5.5C20.5 4.39543 19.6046 3.5 18.5 3.5H11.2071L13.8536 0.853553C14.0488 0.658291 14.0488 0.341709 13.8536 0.146447C13.6583 -0.0488155 13.3417 -0.0488155 13.1464 0.146447L10.5 2.79289L7.85355 0.146447C7.65829 -0.0488155 7.34171 -0.0488155 7.14645 0.146447ZM3.5 4.5C2.39543 4.5 1.5 5.39543 1.5 6.5V15.5C1.5 16.6046 2.39543 17.5 3.5 17.5H17.5C18.6046 17.5 19.5 16.6046 19.5 15.5V6.5C19.5 5.39543 18.6046 4.5 17.5 4.5H3.5Z"
      fill={color}
    />
  </Svg>
);

export const FootballIcon = ({ color = "#333232" }) => (
  <Svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.5 0C9.18678 0 7.88642 0.258658 6.67317 0.761205C5.45991 1.26375 4.35752 2.00035 3.42893 2.92893C2.50035 3.85752 1.76375 4.95991 1.2612 6.17317C1.21266 6.29035 1.1664 6.40836 1.12242 6.5271C1.10027 6.5641 1.08095 6.60346 1.06484 6.64501C1.04281 6.70184 1.02798 6.75968 1.01992 6.81753C0.676071 7.8418 0.5 8.91652 0.5 10C0.5 11.3132 0.758658 12.6136 1.2612 13.8268C1.76375 15.0401 2.50035 16.1425 3.42893 17.0711C4.35752 17.9997 5.45991 18.7362 6.67317 19.2388C7.88642 19.7413 9.18678 20 10.5 20C11.8132 20 13.1136 19.7413 14.3268 19.2388C15.5401 18.7362 16.6425 17.9997 17.5711 17.0711C18.4997 16.1425 19.2362 15.0401 19.7388 13.8268C20.2413 12.6136 20.5 11.3132 20.5 10C20.5 8.91652 20.3239 7.8418 19.9801 6.81753C19.972 6.75968 19.9572 6.70184 19.9352 6.64501C19.9191 6.60346 19.8997 6.56409 19.8776 6.5271C19.8336 6.40835 19.7873 6.29036 19.7388 6.17317C19.2362 4.95991 18.4997 3.85752 17.5711 2.92893C16.6425 2.00035 15.5401 1.26375 14.3268 0.761205C13.1136 0.258658 11.8132 0 10.5 0ZM2.03846 10C2.03846 9.30587 2.12387 8.61599 2.29163 7.94566L4.99615 8.9942L6.58787 14.0136L4.71341 16.1736C4.6469 16.1112 4.58135 16.0478 4.51679 15.9832C3.73106 15.1975 3.10779 14.2647 2.68256 13.2381C2.25733 12.2115 2.03846 11.1112 2.03846 10ZM15.4944 7.54167L11.2692 4.4793L11.2692 1.5735C12.1167 1.65086 12.9492 1.85577 13.7381 2.18256C14.7647 2.60779 15.6975 3.23106 16.4832 4.01679C17.1997 4.73324 17.781 5.57196 18.2004 6.49258L15.4944 7.54167ZM7.26191 2.18256C8.05084 1.85577 8.8833 1.65086 9.73077 1.5735L9.73077 4.4793L5.50559 7.54167L2.79964 6.49258C3.21897 5.57196 3.80034 4.73323 4.51679 4.01679C5.30252 3.23106 6.23531 2.60779 7.26191 2.18256ZM16.0039 8.9942L18.7084 7.94566C18.8761 8.61599 18.9615 9.30587 18.9615 10C18.9615 11.1112 18.7427 12.2115 18.3174 13.2381C17.8922 14.2647 17.2689 15.1975 16.4832 15.9832C16.4218 16.0446 16.3596 16.105 16.2964 16.1644L14.4375 13.9336L16.0039 8.9942ZM13.2166 14.8718L15.0838 17.1124C14.6583 17.3866 14.208 17.6228 13.7381 17.8174C12.7115 18.2427 11.6112 18.4615 10.5 18.4615C9.38881 18.4615 8.28851 18.2427 7.26191 17.8174C6.79658 17.6247 6.35052 17.3913 5.9287 17.1205L7.88007 14.8718H13.2166Z"
      fill={color}
    />
  </Svg>
);

export const GameNightIcon = ({ color = "#333232" }) => (
  <Svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M16.833 0C18.793 0 20.393 1.537 20.495 3.472L20.5 3.667V16.333C20.5 18.293 18.963 19.893 17.028 19.995L16.833 20H4.167C3.22818 20 2.32509 19.64 1.6438 18.9941C0.962517 18.3481 0.554924 17.4655 0.505 16.528L0.5 16.333V3.667C0.5 1.707 2.037 0.107 3.972 0.00500011L4.167 0H16.833ZM14 12C13.6022 12 13.2206 12.158 12.9393 12.4393C12.658 12.7206 12.5 13.1022 12.5 13.5C12.5 13.8978 12.658 14.2794 12.9393 14.5607C13.2206 14.842 13.6022 15 14 15C14.3978 15 14.7794 14.842 15.0607 14.5607C15.342 14.2794 15.5 13.8978 15.5 13.5C15.5 13.1022 15.342 12.7206 15.0607 12.4393C14.7794 12.158 14.3978 12 14 12ZM7 12C6.60218 12 6.22064 12.158 5.93934 12.4393C5.65804 12.7206 5.5 13.1022 5.5 13.5C5.5 13.8978 5.65804 14.2794 5.93934 14.5607C6.22064 14.842 6.60218 15 7 15C7.39782 15 7.77936 14.842 8.06066 14.5607C8.34196 14.2794 8.5 13.8978 8.5 13.5C8.5 13.1022 8.34196 12.7206 8.06066 12.4393C7.77936 12.158 7.39782 12 7 12ZM7 5C6.60218 5 6.22064 5.15804 5.93934 5.43934C5.65804 5.72064 5.5 6.10218 5.5 6.5C5.5 6.89782 5.65804 7.27936 5.93934 7.56066C6.22064 7.84196 6.60218 8 7 8C7.39782 8 7.77936 7.84196 8.06066 7.56066C8.34196 7.27936 8.5 6.89782 8.5 6.5C8.5 6.10218 8.34196 5.72064 8.06066 5.43934C7.77936 5.15804 7.39782 5 7 5ZM14 5C13.6022 5 13.2206 5.15804 12.9393 5.43934C12.658 5.72064 12.5 6.10218 12.5 6.5C12.5 6.89782 12.658 7.27936 12.9393 7.56066C13.2206 7.84196 13.6022 8 14 8C14.3978 8 14.7794 7.84196 15.0607 7.56066C15.342 7.27936 15.5 6.89782 15.5 6.5C15.5 6.10218 15.342 5.72064 15.0607 5.43934C14.7794 5.15804 14.3978 5 14 5Z"
      fill={color}
    />
  </Svg>
);
