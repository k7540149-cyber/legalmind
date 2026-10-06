import React, { useState } from 'react';
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

export default function FavoritesScreen({
  profile,
  onNavigateBack,
  onOpenItem,
  onRemoveFavorite,
}) {
  // د ټب حالت: 'terminology' یا 'cases'
  const [activeTab, setActiveTab] = useState('terminology');

  // د کاروونکي د خوښې وړ موارد (د profile څخه)
  const favorites = profile?.favorites || [];

  // د دواړو ډولونو جلا کول
  const terminologyFavorites = favorites.filter(
    (item) => item.type === 'terminology'
  );
  const caseFavorites = favorites.filter((item) => item.type === 'case');

  const currentList =
    activeTab === 'terminology' ? terminologyFavorites : caseFavorites;

  // د لرې کولو تایید
  const handleRemove = (item) => {
    Alert.alert(
      '⭐ له خوښې لرې کول',
      `ایا غواړئ "${item.title}" له خوښې لرې کړئ؟`,
      [
        { text: 'لغوه', style: 'cancel' },
        {
          text: 'لرې کول',
          style: 'destructive',
          onPress: () => {
            if (onRemoveFavorite) {
              onRemoveFavorite(item.id);
            } else {
              Alert.alert('پام', 'د لرې کولو فعالیت لا نه دی وصل شوی.');
            }
          },
        },
      ]
    );
  };

  const handleOpen = (item) => {
    if (onOpenItem) {
      onOpenItem(item);
    } else {
      Alert.alert('پام', `د "${item.title}" پاڼه به په راتلونکي ګام کې جوړه شي.`);
    }
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

          <Text style={styles.headerTitle}>⭐ خوښې</Text>
        </View>

        {/* د ټبونو انتخاب */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'terminology' && styles.tabActive,
            ]}
            onPress={() => setActiveTab('terminology')}
            activeOpacity={0.85}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'terminology' && styles.tabTextActive,
              ]}
            >
              📚 ترمینالوژي
            </Text>
            <View style={styles.tabBadge}>
              <Text style={styles.tabBadgeText}>
                {terminologyFavorites.length}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'cases' && styles.tabActive,
            ]}
            onPress={() => setActiveTab('cases')}
            activeOpacity={0.85}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'cases' && styles.tabTextActive,
              ]}
            >
              ⚖️ قضیې
            </Text>
            <View style={styles.tabBadge}>
              <Text style={styles.tabBadgeText}>
                {caseFavorites.length}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {currentList.length === 0 ? (
            // د خالي حالت ښودنه
            <View style={styles.emptyCard}>
              <Text style={styles.emptyIcon}>
                {activeTab === 'terminology' ? '📚' : '⚖️'}
              </Text>

              <Text style={styles.emptyTitle}>
                {activeTab === 'terminology'
                  ? 'هېڅ حقوقي اصطلاح نه ده خوښه شوې'
                  : 'هېڅ قضیه نه ده خوښه شوې'}
              </Text>

              <Text style={styles.emptyText}>
                {activeTab === 'terminology'
                  ? 'کله چې تاسو د حقوقي اصطلاحاتو په پاڼه کې د ⭐ نښه کلیک وکړئ، هغه به دلته ښکاره شي.'
                  : 'کله چې تاسو د یوې قضیې په پاڼه کې د ⭐ نښه کلیک وکړئ، هغه به دلته ښکاره شي.'}
              </Text>
            </View>
          ) : (
            // د خوښې وړ مواردو لیست
            currentList.map((item) => (
              <View key={item.id} style={styles.favoriteCard}>
                <TouchableOpacity
                  style={styles.favoriteContent}
                  onPress={() => handleOpen(item)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.favoriteIcon}>
                    {item.icon || (item.type === 'terminology' ? '📚' : '⚖️')}
                  </Text>

                  <View style={styles.favoriteInfo}>
                    <Text style={styles.favoriteTitle}>
                      {item.title}
                    </Text>
                    {item.subtitle ? (
                      <Text style={styles.favoriteSubtitle}>
                        {item.subtitle}
                      </Text>
                    ) : null}
                  </View>

                  <Text style={styles.favoriteArrow}>›</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemove(item)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.removeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
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

  /* TABS */
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#0B2432',
    borderRadius: 14,
    padding: 5,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#31545A',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: '#0B302D',
    borderWidth: 1,
    borderColor: '#B8962E',
  },
  tabText: {
    color: '#AEB7C2',
    fontSize: 14,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#D4AF37',
  },
  tabBadge: {
    backgroundColor: '#D4AF37',
    borderRadius: 10,
    minWidth: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 7,
    paddingHorizontal: 6,
  },
  tabBadgeText: {
    color: '#071827',
    fontSize: 12,
    fontWeight: 'bold',
  },

  /* CONTENT */
  scrollContent: {
    paddingBottom: 40,
  },

  /* EMPTY STATE */
  emptyCard: {
    backgroundColor: '#0B302D',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#31545A',
    padding: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  emptyIcon: {
    fontSize: 55,
    marginBottom: 16,
    opacity: 0.7,
  },
  emptyTitle: {
    color: '#D4AF37',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  emptyText: {
    color: '#AEB7C2',
    fontSize: 14,
    lineHeight: 23,
    textAlign: 'center',
  },

  /* FAVORITE CARD */
  favoriteCard: {
    backgroundColor: '#0B302D',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#B8962E',
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  favoriteContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  favoriteIcon: {
    fontSize: 26,
    marginRight: 12,
    width: 34,
    textAlign: 'center',
  },
  favoriteInfo: {
    flex: 1,
  },
  favoriteTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'right',
    marginBottom: 4,
  },
  favoriteSubtitle: {
    color: '#AEB7C2',
    fontSize: 13,
    textAlign: 'right',
  },
  favoriteArrow: {
    color: '#D4AF37',
    fontSize: 28,
    marginLeft: 8,
  },
  removeButton: {
    width: 45,
    height: '100%',
    backgroundColor: '#472326',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});