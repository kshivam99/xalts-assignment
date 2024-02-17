import { useState } from "react";

export interface CoinPreferences {
  open: boolean;
  high: boolean;
  low: boolean;
  close: boolean;
}

const usePreferences = (): {
  preferences: Record<string, CoinPreferences>;
  savePreferences: (key: string, preferences: CoinPreferences) => void;
} => {
  const user = JSON.parse(localStorage.getItem("user")!);
  const email = user.email;
  const loadPreferences = (): Record<string, CoinPreferences> => {
    const storedPreferences = localStorage.getItem(
      `${email}_string_preferences`
    );
    if (storedPreferences) {
      return JSON.parse(storedPreferences);
    }
    // Default preferences
    return {
      bitcoin: {
        open: true,
        high: true,
        low: true,
        close: true,
      },
      ethereum: {
        open: true,
        high: true,
        low: true,
        close: true,
      },
      solana: {
        open: true,
        high: true,
        low: true,
        close: true,
      },
    };
  };

  const [preferences, setPreferences] = useState<
    Record<string, CoinPreferences>
  >(() => loadPreferences());

  const savePreferences = (key: string, newPreferences: CoinPreferences) => {
    const updatedPreferences = {
      ...preferences,
      [key]: newPreferences,
    };
    localStorage.setItem(
      `${email}_string_preferences`,
      JSON.stringify(updatedPreferences)
    );
    setPreferences(updatedPreferences);
  };

  return {
    preferences,
    savePreferences,
  };
};

export default usePreferences;
