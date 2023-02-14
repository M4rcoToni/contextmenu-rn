import { useState, useCallback, useEffect } from 'react';
import { Alert, Text, View } from 'react-native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import Toast from 'react-native-toast-message';
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Tags } from '../../components/Tags';

import { styles } from './styles';
import { TagsProps } from '../../components/Tags/index';



export function Home() {
  const [tags, setTags] = useState<TagsProps[]>([]);
  const [title, setNewTag] = useState('');
  const { getItem, setItem } = useAsyncStorage("@contextmenu");



  async function handleSaveTag() {
    const id = uuid.v4();

    const newTagData = {
      id,
      title,
    }

    try {
      if (newTagData.title.length > 0) {
        const response = await getItem();
        const previousData = response ? JSON.parse(response) : [];

        const data = [...previousData, newTagData]

        await setItem(JSON.stringify(data));

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
      const response = await getItem();
      const data = response ? JSON.parse(response) : [];

      setTags(data);
      console.log(tags);

    } catch (error) {
      console.log(error);
    }
    setNewTag('');
  }


  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Input placeholder="Nova tag" onChangeText={setNewTag} value={title} />
        <Button colors='green' onPress={handleSaveTag} />
      </View>

      <Text style={styles.title}>Tags</Text>
      {
        tags.length ?
          <Tags data={tags} onRemove={() => handleShowTag()} />
          :
          (<Animated.Text
            layout={Layout}
            entering={FadeIn}
            exiting={FadeOut}
            style={styles.empty}>
            Nenhuma Tag Salva
          </Animated.Text>)
      }

      <View style={{ alignItems: 'flex-end' }}>

      </View>

    </View>
  );
}
