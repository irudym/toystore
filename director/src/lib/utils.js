export const toOptionsList = (array, toTitle = null) => {
  if (array) {
    return array.map(element => (
      {
        key: element.id,
        value: element.id,
        text: toTitle ? toTitle(element) : element.name,
      }
    ));
  }
  return [];
};

export const toOptionsListWithImages = (array, toTitle = null) => {
  if (array) {
    return array.map(element => (
      {
        key: element.id,
        value: element.id,
        text: toTitle ? toTitle(element) : element.name,
        image: { src: element.picture },
      }
    ));
  }
  return [];
};
