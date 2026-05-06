import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import Logo from '@components/Logo';

const STEPS = [
  {
    id: 'intent',
    question: "What are you looking to do?",
    subtitle: "We'll tailor your experience based on your goal.",
    type: 'single',
    options: [
      { value: 'buy', label: 'Buy a home', icon: '🏡', desc: 'Find your forever home or investment property' },
      { value: 'rent', label: 'Rent a home', icon: '🔑', desc: 'Find a place to call home, short or long term' },
    ],
  },
  {
    id: 'household',
    question: "Who will be living there?",
    subtitle: "This helps us suggest the right size and type of home.",
    type: 'single',
    options: [
      { value: 'solo', label: 'Just me', icon: '🧍', desc: 'Looking for my own space' },
      { value: 'couple', label: 'Couple', icon: '👫', desc: 'Two of us moving together' },
      { value: 'family', label: 'Family with children', icon: '👨‍👩‍👧‍👦', desc: 'We need space for the whole family' },
      { value: 'shared', label: 'Sharing with others', icon: '🏠', desc: 'Moving in with friends or housemates' },
    ],
  },
  {
    id: 'bedrooms',
    question: "How many bedrooms do you need?",
    subtitle: "Choose the minimum number that works for you.",
    type: 'single',
    options: [
      { value: 1, label: '1 bedroom', icon: '🛏️', desc: 'Studio or one bed' },
      { value: 2, label: '2 bedrooms', icon: '🛏️', desc: 'A little more space' },
      { value: 3, label: '3 bedrooms', icon: '🛏️', desc: 'Room to grow' },
      { value: 4, label: '4 bedrooms', icon: '🛏️', desc: 'Plenty of space' },
      { value: 5, label: '5+ bedrooms', icon: '🛏️', desc: 'A larger home' },
    ],
  },
  {
    id: 'budget',
    question: "What's your budget?",
    subtitle: "Set a rough range — you can always adjust later.",
    type: 'budget',
  },
  {
    id: 'priorities',
    question: "What matters most to you?",
    subtitle: "Pick everything that's important. We'll use this to surface the best matches.",
    type: 'multi',
    options: [
      { value: 'schools', label: 'Good schools nearby', icon: '🎓' },
      { value: 'transport', label: 'Transport links', icon: '🚆' },
      { value: 'garden', label: 'Garden or outdoor space', icon: '🌳' },
      { value: 'parking', label: 'Parking', icon: '🚗' },
      { value: 'quiet', label: 'Quiet neighbourhood', icon: '🤫' },
      { value: 'amenities', label: 'Close to shops & amenities', icon: '🛒' },
      { value: 'pets', label: 'Pet friendly', icon: '🐾' },
      { value: 'new_build', label: 'New build', icon: '🏗️' },
      { value: 'period', label: 'Period / character home', icon: '🏛️' },
      { value: 'home_office', label: 'Home office space', icon: '💼' },
    ],
  },
  {
    id: 'timeline',
    question: "When are you looking to move?",
    subtitle: "Knowing your timeline helps us prioritise what to show you.",
    type: 'single',
    options: [
      { value: 'asap', label: 'As soon as possible', icon: '⚡', desc: 'Ready to move now' },
      { value: '3months', label: 'Within 3 months', icon: '📅', desc: 'Planning ahead' },
      { value: '6months', label: '3–6 months', icon: '🗓️', desc: 'No huge rush' },
      { value: 'exploring', label: 'Just exploring', icon: '👀', desc: 'Seeing what\'s out there' },
    ],
  },
];

const BUY_BUDGET_OPTIONS = [
  { label: 'Up to £150k', min: 0, max: 150000 },
  { label: '£150k – £250k', min: 150000, max: 250000 },
  { label: '£250k – £400k', min: 250000, max: 400000 },
  { label: '£400k – £600k', min: 400000, max: 600000 },
  { label: '£600k – £1m', min: 600000, max: 1000000 },
  { label: 'Over £1m', min: 1000000, max: null },
];

const RENT_BUDGET_OPTIONS = [
  { label: 'Up to £700 pcm', min: 0, max: 700 },
  { label: '£700 – £1,000 pcm', min: 700, max: 1000 },
  { label: '£1,000 – £1,500 pcm', min: 1000, max: 1500 },
  { label: '£1,500 – £2,000 pcm', min: 1500, max: 2000 },
  { label: '£2,000 – £3,000 pcm', min: 2000, max: 3000 },
  { label: 'Over £3,000 pcm', min: 3000, max: null },
];

