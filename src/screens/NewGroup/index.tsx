import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Button } from '@components/Button';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';

import { Container, Content, Icon } from './styles';

export function NewGroup() {
  const [group, setGroup] = useState('');

  const navigation = useNavigation();

  function handleNew() {
    navigation.navigate('players', { group });
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
