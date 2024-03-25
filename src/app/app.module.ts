import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { CurrentConditionsComponent } from './components/current-conditions/current-conditions.component';
import { TabComponent } from './components/tabs/tab/tab.component';
import { TabsContainerComponent } from './components/tabs/tabs-container/tabs-container.component';
import { ZipcodeEntryComponent } from './components/zipcode-entry/zipcode-entry.component';
import { TestAreaComponent } from './containers/test-area/test-area.component';
import { ForecastsListComponent } from './pages/forecasts-list/forecasts-list.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { LocationService } from './services/location.service';
import { WeatherService } from './services/weather.service';
import { WeatherEffects } from './store/effects/weather.effects';
import { weatherReducer } from './store/reducer/weather.reducer';

@NgModule({
  declarations: [
    AppComponent,
    ZipcodeEntryComponent,
    ForecastsListComponent,
    CurrentConditionsComponent,
    MainPageComponent,
    TabsContainerComponent,
    TabComponent,
    TestAreaComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    routing,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    StoreModule.forRoot({ weather: weatherReducer }),
    EffectsModule.forRoot([WeatherEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [LocationService, WeatherService],
  bootstrap: [AppComponent],
})
export class AppModule {}
