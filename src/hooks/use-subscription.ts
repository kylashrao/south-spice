import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "south-spice:subscriber";
const EVENT_NAME = "south-spice:subscriber-changed";

type Subscriber = {
  email: string;
  subscribedAt: string;
};

function readStorage(): Subscriber | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.email === "string" && typeof parsed.subscribedAt === "string") {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

function writeStorage(value: Subscriber | null) {
  if (typeof window === "undefined") return;
  try {
    if (value) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  } catch {
    // ignore
  }
}

export function useSubscription() {
  const [subscriber, setSubscriber] = useState<Subscriber | null>(() => readStorage());

  useEffect(() => {
    function sync() {
      setSubscriber(readStorage());
    }
    window.addEventListener(EVENT_NAME, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT_NAME, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const subscribe = useCallback((email: string) => {
    const value: Subscriber = { email, subscribedAt: new Date().toISOString() };
    writeStorage(value);
    setSubscriber(value);
    return value;
  }, []);

  const unsubscribe = useCallback(() => {
    writeStorage(null);
    setSubscriber(null);
  }, []);

  return { subscriber, isSubscribed: !!subscriber, subscribe, unsubscribe };
}
