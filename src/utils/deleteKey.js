export const deleteKey = (object, keyName) => {
    const result = Object.assign({}, object);
    delete result[keyName];
  
    return result;
  };