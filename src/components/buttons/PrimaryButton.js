//PrimaryButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import SvgUri from 'react-native-svg'; // Import from react-native-svg to handle SVGs
import add from '../icons/Add.svg'; // Import your SVG icon
import Typography from '../typography/Typography';

const { width } = Dimensions.get('window'); // Get screen width

const PrimaryButton = ({ color = 'black', backgroundColor = '#EDEDED', size = 'medium', disabled = false }) => {
    // Adjust size based on the prop
    const buttonStyles = [
        styles.button,
        {
            backgroundColor: disabled ? '#D3D3D3' : backgroundColor,
            width: size === 'small' ? width * 0.3 : size === 'large' ? width * 0.45 : width * 0.4,
            opacity: disabled ? 0.5 : 1,
            height: size === 'small' ? 40 : size === 'large' ? 60 : 50,
            borderRadius: size === 'small' ? 15 : size === 'large' ? 20 : 18,
        },
    ];

    return (
        <TouchableOpacity
            style={buttonStyles}
            activeOpacity={disabled ? 1 : 0.7} // Disable press if disabled
            disabled={disabled}
        >
            <SvgUri
                width={20}
                height={20}
                source={add} //componentn icon is not reading the svg file
                style={styles.icon}
            />
            <Typography variant="SH1" color={color} align="center">
            <Text style={[styles.text, { color: disabled ? '#A9A9A9' : color }]}>Button</Text>
            </Typography>    
            <SvgUri
                width={20}
                height={20} 
                source={add} //componentn icon is not reading the svg file
                style={styles.icon}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    icon: {
        marginHorizontal: 5,
    },
});

export default PrimaryButton;
