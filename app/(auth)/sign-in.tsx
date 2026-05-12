import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Link, useRouter, type Href } from "expo-router";
import { useSignIn } from "@clerk/expo";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
  const { signIn } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  // Validation
  const emailValid =
    emailAddress.length === 0 ||
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
  const formValid =
    emailAddress.length > 0 && password.length > 0 && emailValid;

  // 🔐 SIGN IN
  const handleSubmit = async () => {
    if (!formValid) return;

    try {
      setLoading(true);

      const { error } = await signIn.password({
        emailAddress,
        password,
      });

      if (error) {
        console.error(JSON.stringify(error, null, 2));
        return;
      }

      // ✅ success
      if (signIn.status === "complete") {
        await signIn.finalize({
          navigate: ({ decorateUrl }) => {
            const url = decorateUrl("/(tabs)");
            router.replace(url as Href);
          },
        });
      }

      // 📩 email verification required
      else if (signIn.status === "needs_client_trust") {
        await signIn.emailCode.sendCode();
      } else {
        console.log("Unhandled status:", signIn.status);
      }
    } catch (err: any) {
      console.error(err?.errors?.[0]?.message || "Sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔢 VERIFY EMAIL CODE
  const handleVerify = async () => {
    try {
      setLoading(true);

      const { error } = await signIn.emailCode.verifyCode({ code });

      if (error) {
        console.error(error.message);
        return;
      }

      await signIn.finalize({
        navigate: ({ decorateUrl }) => {
          const url = decorateUrl("/(tabs)");
          router.replace(url as Href);
        },
      });
    } catch (err: any) {
      console.error(err?.errors?.[0]?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  // 📩 VERIFICATION SCREEN
  if (signIn?.status === "needs_client_trust") {
    return (
      <SafeAreaView className="auth-safe-area">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="auth-screen"
        >
          <ScrollView className="auth-scroll">
            <View className="auth-content">
              <View className="auth-brand-block">
                <View className="auth-logo-wrap">
                  <View className="auth-logo-mark">
                    <Text className="auth-logo-mark-text">R</Text>
                  </View>
                  <View>
                    <Text className="auth-wordmark">Recurrly</Text>
                    <Text className="auth-wordmark-sub">SUBSCRIPTIONS</Text>
                  </View>
                </View>

                <Text className="auth-title">Verify your identity</Text>
                <Text className="auth-subtitle">
                  Enter the code sent to your email
                </Text>
              </View>

              <View className="auth-card">
                <View className="auth-form">
                  <View className="auth-field">
                    <Text className="auth-label">Verification Code</Text>

                    <TextInput
                      className="auth-input"
                      value={code}
                      onChangeText={setCode}
                      keyboardType="number-pad"
                      maxLength={6}
                      placeholder="Enter 6-digit code"
                    />
                  </View>

                  <Pressable
                    className="auth-button"
                    onPress={handleVerify}
                    disabled={!code || loading}
                  >
                    <Text className="auth-button-text">
                      {loading ? "Verifying..." : "Verify"}
                    </Text>
                  </Pressable>

                  <Pressable
                    className="auth-secondary-button"
                    onPress={() => signIn.emailCode.sendCode()}
                  >
                    <Text className="auth-secondary-button-text">
                      Resend Code
                    </Text>
                  </Pressable>

                  <Pressable
                    className="auth-secondary-button"
                    onPress={() => signIn.reset()}
                  >
                    <Text className="auth-secondary-button-text">
                      Start Over
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // 🔑 MAIN SIGN-IN SCREEN
  return (
    <SafeAreaView className="auth-safe-area">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="auth-screen"
      >
        <ScrollView className="auth-scroll">
          <View className="auth-content">
            {/* Branding */}
            <View className="auth-brand-block">
              <View className="auth-logo-wrap">
                <View className="auth-logo-mark">
                  <Text className="auth-logo-mark-text">R</Text>
                </View>
                <View>
                  <Text className="auth-wordmark">Recurrly</Text>
                  <Text className="auth-wordmark-sub">SUBSCRIPTIONS</Text>
                </View>
              </View>

              <Text className="auth-title">Welcome back</Text>
              <Text className="auth-subtitle">
                Sign in to continue managing your subscriptions
              </Text>
            </View>

            {/* Form */}
            <View className="auth-card">
              <View className="auth-form">
                <View className="auth-field">
                  <Text className="auth-label">Email Address</Text>
                  <TextInput
                    className="auth-input"
                    autoCapitalize="none"
                    value={emailAddress}
                    onChangeText={setEmailAddress}
                    keyboardType="email-address"
                    placeholder="name@example.com"
                  />
                </View>

                <View className="auth-field">
                  <Text className="auth-label">Password</Text>
                  <TextInput
                    className="auth-input"
                    value={password}
                    secureTextEntry
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                  />
                </View>

                <Pressable
                  className="auth-button"
                  onPress={handleSubmit}
                  disabled={!formValid || loading}
                >
                  <Text className="auth-button-text">
                    {loading ? "Signing In..." : "Sign In"}
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* Sign up */}
            <View className="auth-link-row">
              <Text className="auth-link-copy">
                Don&apos;t have an account?
              </Text>
              <Link href="/(auth)/sign-up" asChild>
                <Pressable>
                  <Text className="auth-link">Create Account</Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;