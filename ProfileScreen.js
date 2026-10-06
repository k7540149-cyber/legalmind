import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

export default function ProfileScreen({ userData, onNavigateBack, onNavigateSettings }) {
  // دا معلومات به وروسته د Offline Database څخه راوړل شي
  const name = userData?.name || 'اميد';
  const surname = userData?.surname || 'مومند';
  const email = userData?.email || 'omidhasanzai@gmail.com';

  // دا به وروسته د اصلي Progress Points څخه ډک شي
  const level = 1;
  const progressPoints = 0;
  const judgeProgress = 0;
  const prosecutorProgress = 0;
  const defenseProgress = 0;

  return (
    <View style={styles.container}>
      {/* د پورتني برخې هیدر */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onNavigateBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#D4AF37" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>👤 پروفایل</Text>
        <View style={{ width: 24 }} /> {/* د انډول لپاره خالي ځای */}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* د کاروونکي معلوماتو کارت */}
        <View style={styles.card}>
          <View style={styles.avatarContainer}>
            <FontAwesome5 name="user-circle" size={80} color="#D4AF37" />
          </View>
          <Text style={styles.nameText}>{name} {surname}</Text>
          <Text style={styles.emailText}>{email}</Text>
        </View>

        {/* د کچې او نمرې کارت */}
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>🏆 کچه</Text>
              <Text style={styles.statValue}>{level}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>⭐ د پرمختګ نمرې</Text>
              <Text style={styles.statValue}>{progressPoints}</Text>
            </View>
          </View>
        </View>

        {/* د رولونو پرمختګ */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>📊 د رولونو پرمختګ</Text>
          
          <View style={styles.progressRow}>
            <Text style={styles.roleText}>👨‍⚖️ قاضي</Text>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${judgeProgress}%`, backgroundColor: '#D4AF37' }]} />
            </View>
          </View>

          <View style={styles.progressRow}>
            <Text style={styles.roleText}>⚖️ څارنوال</Text>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${prosecutorProgress}%`, backgroundColor: '#4CAF50' }]} />
            </View>
          </View>

          <View style={styles.progressRow}>
            <Text style={styles.roleText}>👨‍💼 مدافع وکیل</Text>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${defenseProgress}%`, backgroundColor: '#2196F3' }]} />
            </View>
          </View>
        </View>

        {/* لاسته راوړنې */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>🏅 لاسته راوړنې</Text>
          <View style={styles.achievementRow}>
            <MaterialIcons name="lock" size={24} color="#CCCCCC" />
            <Text style={styles.achievementText}>لومړنۍ قضیه بشپړه کړه</Text>
          </View>
          <View style={styles.achievementRow}>
            <MaterialIcons name="lock" size={24} color="#CCCCCC" />
            <Text style={styles.achievementText}>لومړنی حقوقي تحلیل ولیکه</Text>
          </View>
        </View>

        {/* د تنظیماتو تڼۍ */}
        <TouchableOpacity style={styles.settingsButton} onPress={onNavigateSettings}>
          <Ionicons name="settings-outline" size={24} color="#071827" />
          <Text style={styles.settingsButtonText}>⚙️ تنظیمات</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071827', // Deep Navy
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#0A1F33',
    borderBottomWidth: 1,
    borderBottomColor: '#D4AF37',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#0F2F26', // Dark Emerald
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#D4AF37',
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 15,
  },
  nameText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  emailText: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  divider: {
    width: 1,
    height: '80%',
    backgroundColor: '#D4AF37',
    opacity: 0.5,
  },
  statLabel: {
    fontSize: 14,
    color: '#CCCCCC',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D4AF37',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D4AF37',
    alignSelf: 'flex-start',
    marginBottom: 15,
    width: '100%',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  roleText: {
    color: '#FFFFFF',
    width: 100,
    fontSize: 14,
  },
  progressBarBg: {
    flex: 1,
    height: 10,
    backgroundColor: '#1A3A30',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 5,
  },
  achievementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
    backgroundColor: '#0A1F33',
    padding: 10,
    borderRadius: 8,
  },
  achievementText: {
    color: '#CCCCCC',
    marginLeft: 10,
    fontSize: 14,
  },
  settingsButton: {
    backgroundColor: '#D4AF37',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  settingsButtonText: {
    color: '#071827',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});