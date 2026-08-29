import { getCountries } from 'react-phone-number-input';
import en from 'react-phone-number-input/locale/en.json';
import worldCountries from 'world-countries';

const worldByCode = Object.fromEntries(worldCountries.map((country) => [country.cca2, country]));

const getNativeCountryName = (code: string): string => {
  const country = worldByCode[code];
  const nativeEntry = country?.name.native && Object.values(country.name.native)[0];

  return nativeEntry?.common ?? country?.name.common ?? (en[code as keyof typeof en] as string) ?? code;
};

export const nativePhoneLabels: Record<string, string> = {
  ext: en.ext,
  country: 'País del teléfono',
  phone: 'Teléfono',
};

for (const code of getCountries()) {
  nativePhoneLabels[code] = getNativeCountryName(code);
}
