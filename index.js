import { registerRootComponent } from 'expo';
import { View, Text, StyleSheet } from 'react-native';

function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>⚖️</Text>
      <Text style={styles.title}>LegalMind</Text>
      <Text style={styles.subtitle}>Learn • Analyze • Decide</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071827',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    color: '#D4AF37',
    fontSize: 36,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 8,
  },
});

registerRootComponent(App);