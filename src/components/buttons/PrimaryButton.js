import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import Typography from '../typography/Typography';
import { AddIcon } from '../icons/icons';  // Importamos el ícono desde icons.js

const { width } = Dimensions.get('window'); // Obtener el ancho de la pantalla

const PrimaryButton = ({
    color = 'black',
    backgroundColor = '#EDEDED',
    size = 'medium',
    disabled = false,
    hasIcon = false, // Si tiene ícono o no
    iconColor = 'black', // Color del ícono
    textColor = 'black', // Color del texto
    hasText = true, // Si tiene texto o no
    textAlignment = 'center', // Alineación del texto (left, center, right)
    buttonText = '', // Texto del botón
}) => {
    // Ajustar el tamaño basado en la prop size
    const buttonStyles = [
        styles.button,
        {
            backgroundColor: disabled ? '#D3D3D3' : backgroundColor,
            width: size === 'small' ? width * 0.3 : size === 'large' ? width * 0.45 : width * 0.4,
            opacity: disabled ? 0.5 : 1,
            height: size === 'small' ? 40 : size === 'large' ? 60 : 50,
            borderRadius: size === 'small' ? 15 : size === 'large' ? 20 : 18,
            padding: size === 'small' ? 9 : size === 'large' ? 20 : 15,
            justifyContent: textAlignment === 'left' ? 'flex-start' : textAlignment === 'right' ? 'flex-end' : 'center',
        },
    ];

    // Ajustar el tamaño de la fuente basado en el tamaño del botón
    const textSize = size === 'small' ? 14 : size === 'large' ? 20 : 16; // Ajustar el tamaño del texto

    return (
        <TouchableOpacity
            style={buttonStyles}
            activeOpacity={disabled ? 1 : 0.7} // Desactivar la acción si está deshabilitado
            disabled={disabled}
        >
            {/* Si tiene ícono, renderizamos el ícono con el color adecuado */}
            {hasIcon && textAlignment !== 'center' && (
                <AddIcon width={20} height={20} fill={disabled ? '#A9A9A9' : iconColor} style={styles.icon} />
            )}

            {/* Si tiene texto, renderizamos el texto */}
            {hasText && (
                <Typography variant="SH1" color={textColor} align="center">
                    <Text style={[styles.text, { fontSize: textSize, color: disabled ? '#A9A9A9' : textColor }]}>
                        {buttonText}
                    </Text>
                </Typography>
            )}

            {/* Si hay ícono al final del botón */}
            {hasIcon && textAlignment === 'center' && (
                <AddIcon width={20} height={20} fill={disabled ? '#A9A9A9' : iconColor} style={styles.icon} />
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10, // Changed to a number
    },
    text: {
        fontWeight: 'bold', // Mantener el texto en negrita
    },
    icon: {
        marginHorizontal: 5, // Añadir margen entre el ícono y el texto
    },
});

export default PrimaryButton;
