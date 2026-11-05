// Sample content, copied verbatim from the Claude Design file "USVC iOS App.dc.html".
// Sample data only: nothing here is fetched, and nothing a user does is sent anywhere.

/** Remote logo URL used by the design (Google favicon service). */
export const logoFor = (domain: string) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

export type Holding = {
  id: string;
  monogram: string;
  name: string;
  weight: string;
  logo: string;
  domain?: string;
  description?: string;
};

export const holdings: Holding[] = [
  {
    id: 'supabase',
    monogram: 'S',
    name: 'Supabase',
    weight: '12.2%',
    logo: logoFor('supabase.com'),
    domain: 'supabase.com',
    description:
      'Providing open-source backend across database, authentication, and storage that lets developers build and scale applications faster.',
  },
  { id: 'mercury', monogram: 'M', name: 'Mercury', weight: '11.9%', logo: logoFor('mercury.com'), domain: 'mercury.com' },
  {
    id: 'mercor',
    monogram: 'Mr',
    name: 'Mercor',
    weight: '3.9%',
    logo: 'https://usvc.cdn.prismic.io/usvc/aj7gHVbRV8_Qf7QE_mercor-blue.svg',
  },
  { id: 'spacex', monogram: 'SX', name: 'SpaceX', weight: '3.7%', logo: logoFor('spacex.com'), domain: 'spacex.com' },
  {
    id: 'stealth',
    monogram: 'St',
    name: 'Stealth',
    weight: '2.7%',
    logo: 'https://usvc.cdn.prismic.io/usvc/Xtx1tSMBCni3L0HR_ConfidentialDesign.svg',
  },
  { id: 'anduril', monogram: 'A', name: 'Anduril', weight: '2.3%', logo: logoFor('anduril.com'), domain: 'anduril.com' },
  { id: 'ramp', monogram: 'R', name: 'Ramp', weight: '1.5%', logo: logoFor('ramp.com'), domain: 'ramp.com' },
  {
    id: 'recursive',
    monogram: 'Rc',
    name: 'Recursive',
    weight: '1.3%',
    logo: logoFor('recursive.com'),
    domain: 'recursive.com',
  },
  { id: 'zip', monogram: 'Z', name: 'Zip', weight: '1.3%', logo: logoFor('zip.com'), domain: 'zip.com' },
  { id: 'lassie', monogram: 'L', name: 'Lassie', weight: '0.6%', logo: logoFor('lassie.co'), domain: 'lassie.co' },
  { id: 'crusoe', monogram: 'C', name: 'Crusoe', weight: '0.6%', logo: logoFor('crusoe.ai'), domain: 'crusoe.ai' },
  {
    id: 'anthropic',
    monogram: 'An',
    name: 'Anthropic',
    weight: '0.6%',
    logo: logoFor('anthropic.com'),
    domain: 'anthropic.com',
  },
];

export const holdingById = (id: string) => holdings.find((h) => h.id === id);

export const HOLDINGS_AS_OF = 'Data as of July 30, 2026';
export const HOLDINGS_NOTE =
  "Percentages show USVC's economic exposure to each named company as a share of the fund's net assets. Cash is not listed, so weights may not sum to 100%.";

export const position = {
  value: 12482.12,
  change: 482.12,
  changePct: 4.02,
  invested: 12000,
  shares: '1,187.642',
  navPerShare: '$10.51',
  navAsOf: 'Sep 22, 2026',
};

export type ActivityItem = { title: string; date: string; value: string; status: string };

export const activity: ActivityItem[] = [
  ['Recurring investment', 'Sep 1, 2026', '$500.00'],
  ['Recurring investment', 'Aug 1, 2026', '$500.00'],
  ['Recurring investment', 'Jul 1, 2026', '$500.00'],
  ['Recurring investment', 'Jun 1, 2026', '$500.00'],
  ['Initial investment', 'May 12, 2026', '$10,000.00'],
].map(([title, date, value]) => ({ title, date, value, status: 'Shares issued' }));

export type Update = { kind: string; date: string; title: string; summary: string };

export const updates: Update[] = [
  {
    kind: 'Holdings',
    date: 'Jul 30, 2026',
    title: 'Holdings update: data as of July 30, 2026',
    summary: 'Supabase 12.2% and Mercury 11.9% lead the portfolio. 12 named holdings.',
  },
  {
    kind: 'Fees',
    date: 'Jul 28, 2026',
    title: 'Fee waiver runs through at least November 24, 2027',
    summary: 'Forecast net annual expenses 2.50%. 1% management fee. 0% carry.',
  },
  {
    kind: 'Team',
    date: 'Jun 2026',
    title: 'Meet the Investment Committee',
    summary: 'Jordan Hale, General Partner. Priya Raman, Chair. Fictional names in this concept.',
  },
  {
    kind: 'Reporting',
    date: 'May 2026',
    title: 'One 1099. No K-1.',
    summary: 'Most private market investments issue K-1s. USVC issues a single 1099.',
  },
];

/** Screens reachable from Account rows (prototype mapping kept as designed). */
export type AccountTarget =
  | 'bank'
  | 'recurring'
  | 'activity'
  | 'documents'
  | 'fees'
  | 'team'
  | 'faceid'
  | 'liquidity'
  | 'disclosures'
  | 'article';

export type AccountRow = { label: string; value: string; to: AccountTarget };

