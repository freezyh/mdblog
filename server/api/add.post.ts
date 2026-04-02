export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { a, b } = body;
  return {
    result: Number(a) + Number(b),
  };
});
