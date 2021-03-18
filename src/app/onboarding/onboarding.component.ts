import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css'],
})
export class OnboardingComponent implements OnInit {
  problem_obj: { [key: string]: string } = {
    1: 'Less than 2 weeks',
    2: '2 to 8 weeks',
    3: 'More than 8 weeks',
  };

  sleepData: any;
  userData: any;

  step = 1;

  problem_ngModel: string = '';
  problem_since: String = '';

  bhrs: any;
  bmins: any;

  sleepDuration: any;

  whrs: any;
  wmins: any;

  bedtime: any;

  wakeup: any;

  totalDuration: any;

  totalSleep: any;

  efficiency: Number = 1.0;

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnInit(): void {
    // this.router.queryParams.subscribe((data) => {
    //   if (data) {
    //     console.log(data);
    //     this.userData = data;
    //   }
    // });
    // var data = this.router.getCurrentNavigation().extras.state;
    //console.log(this.router.getCurrentNavigation().extras.state);
    this.userData = history.state.userData;
  }

  proceed(step: Number) {
    if (this.problem_ngModel == '') {
      this.openSnackBar('Please select an option', '');
    } else {
      switch (step) {
        case 1:
          this.problem_since = this.problem_obj[this.problem_ngModel];
          this.step = 2;
          break;
        case 2:
          this.bhrs = this.bedtime.split(':')[0];
          this.bmins = this.bedtime.split(':')[1];
          this.step = 3;
          break;
        case 3:
          this.whrs = this.wakeup.split(':')[0];
          this.wmins = this.wakeup.split(':')[1];
          if (this.whrs < this.bhrs) {
            this.openSnackBar(
              'Please enter a time greater than the bedtime',
              ''
            );
            this.step = 3;
          } else {
            let totalhrs = this.whrs - this.bhrs;
            let totalmins = this.wmins - this.bmins;
            this.totalDuration = totalhrs + totalmins / 60;
            this.step = 4;
          }
          break;
        case 4:
          console.log(this.sleepDuration);
          this.totalSleep = this.sleepDuration.split(':')[0][1];
          console.log(this.totalDuration, this.totalSleep);
          if (this.totalSleep > this.totalDuration) {
            this.openSnackBar('The value is higher, input a lower value', '');
          } else {
            this.efficiency = this.totalSleep / this.totalDuration;
            this.openSnackBar(
              'The efficiency of your sleep is ' + this.efficiency,
              ''
            );
            this.sleepData = {
              nickname: this.userData['nickname'],
              password: this.userData['password'],
              problem_since: this.problem_since,
              bedtime: this.bedtime,
              wakeup_time: this.wakeup,
              sleep_duration: this.totalSleep,
              id: Math.floor(Math.random() * 1000 + 1),
              efficiency: this.efficiency,
            };
          }
          this.http
            .post(
              'https://wysa-assessment-backend.herokuapp.com/api/onboarding',
              this.sleepData
            )
            .subscribe((res) => {
              console.log(res);
            });
      }
    }
  }
}
