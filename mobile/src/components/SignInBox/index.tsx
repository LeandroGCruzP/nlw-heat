import React from 'react'
import { View } from 'react-native'
import { useAuth } from '../../hooks/auth'
import { colors } from '../../theme'
import { Button } from '../Button'
import { styles } from './styles'

export function SignInBox() {
  const { signIn, isSignIn } = useAuth()

  return (
    <View style={styles.container} >

      <Button
        title='ENTRAR COM O GITHUB'
        color={colors.black_primary}
        backgroundColor={colors.yellow}
        icon="github"
        onPress={signIn}
        isLoading={isSignIn}
      />

    </View>
  )
}