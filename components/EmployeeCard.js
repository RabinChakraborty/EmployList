import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

const EmployeeCard = ({ employee, isListView, onViewSubordinates }) => {
  const dynamicColor = useSharedValue(employee.backgroundColor);

  const handleColorChange = (newColor) => {
    dynamicColor.value = withSpring(newColor);
  };

  const onCardPress = () => {
    const newColor = generateRandomColor();

    runOnJS(handleColorChange)(newColor);
  };

  const generateRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  const screenWidth = Dimensions.get('window').width;
  const numColumns = isListView ? 1 : 2;
  const cardWidth = screenWidth / numColumns - 16 * (numColumns + 1);

  return (
    <TouchableOpacity onPress={onCardPress}>
      <Animated.View
        style={[
          styles.card,
          { backgroundColor: dynamicColor.value, width: cardWidth },
        ]}
      >
        <View>
          <Text style={styles.name}>{employee.name}</Text>
          <Text style={styles.email}>{employee.email}</Text>
          <Text style={styles.phone}>{employee.phone}</Text>
          {isListView && (
            <>
              <Text style={styles.manager}>Manager: {employee.parentId}</Text>
              {employee.subordinates && (
                <TouchableOpacity
                  onPress={() => onViewSubordinates(employee.subordinates)}
                >
                  <Text style={styles.subordinates}>View Subordinates</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    margin: 8,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#0366d6',
  },
  email: {
    fontSize: 14,
    marginBottom: 4,
    color: '#586069',
  },
  phone: {
    fontSize: 14,
    marginBottom: 4,
    color: '#586069',
  },
  manager: {
    fontSize: 14,
    marginBottom: 4,
    color: '#586069',
    fontStyle: 'italic',
  },
  subordinates: {
    fontSize: 14,
    marginBottom: 4,
    color: '#0366d6',
    fontStyle: 'italic',
  },
});

export default EmployeeCard;
