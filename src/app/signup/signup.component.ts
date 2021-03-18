import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  signup(nickname: String, password: String) {
    //console.log(nickname, password);
    var signupData = {
      nickname,
      password,
    };
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'No-Auth': 'True',
    });
    this.http
      .post(
        'https://wysa-assessment-backend.herokuapp.com/api/signup',
        signupData
      )
      .subscribe((res: any) => {
        if (res['status'] == 422) {
          this.openSnackBar(res['error'], '');
          //console.log(res['error']);
        } else {
          this.openSnackBar(res['message'], '');
          console.log(res['data']);
          this.router.navigate(['onboarding'], {
            state: {
              userData: res['data'],
            },
          });
        }
      });
  }
}
