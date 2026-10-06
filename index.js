import React, { useEffect, useState } from 'react';
import { registerRootComponent } from 'expo';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

// د نوي Profile Screen فایل واردول
import ProfileScreen from './screens/ProfileScreen';

const STORAGE_KEY = '@legalmind_profile';

function App() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');

  const [screen, setScreen] = useState('home');

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const savedProfile = await AsyncStorage.getItem(STORAGE_KEY);

      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }
    } catch (error) {
      console.log('Profile loading error:', error);
    } finally {
      setLoading(false);
    }
  }

  async function completeOnboarding() {
    const cleanName = name.trim();
    const cleanSurname = surname.trim();
    const cleanEmail = email.trim();

    if (!cleanName) {
      Alert.alert('معلومات نیمګړې دي', 'مهرباني وکړئ خپل نوم ولیکئ.');
      return;
    }

    if (!cleanSurname) {
      Alert.alert('معلومات نیمګړې دي', 'مهرباني وکړئ خپل تخلص ولیکئ.');
      return;
    }

    if (!cleanEmail) {
      Alert.alert('معلومات نیمګړې دي', 'مهرباني وکړئ خپل ایمیل ولیکئ.');
      return;
    }

    if (!cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      Alert.alert(
        'ایمیل ناسم دی',
        'مهرباني وکړئ یو صحیح ایمیل ولیکئ.'
      );
      return;
    }

    const newProfile = {
      name: cleanName,
      surname: cleanSurname,
      email: cleanEmail,

      level: 1,
      progressPoints: 0,

      judgeProgress: 0,
      prosecutorProgress: 0,
      defenseProgress: 0,

      favorites: [],
      achievements: [],

      unlockedJudgeCases: 1,
      unlockedProsecutorCases: 1,
      unlockedDefenseCases: 1,

      settings: {
        sound: true,
        music: true,
        vibration: true,
        notifications: true,
        language: 'ps',
      },

      setupCompleted: true,
    };

    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(newProfile)
      );

      setProfile(newProfile);
      setScreen('home');
    } catch (error) {
      Alert.alert(
        'ستونزه',
        'ستاسې معلومات خوندي نه شول. بیا هڅه وکړئ.'
      );
    }
  }

  async function resetProfile() {
    Alert.alert(
      '⚠️ ټول معلومات پاکول',
      'ایا غواړئ د LegalMind ټول محلي معلومات پاک کړئ؟',
      [
        {
          text: 'لغوه',
          style: 'cancel',
        },
        {
          text: 'پاکول',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem(STORAGE_KEY);

              setProfile(null);
              setName('');
              setSurname('');
              setEmail('');
              setScreen('home');
            } catch (error) {
              console.log(error);
            }
          },
        },
      ]
    );
  }

  if (loading) {
    return <LoadingScreen />;
  }

  if (!profile) {
    return (
      <OnboardingScreen
        name={name}
        surname={surname}
        email={email}
        setName={setName}
        setSurname={setSurname}
        setEmail={setEmail}
        onContinue={completeOnboarding}
      />
    );
  }

  if (screen === 'profile') {
    return (
      <ProfileScreen
        userData={profile}
        onNavigateBack={() => setScreen('home')}
        onNavigateSettings={() => {
          Alert.alert('پام', 'د تنظیماتو پاڼه به په راتلونکي ګام کې جوړه شي.');
        }}
      />
    );
  }

  if (screen === 'favorites') {
    return (
      <FavoritesScreen
        profile={profile}
        onBack={() => setScreen('home')}
      />
    );
  }

  if (screen === 'terminology') {
    return (
      <TerminologyScreen
        onBack={() => setScreen('home')}
      />
    );
  }

  if (screen === 'judge') {
    return (
      <RoleScreen
        title="👨‍⚖️ د قاضي رول په قضیه کې"
        description="قضیه ولولئ، شواهد وارزوئ، قانوني موضوع مشخصه کړئ او خپل قضايي نظر ثبت کړئ."
        onBack={() => setScreen('home')}
      />
    );
  }

  if (screen === 'prosecutor') {
    return (
      <RoleScreen
        title="⚖️ د څارنوال رول په قضیه کې"
        description="شواهد، څرګندونې او قانوني موضوع تحلیل کړئ او خپله دعوه/حقوقي نظریه جوړه کړئ."
        onBack={() => setScreen('home')}
      />
    );
  }

  if (screen === 'defense') {
    return (
      <RoleScreen
        title="👨‍💼 د مدافع وکیل رول په قضیه کې"
        description="د موکل دریځ، شواهد او احتمالي تناقضات تحلیل کړئ او دفاعي نظریه جوړه کړئ."
        onBack={() => setScreen('home')}
      />
    );
  }

  return (
    <HomeScreen
      profile={profile}
      onProfile={() => setScreen('profile')}
      onFavorites={() => setScreen('favorites')}
      onTerminology={() => setScreen('terminology')}
      onJudge={() => setScreen('judge')}
      onProsecutor={() => setScreen('prosecutor')}
      onDefense={() => setScreen('defense')}
    />
  );
}


