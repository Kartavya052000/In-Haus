import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
import Typography from '../typography/Typography';
import { BuyIcon, CleaningIcon, DishesIcon, GroceriesIcon, HomeworkIcon, LaundryIcon } from '../icons/icons';
const CategoryButton = ({ label, Icon, isSelected, onPress }) => {
  return (
      <Icon color={isSelected ? "#476BFB" : "#333232"} />
  );
};
const BottomSwipeableDrawer = ({ isVisible, setIsVisible, Details, rewardPoints = 0 }) => {
  const animation = useRef(null);
  // const categories = [
  //   { label: 'Cleaning', Icon: CleaningIcon },
  //   { label: 'Laundry', Icon: LaundryIcon },
  //   { label: 'Dishes', Icon: DishesIcon },
  //   { label: 'Homework', Icon: HomeworkIcon },
  //   { label: 'Groceries', Icon: GroceriesIcon },
  //   { label: 'Buy', Icon: BuyIcon },
  // ];

  // const [categoryIcon, setCategoryIcon] = useState(null); // State for the category icon

  // useEffect(() => {
  //   console.log(Details.category,"CAR")
  //   const matchedCategory = categories.find((cat) => cat.label === Details.category);
  //   console.log(matchedCategory,"NMMM");
  //   setCategoryIcon(matchedCategory ? matchedCategory.Icon :categories[2].Icon );
  // }, [Details.category]);
  useEffect(() => {
    console.log('Animation Ref:', animation.current); // Should not be null
    console.log(isVisible)

    if (isVisible) {
      animation.current?.play();
    } else {
      animation.current?.reset();
      // setIsVisible(true)
    }
  }, [isVisible]);

  const toggleDrawer = () => {
    setIsVisible(false);
  };

  const onGestureEvent = (event) => {
    if (event.nativeEvent.translationY > 50) {
      setIsVisible(false);
    }
  };

  // Rename rewardsData to RewardsData to treat it as a component
  const RewardsData = () => {
    return (
      <>
        <View style={styles.animationContainer}>
          <LottieView
            ref={animation}
            autoPlay={isVisible} // Ensure this is set to false so manual play works
            loop={false}
            style={styles.fullScreenAnimation}
            source={require('../../../assets/animations/Animation - 1731035201409.json')} // Replace with your Lottie file
          />
        </View>
        <Image
          source={{ uri: Details.imageUrl || 'https://cdn.icon-icons.com/icons2/3249/PNG/512/gift_card_filled_icon_199839.png' }}
          style={styles.rewardImage}
        />
        <Typography variant="H5" style={styles.titleText}>Congratulations!</Typography>
        <Typography variant="H5" style={styles.titleText}>
          You just redeemed {Details.amount} {Details.rewardType}
        </Typography>
        <Typography variant="BodyS" style={styles.paraText}>Your new points balance after spending</Typography>
        <Typography variant="BodyS" style={styles.paraText2}>
          {Details.pointsAssigned} points is {rewardPoints - Details.pointsAssigned}
        </Typography>

        <View style={styles.rewardsContainer}>
          <Typography variant="SH4">Rewards Points</Typography>
          <Typography variant="SH4">{Details.pointsAssigned} pts</Typography>
        </View>

        {/* Add flex-grow to push the button to the bottom */}
        <View style={{ flexGrow: 1 }} />

        {/* Button at the bottom */}
        <TouchableOpacity style={styles.button} onPress={toggleDrawer}>
          <Typography variant="BodyS" style={styles.buttonText}>Ok</Typography>
        </TouchableOpacity>
      </>
    );
  };
  const TasksData = () => {
    return (
      <>
        <View style={styles.animationContainer}>
          <LottieView
            ref={animation}
            autoPlay={isVisible} // Ensure this is set to false so manual play works
            loop={false}
            style={styles.fullScreenAnimation}
            source={require('../../../assets/animations/Animation - 1731035201409.json')} // Replace with your Lottie file
          />
        </View>

        <View style={styles.iconContainer}>
        {Details.category === "Cleaning" ? (
          <CleaningIcon width={120} height={120} />
        ) : Details.category === "Laundry" ? (
          <LaundryIcon width={120} height={120} />
        ) : Details.category === "Dishes" ? (
          <DishesIcon width={120} height={120} />
        ) : Details.category === "Homework" ? (
          <HomeworkIcon width={120} height={120} />
        ) : Details.category === "Groceries" ? (
          <GroceriesIcon width={120} height={120} />
        ) : Details.category === "Buy" ? (
          <BuyIcon width={120} height={120} />
        ) : (
          <DishesIcon width={120} height={120} /> // Default icon if none of the conditions match
        )}
      </View>

        {/* <categoryIcon /> */}
        <Typography variant="H5" style={styles.titleText}>Mark Task as Done?</Typography>
        <Typography variant="BodyS" style={styles.titleText}>
        Clean Bedroom task will be not accessible after marking it as done, the admin will get notified and you will be awarded with
        </Typography>
       

        <View style={styles.rewardsContainer}>
          <Typography variant="SH4">Rewards Points</Typography>
          <Typography variant="SH4">{Details.points} pts</Typography>
        </View>

        {/* Add flex-grow to push the button to the bottom */}
        <View style={{ flexGrow: 1 }} />

        {/* Button at the bottom */}
        <TouchableOpacity style={styles.button} onPress={toggleDrawer}>
          <Typography variant="BodyS" style={styles.buttonText}>Done</Typography>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        animationType="slide"
        visible={isVisible}
        onRequestClose={toggleDrawer}
      >
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <View style={styles.drawer}>
            <View style={styles.closeLine} />
            {rewardPoints === 0 ? (
              TasksData() 

            ) : (
              RewardsData() // Call RewardsData as a function
            )}
          </View>
        </PanGestureHandler>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 40,
    marginLeft:20
  },
  button: {
    backgroundColor: '#476BFB',
    borderRadius: 10,
    padding: 16,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    zIndex: 2,
  },
  buttonText: {
    color: '#fff',
  },
  animationContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  fullScreenAnimation: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  rewardImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 20,
  },
  rewardsContainer: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  drawer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 750,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    justifyContent: 'flex-end',
  },
  titleText: {
    alignSelf: 'center',
    marginBottom: 5,
  },
  paraText: {
    marginTop: 10,
    alignSelf: 'center',
  },
  paraText2: {
    marginTop: 5,
    alignSelf: 'center',
  },
  closeLine: {
    width: 100,
    height: 5,
    backgroundColor: '#333232',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 5,
  },
  topAnimation: {
    width: '100%',
    height: 150,
    alignSelf: 'center',
    marginBottom: 10,
  },
});

export default BottomSwipeableDrawer;
