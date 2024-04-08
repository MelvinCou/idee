import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useDestinationsStore } from '@/stores/destinationsStore';

describe('destinationsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    global.fetch = vi.fn();
  });

  it('fetches destinations successfully and updates state', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([
        { nom: "Paris", departement: { code: "75" } },
        { nom: "Lyon", departement: { code: "69" } },
      ]),
    });

    const store = useDestinationsStore();
    await store.fetchDestinations('Pa');

    expect(store.destinations).toEqual(["Paris (75)", "Lyon (69)"]);
  });

  it('handles fetch error', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 404,
    });

    const store = useDestinationsStore();
    await store.fetchDestinations('UnknownCity');

    expect(store.destinations).toHaveLength(0);
    expect(store.error).toBe('Failed to fetch destinations');
  });

  it('handles empty response', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([]),
    });

    const store = useDestinationsStore();
    await store.fetchDestinations('EmptyResponse');

    expect(store.destinations).toHaveLength(0);
    expect(store.error).toBeNull();
  });

  it('fetches and processes data with unexpected format', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([{ unexpectedKey: "UnexpectedValue" }]),
    });

    const store = useDestinationsStore();
    await store.fetchDestinations('UnexpectedFormat');

    // either by ignoring the data or by setting a default value
    expect(store.destinations).toHaveLength(0); // Or expect a default value if that's the intended behavior
  });
});
