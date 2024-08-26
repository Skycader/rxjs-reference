import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CombinationPipesComponent } from './components/combination-pipes/combination-pipes.component';
import { StreamPipesComponent } from './components/stream-pipes/stream-pipes.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'stream-pipes',
    component: StreamPipesComponent,
  },
  {
    path: 'combination-pipes',
    component: CombinationPipesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
