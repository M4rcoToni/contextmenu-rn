import { useState, useCallback, useEffect } from 'react';
import { Alert, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import Toast from 'react-native-toast-message';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Tags } from '../../components/Tags';

import { styles } from './styles';
import { TagsProps } from '../../components/Tags/index';



export function Home() {
  const [tags, setTags] = useState<TagsProps[]>([]);
  const [title, setNewTag] = useState('');
  const [saveTag, setSaveNewTag] = useState('');



  async function handleSaveTag() {
    const id = uuid.v4();

    const newTagData = {
      id,
      title,
    }

    try {
      if (newTagData.title.length > 0) {
        const response = await AsyncStorage.getItem("@contextmenu");
        const previousData = response ? JSON.parse(response) : [];

        const data = [...previousData, newTagData]

        await AsyncStorage.setItem("@contextmenu", JSON.stringify(data));

        Toast.show({
          type: 'success',
          text1: 'Salvo com sucesso!'
        });
        handleShowTag()
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao Salvar!'
      });
    }
    // setTags(prevState => [...prevState, newTag]);
    setNewTag('');

  }

  async function handleShowTag() {

    try {
      const response = await AsyncStorage.getItem("@contextmenu");
      const data = response ? JSON.parse(response) : [];

      setTags(data);
      console.log(tags);

    } catch (error) {
      console.log(error);

    }
    setNewTag('');
  }

  async function handleRemoveTag() {
    const response = await AsyncStorage.removeItem("@contextmenu");
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Input placeholder="Nova tag" onChangeText={setNewTag} value={title} />
        <Button colors='green' onPress={handleSaveTag} />
      </View>

      <Text style={styles.title}>Tags</Text>




      <Tags data={tags} onRemove={handleRemoveTag} />

      {/* <Tags title={tags.title} onRemove={handleRemoveTag} /> */}

      <Button colors='yellow' onPress={handleShowTag} />

      <View style={{ alignItems: 'flex-end' }}>

        <Button colors="red" onPress={handleRemoveTag} />
      </View>

    </View>
  );
}