/* =========================================================
   LOADING
========================================================= */

function LoadingScreen() {
  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingLogo}>⚖️</Text>

      <Text style={styles.loadingTitle}>
        LegalMind
      </Text>

      <Text style={styles.loadingSubtitle}>
        Learn • Analyze • Decide
      </Text>
    </View>
  );
}


/* =========================================================
   ONBOARDING
========================================================= */

function OnboardingScreen({
  name,
  surname,
  email,
  setName,
  setSurname,
  setEmail,
  onContinue,
}) {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#071827"
      />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.onboardingContainer}
          keyboardShouldPersistTaps="handled"
        >

          <View style={styles.onboardingLogoContainer}>
            <Text style={styles.onboardingLogo}>⚖️</Text>

            <Text style={styles.onboardingTitle}>
              LegalMind
            </Text>

            <Text style={styles.onboardingSubtitle}>
              Learn • Analyze • Decide
            </Text>
          </View>

          <View style={styles.welcomeBox}>
            <Text style={styles.welcomeTitle}>
              ښه راغلاست
            </Text>

            <Text style={styles.welcomeText}>
              د LegalMind د پیل لپاره خپل معلومات ولیکئ.
            </Text>
          </View>

          <View style={styles.formContainer}>

            <Text style={styles.inputLabel}>
              نوم
            </Text>

            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="خپل نوم ولیکئ"
              placeholderTextColor="#7F8B96"
              style={styles.input}
              autoCapitalize="words"
            />

            <Text style={styles.inputLabel}>
              تخلص
            </Text>

            <TextInput
              value={surname}
              onChangeText={setSurname}
              placeholder="خپل تخلص ولیکئ"
              placeholderTextColor="#7F8B96"
              style={styles.input}
              autoCapitalize="words"
            />

            <Text style={styles.inputLabel}>
              ایمیل
            </Text>

            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="example@email.com"
              placeholderTextColor="#7F8B96"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <TouchableOpacity
              style={styles.continueButton}
              onPress={onContinue}
              activeOpacity={0.85}
            >
              <Text style={styles.continueButtonText}>
                دوام ورکړه  →
              </Text>
            </TouchableOpacity>

          </View>

          <Text style={styles.offlineText}>
            🔒 ستاسې لومړني معلومات په وسیله کې خوندي کېږي.
          </Text>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}


/* =========================================================
   HOME
========================================================= */

