import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAuthenticatedUser } from './auth/state/auth.selectors';
import { AuthenticatedUser } from './models/authenticated-user.model';
import { getErrorMessages, getLoadingSpinnerState } from './shared/store/shared.selectors';
import { AppState } from './state/app.state';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  
  spinner$: Observable<boolean>;
  errorMessages$: Observable<string[]>;
  authenticatedUser$: Observable<AuthenticatedUser>;

  public driverPages = [
    { title: 'الصفحة الرئيسية', url: '/folder/Spam', icon: 'home' },
    { title: 'الحجوزات', url: '/folder/Outbox', icon: 'bookmarks' },
    { title: 'الرحلات', url: '/folder/Outbox', icon: 'bookmarks' },
    { title: 'الرسائل', url: '/folder/Outbox', icon: 'chatbubbles' },
    { title: 'اضف رحلة', url: '/folder/Favorites', icon: 'add-circle' },
    { title: 'محفظتي', url: '/folder/Archived', icon: 'wallet' },
    { title: 'تفضيلاتي', url: '/captain/favorite', icon: 'heart' },
    { title: 'سيارتي', url: '/folder/Spam', icon: 'car' },
    { title: 'الملف الشخصي', url: '/folder/Spam', icon: 'folder' },
    { title: 'العضوية و التقييم', url: '/folder/Spam', icon: 'star' },
    { title: 'الاعدادات', url: '/settings', icon: 'settings' },
    { title: 'تسجيل خروج', url: '/folder/Spam', icon: 'exit' },
  ];

  public passengerPages = [
    { title: 'الصفحة الرئيسية', url: '/folder/Spam', icon: 'home' },
    { title: 'الحجوزات', url: '/folder/Outbox', icon: 'bookmarks' },
    { title: 'الرسائل', url: '/folder/Outbox', icon: 'chatbubbles' },
    { title: 'محفظتي', url: '/folder/Archived', icon: 'wallet' },
    { title: 'الملف الشخصي', url: '/folder/Spam', icon: 'folder' },
    { title: 'العضوية و التقييم', url: '/folder/Spam', icon: 'star' },
    { title: 'طرق الدفع', url: '/folder/Spam', icon: 'card' },
    { title: 'تسجيل خروج', url: '/folder/Spam', icon: 'exit' },
  ];

  public authenticationPages = [
    { title: 'تسجيل مستخدم جديد', url: '/auth/register', icon: 'person-add' },
    { title: ' تسجيل دخول', url: '/auth/login', icon: 'log-in' },
  ];

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(){
    this.authenticatedUser$ = this.store.select(getAuthenticatedUser);
    this.spinner$ = this.store.select(getLoadingSpinnerState)
    this.errorMessages$ = this.store.select(getErrorMessages)
  }
}
