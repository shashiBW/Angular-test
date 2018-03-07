import { Component ,OnInit} from '@angular/core';
import { NavController,ToastController  } from 'ionic-angular';
import { FormControl, FormGroup, Validators ,FormBuilder} from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import {Observable} from 'rxjs/Rx';
import { RoutePage } from '../route/route';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AuthServiceProvider]

})
export class HomePage implements OnInit{
  credentialsForm : FormGroup;
  public data;
  public type = "password";
  public showPass = false;
 
  
  constructor(public navCtrl: NavController,
              private formBuilder: FormBuilder,
              private toastCtrl: ToastController,
              public authService: AuthServiceProvider,

  ) {

  }
  ngOnInit() {
    const PURE_EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const PASSWORD_REGEXP = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
   const regexValidators = {
      email: PURE_EMAIL_REGEXP,
      password: PASSWORD_REGEXP
    };

		this.credentialsForm  = this.formBuilder.group({
      // email: ['', Validators.required],
      // password: ['', Validators.required]
      email: [
        '', Validators.compose([
          Validators.pattern(regexValidators.email),
          Validators.required
        ])
      ],
      password: [
        '', Validators.compose([
          Validators.pattern(regexValidators.password),
          Validators.required
        ])
      ],
    });

  }
  ionViewDidLoad(){
    /////Creating httpclient call shown in providers /////////
    this.authService.getData().subscribe(
            data => { 
              this.data = data;
            },
            err => console.error(err),
            () => console.log('done loading data')
          )
  }
  onSignIn(){
    console.log(this.data);
    console.log(this.data.email);
    if(this.data.email == this.credentialsForm.controls['email'].value && this.data.password == this.credentialsForm.controls['password'].value){
      this.navCtrl.push(RoutePage);
    }else{
      let toast = this.toastCtrl.create({
        message: "invalid username or password, please check data given by api",
        duration: 3000,
        position: 'top'
      });
    
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
    
      toast.present();
    }
  }
  showPassword() {
    this.showPass = !this.showPass;
 
    if(this.showPass){
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }


}
