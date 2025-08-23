export async function loopPages<T>(
  callback: (params: { per_page: number; page: number; }) => Promise<{ resultItems: T[]; }>,
  pageSize?: number,
) {
  const per_page = pageSize ?? 10;
  const temporaryArray: T[][] = [];
  let page = 1;
  while (true) {
    const { resultItems } = await callback({ per_page, page });
    temporaryArray.push(resultItems);
    if (resultItems.length < per_page) {
      break;
    }
    page++;
  }
  return temporaryArray.flat();
}
