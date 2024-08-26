import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinationPipesComponent } from './combination-pipes.component';

describe('CombinationPipesComponent', () => {
  let component: CombinationPipesComponent;
  let fixture: ComponentFixture<CombinationPipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CombinationPipesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CombinationPipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
