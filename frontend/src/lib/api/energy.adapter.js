export function adaptCountryEnergy(apiRes) {
  return {
    country: apiRes.countryName,
    year: apiRes.year,
    value: apiRes.production, // o gwh / twh según energy type
    unit: apiRes.unit,
  };
}
