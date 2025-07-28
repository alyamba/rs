import { describe, expect, it } from 'vitest';
import { getAllPokeData, getPokeData } from '../pokeAPI';

const mockResponseData = {
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  id: 1,
  is_default: true,
  types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
};

const mockFormattedResponseData = {
  name: 'bulbasaur',
  data: {
    height: 7,
    weight: 69,
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    isDefault: true,
    types: ['grass', 'poison'],
  },
  id: 1,
};

const mockPokemonList = {
  count: 100,
  results: Array.from({ length: 24 }, (_, index) => ({
    name: `pokemon${index + 1}`,
    url: `https://pokeapi.co/api/v2/pokemon/${index + 1}`,
  })),
};

describe('PokeAPI getAllPokeData', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('GetAllPokeData fetches 24 pokemons success', async () => {
    const mockResolvedList = {
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockPokemonList),
    };
    const mockResolvedValue = {
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockResponseData),
    };

    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValueOnce(mockResolvedList)
        .mockResolvedValue(mockResolvedValue)
    );

    const result = await getAllPokeData(1);

    expect(fetch).toHaveBeenCalledTimes(1 + 24);
    expect(result.data).toHaveLength(24);
    expect(result.data[0].name).toBe('bulbasaur');
  });

  it('GetAllPokeData fetches 24 pokemons fails', async () => {
    const failResponse = {
      ok: false,
      status: 500,
      json: () => Promise.resolve({}),
    };

    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(failResponse)
      .mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockResponseData),
      });

    vi.stubGlobal('fetch', fetchMock);

    await expect(getAllPokeData(1)).rejects.toThrow(
      'Request failed with status 500'
    );

    expect(fetch).toHaveBeenCalled();
  });
});

describe('PokeAPI getPokeData', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('GetPokeData fetches pokemon success', async () => {
    const mockResolvedValue = {
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockResponseData),
    };

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(mockResolvedValue));

    const result = await getPokeData('bulbasaur');

    expect(fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/bulbasaur'
    );
    expect(result.data).toEqual([mockFormattedResponseData]);
  });

  it('GetPokeData fetches pokemon fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, status: 404 })
    );

    await expect(getPokeData('unknown')).rejects.toThrow(
      'Request failed with status 404'
    );
  });
});
