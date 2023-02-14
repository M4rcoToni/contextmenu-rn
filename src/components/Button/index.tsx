import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { styles } from './styles';
interface Props extends TouchableOpacityProps {
  colors: string;
}
export function Button({ colors, ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8} {...rest}>
      <MaterialIcons name="add" size={26} color={colors} />
    </TouchableOpacity>
  );
}
