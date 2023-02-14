import { Text, TouchableOpacity } from 'react-native';
import { HoldItem } from 'react-native-hold-menu';
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

import { styles } from './styles';
import { TagsProps } from '../Tags/index';

type Props = {
  tagId: string
  title: string;
  onRemove: () => void;
};

export function Tag({ title, tagId, onRemove }: Props) {
  const { getItem, setItem } = useAsyncStorage("@contextmenu");

  async function handleRemove(id: string) {
    const response = await getItem();
    const previousData = response ? JSON.parse(response) : [];

    const data = previousData.filter((item: TagsProps) => item.id !== id);
    setItem(JSON.stringify(data));
    console.log(data + "REMOVIDO");
    onRemove()
  }


  return (
    <Animated.View
      style={styles.container}
      layout={Layout}
      entering={FadeIn}
      exiting={FadeOut}
    >
      <HoldItem
        items={[
          { text: title, isTitle: true },
          {
            text: 'Apagar',
            isDestructive: true,
            icon: 'trash',
            onPress: () => handleRemove(tagId)
          }
        ]}
      >
        <Text style={styles.title}>#{title}</Text>
      </HoldItem>
    </Animated.View>
  );
}
