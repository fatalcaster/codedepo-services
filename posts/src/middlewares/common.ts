export const validPrize = (prize: string) => {
  if (!prize || typeof prize !== "string") return false;
  const parsedPrize = parseFloat(prize);
  if (Number.isNaN(parsedPrize) || parsedPrize < 0.2) return false;
  return true;
};
export const validTitle = (title: string) => {
  if (!title || typeof title !== "string") return false;
  if (title.length < 10) return false;
  return true;
};
export const validBody = (body: string) => {
  if (!body || typeof body !== "string") return false;
  if (body.length < 15) return false;
  return true;
};
