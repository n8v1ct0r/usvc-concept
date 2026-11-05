import * as Haptics from 'expo-haptics';
import * as LocalAuthentication from 'expo-local-authentication';
import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { RISK_SHORT } from '@/data/sample';
import { amountDisplay, amountValue, fmtUSD } from '@/lib/format';
import { usePulse } from '@/lib/motion';
import { useNav } from '@/lib/nav';
import { useApp } from '@/state/AppState';
import { scrim } from '@/theme/tokens';
import { FaceId } from '@/ui/icons';
import { Card, CheckRow, FixedScreen, KVRow, NavBar, PrimaryButton, Spacer } from '@/ui/primitives';
import { Caption, T } from '@/ui/T';

/** Pulsing Face ID tile over a navy scrim (design: 120pt tile, usvcPulse 1s). */
function ScanOverlay() {
  const { c } = useApp();
  const pulse = usePulse(1000);
  return (
    <Animated.View
      entering={FadeIn.duration(150)}
      accessibilityViewIsModal
      accessibilityLabel="Confirming with Face ID"
      testID="scan-overlay"
      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: scrim.scan, alignItems: 'center', justifyContent: 'center' }}
    >
      <Animated.View style={[{ width: 120, height: 120, borderRadius: 32, backgroundColor: c.bg, alignItems: 'center', justifyContent: 'center' }, pulse]}>
        <FaceId color={c.text} size={60} />
      </Animated.View>
    </Animated.View>
  );
}

/**
 * Real Face ID when the device has it enrolled and the user left it on;
 * otherwise the design's 900ms scan animation (e.g. the simulator).
 */
async function confirmIdentity(faceIdOn: boolean): Promise<boolean> {
  if (faceIdOn) {
    try {
      const [hardware, enrolled] = await Promise.all([LocalAuthentication.hasHardwareAsync(), LocalAuthentication.isEnrolledAsync()]);
      if (hardware && enrolled) {
        const res = await LocalAuthentication.authenticateAsync({ promptMessage: 'Confirm investment', disableDeviceFallback: false });
        return res.success;
      }
    } catch {
      // fall through to the simulated scan
    }
  }
  await new Promise((r) => setTimeout(r, 900));
  return true;
}

export default function ReviewScreen() {
  const nav = useNav();
  const { amount, mode, faceId } = useApp();
  const [prospectus, setProspectus] = useState(false);
  const [scanning, setScanning] = useState(false);
  const alive = useRef(true);
  useEffect(
    () => () => {
      alive.current = false;
    },
    [],
  );

  const cents = fmtUSD(amountValue(amount));
  const modeLabel = mode === 'one' ? 'One-time' : 'Monthly';

  const confirm = async () => {
    setScanning(true);
    const ok = await confirmIdentity(faceId);
    if (!alive.current) return;
    setScanning(false);
    if (!ok) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    nav.to('submitted');
  };

  return (
    <FixedScreen overlay={scanning ? <ScanOverlay /> : null} testID="screen-review">
      <NavBar onBack={nav.back} title="Review" />
      <View style={{ gap: 16, paddingTop: 8 }}>
        <View style={{ alignItems: 'center', paddingTop: 8, paddingBottom: 4 }}>
          <T s={44} w="600" ls={-0.03} lh={1} testID="review-amount">
            {amountDisplay(amount)}
          </T>
          <T s={14} c="text2" style={{ marginTop: 6 }}>
            {modeLabel} · from Checking ••0921
          </T>
        </View>
        <Card style={{ paddingHorizontal: 16 }}>
          <KVRow label="Amount" value={cents} />
          <KVRow label="Sales load" value="$0.00" />
          <KVRow label="Price" value="Priced at the next calculated NAV" />
          <KVRow label="Forecast net annual expenses" value="2.50%" gap={16} last />
        </Card>
        <Caption>
          Estimates as of July 28, 2026. No sales load when you invest directly with USVC. Units are generally purchased at the next calculated NAV per
          share after the investment is accepted.
        </Caption>
        <CheckRow checked={prospectus} onToggle={() => setProspectus((v) => !v)} label="I've read the prospectus" testID="review-prospectus">
          <T s={15}>
            I&apos;ve read the{' '}
            <T s={15} w="600" c="accent">
              prospectus
            </T>
          </T>
        </CheckRow>
        <Caption>{RISK_SHORT}</Caption>
      </View>
      <Spacer />
      <PrimaryButton
        label="Confirm with Face ID"
        disabled={!prospectus || scanning}
        onPress={confirm}
        style={{ marginTop: 12 }}
        testID="confirm"
        icon={<FaceIconOnButton />}
      />
    </FixedScreen>
  );
}

function FaceIconOnButton() {
  const { c } = useApp();
  return <FaceId color={c.navText} size={22} strokeWidth={4} />;
}
