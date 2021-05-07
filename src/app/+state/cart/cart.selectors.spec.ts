import { CartEntity } from "./cart.models";
import { State, cartAdapter, initialState } from "./cart.reducer";
import * as CartSelectors from "./cart.selectors";

describe("Cart Selectors", () => {
  const ERROR_MSG = "No Error Available";
  const getCartId = (it) => it["id"];
  const createCartEntity = (id: string, name = "") =>
    ({
      id,
      name: name || `name-${id}`,
    } as CartEntity);

  let state;

  beforeEach(() => {
    state = {
      cart: cartAdapter.setAll(
        [
          createCartEntity("PRODUCT-AAA"),
          createCartEntity("PRODUCT-BBB"),
          createCartEntity("PRODUCT-CCC"),
        ],
        {
          ...initialState,
          selectedId: "PRODUCT-BBB",
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe("Cart Selectors", () => {
    it("getAllCart() should return the list of Cart", () => {
      const results = CartSelectors.getAllCart(state);
      const selId = getCartId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe("PRODUCT-BBB");
    });

    it("getSelected() should return the selected Entity", () => {
      const result = CartSelectors.getSelected(state);
      const selId = getCartId(result);

      expect(selId).toBe("PRODUCT-BBB");
    });

    it("getCartLoaded() should return the current 'loaded' status", () => {
      const result = CartSelectors.getCartLoaded(state);

      expect(result).toBe(true);
    });

    it("getCartError() should return the current 'error' state", () => {
      const result = CartSelectors.getCartError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
