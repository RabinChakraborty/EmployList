import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { fetchData } from './api';
import { EmployeeList, EmployeeCards } from './components/EmployeeList';

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [isListView, setListView] = useState(true);

  useEffect(() => {
    fetchData()
      .then((data) => setEmployees(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.toggleButtonContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, isListView ? styles.activeButton : null]}
          onPress={() => setListView(true)}
        >
          <Text style={styles.buttonText}>List View</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            !isListView ? styles.activeButton : null,
          ]}
          onPress={() => setListView(false)}
        >
          <Text style={styles.buttonText}>Grid View</Text>
        </TouchableOpacity>
      </View>
      {isListView ? (
        <EmployeeList data={employees} isListView={isListView} key='list' />
      ) : (
        <EmployeeCards data={employees} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  toggleButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  toggleButton: {
    padding: 8,
    marginHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0366d6',
  },
  activeButton: {
    backgroundColor: '#0366d6',
  },
  buttonText: {
    color: '#0366d6',
  },
});
