import { describe, expect, it } from 'vitest';
import { getAllPokeData, getPokeData } from '../pokeAPI';

const mockResponseData = {
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  id: 1,
};

const mockFormattedResponseData = {
  name: 'bulbasaur',
  data: {
    height: 7,
    weight: 69,
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
  },
  id: 1,
};

describe('PokeAPI getAllPokeData', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('GetAllPokeData fetches 24 pokemons success', async () => {
    const mockResolvedValue = {
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockResponseData),
    };

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(mockResolvedValue));

    const result = await getAllPokeData();

    expect(fetch).toHaveBeenCalledTimes(24);
    expect(result).toHaveLength(24);
    expect(result[0]).toEqual(mockFormattedResponseData);
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

    await expect(getAllPokeData()).rejects.toThrow(
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
    expect(result).toEqual([mockFormattedResponseData]);
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
