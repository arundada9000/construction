'use client';

import { useSettings } from '@/components/SettingsContext';
import CraneTransition from '@/components/CraneTransition';
import SafetyTapeWipe from '@/components/SafetyTapeWipe';
import ConcretePour from '@/components/ConcretePour';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const { settings } = useSettings();

  switch (settings.transition) {
    case 'crane':
      return <CraneTransition>{children}</CraneTransition>;
    case 'tape':
      return <SafetyTapeWipe>{children}</SafetyTapeWipe>;
    case 'concrete':
      return <ConcretePour>{children}</ConcretePour>;
    default:
      return <>{children}</>;
  }
}
