import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';

export default function ProfileScreen({
  userData,
  onNavigateBack,
  onNavigateSettings,
  onReset,
}) {
  // د کاروونکي معلومات (د نه موجودیت په صورت کې بډایه ارزښتونه)
  const name = userData?.name || '';
  const surname = userData?.surname || '';
  const email = userData?.email || '';

  const level = userData?.level ?? 1;
  const progressPoints = userData?.progressPoints ?? 0;

  const judgeProgress = userData?.judgeProgress ?? 0;
  const prosecutorProgress = userData?.prosecutorProgress ?? 0;
  const defenseProgress = userData?.defenseProgress ?? 0;

  const achievements = userData?.achievements || [];

  // د Reset تڼۍ فعالیت
  const handleReset = () => {
    if (onReset) {
      onReset();
      return;
    }
    // که onReset ورنکړل شو، دلته پخپله تایید غواړي
    Alert.alert(
      '⚠️ د لوبې معلومات Reset کول',
      'ایا تاسو ډاډه یاست چې غواړئ ټول پرمختګ پاک کړئ؟ دا کار بیرته نه راګرځي.',
      [
        { text: 'لغوه', style: 'cancel' },
        { text: 'پاکول', style: 'destructive' },
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

          <Text style={styles.headerTitle}>👤 پروفایل</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* د کاروونکي معلوماتو کارت */}
          <View style={styles.userCard}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarIcon}>👤</Text>
            </View>

            <Text style={styles.nameText}>
              {name} {surname}
            </Text>

            <Text style={styles.emailText}>
              {email}
            </Text>
          </View>

          {/* د کچې او نمرې کارت */}
          <View style={styles.statsCard}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>🏆 عمومي کچه</Text>
              <Text style={styles.statValue}>{level}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.statBox}>
              <Text style={styles.statLabel}>⭐ پرمختګ نمرې</Text>
              <Text style={styles.statValue}>{progressPoints}</Text>
            </View>
          </View>

          {/* د رولونو پرمختګ */}
          <View style={styles.progressCard}>
            <Text style={styles.cardTitle}>📊 ستا پرمختګ</Text>

            <View style={styles.progressRow}>
              <Text style={styles.roleText}>👨‍⚖️ قاضي</Text>
              <View style={styles.progressBarBg}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${judgeProgress}%`, backgroundColor: '#D4AF37' },
                  ]}
                />
              </View>
              <Text style={styles.progressPercent}>{judgeProgress}%</Text>
            </View>

            <View style={styles.progressRow}>
              <Text style={styles.roleText}>⚖️ څارنوال</Text>
              <View style={styles.progressBarBg}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${prosecutorProgress}%`, backgroundColor: '#4CAF50' },
                  ]}
                />
              </View>
              <Text style={styles.progressPercent}>{prosecutorProgress}%</Text>
            </View>

            <View style={styles.progressRow}>
              <Text style={styles.roleText}>👨‍💼 مدافع وکیل</Text>
              <View style={styles.progressBarBg}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${defenseProgress}%`, backgroundColor: '#2196F3' },
                  ]}
                />
              </View>
              <Text style={styles.progressPercent}>{defenseProgress}%</Text>
            </View>
          </View>

          {/* د لاسته راوړنو کارت */}
          <View style={styles.achievementsCard}>
            <Text style={styles.cardTitle}>🏅 لاسته راوړنې</Text>

            {achievements.length === 0 ? (
              <View style={styles.achievementRow}>
                <Text style={styles.lockIcon}>🔒</Text>
                <Text style={styles.achievementText}>
                  لومړنۍ قضیه بشپړه کړه
                </Text>
              </View>
            ) : (
              achievements.map((item, index) => (
                <View key={index} style={styles.achievementRow}>
                  <Text style={styles.unlockIcon}>🏅</Text>
                  <Text style={styles.achievementText}>{item}</Text>
                </View>
              ))
            )}

            <View style={styles.achievementRow}>
              <Text style={styles.lockIcon}>🔒</Text>
              <Text style={styles.achievementText}>پټه لاسته راوړنه ؟؟؟</Text>
            </View>
          </View>

          {/* د تنظیماتو تڼۍ */}
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={onNavigateSettings}
            activeOpacity={0.85}
          >
            <Text style={styles.settingsButtonText}>⚙️ تنظیمات</Text>
          </TouchableOpacity>

          {/* د Reset تڼۍ */}
          <TouchableOpacity
            style={styles.dangerButton}
            onPress={handleReset}
            activeOpacity={0.85}
          >
            <Text style={styles.dangerButtonText}>
              ⚠️ د لوبې معلومات Reset کول
            </Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>LegalMind • Version 1.0.0</Text>
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

  /* HEADER */
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

  /* CONTENT */
  scrollContent: {
    paddingBottom: 40,
  },

  /* USER CARD */
  userCard: {
    backgroundColor: '#0B302D',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#B8962E',
    padding: 22,
    alignItems: 'center',
    marginBottom: 18,
  },
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#071827',
    borderWidth: 2,
    borderColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  avatarIcon: {
    fontSize: 45,
  },
  nameText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center',
  },
  emailText: {
    color: '#AEB7C2',
    fontSize: 14,
    textAlign: 'center',
  },

  /* STATS CARD */
  statsCard: {
    backgroundColor: '#0B302D',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#31545A',
    paddingVertical: 18,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    color: '#AEB7C2',
    fontSize: 13,
    marginBottom: 6,
    textAlign: 'center',
  },
  statValue: {
    color: '#D4AF37',
    fontSize: 26,
    fontWeight: 'bold',
  },
  divider: {
    width: 1,
    height: '70%',
    backgroundColor: '#31545A',
  },

  /* PROGRESS CARD */
  progressCard: {
    backgroundColor: '#0B302D',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#B8962E',
    padding: 18,
    marginBottom: 18,
  },
  cardTitle: {
    color: '#D4AF37',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 16,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  roleText: {
    color: '#FFFFFF',
    fontSize: 13,
    width: 100,
    textAlign: 'right',
    marginRight: 8,
  },
  progressBarBg: {
    flex: 1,
    height: 10,
    backgroundColor: '#071827',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 5,
  },
  progressPercent: {
    color: '#D4AF37',
    fontSize: 12,
    fontWeight: 'bold',
    width: 42,
    textAlign: 'left',
    marginLeft: 8,
  },

  /* ACHIEVEMENTS CARD */
  achievementsCard: {
    backgroundColor: '#0B302D',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#31545A',
    padding: 18,
    marginBottom: 18,
  },
  achievementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#071827',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  lockIcon: {
    fontSize: 18,
    marginRight: 10,
    opacity: 0.6,
  },
  unlockIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  achievementText: {
    color: '#D5DCE2',
    fontSize: 14,
    flex: 1,
    textAlign: 'right',
  },

  /* SETTINGS BUTTON */
  settingsButton: {
    backgroundColor: '#D4AF37',
    borderRadius: 15,
    minHeight: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  settingsButtonText: {
    color: '#071827',
    fontSize: 16,
    fontWeight: 'bold',
  },

  /* DANGER BUTTON */
  dangerButton: {
    backgroundColor: '#472326',
    borderWidth: 1,
    borderColor: '#A64B52',
    borderRadius: 15,
    minHeight: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
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
    letterSpacing: 0.5,
  },
});