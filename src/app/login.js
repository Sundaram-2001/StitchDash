import { View,Text ,StyleSheet, TextInput} from "react-native";

export default function Login(){
    return(
        <View style={styles.container}>
            <View>
                <Text>auth screen</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center' 
    }
});