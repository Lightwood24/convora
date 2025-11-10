import styles from "../style/HomeScreen.style";
import {Text, KeyboardAvoidingView, Platform, View} from "react-native";

export default function HomeScreen() {
    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <View style={styles.content}>
                <Text style={{fontFamily:'Anta', color: 'white',}}>Home Screen</Text>
            </View>

        </KeyboardAvoidingView>
    );
}