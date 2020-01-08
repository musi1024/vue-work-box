function destroyAll() {
  const destroyList = [];
  const add = (fn, el) => {
    destroyList.push({ fn, el });
  };
  const destroy = () =>
    destroyList.map(({ fn, el }) => {
      const exist = el.parentNode;
      exist && fn();
    });

  return {
    add,
    destroy
  };
}

export default destroyAll();
