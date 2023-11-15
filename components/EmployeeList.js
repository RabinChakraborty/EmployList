import React from 'react';
import { FlatList, View } from 'react-native';
import EmployeeCard from './EmployeeCard';

const EmployeeList = ({ data, isListView, key }) => {
  const renderItem = ({ item }) => (
    <EmployeeCard employee={item} isListView={isListView} />
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      key={key}
      renderItem={renderItem}
      numColumns={1}
    />
  );
};

const EmployeeCards = ({ data }) => {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {data.map((employee) => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          isListView={false}
        />
      ))}
    </View>
  );
};

export { EmployeeList, EmployeeCards };