function HomeScreen({
  profile,
  onProfile,
  onFavorites,
  onTerminology,
  onJudge,
  onProsecutor,
  onDefense,
}) {
  const menuItems = [
    {
      icon: '📚',
      title: 'حقوقي ترمینالوژي',
      action: onTerminology,
    },
    {
      icon: '👨‍⚖️',
      title: 'د قاضي رول په قضیه کې',
      action: onJudge,
    },
    {
      icon: '⚖️',
      title: 'د څارنوال رول په قضیه کې',
      action: onProsecutor,
    },
    {
      icon: '👨‍💼',
      title: 'د مدافع وکیل رول په قضیه کې',
      action: onDefense,
    },
  ];

  return (
    <View style={styles.container}>

      <StatusBar
        barStyle="light-content"
        backgroundColor="#071827"
      />

      <SafeAreaView style={styles.safeArea}>

        <View style={styles.topBar}>

          <TouchableOpacity
            style={styles.topButton}
            onPress={onProfile}
            activeOpacity={0.8}
          >
            <Text style={styles.topIcon}>
              👤
            </Text>

            <Text style={styles.topText}>
              Profile
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.topButton}
            onPress={onFavorites}
            activeOpacity={0.8}
          >
            <Text style={styles.topIcon}>
              ⭐
            </Text>

            <Text style={styles.topText}>
              Favorites
            </Text>
          </TouchableOpacity>

        </View>


        <View style={styles.header}>

          <Text style={styles.logo}>
            ⚖️
          </Text>

          <Text style={styles.title}>
            LegalMind
          </Text>

          <Text style={styles.subtitle}>
            Learn • Analyze • Decide
          </Text>

        </View>


        <View style={styles.userWelcome}>
          <Text style={styles.userWelcomeText}>
            سلام، {profile.name} 👋
          </Text>

          <Text style={styles.userLevel}>
            Level {profile.level}  •  ⭐ {profile.progressPoints}
          </Text>
        </View>


        <View style={styles.menuContainer}>

          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuCard}
              activeOpacity={0.8}
              onPress={item.action}
            >

              <View style={styles.menuLeft}>

                <Text style={styles.menuIcon}>
                  {item.icon}
                </Text>

                <Text style={styles.menuText}>
                  {item.title}
                </Text>

              </View>

              <Text style={styles.arrow}>
                ›
              </Text>

            </TouchableOpacity>
          ))}

        </View>


        <View style={styles.footer}>

          <Text style={styles.designed}>
            Designed by: Omid Momand
          </Text>

        </View>

      </SafeAreaView>

    </View>
  );
}


/* =========================================================
   FAVORITES
========================================================= */

function FavoritesScreen({
  profile,
  onBack,
}) {
  return (
    <InternalScreen
      title="⭐ Favorites"
      onBack={onBack}
    >

      <View style={styles.emptyCard}>

        <Text style={styles.emptyIcon}>
          ⭐
        </Text>

        <Text style={styles.emptyTitle}>
          ستوري شوي موارد
        </Text>

        <Text style={styles.emptyText}>
          کله چې حقوقي ترمینالوژي یا نور مهم موارد
          Favorite کړئ، دلته به ښکاره شي.
        </Text>

      </View>

    </InternalScreen>
  );
}


/* =========================================================
   TERMINOLOGY
========================================================= */

function TerminologyScreen({
  onBack,
}) {
  const letters = [
    'ا',
    'ب',
    'پ',
    'ت',
    'ټ',
    'ث',
    'ج',
    'چ',
    'ح',
    'خ',
    'د',
    'ر',
    'ز',
    'س',
    'ش',
    'ص',
    'ض',
    'ط',
    'ظ',
    'ع',
    'غ',
    'ف',
    'ق',
    'ک',
    'ګ',
    'ل',
    'م',
    'ن',
    'و',
    'ه',
    'ی',
  ];

  return (
    <InternalScreen
      title="📚 حقوقي ترمینالوژي"
      onBack={onBack}
    >

      <TextInput
        placeholder="🔍 حقوقي اصطلاح ولټوئ..."
        placeholderTextColor="#7F8B96"
        style={styles.searchInput}
      />

      <Text style={styles.sectionTitle}>
        د پښتو الفبا
      </Text>

      <View style={styles.lettersContainer}>

        {letters.map((letter, index) => (
          <TouchableOpacity
            key={index}
            style={styles.letterButton}
            activeOpacity={0.8}
          >
            <Text style={styles.letterText}>
              {letter}
            </Text>
          </TouchableOpacity>
        ))}

      </View>

      <View style={styles.infoNotice}>

        <Text style={styles.infoNoticeTitle}>
          📖 حقوقي اصطلاحات
        </Text>

        <Text style={styles.infoNoticeText}>
          د هرې اصطلاح لپاره به تعریف،
          ساده تشریح او مثال موجود وي.
        </Text>

      </View>

    </InternalScreen>
  );
}


/* =========================================================
   ROLE SCREEN
========================================================= */

