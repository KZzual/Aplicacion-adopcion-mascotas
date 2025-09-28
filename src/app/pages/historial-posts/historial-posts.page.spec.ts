import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialPostsPage } from './historial-posts.page';

describe('HistorialPostsPage', () => {
  let component: HistorialPostsPage;
  let fixture: ComponentFixture<HistorialPostsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialPostsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
