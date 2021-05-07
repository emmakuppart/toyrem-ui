import { CartEntity } from "./cart.models";
import * as CartActions from "./cart.actions";
import { State, initialState, reducer } from "./cart.reducer";

describe("Cart Reducer", () => {
  const createCartEntity = (id: string, name = "") =>
    ({
      id,
      name: name || `name-${id}`,
    } as CartEntity);

  beforeEach(() => {});

  describe("valid Cart actions", () => {
    it("loadCartSuccess should return set the list of known Cart", () => {
      const cart = [
        createCartEntity("PRODUCT-AAA"),
        createCartEntity("PRODUCT-zzz"),
      ];
      const action = CartActions.loadCartSuccess({ cart });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe("unknown action", () => {
    it("should return the previous state", () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
