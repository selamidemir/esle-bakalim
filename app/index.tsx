import WelcomeScreen from '@/components/WelcomeScreen/WelcomeScreen';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  return (
    <WelcomeScreen onStart={() => router.push('/game')} />
  );
}
