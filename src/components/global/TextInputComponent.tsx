import React, {FC} from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {TextInput, HelperText} from 'react-native-paper';
import fontFamily from '../../constants/FontFamily';
import COLORS from '../../constants/Colors';

interface TextInputPropsCustom {
  label: string;
  placeholder: string;
  secureTextEntry: boolean;
  editable: boolean;
  value: string;
  onBlur: (value: string) => void;
  onChangeText: (value: string) => void;
  errorMessage: string;
  touched: string;
  style?: ViewStyle;
}

const Input: FC<TextInputPropsCustom> = ({...props}) => {
  return (
    <View>
      <TextInput
        {...props}
        label={props.label}
        secureTextEntry={props.secureTextEntry}
        editable={props.editable}
        value={props.value}
        onBlur={value => props.onBlur(value)}
        onChangeText={value => props.onChangeText(value)}
        style={[
          props.style,
          {
            backgroundColor: COLORS.White,
            fontSize: 15,
            fontFamily: fontFamily.LatoMedium,
            height: 45,
          },
        ]}
        error={props.errorMessage ? true : false}
        outlineColor={COLORS.RoyalBlue}
        theme={{
          colors: {primary: COLORS.RoyalBlue},
        }}
      />
      {!!props.errorMessage && (
        <View style={styles.helperTextStyle}>
          <HelperText type="error">{props.errorMessage}</HelperText>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  helperTextStyle: {
    marginTop: 5,
    marginLeft: -10,
  },
});

export default Input;
