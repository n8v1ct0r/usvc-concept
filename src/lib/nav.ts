import { useRouter, type Href } from 'expo-router';
import { useMemo } from 'react';

// Navigation semantics from the design's prototype logic:
//   to[s]  -> push a screen onto the stack
//   back   -> pop, or fall back to Home
//   tab[s] -> switch to a tab
//   reset  -> clear the stack and land on a root (finish onboarding, sign out, done)

export type StackScreen =
  | 'welcome'
  | 'who'
  | 'identity'
  | 'before'
  | 'faceid'
  | 'bank'
  | 'position'
  | 'amount'
  | 'review'
  | 'submitted'
  | 'recurring'
  | 'strategy'
  | 'article'
  | 'liquidity'
  | 'repurchase'
  | 'documents'
  | 'fees'
  | 'team'
  | 'activity'
  | 'disclosures';

export type TabScreen = 'home' | 'holdings' | 'updates' | 'account';

export const tabHref = (tab: TabScreen): Href => (tab === 'home' ? '/' : (`/${tab}` as Href));

export function useNav() {
  const router = useRouter();
  return useMemo(
    () => ({
      to: (screen: StackScreen) => router.push(`/${screen}` as Href),
      toCompany: (id: string) => router.push(`/company/${id}` as Href),
      back: () => {
        if (router.canGoBack()) router.back();
        else router.replace('/');
      },
      tab: (tab: TabScreen) => router.navigate(tabHref(tab)),
      reset: (href: Href) => {
        if (router.canDismiss()) router.dismissAll();
        router.replace(href);
      },
    }),
    [router],
  );
}
