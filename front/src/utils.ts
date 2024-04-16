// Const given number of item per page for pagination
export const itemPerPage: number = 20;

// Calculate the total number of pages required to paginate the items based on the total number of items and items per page.
export const getPaginationFromTotal = (totalItem: number) => {
  return Math.ceil(totalItem / itemPerPage);
};
