import { useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { ButtonIcon } from '@components/ButtonIcon';
import { Input } from '@components/Input';
import { Filter } from '@components/Filter';
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';
import { playersGetByGroupAndTeam } from '@storage/player/playersGetByGroupAndTeam';
import { AppError } from '@utils/AppError';

import { Container, Form, HeaderList, PlayersCount } from './styles';

type RouteParams = {
  group: string;
};

export function Players() {
  const [newPlayerName, setNewPlayerName] = useState('');
  const [team, setTeam] = useState('Team A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const route = useRoute();
  const { group } = route.params as RouteParams;

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('New player', 'Enter the player nickname.');
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    };

    try {
      await playerAddByGroup(newPlayer, group);
      await fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('New Player', error.message);
      } else {
        console.log(error);
        Alert.alert('New Player', 'Cannot add new player.');
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      const playersByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert('Players', 'Cannot fetch team players.');
    }
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />

      <Highlight title={group} subtitle="Add players and manage the team" />

      <Form>
        <Input
          placeholder="Player's nickname"
          autoCorrect={false}
          value={newPlayerName}
          onChangeText={setNewPlayerName}
        />

        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={['Team A', 'Team B']}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <PlayersCount>{players.length}</PlayersCount>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard name={item.name} onRemove={() => {}} />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="There are no players on this team yet" />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />

      <Button title="Delete Team" type="SECONDARY" />
    </Container>
  );
}
