import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import LogoSvg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import { UserPhoto } from '../UserPhoto';
import { styles } from './styles';

export function Header() {
  const { user, signOut } = useAuth()

  return (
    <View style={styles.container} >
      <LogoSvg />

      <View style={styles.logOutButton} >
        {user &&
          <TouchableOpacity onPress={signOut} >
            <Text style={styles.logOutText}>Sair</Text>
          </TouchableOpacity>
        }
        <UserPhoto imageUri={user?.avatar_url} />
      </View>
    </View>
  )
}
