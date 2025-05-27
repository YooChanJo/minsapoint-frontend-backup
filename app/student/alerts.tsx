import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { commonStyles } from '../../constants/ThemeStyles';
import { Ionicons } from '@expo/vector-icons';

const warnings = [
  { id: 1, teacher: '홍길동', reason: "Didn't follow teacher's direction", score: 3 },
  { id: 2, teacher: '이순신', reason: "Didn't follow teacher's direction", score: 3 },
  { id: 3, teacher: '정약용', reason: "Didn't follow teacher's direction", score: 3 },
];

export default function CounterScreen() {
  return (
    <View style={commonStyles.container}>
      {/* 상단 바 */}
      <View style={commonStyles.topBar}>
        <Text style={commonStyles.appTitle}>MinsaPoint</Text>
        
       
      </View>

      
      <TouchableOpacity style={{...commonStyles.notification, marginVertical: 12}}>
        <Ionicons name="notifications-outline" size={28} color="black" />
        <View style={commonStyles.notificationBadge}>
          <Text style={commonStyles.notificationText}>{warnings.length}</Text>
        </View>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginVertical: 12 }}>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="close-circle-outline" size={20} color="#666" />
          <Text style={{ marginLeft: 4, color: '#666' }}>Clear All</Text>
        </TouchableOpacity>
      </View>

      {/* 경고 카드 리스트 */}
      <ScrollView style={{ flex: 1 , marginTop: 25}}>
        {warnings.map((item) => (
          <View
            key={item.id}
            style={{
              backgroundColor: '#fff',
              padding: 16,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#ccc',
              marginBottom: 12,
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="information-circle-outline" size={18} color="#555" />
                <Text style={{ marginLeft: 6, fontWeight: 'bold' }}>새로운 기소사항</Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="close-outline" size={20} color="#333" />
              </TouchableOpacity>
            </View>
            <Text style={{ marginTop: 12, marginBottom: 16 }}>
              {item.teacher} 선생님 - {item.reason} ({item.score}점)
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#333',
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 6,
                alignSelf: 'flex-start',
              }}
            >
              <Text style={{ color: '#fff' }}>확인 완료</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
