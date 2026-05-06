// @descrition: Utility functions for parsing query parameters for fields selection, sorting, and pagination.

// @description: Parses the 'fields' query parameter to determine which fields to include in the response.
// It checks the requested fields against a list of allowed fields and returns an array of valid fields or undefined if none are valid.
const parseFields = (fields, allowedFields) => {
  if (!fields) return undefined;

  const requestedFields = fields.split(',').map((field) => field.trim());

  const selectedFields = requestedFields.filter((field) =>
    allowedFields.includes(field),
  );

  return selectedFields.length ? selectedFields : undefined;
};

// @description: Parses the 'sort' query parameter to determine the sorting order of the results.
// It checks the requested sort fields against a list of allowed sort fields and returns an array of sorting instructions or a default sorting if none are valid.
const parseSort = (
  sort,
  allowedSortFields,
  defaultSort = [['created_at', 'DESC']],
) => {
  if (!sort) return defaultSort;

  const sortFields = sort.split(',').map((field) => field.trim());

  const order = sortFields
    .map((field) => {
      const direction = field.startsWith('-') ? 'DESC' : 'ASC';
      const fieldName = field.startsWith('-') ? field.slice(1) : field;

      if (!allowedSortFields.includes(fieldName)) {
        return null;
      }

      return [fieldName, direction];
    })
    .filter(Boolean);

  return order.length ? order : defaultSort;
};

// @description: Parses the 'page' and 'limit' query parameters to determine pagination settings.
// It ensures that the page number is at least 1 and the limit is between 1 and 100, returning an object with the page, limit, and offset values.
const parsePagination = (pageQuery, limitQuery) => {
  const page = Math.max(parseInt(pageQuery, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(limitQuery, 10) || 20, 1), 100);
  const offset = (page - 1) * limit;

  return {
    page,
    limit,
    offset,
  };
};

export { parseFields, parseSort, parsePagination };
