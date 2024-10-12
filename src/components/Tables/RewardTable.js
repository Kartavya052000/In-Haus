import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Typography from '../typography/Typography';

const RewardTable = ({color = 'black',color2 = '#8E8D8D' ,rewardName, redeemedDate, points, remainingPoints, month }) => { //add "iconSource" to the props
  return (
    <View style={styles.container}>
      {/* Primera fila - Reward Name y Puntos */}
      <View style={styles.row}>
        {/* <Image source={iconSource} style={styles.icon} /> */}
        <View style={styles.rewardDetails}> 
          <Typography variant="SH4" color={color}>
            <Text style={styles.rewardName}>{rewardName}</Text>
          </Typography>  
          <Typography variant="Caption" color={color}>
            <Text style={styles.redeemedDate}>Redeemed on {redeemedDate}</Text>
          </Typography>  
        </View>
        <View style= {styles.rewardPoints}>
          <Typography variant="SH4" color={color}>
            <Text style={styles.points}>{points}pts</Text>
          </Typography>  
          <Text style={styles.remainingPoints}>{remainingPoints} remaining</Text>
        </View>
      </View>

      {/* Línea divisoria */}
      <View style={styles.divider} />

      {/* Segunda fila - Mes */}
      <View style={[styles.row, styles.rewardDetails]}>
        <Typography variant="H5" color={color}>
         <Text style={styles.month}>{month}</Text>
        </Typography>  
      </View>

      {/* Línea divisoria */}
      <View style={styles.customDivider} />

      {/* Tercera fila - Repetición de reward name */}
      <View style={[styles.row, styles.rewardDetails]}>
        {/* <Image source={iconSource} style={styles.icon} /> */}
        <Typography variant="SH4" color={color}>
          <Text style={styles.rewardName}>{rewardName}</Text>
        </Typography>
        {/* <Image source={iconSource} style={styles.icon} /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderColor: 'black',
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    icon: {
        width: 24,
        height: 24,
        backgroundColor: '#ccc', // Placeholder para el icono
        borderRadius: 4,
    },
    rewardDetails: {
        flex: 1,
        marginLeft: 10,
    },
    divider: {
        height: 1,
        backgroundColor: 'black',
        marginVertical: 10,
    },
    customDivider: {
        height: 0,            // Por ejemplo, una altura diferente
        backgroundColor: '#000',  // Color diferente
        marginVertical: 10,
    },
    rewardPoints: {
      marginRight: 10,
    },
});

export default RewardTable;
