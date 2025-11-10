import styles from "../style/CalendarScreen.style";
import {Text, KeyboardAvoidingView, Platform, View} from "react-native";

export default function CalendarScreen() {
    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <View style={styles.content}>
                <Text style={{fontFamily:'Anta', color: 'white',}}>Calendar Screen</Text>
            </View>

        </KeyboardAvoidingView>
    );
}