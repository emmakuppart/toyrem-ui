import { TestBed, async } from "@angular/core/testing";

import { Observable } from "rxjs";

import { provideMockActions } from "@ngrx/effects/testing";
import { provideMockStore } from "@ngrx/store/testing";

import { NxModule, DataPersistence } from "@nrwl/angular";
import { hot } from "@nrwl/angular/testing";

import { CartEffects } from "./cart.effects";
import * as CartActions from "./cart.actions";

describe("CartEffects", () => {
  let actions: Observable<any>;
  let effects: CartEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        CartEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(CartEffects);
  });

  describe("init$", () => {
    it("should work", () => {
      actions = hot("-a-|", { a: CartActions.init() });

      const expected = hot("-a-|", {
        a: CartActions.loadCartSuccess({ cart: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
