
import { vi } from 'vitest';

vi.mock('./firebase', () => ({
  auth: {
    onAuthStateChanged: (callback) => {
      callback(null);
      return () => {};
    },
  },
}));
