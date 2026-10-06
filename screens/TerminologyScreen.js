import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Alert,
} from 'react-native';
import {
  pashtoAlphabet,
  getTermsByLetter,
  searchTerms,
  getAvailableLetters,
} from '../data/terminology';

export default function TerminologyScreen({
  onNavigateBack,
  favoriteIds = [],
  onToggleFavorite,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState(null);

  const availableLetters = getAvailableLetters();
  const isSearching = searchQuery.trim().length > 0;
  const searchResults = isSearching ? searchTerms(searchQuery) : [];
  const letterTerms = selectedLetter ? getTermsByLetter(selectedLetter) : [];

  const handleToggleFavorite = (termId) => {
    if (onToggleFavorite) {
      onToggleFavorite(termId);
    } else {
      Alert.alert('پام', 'د خوښې فعالیت به د index.js په تنظیم سره وصل شي.');
    }
  };

  // --- د اصطلاح د جزئیاتو پاڼه ---
  if (selectedTerm) {
    const isFav = favoriteIds.includes(selectedTerm.id);
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#071827" />
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setSelectedTerm(null)}
              activeOpacity={0.8}
            >
              <Text style={styles.backText}>‹</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle} numberOfLines={1}>
              📚 {selectedTerm.term}
            </Text>
          </View>

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* د اصطلاح کارت */}
            <View style={styles.termHeaderCard}>
              <Text style={styles.termBigText}>{selectedTerm.term}</Text>
              {selectedTerm.transliteration ? (
                <Text style={styles.termTrans}>
                  {selectedTerm.transliteration}
                </Text>
              ) : null}
              {selectedTerm.category ? (
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>
                    {selectedTerm.category}
                  </Text>
                </View>
              ) : null}

              <TouchableOpacity
                style={[
                  styles.favButton,
                  isFav && styles.favButtonActive,
                ]}
                onPress={() => handleToggleFavorite(selectedTerm.id)}
                activeOpacity={0.85}
              >
                <Text style={styles.favButtonText}>
                  {isFav ? '⭐ له خوښې لرې کړه' : '☆ خوښه کړه'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* ۱. تعریف */}
            <View style={styles.detailCard}>
              <View style={styles.detailHeader}>
                <Text style={styles.detailIcon}>📖</Text>
                <Text style={styles.detailTitle}>تعریف</Text>
              </View>
              <Text style={styles.detailText}>
                {selectedTerm.definition}
              </Text>
            </View>

            {/* ۲. ساده تشریح */}
            <View style={styles.detailCard}>
              <View style={styles.detailHeader}>
                <Text style={styles.detailIcon}>💡</Text>
                <Text style={styles.detailTitle}>ساده تشریح</Text>
              </View>
              <Text style={styles.detailText}>
                {selectedTerm.simpleExplanation}
              </Text>
            </View>

            {/* ۳. مثال */}
            <View style={styles.detailCard}>
              <View style={styles.detailHeader}>
                <Text style={styles.detailIcon}>📝</Text>
                <Text style={styles.detailTitle}>مثال</Text>
              </View>
              <Text style={styles.detailText}>{selectedTerm.example}</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }

  // --- د لیست اصلي پاڼه ---
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#071827" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={onNavigateBack}
            activeOpacity={0.8}
          >
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>📚 حقوقي ترمینالوژي</Text>
        </View>

        {/* د لټون بکس */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="حقوقي اصطلاح ولټوئ..."
            placeholderTextColor="#7F8B96"
            style={styles.searchInput}
          />
          {isSearching && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* د لټون پایلې */}
          {isSearching ? (
            <>
              <Text style={styles.sectionLabel}>
                د لټون پایلې ({searchResults.length})
              </Text>

              {searchResults.length === 0 ? (
                <View style={styles.emptyCard}>
                  <Text style={styles.emptyIcon}>🔍</Text>
                  <Text style={styles.emptyTitle}>هېڅ اصطلاح ونه موندل شوه</Text>
                  <Text style={styles.emptyText}>
                    د بل کلمې سره بیا هڅه وکړئ.
                  </Text>
                </View>
              ) : (
                searchResults.map((term) => (
                  <TermCard
                    key={term.id}
                    term={term}
                    isFav={favoriteIds.includes(term.id)}
                    onPress={() => setSelectedTerm(term)}
                  />
                ))
              )}
            </>
          ) : selectedLetter ? (
            <>
              <View style={styles.letterHeaderRow}>
                <TouchableOpacity
                  onPress={() => setSelectedLetter(null)}
                  style={styles.changeLetterButton}
                  activeOpacity={0.8}
                >
                  <Text style={styles.changeLetterText}>← بدل کړه</Text>
                </TouchableOpacity>
                <Text style={styles.sectionLabel}>
                  حرف «{selectedLetter}» ({letterTerms.length})
                </Text>
              </View>

              {letterTerms.length === 0 ? (
                <View style={styles.emptyCard}>
                  <Text style={styles.emptyIcon}>📭</Text>
                  <Text style={styles.emptyTitle}>
                    دې حرف لپاره اصطلاحات نه دي ثبت شوي
                  </Text>
                </View>
              ) : (
                letterTerms.map((term) => (
                  <TermCard
                    key={term.id}
                    term={term}
                    isFav={favoriteIds.includes(term.id)}
                    onPress={() => setSelectedTerm(term)}
                  />
                ))
              )}
            </>
          ) : (
            <>
              <Text style={styles.sectionLabel}>د پښتو الفبا</Text>
              <View style={styles.alphabetContainer}>
                {pashtoAlphabet.map((letter, index) => {
                  const hasTerms = availableLetters.has(letter);
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.letterButton,
                        !hasTerms && styles.letterButtonDisabled,
                      ]}
                      onPress={() => hasTerms && setSelectedLetter(letter)}
                      activeOpacity={hasTerms ? 0.8 : 1}
                      disabled={!hasTerms}
                    >
                      <Text
                        style={[
                          styles.letterText,
                          !hasTerms && styles.letterTextDisabled,
                        ]}
                      >
                        {letter}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View style={styles.infoNotice}>
                <Text style={styles.infoNoticeTitle}>📖 حقوقي اصطلاحات</Text>
                <Text style={styles.infoNoticeText}>
                  د هرې اصطلاح لپاره تعریف، ساده تشریح او مثال موجود وي. د
                  زیاتو اصطلاحاتو لپاره به ډیټا وروسته پراخه شي.
                </Text>
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// د اصطلاح کارت
function TermCard({ term, isFav, onPress }) {
  return (
    <TouchableOpacity
      style={styles.termCard}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text style={styles.termIcon}>
        {isFav ? '⭐' : '📄'}
      </Text>
      <View style={styles.termInfo}>
        <Text style={styles.termTitle}>{term.term}</Text>
        {term.transliteration ? (
          <Text style={styles.termSubtitle}>{term.transliteration}</Text>
        ) : null}
      </View>
      <Text style={styles.termArrow}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#071827' },
  safeArea: { flex: 1, paddingHorizontal: 18 },

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
  backText: { color: '#D4AF37', fontSize: 34, lineHeight: 36 },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'right',
  },

  scrollContent: { paddingBottom: 40 },

  /* SEARCH */
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0B2432',
    borderWidth: 1,
    borderColor: '#31545A',
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 18,
  },
  searchIcon: { fontSize: 18, marginRight: 8 },
  searchInput: {
    flex: 1,
    height: 50,
    color: '#FFFFFF',
    fontSize: 15,
    textAlign: 'right',
  },
  clearIcon: { color: '#D4AF37', fontSize: 20, paddingLeft: 8 },

  /* SECTION LABEL */
  sectionLabel: {
    color: '#D4AF37',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 12,
  },

  /* ALPHABET */
  alphabetContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    gap: 8,
    marginBottom: 20,
  },
  letterButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#0B302D',
    borderWidth: 1,
    borderColor: '#B8962E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterButtonDisabled: {
    backgroundColor: '#0B1F2A',
    borderColor: '#1F3540',
  },
  letterText: { color: '#FFFFFF', fontSize: 17, fontWeight: 'bold' },
  letterTextDisabled: { color: '#405868' },

  /* LETTER HEADER ROW */
  letterHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  changeLetterButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#0B302D',
    borderWidth: 1,
    borderColor: '#B8962E',
  },
  changeLetterText: { color: '#D4AF37', fontSize: 13, fontWeight: '600' },

  /* TERM CARD */
  termCard: {
    backgroundColor: '#0B302D',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#31545A',
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  termIcon: { fontSize: 22, marginRight: 12, width: 30, textAlign: 'center' },
  termInfo: { flex: 1 },
  termTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'right',
    marginBottom: 3,
  },
  termSubtitle: {
    color: '#AEB7C2',
    fontSize: 12,
    textAlign: 'right',
    fontStyle: 'italic',
  },
  termArrow: { color: '#D4AF37', fontSize: 28, marginLeft: 8 },

  /* DETAIL CARDS */
  termHeaderCard: {
    backgroundColor: '#0B302D',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#B8962E',
    padding: 22,
    alignItems: 'center',
    marginBottom: 18,
  },
  termBigText: {
    color: '#D4AF37',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  termTrans: {
    color: '#AEB7C2',
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  categoryBadge: {
    backgroundColor: '#071827',
    borderWidth: 1,
    borderColor: '#31545A',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 14,
  },
  categoryText: { color: '#AEB7C2', fontSize: 12, fontWeight: '600' },
  favButton: {
    backgroundColor: '#071827',
    borderWidth: 1.5,
    borderColor: '#B8962E',
    paddingVertical: 11,
    paddingHorizontal: 22,
    borderRadius: 12,
    minWidth: 200,
    alignItems: 'center',
  },
  favButtonActive: {
    backgroundColor: 'rgba(212, 175, 55, 0.18)',
    borderColor: '#D4AF37',
  },
  favButtonText: { color: '#D4AF37', fontSize: 15, fontWeight: '700' },

  detailCard: {
    backgroundColor: '#0B302D',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#31545A',
    padding: 18,
    marginBottom: 14,
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 12,
  },
  detailIcon: { fontSize: 20, marginLeft: 8 },
  detailTitle: {
    color: '#D4AF37',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  detailText: {
    color: '#E5E7EB',
    fontSize: 15,
    lineHeight: 26,
    textAlign: 'right',
  },

  /* EMPTY / INFO */
  emptyCard: {
    backgroundColor: '#0B302D',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#31545A',
    padding: 28,
    alignItems: 'center',
    marginTop: 10,
  },
  emptyIcon: { fontSize: 48, marginBottom: 12, opacity: 0.7 },
  emptyTitle: {
    color: '#D4AF37',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyText: {
    color: '#AEB7C2',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 22,
  },

  infoNotice: {
    backgroundColor: '#102D3D',
    borderWidth: 1,
    borderColor: '#3E718C',
    borderRadius: 16,
    padding: 17,
    marginTop: 5,
  },
  infoNoticeTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 7,
  },
  infoNoticeText: {
    color: '#C8D4DC',
    fontSize: 13,
    lineHeight: 22,
    textAlign: 'right',
  },
});