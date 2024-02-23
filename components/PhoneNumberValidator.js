import { StyleSheet } from "react-native";
import React, { useState } from "react";
import PhoneInput from "react-native-phone-number-input";
import { useRef } from "react";

const PhoneNumberValidator = (props) => {
    const phoneInput = useRef(null);

    const [countryCode, setCountryCode] = useState('');
    const [formattedValue, setFormattedValue] = useState('');
    const [valid, setValid] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [value, setValue] = useState('');

    return (
        <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode="GH"
            layout="first"
            onChangeText={(text) => {
                props.phoneNumber = text;
                setValue(text);
            }}
            onChangeFormattedText={(text) => {
                setFormattedValue(text);
                setCountryCode(phoneInput.current?.getCountryCode() || '');
            }}
            countryPickerProps={{ withAlphaFilter: true }}
            disabled={false}
            withDarkTheme
            textContainerStyle={{ paddingVertical: 10, backgroundColor: "transparent" }}
        />
    );
};

export default PhoneNumberValidator;

const styles = StyleSheet.create({});
