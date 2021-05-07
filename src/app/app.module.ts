import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { ProductsComponent } from "./products/products.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { EffectsModule } from "@ngrx/effects";
import * as fromProducts from "./+state/products/products.reducer";
import { ProductsEffects } from "./+state/products/products.effects";
import { ProductsFacade } from "./+state/products/products.facade";
import * as fromCategories from "./+state/categories/categories.reducer";
import { CategoriesEffects } from "./+state/categories/categories.effects";
import { CategoriesFacade } from "./+state/categories/categories.facade";
import { CategoriesComponent } from "./categories/categories.component";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { ProductFilterComponent } from "./products/product-filter/product-filter.component";
import { ProductTableComponent } from "./products/product-table/product-table.component";
import { AppRoutingModule } from "./app-routing.module";
import { OverviewComponent } from "./overview/overview.component";
import { ProductComponent } from "./product/product.component";
import { CartComponent } from "./cart/cart.component";
import * as fromCart from "./+state/cart/cart.reducer";
import { CartEffects } from "./+state/cart/cart.effects";
import { CartFacade } from "./+state/cart/cart.facade";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CategoriesComponent,
    HeaderComponent,
    FooterComponent,
    ProductFilterComponent,
    ProductTableComponent,
    OverviewComponent,
    ProductComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    TranslateModule.forRoot({
      defaultLanguage: "et",
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreModule.forFeature(
      fromProducts.PRODUCTS_FEATURE_KEY,
      fromProducts.reducer
    ),
    EffectsModule.forFeature([ProductsEffects]),
    StoreModule.forFeature(
      fromCategories.CATEGORIES_FEATURE_KEY,
      fromCategories.reducer
    ),
    EffectsModule.forFeature([CategoriesEffects]),
    StoreModule.forFeature(fromCart.CART_FEATURE_KEY, fromCart.reducer),
    EffectsModule.forFeature([CartEffects]),
  ],
  providers: [ProductsFacade, CategoriesFacade, CartFacade],
  bootstrap: [AppComponent],
})
export class AppModule {}
