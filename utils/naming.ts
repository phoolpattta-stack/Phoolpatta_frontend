export const formatUserName = (name?: string) => {
  if (!name) return "User";

  const trimmed = name.trim();
  if (!trimmed) return "User";

  const parts = trimmed.split(" ");

  // Capitalize first name
  const firstName =
    parts[0].charAt(0).toUpperCase() + parts[0].slice(1).toLowerCase();

  // Optional last initial
  if (parts.length > 1) {
    const lastInitial = parts[1].charAt(0).toUpperCase();
    return `${firstName} ${lastInitial}.`;
  }

  return firstName;
};
