const typeMap = {
  image: "object",
  file: "object",

  checkbox: "boolean",
  toggle: "boolean",

  repeater: "array",

  number: "number",
  postTypeEntr: "number",
  range: "number",

  // rest will default to string
};

export function getTypeByInputControl(inputControl) {
  return typeMap[inputControl] || "string";
}

export function getDefaultValueByInputControl(inputControl) {
  const type = typeMap[inputControl] || "string";

  const typeToDefaultMap = {
    string: "''",
    object: "[]",
    array: "[]",
    boolean: "false",
  };

  return typeToDefaultMap[type];
}
