const sorter = (object) => object.sort((a, b) => (a.score > b.score ? -1 : 1));

export default sorter;