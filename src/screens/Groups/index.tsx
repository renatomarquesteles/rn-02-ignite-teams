import { useState } from 'react';
import { FlatList } from 'react-native';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';

import { Container } from './styles';
import { Button } from '@components/Button';

export function Groups() {
  const [teams, setTeams] = useState<string[]>([]);

  return (
    <Container>
      <Header />

      <Highlight title="Teams" subtitle="Play with your team" />

      <FlatList
        data={teams}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item} />}
        contentContainerStyle={teams.length === 0 && { flex: 1 }}
        ListEmptyComponent={
          <ListEmpty message="Start by creating your first team!" />
        }
      />

      <Button title="Create a new team" />
    </Container>
  );
}
