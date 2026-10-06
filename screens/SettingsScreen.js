import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  StatusBar,
  Alert,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@legalmind_profile';

export default function SettingsScreen({ profile, onNavigateBack, onProfileUpdate }) {
  // د تنظیماتو حالتونه - د موجود پروفایل څخه اخیستل کیږي
  const [sound, setSound] = useState(profile?.settings?.sound ?? true);
  const [music, setMusic] = useState(profile?.settings?.music ?? true);
  const [vibration, setVibration] = useState(profile?.settings?.vibration ?? true);
  const [notifications, setNotifications] = useState(profile?.settings?.notifications ?? true);
  const [language, setLanguage] = useState(profile?.settings?.language ?? 'ps');

  // هره بدلون سمدلاسه خوندي کوي
  const saveSettings = async (newSettings) => {
    try {
      const updatedProfile = {
        ...profile,
        settings: {
          ...profile.settings,
          ...newSettings,
        },
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProfile));
      if (onProfileUpdate) onProfileUpdate(updatedProfile);
    } catch (error) {
      console.log('Settings save error:', error);
    }
  };

  const handleSound = (value) => {
    setSound(value);
    saveSettings({ sound: value });
  };

  const handleMusic = (value) => {
    setMusic(value);
    saveSettings({ music: value });
  };

  const handleVibration = (value) => {
    setVibration(value);
    saveSettings({ vibration: value });
  };

  const handleNotifications = (value) => {
    setNotifications(value);
    saveSettings({ notifications: value });
  };

  const handleLanguage = (lang) => {
    setLanguage(lang);
    saveSettings({ language: lang });
  };

  // د معلوماتو پاڼې
  const showAboutApp = () => {
    Alert.alert(
      'ℹ️ د اپ په اړه',
      'LegalMind\n\nLearn • Analyze • Decide\n\nVersion 1.0.0\n\nOffline-first interactive legal education app for law students.',
      [{ text: 'ښه' }]
    );
  };

  const showAboutCreator = () => {
    Alert.alert(
      '👨‍💻 د جوړوونکي په اړه',
      'اميد حسن زی\n(Omid Momand)\n\nننګرهار پوهنتون\nحقوق او سياسي علوم\nحقوقي علوم\n\nSemester 5 • Class/Year 3\nAcademic Year 1405\n\nEmail: omidhasanzai@gmail.com\nTelegram: @momand330',
      [
        { text: 'ښه', style: 'cancel' },
        {
          text: 'ایمیل',
          onPress: () => Linking.openURL('mailto:omidhasanzai@gmail.com'),
        },
        {
          text: 'ټیلیګرام',
          onPress: () => Linking.openURL('https://t.me/momand330'),
        },
      ]
    );
  };

  const handleReset = () => {
    Alert.alert(
      '⚠️ د لوبې معلومات Reset کول',
      'ایا تاسو ډاډه یاست چې غواړئ ټول پرمختګ، نمرې او معلومات پاک کړئ؟ دا کار بیرته نه راګرځي.',
      [
        { text: 'لغوه', style: 'cancel' },
        {
          text: 'پاکول',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem(STORAGE_KEY);
              Alert.alert('شو', 'ټول معلومات پاک شول. اپ به بیا پیل شي.');
            } catch (error) {
              console.log(error);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#071827" />

      <SafeAreaView style={styles.safeArea}>
        {/* د پورتني برخې هیدر */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={onNavigateBack}
            activeOpacity={0.8}
          >
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>⚙️ تنظیمات</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* د غږ او انځور برخه */}
          <Text style={styles.sectionLabel}>🔊 غږ او انځور</Text>

          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <Text style={styles.settingIcon}>🔊</Text>
              <Text style={styles.settingText}>د غږ اغیزې</Text>
              <Switch
                value={sound}
                onValueChange={handleSound}
                trackColor={{ false: '#31545A', true: '#B8962E' }}
                thumbColor={sound ? '#D4AF37' : '#7F8B96'}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.settingRow}>
              <Text style={styles.settingIcon}>🎵</Text>
              <Text style={styles.settingText}>د شالید موسیقي</Text>
              <Switch
                value={music}
                onValueChange={handleMusic}
                trackColor={{ false: '#31545A', true: '#B8962E' }}
                thumbColor={music ? '#D4AF37' : '#7F8B96'}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.settingRow}>
              <Text style={styles.settingIcon}>📳</Text>
              <Text style={styles.settingText}>وایبریشن</Text>
              <Switch
                value={vibration}
                onValueChange={handleVibration}
                trackColor={{ false: '#31545A', true: '#B8962E' }}
                thumbColor={vibration ? '#D4AF37' : '#7F8B96'}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.settingRow}>
              <Text style={styles.settingIcon}>🔔</Text>
              <Text style={styles.settingText}>خبرتیاوې</Text>
              <Switch
                value={notifications}
                onValueChange={handleNotifications}
                trackColor={{ false: '#31545A', true: '#B8962E' }}
                thumbColor={notifications ? '#D4AF37' : '#7F8B96'}
              />
            </View>
          </View>

          {/* د ژبې برخه */}
          <Text style={styles.sectionLabel}>🌐 ژبه</Text>

          <View style={styles.settingCard}>
            <TouchableOpacity
              style={[styles.languageRow, language === 'ps' && styles.languageActive]}
              onPress={() => handleLanguage('ps')}
              activeOpacity={0.8}
            >
              <Text style={styles.languageFlag}>🇦🇫</Text>
              <Text style={styles.languageText}>پښتو</Text>
              {language === 'ps' && <Text style={styles.checkIcon}>✓</Text>}
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={[styles.languageRow, language === 'fa' && styles.languageActive]}
              onPress={() => handleLanguage('fa')}
              activeOpacity={0.8}
            >
              <Text style={styles.languageFlag}>🇦🇫</Text>
              <Text style={styles.languageText}>دري</Text>
              {language === 'fa' && <Text style={styles.checkIcon}>✓</Text>}
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={[styles.languageRow, language === 'en' && styles.languageActive]}
              onPress={() => handleLanguage('en')}
              activeOpacity={0.8}
            >
              <Text style={styles.languageFlag}>🇬🇧</Text>
              <Text style={styles.languageText}>English</Text>
              {language === 'en' && <Text style={styles.checkIcon}>✓</Text>}
            </TouchableOpacity>
          </View>

          {/* د معلوماتو برخه */}
          <Text style={styles.sectionLabel}>ℹ️ معلومات</Text>

          <View style={styles.settingCard}>
            <TouchableOpacity
              style={styles.settingRow}
              onPress={showAboutApp}
              activeOpacity={0.8}
            >
              <Text style={styles.settingIcon}>ℹ️</Text>
              <Text style={styles.settingText}>د اپ په اړه</Text>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.settingRow}
              onPress={showAboutCreator}
              activeOpacity={0.8}
            >
              <Text style={styles.settingIcon}>👨‍💻</Text>
              <Text style={styles.settingText}>د جوړوونکي په اړه</Text>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          </View>

          {/* د Reset برخه */}
          <Text style={styles.sectionLabel}>⚠️ خطرناکه برخه</Text>

          <TouchableOpacity
            style={styles.dangerButton}
            onPress={handleReset}
            activeOpacity={0.85}
          >
            <Text style={styles.dangerButtonText}>
              ⚠️ د لوبې معلومات Reset کول
            </Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            LegalMind • Version 1.0.0
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071827',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 18,
  },
  header: {
    minHeight: 70,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#203844',
    marginBottom: 15,
  },
  backButton: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: '#0B302D',
    borderWidth: 1,
    borderColor: '#B8962E',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  backText: {
    color: '#D4AF37',
    fontSize: 34,
    lineHeight: 36,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'right',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  sectionLabel: {
    color: '#D4AF37',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 15,
    marginBottom: 10,
  },
  settingCard: {
    backgroundColor: '#0B302D',
    borderWidth: 1,
    borderColor: '#31545A',
    borderRadius: 16,
    marginBottom: 18,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  settingIcon: {
    fontSize: 22,
    marginRight: 12,
    width: 30,
  },
  settingText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: '#203844',
    marginHorizontal: 16,
  },
  arrow: {
    color: '#D4AF37',
    fontSize: 28,
    marginLeft: 8,
  },
  languageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  languageActive: {
    backgroundColor: 'rgba(212, 175, 55, 0.08)',
  },
  languageFlag: {
    fontSize: 24,
    marginRight: 12,
  },
  languageText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  checkIcon: {
    color: '#D4AF37',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  dangerButton: {
    backgroundColor: '#472326',
    borderWidth: 1,
    borderColor: '#A64B52',
    borderRadius: 15,
    minHeight: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 20,
  },
  dangerButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  footerText: {
    color: '#7F8B96',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
    letterSpacing: 0.5,
  },
});