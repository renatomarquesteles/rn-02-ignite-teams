import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Button } from '@components/Button';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { groupCreate } from '@storage/group/groupCreate';
import { AppError } from '@utils/AppError';

import { Container, Content, Icon } from './styles';
import { Alert } from 'react-native';

export function NewGroup() {
  const [group, setGroup] = useState('');

  const navigation = useNavigation();

  async function handleNew() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert('New Team', 'Enter the team name');
      }

      await groupCreate(group);
      navigation.navigate('players', { group });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('New Team', error.message);
      } else {
        Alert.alert('New Team', 'Cannot create a new group');
      }
      console.log(error);
    }
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />

        <Highlight
          title="New team"
          subtitle="create a new team to add players"
        />

        <Input
          placeholder="Team's name"
          value={group}
          onChangeText={setGroup}
        />

        <Button title="Create" style={{ marginTop: 20 }} onPress={handleNew} />
      </Content>
    </Container>
  );
}
