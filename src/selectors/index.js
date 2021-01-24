export const filteredHolidayHomes = (holidayHomes, filter) => (filter !== 'All' && filter !== 'CATEGORIES' ? (holidayHomes.filter(holidayHome => holidayHome.category === filter)) : holidayHomes);

export const findAndDeleteHolidayHome = (holidayHomes, id) => holidayHomes.filter(
  holidayHome => holidayHome.id !== id,
);

export const findAndUpdateHolidayHome = (holidayHomes, holidayHome) => {
  const index = holidayHomes.findIndex(hme => holidayHome.id === hme.id);
  return [...holidayHomes.slice(0, index), holidayHome, ...holidayHomes.slice(index + 1)];
};

export const setProperty = (holidayHomes, id, key) => {
  const index = holidayHomes.findIndex(holidayHome => holidayHome.id === id);
  if (index >= 0) {
    const holidayHome = holidayHomes[index];
    holidayHome[key] = true;
    return [...holidayHomes.slice(0, index), holidayHome, ...holidayHomes.slice(index + 1)];
  }
  return holidayHomes;
};

export const favourite = (favourites, id) => {
  const index = favourites.findIndex(favourite => id === favourite.holiday_home.id);
  if (index >= 0) {
    return favourites[index].id;
  }
  return null;
};
