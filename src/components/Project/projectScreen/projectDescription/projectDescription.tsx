// DescriptionScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getData } from '../../../../logic/storage';

const DescriptionScreen: React.FC = () => {
  const [projectName, setProjectName] = useState('');

  useEffect(() => {
    const loadProjectName = async () => {
      const name = await getData('projectName');
      if (name) {
        setProjectName(name);
      }
    };

    loadProjectName();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{projectName}</Text>
      
      {/* Sección de Descripción */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Descripción</Text>
        <Text style={styles.descriptionText}>
          textotexto textotexto textotexto textotexto textotexto textotexto textotexto textotexto textotexto textotexto textotexto textotexto textotexto textotexto textotexto textotexto textotexto textotexto textotexto textotexto textotexto 
        </Text>
      </View>

      {/* Sección de Equipos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Equipos Participantes</Text>
        {/* Aquí puedes agregar un componente para listar los equipos */}
        <Text style={styles.descriptionText}>
          Listado Listado Listado Listado Listado Listado Listado Listado Listado Listado Listado 
        </Text>
      </View>

      {/* Aquí podrías incluir más secciones o controles según sea necesario */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#444',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
   
  },
 
});

export default DescriptionScreen;