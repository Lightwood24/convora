import styles from "../style/CalendarScreen.style";
import {Text, ScrollView, View} from "react-native";

export default function CalendarScreen() {
    return (
        <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        style={styles.container}
      >
            <View style={styles.content}>
                <Text style={{fontFamily:'Anta', color: 'white',}}>Calendar Screen</Text>
            </View>

        </ScrollView>
    );
}