import {
    View,
    Text,
    TextInput,
    Pressable,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Link, useRouter, type Href } from 'expo-router';
import { useSignUp, useAuth } from '@clerk/expo';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUp = () => {
    const { signUp } = useSignUp();
    const { isSignedIn } = useAuth();
    const router = useRouter();

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [step, setStep] = useState<'form' | 'verify'>('form');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!signUp) return null;

    // ================= CREATE ACCOUNT =================
    const handleSubmit = async () => {
        setError(null);

        try {
            setLoading(true);

            await signUp.create({
                emailAddress,
                password,
            });

            await signUp.verifications.sendEmailCode();

            setStep('verify');
        } catch (err: any) {
            setError(err?.errors?.[0]?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    // ================= VERIFY OTP =================
    const handleVerify = async () => {
    setError(null);

    try {
        setLoading(true);

        const { error } = await signUp.verifications.verifyEmailCode({
            code,
        });

        if (error) {
            setError(error.message || 'Invalid code');
            return;
        }

        // ✅ If no error → verification successful
        await signUp.finalize({
            navigate: ({ decorateUrl }) => {
                const url = decorateUrl('/(tabs)');
                router.replace(url as Href);
            },
        });

    } catch (err: any) {
        setError(err?.errors?.[0]?.message || 'Verification failed');
    } finally {
        setLoading(false);
    }
};

    if (isSignedIn) return null;

    // ================= VERIFY SCREEN =================
    if (step === 'verify') {
        return (
            <SafeAreaView className="auth-safe-area">
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    className="auth-screen"
                >
                    <ScrollView className="auth-scroll">
                        <View className="auth-content">

                            <Text className="auth-title">Verify your email</Text>
                            <Text className="auth-subtitle">
                                Code sent to {emailAddress}
                            </Text>

                            <View className="auth-card">
                                <TextInput
                                    className="auth-input"
                                    value={code}
                                    placeholder="Enter 6-digit code"
                                    onChangeText={setCode}
                                    keyboardType="number-pad"
                                    maxLength={6}
                                />

                                {error && (
                                    <Text className="auth-error">{error}</Text>
                                )}

                                <Pressable
                                    className="auth-button"
                                    onPress={handleVerify}
                                    disabled={loading}
                                >
                                    <Text className="auth-button-text">
                                        {loading ? 'Verifying...' : 'Verify'}
                                    </Text>
                                </Pressable>

                                <Pressable
                                    onPress={() => signUp.verifications.sendEmailCode()}
                                >
                                    <Text className="auth-link">
                                        Resend Code
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }

    // ================= SIGNUP FORM =================
    return (
        <SafeAreaView className="auth-safe-area">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="auth-screen"
            >
                <ScrollView className="auth-scroll">
                    <View className="auth-content">

                        <Text className="auth-title">Create Account</Text>

                        <View className="auth-card">
                            <TextInput
                                className="auth-input"
                                autoCapitalize="none"
                                value={emailAddress}
                                placeholder="Email"
                                onChangeText={setEmailAddress}
                                keyboardType="email-address"
                            />

                            <TextInput
                                className="auth-input"
                                value={password}
                                placeholder="Password (min 8 chars)"
                                secureTextEntry
                                onChangeText={setPassword}
                            />

                            {error && (
                                <Text className="auth-error">{error}</Text>
                            )}

                            <Pressable
                                className="auth-button"
                                onPress={handleSubmit}
                                disabled={loading}
                            >
                                <Text className="auth-button-text">
                                    {loading
                                        ? 'Creating...'
                                        : 'Create Account'}
                                </Text>
                            </Pressable>
                        </View>

                        <View className="auth-link-row">
                            <Text>Already have an account?</Text>
                            <Link href="/(auth)/sign-in">
                                <Text className="auth-link"> Sign In</Text>
                            </Link>
                        </View>

                        <View nativeID="clerk-captcha" />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default SignUp;