export const accountGroups: { title: string; rows: AccountRow[] }[] = [
  {
    title: 'Investing',
    rows: [
      { label: 'Linked bank', value: 'Checking ••0921', to: 'bank' },
      { label: 'Recurring', value: '$500.00 monthly', to: 'recurring' },
      { label: 'Activity', value: '', to: 'activity' },
    ],
  },
  {
    title: 'Fund',
    rows: [
      { label: 'Documents', value: '', to: 'documents' },
      { label: 'Fees', value: '2.50% net', to: 'fees' },
      { label: 'Team', value: '', to: 'team' },
    ],
  },
  {
    title: 'Settings',
    rows: [
      { label: 'Security', value: 'Face ID on', to: 'faceid' },
      { label: 'Notifications', value: '', to: 'liquidity' },
      { label: 'Disclosures', value: '', to: 'disclosures' },
      { label: 'Contact', value: '', to: 'article' },
    ],
  },
];

export const statements = ['Aug 2026', 'Jul 2026', 'Jun 2026', 'May 2026'];

export const feeTable = [
  { label: 'Minimum investment', usvc: '$500', traditional: '$100,000+' },
  { label: 'Performance fee (carry)', usvc: '0%', traditional: '20%+' },
  { label: 'Management fee', usvc: '1%', traditional: '2%' },
];

export const feeBreakdown = [
  { label: 'Management fee', value: '1.00%' },
  { label: 'Carried interest', value: '0.00%' },
  { label: 'Sales load (direct)', value: '0.00%' },
  { label: 'Estimated gross annual expenses', value: '4.55%' },
  { label: 'USVC reductions and reimbursements', value: '-2.05%' },
];

// Fictional people. The real team is not named in this unofficial concept.
export const team = [
  { initials: 'JH', name: 'Jordan Hale', role: 'General Partner and Portfolio Manager' },
  { initials: 'PR', name: 'Priya Raman', role: 'Chair, Investment Committee' },
  { initials: 'MW', name: 'Marcus Webb', role: 'Founding Trustee' },
  { initials: 'EO', name: 'Elena Ortiz', role: 'Strategic Advisor' },
  { initials: 'SO', name: 'Sam Okafor', role: 'Strategic Advisor' },
  { initials: 'LP', name: 'Lena Park', role: 'Strategic Advisor' },
];

export const banks = [
  { monogram: 'C', name: 'Chase', logo: logoFor('chase.com') },
  { monogram: 'B', name: 'Bank of America', logo: logoFor('bankofamerica.com') },
  { monogram: 'W', name: 'Wells Fargo', logo: logoFor('wellsfargo.com') },
  { monogram: 'Ci', name: 'Citi', logo: logoFor('citi.com') },
  { monogram: 'CO', name: 'Capital One', logo: logoFor('capitalone.com') },
  { monogram: 'A', name: 'Ally', logo: logoFor('ally.com') },
];

export const linkedAccount = { monogram: 'C', label: 'Checking ••0921', bank: 'Chase', logo: logoFor('chase.com') };

export const investor = { initials: 'AR', name: 'Alex Rivera', since: 'Investor since May 2026' };

export const RISK_SHORT =
  'An investment in the Fund involves material risks and should be considered speculative. Shares are not listed on any exchange, have no public trading market, and are illiquid. Past performance does not guarantee future results.';

export const disclosures = [
  "Investors should carefully consider the investment objectives, risks, sales charges, and expenses of USVC before investing. USVC's prospectus contains this and other information. Read the prospectus carefully before investing.",
  "An investment in the Fund involves material risks and should be considered speculative. There can be no assurance that the Fund will achieve its investment objective, that investors will receive distributions, or that investors will not lose all or a substantial portion of their investment. Shares are not listed on any exchange, have no public trading market, and are illiquid. Liquidity is limited to periodic repurchase offers made at the discretion of the Board, which are not guaranteed. You should not expect to be able to sell your shares other than through the Fund's repurchase policy, regardless of the Fund's performance. This investment is suitable only for long-term investors who can bear the risks of limited liquidity. Past performance does not guarantee future results. Fees and expenses may reduce returns.",
  "The Fund is recently formed, has limited operating history, and has limited financial information available for evaluation. The investment adviser has no prior experience managing a closed-end, registered investment company. The Fund's portfolio may be concentrated in a limited number of investments or sectors, which may increase the risk of loss from adverse developments affecting a particular company, industry, or market segment. The Fund's performance may be closely tied to technology issuers and therefore sensitive to factors impacting that sector.",
  "The Fund primarily invests in private funds and private companies that are not publicly traded. As a result, the fair value of the Fund's investments is uncertain and may be difficult to determine. Valuations are often based on good-faith fair value determinations that are subjective and may rely on limited or incomplete information; actual values realized may differ, potentially materially. These investments are highly illiquid and generally subject to legal and contractual transfer restrictions.",
  'Realization events may not occur for years, if at all, resulting in extended holding periods. The Fund may be unable to sell investments when deemed necessary, and if required to liquidate quickly, may realize significantly less than previously recorded values. Investments in private funds involve indirect fees and expenses, limited operating histories and financial resources, limited transparency and information, and high volatility, each of which may increase the risk of loss.',
  "This communication is for informational purposes only, is not a recommendation or investment advice, and does not constitute an offer to buy, sell, or hold any security or to enter into any transaction. Any such offers will be made only by USVC's prospectus, which should be reviewed carefully before investing.",
  'USVC Venture Capital Access Fund is distributed by North Capital Private Securities (NCPS), member FINRA/SIPC. NCPS is not affiliated with USVC’s adviser or its affiliates.',
  "The amount of any distributions is uncertain. Investors may be required to pay taxes on distributions regardless of whether they receive cash. General economic, market, and geopolitical conditions, including changes in interest rates, inflation, and capital market volatility, may adversely affect the Fund's investments, valuation, and returns.",
  'Any quote included on this website is provided for informational purposes only and is not a testimonial or endorsement of advisory services. Past experiences or statements are not indicative of future results and are not a guarantee of performance. Please refer to the prospectus for further information.',
];
