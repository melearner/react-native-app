import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const SignedIn = () => {
  return (
    <View>
      <Text>SignedIn</Text>
      <Link href={"/(auth)/sign-up"}>Create Account</Link>
    </View>
  )
}

export default SignedIn