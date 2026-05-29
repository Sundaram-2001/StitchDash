import { Link } from 'expo-router';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function Index() {
    return (
    <View style={styles.container}>
        <Text style={styles.heading}> Welcome to StitchDash!</Text>
        <View style={styles.buttonContainer}>
            <Link href="/login" asChild>
                <Pressable style={styles.tailorButton}>
                    <Text style={styles.buttonText}>Get Started!</Text>
                </Pressable>
            </Link>
        </View>
        
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',     
    backgroundColor: '#208450',
    paddingBottom: 100,
    },
    heading: {
    fontFamily: 'serif',
    color: '#fff',
    fontSize: 30,
    marginBottom: 30, 
    },
    buttonContainer: {
    width: '80%', 
    gap: 15,      
    },
    tailorButton: {
    backgroundColor: '#fff', 
    paddingVertical: 15,     
    borderRadius: 8,         
    alignItems: 'center',    
    elevation: 2,            
    },
    customerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 1,          
    borderColor: '#fff',
    alignItems: 'center',
    },
    buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#01190d',        
    }
});