import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamPipesComponent } from './stream-pipes.component';

describe('StreamPipesComponent', () => {
  let component: StreamPipesComponent;
  let fixture: ComponentFixture<StreamPipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StreamPipesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StreamPipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
