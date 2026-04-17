export const validateExternalData = ({ gender, age, nationality }) => {
  if (!gender.gender || gender.count === 0) {
    throw { status: 502, message: "Genderize returned an invalid response" };
  }

  if (!age.age) {
    throw { status: 502, message: "Agify returned an invalid response" };
  }

  if (!nationality.country || nationality.country.length === 0) {
    throw { status: 502, message: "Nationalize returned an invalid response" };
  }
};