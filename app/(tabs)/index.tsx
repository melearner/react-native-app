import "../../global.css";
import { Text } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <Text className="text-5xl font-sans-extrabold">
        Home
      </Text>

      <Link
        href="/onBoarding"
        className="mt-4 font-sans-bold rounded bg-primary px-4 py-3"
      >
        <Text className="text-white">Go to Onboarding</Text>
      </Link>

      <Link
        href="/(auth)/sign-in"
        className="mt-4 font-sans-bold rounded bg-primary px-4 py-3"
      >
        <Text className="text-white">Go to Sign In</Text>
      </Link>

      <Link
        href="/(auth)/sign-up"
        className="mt-4 font-sans-bold rounded bg-primary px-4 py-3"
      >
        <Text className="text-white">Go to Sign Up</Text>
      </Link>

    </SafeAreaView>
  );
}