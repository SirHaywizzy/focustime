import React, {useState} from 'react';
import {Text, View, StyleSheet, Vibration, Platform} from 'react-native'; 
import {ProgressBar} from 'react-native';
import {useKeepAwake} from 'expo-keep-awake';


import { colors } from '../../utilities/colors';
import { spacing } from '../../utilities/sizes';
import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { Timing } from '../../Timing';

const DEFAULT_TIME = 0.1;
export const Timer = ({focusSubject, onTimeEnd, clearSubject })=> {
    useKeepAwake();
        const interval = React.useRef(null);
        const [minutes, setMinutes] = useState(DEFAULT_TIME);
        const [isStarted, setIsStarted] = useState(false);
        const [progress, setProgress] = useState (1);

        const onProgress = (progress) => {
            setProgress(progress);
        };

        const vibrate = () => {
          if(Platform.OS === 'ios')  {
            const interval = setInterval(() => Vibration.vibrate(), 1000);
            setTimeout(() => clearInterval(interval), 10000)
        } else {
            Vibration.vibrate(10000);
        }

        };

        const onEnd = () => {
            vibrate();
            setMinutes(DEFAULT_TIME);
            setProgress(1);
            setIsStarted(false);
            onTimeEnd();
        };

        const changeTime = (time) => {
            setMinutes(min);
            setProgress(1);
            setIsStarted(false);
        };

    return (
        <View style={styles.container}>
            <View style={styles.Countdown}> 
                <Countdown minutes={minutes} isPaused={!isStarted}  onProgress={onProgress} onEnd={onEnd} />
            </View>
                <View style={{paddingTop: spacing.xxl}}>
                <Text style={styles.title}>Focusing on:</Text>
                <Text style={styles.task}>{focusSubject}</Text>
            </View>
            <View style={{paddingTop: spacing.sm}}>
             <ProgressBar
                progress={progress}
                color='#5E84E2'
                style={{height: 10}}
                />   
            </View>
            <View styles={styles.buttonWrapper}>
                <Timing onChangeTime={changeTime} />
            </View>
            <View styles={styles.buttonWrapper}>
            {isStarted ? (
             <RoundedButton title="pause"  onPress={() => setIsStarted (false)}
             />
        ) : (
            <RoundedButton title="start"  onPress={() => setIsStarted (true)} />
                )}
            </View>
           <View style={styles.clearSubject}>
           <RoundedButton title="-"  size= {50} onPress={() => clearSubject()} />
               </View> 
         </View>
         );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        color: colors.white,
        textAlign: 'center',
    },
    task: {
        color: colors.white,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    countdown: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonWrapper: {
        flex: 0.3,
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    claerSubject: {
        paddingBottom: 25,
        paddingLeft: 25,
    }
});