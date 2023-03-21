import React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, Linking, View, Image, PixelRatio, Button, TouchableOpacity } from 'react-native';
import { Text, TextInput, Checkbox, useTheme } from 'react-native-paper';
import { color } from 'react-native-reanimated';
import { ButtonComponent } from '../../components/common/ButtonComponent/ButtonComponent';
import { useAuth } from '../../context/AuthenticatedContext';
import createStyles from './LoginStyles';


// import image from '../assets/images/loginBackground.png';

// const backgroundImage = Image.resolveAssetSource(image).uri;

export const Login = () => {
  const { signIn, signOut } = useAuth();
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [checked, setChecked] = React.useState(false);
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.headline}>
        <Text variant="headlineMedium" style={styles.headlineText}>{t('Welcome back!')}</Text>
        <Image style={styles.headlineImage} source={require('../../assets/images/Welcome2x.png')} />
      </View>
      {/* <View style={{ flex: 1 }}>

        <Text variant='titleMedium' style={{ color: 'white', paddingBottom: '2%' }}>Email</Text>
        <TextInput
          placeholder='me@email.com'
          keyboardType='email-address'
          autoCapitalize='none'
          placeholderTextColor='grey'
          autoComplete='email'
          style={{ marginBottom: '5%', backgroundColor: colors.background, borderColor: colors.surfaceVariant, borderWidth: 1 }}>

        </TextInput>

        <Text variant='titleMedium' style={{ color: 'white', paddingBottom: '2%' }}>Password</Text>
        <TextInput
          placeholder='********'
          autoCapitalize='none'
          placeholderTextColor='grey'
          secureTextEntry={true}
          right={<TextInput.Icon icon='eye-off-outline' />}
          style={{ marginBottom: '5%', backgroundColor: colors.background, borderColor: colors.surfaceVariant, borderWidth: 1 }}>

        </TextInput>

        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start', paddingBottom: '5%' }}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            color={colors.surfaceVariant}
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <Text variant='titleMedium' style={{ color: 'white', paddingTop: '1.5%' }}>Remember Email</Text>

        </View>

      </View> */}

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={{
            ...styles.button,
            ...styles.buttonContainer
          }}
          onPress={() => signIn()}>
          <View style={{ ...styles.logoutView }}>
            <Text variant="bodyLarge" style={{ ...styles.headlineText }}>
              {t('Sign In')}
            </Text>
          </View>
        </TouchableOpacity>

        {/* <Button title="Sign Out" style={styles.bottomButton} theme={{ roundness: 2 }} onPress={() => signOut()}></Button> */}
        {/* <Text variant='labelLarge' style={{ color: colors.primary, textAlign: 'right', paddingTop: '2%', flex: 1 }}>Forgot Password?</Text> */}
      </View>
      <Image style={styles.logo} resizeMode='contain' source={require('../../assets/images/Logo_Dark_Mode.png')} />
    </SafeAreaView>
  );
};