function RoleScreen({
  title,
  description,
  onBack,
}) {
  return (
    <InternalScreen
      title={title}
      onBack={onBack}
    >

      <View style={styles.caseCard}>

        <Text style={styles.caseBadge}>
          لومړۍ قضیه
        </Text>

        <Text style={styles.caseTitle}>
          د تمرین قضیه
        </Text>

        <Text style={styles.caseDescription}>
          {description}
        </Text>

        <View style={styles.caseSteps}>

          <Text style={styles.caseStep}>
            1. 📖 قضیه ولولئ
          </Text>

          <Text style={styles.caseStep}>
            2. 🔎 معلومات او شواهد وڅېړئ
          </Text>

          <Text style={styles.caseStep}>
            3. 🧠 حقوقي تحلیل وکړئ
          </Text>

          <Text style={styles.caseStep}>
            4. ⚖️ خپل نظر جوړ کړئ
          </Text>

          <Text style={styles.caseStep}>
            5. 📝 خپل نظر ثبت کړئ
          </Text>

        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryButtonText}>
            ⚖️ خپل نظر ثبت کړه
          </Text>
        </TouchableOpacity>

      </View>

    </InternalScreen>
  );
}


/* =========================================================
   INTERNAL SCREEN
========================================================= */

function InternalScreen({
  title,
  onBack,
  children,
}) {
  return (
    <View style={styles.container}>

      <StatusBar
        barStyle="light-content"
        backgroundColor="#071827"
      />

      <SafeAreaView style={styles.safeArea}>

        <View style={styles.internalHeader}>

          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
            activeOpacity={0.8}
          >
            <Text style={styles.backText}>
              ‹
            </Text>
          </TouchableOpacity>

          <Text
            style={styles.internalTitle}
            numberOfLines={2}
          >
            {title}
          </Text>

        </View>

        <ScrollView
          contentContainerStyle={styles.internalContent}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>

      </SafeAreaView>

    </View>
  );
}


/* =========================================================
   INFO CARD
========================================================= */

function InfoCard({
  label,
  value,
}) {
  return (
    <View style={styles.infoCard}>

      <Text style={styles.infoLabel}>
        {label}
      </Text>

      <Text style={styles.infoValue}>
        {value}
      </Text>

    </View>
  );
}


