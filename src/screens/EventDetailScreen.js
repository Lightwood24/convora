import styles from "../style/EventDetailScreen.style";
import {Text, ScrollView, View} from "react-native";

export default function EventDetailScreen() {
  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={{fontFamily:'Anta', color: 'white',}}>Event-Detail Screen</Text>
      </View>

    </ScrollView>
  );
}
