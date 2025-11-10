import styles from "../style/EventDetailScreen.style";
import {Text, KeyboardAvoidingView, Platform, View} from "react-native";

export default function EventDetailScreen() {
    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <View style={styles.content}>
                <Text style={{fontFamily:'Anta', color: 'white',}}>Event-Detail Screen</Text>
            </View>

        </KeyboardAvoidingView>
    );
}