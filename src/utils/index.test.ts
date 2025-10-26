import { describe, it , expect, vi } from "vitest";
import { loopPages } from "@/utils";

describe("loopPages()", () => {
  it("loops correctly", async () => {
    const callback = vi.fn()
      .mockResolvedValueOnce({
        resultItems: [0,1],
      })
      .mockResolvedValueOnce({
        resultItems: [2],
      })
      .mockResolvedValue({
        resultItems: [],
      });
    const resultItems = await loopPages(callback, 2);
    expect(resultItems).toEqual([0,1,2]);
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenNthCalledWith(1, { per_page: 2, page: 1 });
    expect(callback).toHaveBeenNthCalledWith(2, { per_page: 2, page: 2 });
  });
  it("default pageSize is 10", async () => {
    const callback = vi.fn()
      .mockResolvedValueOnce({
        resultItems: [0,1,2,3,4,5,6,7,8,9],
      })
      .mockResolvedValueOnce({
        resultItems: [10,11,12,13,14,15,16,17,18],
      })
      .mockResolvedValue({
        resultItems: [],
      });
    const resultItems = await loopPages(callback);
    expect(resultItems).toEqual([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]);
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenNthCalledWith(1, { per_page: 10, page: 1 });
    expect(callback).toHaveBeenNthCalledWith(2, { per_page: 10, page: 2 });
  });
});