function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="w-full bg-gray-100 rounded-full h-1.5 mb-8">
      <div
        className="bg-[#f13053] h-1.5 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function OptionTile({ option, selected, onClick, size = 'normal' }) {
  const isSmall = size === 'small';
  return (
    <button
      onClick={onClick}
      className={`
        group relative w-full text-left rounded-2xl border-2 transition-all duration-150
        ${isSmall ? 'p-3' : 'p-4 sm:p-5'}
        ${selected
          ? 'border-[#f13053] bg-[#fff5f7] shadow-md'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
        }
      `}
    >
      <div className={`flex items-center gap-3 ${isSmall ? '' : 'sm:gap-4'}`}>
        <span className={`${isSmall ? 'text-xl' : 'text-2xl sm:text-3xl'} flex-shrink-0`}>
          {option.icon}
        </span>
        <div className="flex-1 min-w-0">
          <div className={`font-semibold text-gray-900 ${isSmall ? 'text-sm' : 'text-base'}`}>
            {option.label}
          </div>
          {option.desc && !isSmall && (
            <div className="text-sm text-gray-500 mt-0.5">{option.desc}</div>
          )}
        </div>
        <div
          className={`
            flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all
            ${selected
              ? 'border-[#f13053] bg-[#f13053]'
              : 'border-gray-300 group-hover:border-gray-400'
            }
          `}
        >
          {selected && (
            <svg className="w-full h-full text-white p-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </div>
    </button>
  );
}

function BudgetStep({ intent, value, onChange }) {
  const options = intent === 'rent' ? RENT_BUDGET_OPTIONS : BUY_BUDGET_OPTIONS;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map((opt) => {
        const key = `${opt.min}-${opt.max}`;
        const selected = value && value.min === opt.min && value.max === opt.max;
        return (
          <button
            key={key}
            onClick={() => onChange({ min: opt.min, max: opt.max })}
            className={`
              p-4 rounded-2xl border-2 text-left font-semibold transition-all duration-150
              ${selected
                ? 'border-[#f13053] bg-[#fff5f7] text-[#f13053] shadow-md'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:shadow-sm'
              }
            `}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function LoginPrompt({ answers, onComplete }) {
  const { loginWithGoogle, loginWithEmail, signupWithEmail } = useAuth();
  const [mode, setMode] = useState('choose');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogle = async () => {
    try {
      setError('');
      setLoading(true);
      const result = await loginWithGoogle();
      await onComplete(result.user);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleEmail = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      const result = mode === 'login'
        ? await loginWithEmail(email, password)
        : await signupWithEmail(email, password);
      await onComplete(result.user);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (mode === 'choose') {
    return (
      <div className="space-y-4">
        <button
          onClick={handleGoogle}
          disabled={loading}
          className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-gray-300 rounded-xl bg-white text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </button>
        <div className="flex gap-3">
          <button
            onClick={() => setMode('signup')}
            className="flex-1 py-3 px-4 rounded-xl bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 transition-all"
          >
            Create account
          </button>
          <button
            onClick={() => setMode('login')}
            className="flex-1 py-3 px-4 rounded-xl border border-gray-300 text-gray-700 text-sm font-bold hover:bg-gray-50 transition-all"
          >
            Sign in
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleEmail} className="space-y-4">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-3 text-red-700 text-sm rounded-lg">
          {error}
        </div>
      )}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f13053] focus:border-[#f13053] text-sm"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f13053] focus:border-[#f13053] text-sm"
          placeholder="••••••••"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl bg-[#f13053] text-white font-bold text-sm hover:bg-[#c9203f] transition-all disabled:opacity-50"
      >
        {loading ? 'Saving...' : mode === 'login' ? 'Sign in & save profile' : 'Create account & save profile'}
      </button>
      <button
        type="button"
        onClick={() => setMode('choose')}
        className="w-full text-sm text-gray-500 hover:text-gray-700 transition-colors"
      >
        ← Back
      </button>
    </form>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [direction, setDirection] = useState('forward');
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [isReturning, setIsReturning] = useState(false);

  useEffect(() => {
    if (!user) {
      setLoadingProfile(false);
      return;
    }
    const fetchProfile = async () => {
      try {
        const snap = await getDoc(doc(db, 'users', user.uid));
        if (snap.exists()) {
          const prefs = snap.data().preferences;
          if (prefs) {
            // Strip Firestore-only fields before seeding state
            const { completedAt, ...rest } = prefs;
            setAnswers(rest);
            setIsReturning(true);
          }
        }
      } catch {
        // Non-fatal — just start fresh
      } finally {
        setLoadingProfile(false);
      }
    };
    fetchProfile();
  }, [user]);

  const totalSteps = STEPS.length;
  const step = STEPS[stepIndex];

  const getValue = (id) => answers[id] ?? null;

  const isStepComplete = () => {
    if (step.type === 'single') return getValue(step.id) !== null;
    if (step.type === 'multi') return (getValue(step.id) ?? []).length > 0;
    if (step.type === 'budget') return getValue(step.id) !== null;
    return false;
  };

  const handleSingleSelect = (value) => {
    setAnswers((prev) => ({ ...prev, [step.id]: value }));
  };

  const handleMultiToggle = (value) => {
    setAnswers((prev) => {
      const current = prev[step.id] ?? [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [step.id]: next };
    });
  };

  const handleBudget = (value) => {
    setAnswers((prev) => ({ ...prev, budget: value }));
  };

  const goNext = () => {
    if (!isStepComplete()) return;
    if (stepIndex < totalSteps - 1) {
      setDirection('forward');
      setStepIndex((i) => i + 1);
    } else {
      handleFinish();
    }
  };

  const goBack = () => {
    if (stepIndex > 0) {
      setDirection('back');
      setStepIndex((i) => i - 1);
    }
  };

  const saveProfile = async (uid) => {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, {
      preferences: {
        ...answers,
        completedAt: serverTimestamp(),
      },
      onboardingComplete: true,
    }, { merge: true });
  };

  const handleFinish = async () => {
    if (user) {
      setSaving(true);
      try {
        await saveProfile(user.uid);
        const searchParams = buildSearchParams(answers);
        router.push(`/search?${searchParams}`);
      } catch {
        setSaving(false);
      }
    } else {
      setDone(true);
    }
  };

  const handleLoginComplete = async (firebaseUser) => {
    await saveProfile(firebaseUser.uid);
    const searchParams = buildSearchParams(answers);
    router.push(`/search?${searchParams}`);
  };

  const buildSearchParams = (ans) => {
    const params = new URLSearchParams();
    if (ans.intent) params.set('channel', ans.intent);
    if (ans.bedrooms) params.set('minBeds', ans.bedrooms);
    if (ans.budget?.max) params.set('maxPrice', ans.budget.max);
    if (ans.budget?.min) params.set('minPrice', ans.budget.min);
    return params.toString();
  };

  if (loadingProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <span className="text-sm font-medium">Loading your profile…</span>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Head>
          <title>My Home Profile | TwoDoors</title>
        </Head>
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <Logo size="text-3xl" />
              <div className="mt-6 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✅</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Save your Home Profile</h2>
              <p className="text-gray-500 mt-2">Create a free account to save your preferences and get personalised property matches.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
              <LoginPrompt answers={answers} onComplete={handleLoginComplete} />
              <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                <button
                  onClick={() => {
                    const searchParams = buildSearchParams(answers);
                    router.push(`/search?${searchParams}`);
                  }}
                  className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Skip for now, just browse
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Head>
        <title>My Home Profile | TwoDoors</title>
      </Head>

      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-xl">
          <div className="flex flex-col items-center text-center mb-8 gap-4">
            <Logo size="text-3xl" />
            <div className="inline-flex items-center gap-2 bg-white border border-gray-100 shadow-sm rounded-2xl px-5 py-2.5">
              <span className="text-lg">🏡</span>
              <span className="text-base font-bold text-gray-900">Home Profile</span>
            </div>
            <p className="text-sm text-gray-500 max-w-xs">
              {isReturning
                ? "Your saved answers are loaded below — update anything that's changed."
                : "Tell us about yourself so we can find homes that actually fit your life."}
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8">
            <ProgressBar current={stepIndex + 1} total={totalSteps} />

            <div className="mb-1 text-xs font-semibold text-gray-400 uppercase tracking-widest">
              Step {stepIndex + 1} of {totalSteps}
            </div>

            <div key={step.id} className="transition-all duration-200">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 mb-1 leading-tight">
                {step.question}
              </h2>
              <p className="text-gray-500 text-sm mb-6">{step.subtitle}</p>

              {step.type === 'single' && (
                <div className="space-y-3">
                  {step.options.map((opt) => (
                    <OptionTile
                      key={opt.value}
                      option={opt}
                      selected={getValue(step.id) === opt.value}
                      onClick={() => handleSingleSelect(opt.value)}
                    />
                  ))}
                </div>
              )}

              {step.type === 'multi' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {step.options.map((opt) => (
                    <OptionTile
                      key={opt.value}
                      option={opt}
                      selected={(getValue(step.id) ?? []).includes(opt.value)}
                      onClick={() => handleMultiToggle(opt.value)}
                      size="small"
                    />
                  ))}
                </div>
              )}

              {step.type === 'budget' && (
                <BudgetStep
                  intent={answers.intent}
                  value={getValue('budget')}
                  onChange={handleBudget}
                />
              )}
            </div>

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
              <button
                onClick={goBack}
                className={`
                  flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors
                  ${stepIndex === 0 ? 'invisible' : ''}
                `}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>

              <button
                onClick={goNext}
                disabled={!isStepComplete() || saving}
                className="
                  flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm
                  bg-[#f13053] text-white
                  hover:bg-[#c9203f]
                  disabled:opacity-40 disabled:cursor-not-allowed
                  transition-all duration-150
                  shadow-sm hover:shadow-md
                "
              >
                {saving
                  ? 'Saving...'
                  : stepIndex === totalSteps - 1
                    ? isReturning ? 'Save changes' : 'See my matches'
                    : 'Continue'
                }
                {!saving && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="text-center mt-4">
            <button
              onClick={() => router.push('/search')}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              Skip and browse all properties
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
