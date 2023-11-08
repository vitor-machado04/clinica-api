import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NavbarComponent } from './app/components/navbar/navbar.component';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
