import { useRouter } from 'expo-router';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function StartScreen() {
  const router = useRouter();
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Eşle Bakalım</ThemedText>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/game')}
      >
        <ThemedText style={styles.buttonText}>Oyuna Başla</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  button: {
    backgroundColor: '#4a90e2',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 28,
    marginTop: 36,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
