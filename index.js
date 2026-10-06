import React from 'react';
import { registerRootComponent } from 'expo';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

function HomeScreen() {
  const menuItems = [
    {
      icon: '📚',
      title: 'حقوقي ترمینالوژي',
    },
    {
      icon: '👨‍⚖️',
      title: 'د قاضي رول په قضیه کې',
    },
    {
      icon: '⚖️',
      title: 'د څارنوال رول په قضیه کې',
    },
    {
      icon: '👨‍💼',
      title: 'د مدافع وکیل رول په قضیه کې',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#071827"
      />

      <SafeAreaView style={styles.safeArea}>

        {/* Top Bar */}
        <View style={styles.topBar}>

          <TouchableOpacity style={styles.topButton}>
            <Text style={styles.topIcon}>👤</Text>
            <Text style={styles.topText}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.topButton}>
            <Text style={styles.topIcon}>⭐</Text>
            <Text style={styles.topText}>Favorites</Text>
          </TouchableOpacity>

        </View>

        {/* Logo / Title */}
        <View style={styles.header}>
          <Text style={styles.logo}>⚖️</Text>

          <Text style={styles.title}>
            LegalMind
          </Text>

          <Text style={styles.subtitle}>
            Learn • Analyze • Decide
          </Text>
        </View>

        {/* Main Menu */}
        <View style={styles.menuContainer}>

          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuCard}
              activeOpacity={0.8}
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

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.designed}>
            Designed by: Omid Momand
          </Text>
        </View>

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
    marginTop: 25,
    marginBottom: 35,
  },

  logo: {
    fontSize: 64,
    marginBottom: 8,
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

});

registerRootComponent(HomeScreen);