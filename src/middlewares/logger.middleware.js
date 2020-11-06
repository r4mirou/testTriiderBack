export default async (resolve, root, args, context, info) => {
  console.log(`log enter: ${info.fieldName} `); // eslint-disable-line
  const result = await resolve(root, args, context, info);
  console.log(`log leave: ${info.fieldName} `); // eslint-disable-line
  return result;
};
