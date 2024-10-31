import React from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
import Typography from "../typography/Typography";
import { AddIcon } from "../icons/icons";

const { width } = Dimensions.get("window");

const PrimaryButton = ({
  color = "black",
  backgroundColor = "#EDEDED",
  size = "medium",
  disabled = false,
  hasIcon = false,
  iconColor = "black",
  textColor = "black",
  hasText = true,
  textAlignment = "center",
  buttonText = "",
  onPress,
}) => {
  const buttonStyles = [
    styles.button,
    {
      backgroundColor: disabled ? "#D3D3D3" : backgroundColor,
      width:
        size === "small"
          ? width * 0.5
          : size === "large"
          ? width * 0.9
          : width * 0.9,
      opacity: disabled ? 0.5 : 1,
      height: size === "small" ? 40 : size === "large" ? 52 : 52,
      paddingVertical: 0,
      borderRadius: size === "small" ? 15 : size === "large" ? 20 : 18,
      padding: size === "small" ? 9 : size === "large" ? 20 : 15,
      justifyContent:
        textAlignment === "left"
          ? "flex-start"
          : textAlignment === "right"
          ? "flex-end"
          : "center",
    },
  ];

  const textSize = size === "small" ? 14 : size === "large" ? 16 : 16;

  return (
    <TouchableOpacity
      style={buttonStyles}
      activeOpacity={disabled ? 1 : 0.7}
      disabled={disabled}
      onPress={onPress} 
    >
      {hasIcon && textAlignment !== "center" && (
        <AddIcon
          width={20}
          height={20}
          fill={disabled ? "#A9A9A9" : iconColor}
          style={styles.icon}
        />
      )}

      {hasText && (
        <Typography variant="SH1" color={textColor} align="center">
          <Text
            style={[
              styles.text,
              { fontSize: textSize, color: disabled ? "#A9A9A9" : textColor },
            ]}
          >
            {buttonText}
          </Text>
        </Typography>
      )}

      {hasIcon && textAlignment === "center" && (
        <AddIcon
          width={20}
          height={20}
          fill={disabled ? "#A9A9A9" : iconColor}
          style={styles.icon}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    // verticalAlign: "center",
    padding: 10,
  },
  text: {
    fontWeight: "bold",
  },
  icon: {
    marginHorizontal: 5,
  },
});

export default PrimaryButton;
