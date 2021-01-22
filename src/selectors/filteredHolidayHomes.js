const filteredHolidayHomes = (holidayHomes, filter) => (filter !== 'All' && filter !== 'CATEGORIES' ? (holidayHomes.filter(holidayHome => holidayHome.category === filter)) : holidayHomes);

export default filteredHolidayHomes;