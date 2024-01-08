import { Container, Content, Icon } from './styles';

import { Header } from '@components/Header';
import { Button } from '@components/Button';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';

export function NewGroup() {
  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />

        <Highlight
          title="New team"
          subtitle="create a new team to add players"
        />

        <Input placeholder="Team's name" />

        <Button title="Create" style={{ marginTop: 20 }} />
      </Content>
    </Container>
  );
}
