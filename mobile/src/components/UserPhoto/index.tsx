import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Image } from 'react-native'
import AvatarImg from '../../assets/avatar.png'
import { colors } from '../../theme'
import { styles } from './styles'

const sizesConfig = {
  small: {
    containerSize: 32,
    avatarSize: 28,
  },
  normal: {
    containerSize: 48,
    avatarSize: 42,
  }
}

const avatar_default = Image.resolveAssetSource(AvatarImg).uri

type UserPhotoProps = {
  imageUri: string | undefined
  sizes?: 'small' | 'normal'
}

export function UserPhoto({ imageUri, sizes = 'normal' }: UserPhotoProps) {
  const { containerSize, avatarSize } = sizesConfig[sizes]

  return (
    <LinearGradient
      colors={[colors.pink, colors.yellow]}
      start={{ x: 0, y: 0.8 }}
      end={{ x: 0.9, y: 1 }}
      style={[
        styles.container,
        {
          width: containerSize,
          height: containerSize,
          borderRadius: containerSize / 2
        }
      ]}
    >
      <Image
        source={{ uri: imageUri || avatar_default }}
        style={[
          styles.avatar,
          {
            width: avatarSize,
            height: avatarSize,
            borderRadius: avatarSize / 2
          }
        ]}
      />
    </LinearGradient>
  )
}