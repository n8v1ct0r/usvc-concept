import { View } from 'react-native';

import { useNav } from '@/lib/nav';
import { useApp } from '@/state/AppState';
import { FaceId } from '@/ui/icons';
import { Card, FixedScreen, NavBar, PrimaryButton, Toggle } from '@/ui/primitives';
import { Em, T, Title } from '@/ui/T';

export default function FaceIdScreen() {
  const nav = useNav();
  const { c, faceId, setFaceId } = useApp();

  return (
    <FixedScreen testID="screen-faceid">
      <NavBar onBack={nav.back} right="Step 4 of 5" />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 28 }}>
        <View style={{ width: 96, height: 96, borderRadius: 28, backgroundColor: c.surface, alignItems: 'center', justifyContent: 'center' }}>
          <FaceId color={c.text} />
        </View>
        <Title style={{ textAlign: 'center' }}>
          Sign in with <Em>Face ID.</Em>
        </Title>
        <Card style={{ width: '100%', padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <View style={{ flex: 1 }}>
            <T w="600">Use Face ID</T>
            <T s={14} c="text2">
              Confirm each investment with Face ID.
            </T>
          </View>
          <Toggle value={faceId} onChange={setFaceId} label="Use Face ID" testID="toggle-faceid" />
        </Card>
      </View>
      <PrimaryButton label="Continue" onPress={() => nav.to('bank')} testID="continue" />
    </FixedScreen>
  );
}
