import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { TableComponent } from './app/table/table.component';

const bootstrap = () => bootstrapApplication(TableComponent, config);

export default bootstrap;
