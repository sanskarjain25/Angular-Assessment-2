import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class User {
  email: string;
  password: string;
  role: 'Manager' | 'Clerk';

  constructor(email: string, password: string, role: 'Manager' | 'Clerk') {
    this.email = email;
    this.password = password;
    this.role = role;
  }
}

export class AuthService {
  private registeredUsers: User[] = [
    new User('manager@email.com', '123456', 'Manager'),
    new User('clerk@email.com', '123456', 'Clerk'),
  ];
  user = new BehaviorSubject<User>(null);

  constructor() {}

  login(email: string, password: string) {
    const user = this.registeredUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (!user) {
      return 'Invalid email or password';
    }

    this.user.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  autoLogin() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      return;
    }
    this.user.next(user);
  }

  signup(email: string, password: string, role: 'Manager' | 'Clerk') {
    const user = new User(email, password, role);
    this.registeredUsers.push(user);
    this.user.next(user);
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('user');
  }
}