/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#071827',
  },

  safeArea: {
    flex: 1,
    paddingHorizontal: 18,
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: '#071827',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingLogo: {
    fontSize: 64,
    marginBottom: 12,
  },

  loadingTitle: {
    color: '#D4AF37',
    fontSize: 36,
    fontWeight: 'bold',
  },

  loadingSubtitle: {
    color: '#E5E7EB',
    fontSize: 15,
    marginTop: 8,
  },

  /* ONBOARDING */

  onboardingContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 35,
  },

  onboardingLogoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },

  onboardingLogo: {
    fontSize: 65,
    marginBottom: 8,
  },

  onboardingTitle: {
    color: '#D4AF37',
    fontSize: 38,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  onboardingSubtitle: {
    color: '#E5E7EB',
    fontSize: 15,
    marginTop: 7,
  },

  welcomeBox: {
    backgroundColor: '#0B302D',
    borderWidth: 1,
    borderColor: '#B8962E',
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
  },

  welcomeTitle: {
    color: '#D4AF37',
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'right',
  },

  welcomeText: {
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 25,
    textAlign: 'right',
  },

  formContainer: {
    width: '100%',
  },

  inputLabel: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 7,
    textAlign: 'right',
  },

  input: {
    height: 54,
    backgroundColor: '#0B2432',
    borderWidth: 1,
    borderColor: '#53616E',
    borderRadius: 14,
    color: '#FFFFFF',
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'right',
  },

  continueButton: {
    height: 56,
    backgroundColor: '#D4AF37',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },

  continueButtonText: {
    color: '#071827',
    fontSize: 17,
    fontWeight: 'bold',
  },

  offlineText: {
    color: '#AEB7C2',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 22,
  },

  /* HOME */

  topBar: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  topButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: 'rgba(10, 45, 42, 0.92)',
    borderWidth: 1,
    borderColor: '#D4AF37',
  },

  topIcon: {
    fontSize: 20,
    marginRight: 7,
  },

  topText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  header: {
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 20,
  },

  logo: {
    fontSize: 60,
    marginBottom: 7,
  },

  title: {
    color: '#D4AF37',
    fontSize: 38,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  subtitle: {
    color: '#E5E7EB',
    fontSize: 15,
    marginTop: 7,
    letterSpacing: 0.5,
  },

  userWelcome: {
    backgroundColor: '#0B2432',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#31545A',
    padding: 13,
    marginBottom: 17,
  },

  userWelcomeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'right',
  },

  userLevel: {
    color: '#D4AF37',
    fontSize: 13,
    marginTop: 5,
    textAlign: 'right',
  },

  menuContainer: {
    width: '100%',
  },

  menuCard: {
    minHeight: 72,
    marginBottom: 15,
    paddingHorizontal: 18,
    borderRadius: 18,
    backgroundColor: '#0B302D',
    borderWidth: 1,
    borderColor: '#B8962E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  menuIcon: {
    fontSize: 28,
    width: 45,
  },

  menuText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    flexShrink: 1,
  },

  arrow: {
    color: '#D4AF37',
    fontSize: 35,
    marginLeft: 8,
  },

  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 18,
  },

  designed: {
    color: '#AEB7C2',
    fontSize: 12,
    letterSpacing: 0.4,
  },

  /* INTERNAL */

  internalHeader: {
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

  internalTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'right',
  },

  internalContent: {
    paddingBottom: 35,
  },

  infoCard: {
    backgroundColor: '#0B302D',
    borderWidth: 1,
    borderColor: '#31545A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },

  infoLabel: {
    color: '#AEB7C2',
    fontSize: 13,
    textAlign: 'right',
    marginBottom: 5,
  },

  infoValue: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'right',
  },

  progressCard: {
    backgroundColor: '#0B302D',
    borderWidth: 1,
    borderColor: '#B8962E',
    borderRadius: 18,
    padding: 18,
    marginBottom: 15,
  },

  cardTitle: {
    color: '#D4AF37',
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 15,
  },

  progressText: {
    color: '#FFFFFF',
    fontSize: 15,
    textAlign: 'right',
    marginBottom: 10,
  },

  dangerButton: {
    backgroundColor: '#472326',
    borderWidth: 1,
    borderColor: '#A64B52',
    borderRadius: 15,
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },

  dangerButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },

  emptyCard: {
    backgroundColor: '#0B302D',
    borderWidth: 1,
    borderColor: '#31545A',
    borderRadius: 18,
    padding: 25,
    alignItems: 'center',
    marginTop: 15,
  },

  emptyIcon: {
    fontSize: 45,
    marginBottom: 12,
  },

  emptyTitle: {
    color: '#D4AF37',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  emptyText: {
    color: '#D5DCE2',
    fontSize: 14,
    lineHeight: 23,
    textAlign: 'center',
  },

  searchInput: {
    height: 54,
    backgroundColor: '#0B2432',
    borderWidth: 1,
    borderColor: '#53616E',
    borderRadius: 15,
    color: '#FFFFFF',
    paddingHorizontal: 16,
    fontSize: 15,
    marginBottom: 20,
  },

  sectionTitle: {
    color: '#D4AF37',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 12,
  },

  lettersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    gap: 8,
  },

  letterButton: {
    width: 43,
    height: 43,
    borderRadius: 12,
    backgroundColor: '#0B302D',
    borderWidth: 1,
    borderColor: '#B8962E',
    alignItems: 'center',
    justifyContent: 'center',
  },

  letterText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

  infoNotice: {
    backgroundColor: '#102D3D',
    borderWidth: 1,
    borderColor: '#3E718C',
    borderRadius: 16,
    padding: 17,
    marginTop: 20,
  },

  infoNoticeTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 7,
  },

  infoNoticeText: {
    color: '#C8D4DC',
    fontSize: 14,
    lineHeight: 23,
    textAlign: 'right',
  },

  caseCard: {
    backgroundColor: '#0B302D',
    borderWidth: 1,
    borderColor: '#B8962E',
    borderRadius: 19,
    padding: 20,
    marginTop: 10,
  },

  caseBadge: {
    color: '#D4AF37',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 8,
  },

  caseTitle: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 13,
  },

  caseDescription: {
    color: '#D5DCE2',
    fontSize: 15,
    lineHeight: 25,
    textAlign: 'right',
    marginBottom: 18,
  },

  caseSteps: {
    borderTopWidth: 1,
    borderTopColor: '#31545A',
    paddingTop: 15,
    marginBottom: 18,
  },

  caseStep: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 27,
    textAlign: 'right',
  },

  primaryButton: {
    minHeight: 55,
    backgroundColor: '#D4AF37',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryButtonText: {
    color: '#071827',
    fontSize: 16,
    fontWeight: 'bold',
  },

});

registerRootComponent(App);