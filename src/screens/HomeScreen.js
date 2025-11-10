import styles from "../style/HomeScreen.style";
import {Text, ScrollView, View} from "react-native";

export default function HomeScreen() {
    return (
        <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        style={styles.container}
      >
            <View style={styles.content}>
                <Text style={{fontFamily:'Anta', color: 'white',}}>Home Screen</Text>
            </View>

        </ScrollView>
    );
}