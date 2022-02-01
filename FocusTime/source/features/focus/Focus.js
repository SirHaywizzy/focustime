import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {TextInput} from "react-native-paper";
import { RoundedButton } from '../../components/RoundedButton';
import { colors } from '../../utilities/colors';
import { fontSizes, spacing } from "../utilities/sizes";

export const Focus = ({addSubject}) => {
    const [subject, setSubject] = useState(null)
    return (
            <View styles={styles.container}>
              <View style={styles.innerContainer}>
                  <Text style={styles.title}>What would you like to focus on?</Text>
                <View style={inputContainer}>
                     <TextInput style={{ flex: 1, margingRight: spacing.md}}
                      onSubmitEditing={
                        ({nativeEvent}) => {
                            setSubject
                            addSubject(nativeEvent.text)
                        }}
                      /> 
                     <RoundedButton size={50} title="+" onPress={() => {
                         addSubject(subject)
                     }} />
                  </View>
                </View>
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
            },
        innerContainer: {
            flex: 1,
            padding: spacing.md,
            justifyContent: 'center'
        },
        title: {
            color: colors.white,
            fontWeight: "bold",
            fontSize: fontSizes.lg,
        },
        inputContainer: {
           paddlingTop: spacing.md, 
           flexDirection: "row",
           alignItems: "center"
        }
});