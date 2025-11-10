import styles from "../style/EventCreateScreen.style";
import {Text, KeyboardAvoidingView, Platform, View} from "react-native";

export default function EventCreateScreen() {
    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <View style={styles.content}>
                <Text style={{fontFamily:'Anta', color: 'white',}}>Event-Create Screen</Text>
            </View>

        </KeyboardAvoidingView>
    );
}