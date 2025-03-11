export const createSlug = string => string.toLowerCase().normalize("NFD").replace(/[\u0300-\u0336f]/g, "").split(' ').join('-')