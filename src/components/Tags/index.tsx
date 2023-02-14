import { View } from 'react-native';

import { Tag } from '../Tag';

import { styles } from './styles';
export type TagsProps = {
  id: string
  title: string
}
type Props = {
  data: TagsProps[];
  onRemove: (tag: string) => void;
};

export function Tags({ data, onRemove }: Props) {
  return (
    <View style={styles.container}>
      {data.map(tag => (


        <Tag key={tag.id} title={tag.title} onRemove={() => onRemove(tag.title)} />

      ))}
    </View>
  );
}
