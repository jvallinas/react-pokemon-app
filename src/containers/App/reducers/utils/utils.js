
/** UTILS FOR REDUCER */

export const parseTypes = (typesPayload) => {
  const types = {};
  typesPayload.map((item) => item.type.name).forEach((type, index) => {
    types[`type${index + 1}`] = type;
  });

  return types;
};

export const parseAbilities = (abilities) => abilities.map((abInfo) => abInfo.ability.name);

export const parseStats = (statsPayload) => {
  const stats = {};
  statsPayload.forEach((item) => {
    switch (item.stat.name) {
      case 'attack':
      case 'defense':
      case 'speed':
      case 'special-attack':
      case 'special-defense':
        stats[item.stat.name] = item.base_stat;
        break;
      default:
        break;
    }
  });
  return stats;
};

export const parseImages = (sprites) => ({ image: sprites.front_default });

export const parseDescription = (payload) => {
  const englishDesc = payload.flavor_text_entries.filter((entry) => entry.language.name === 'en')[0];
  return {
    description: englishDesc.flavor_text,
  };
};

export const removeDuplicates = (list, id) => {
  if (list.length === 0) return list;
  return list.filter((item, index, self) => self.findIndex((i) => i[id] === item[id]) === index);
};

export const retrieveIdFromUrl = (url) => {
  const parsedId = parseInt(url.replace('https://pokeapi.co/api/v2/pokemon/', ''), 10);
  return parsedId;
};
