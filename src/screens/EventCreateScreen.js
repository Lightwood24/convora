import styles from "../style/EventCreateScreen.style";
import {Text, ScrollView, View} from "react-native";

export default function EventCreateScreen() {
  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={{fontFamily:'Anta', color: 'white',}}>Event-Create Screen</Text>
      </View>

    </ScrollView>
  );
}
