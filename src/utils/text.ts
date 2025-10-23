export const getInitials = (fullName: string | null = "") => {
  if (!fullName) return "";

  const [first, last] = fullName.split(" ");
  let initials = "";
  if (first) {
    initials += first[0];
  }
  if (last) {
    initials += last[0];
  }
  return initials.toUpperCase();
};
