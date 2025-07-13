type ResultsElement = {
  name: string;
  url: string;
};

export async function pokeAPI(searchQuery: string) {
  let url = '';

  if (searchQuery === '') {
    url = 'https://pokeapi.co/api/v2/pokemon?limit=5&offset=0';
  } else {
    const encodeSearchQuery = encodeURIComponent(searchQuery.toLowerCase());
    url = `https://pokeapi.co/api/v2/pokemon/${encodeSearchQuery}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = await response.json();

  if (Array.isArray(data.results)) {
    return data.results.map((element: ResultsElement) => ({
      name: element.name,
      description: `Url: ${element.url}`,
    }));
  }

  return [
    {
      name: data.name,
      description: `Url: ${data.species.url}`,
    },
  ];
}
