import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models.ts/models';
import { ClubService } from './club.service';
import { TransactionService } from './transaction.service';
import { Router } from '@angular/router';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { Platform } from '@ionic/angular';
import { EventService } from './event.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  logged!: User | undefined
  storedPassword!: string
  constructor(
    private auth: AngularFireAuth,
    private fs: AngularFirestore,
    private clubS: ClubService,
    private transactionS: TransactionService,
    private router: Router,
    private platform: Platform,
    private eventS: EventService
  ) {
    this.getUserLogged()
   }

  logIn(email: string, password: string){
    return this.auth.signInWithEmailAndPassword(email, password).then(user => {
      this.fs.collection<User>("users").doc(user.user?.uid).get().forEach(res => {
        this.logged = res.data() 
        if(res.data()?.disable == true){
          alert("This account is Disabled. Please contact your Director")
          this.logOut()
        }else{
          if(res.data()?.role == "member"){
            this.router.navigate(['tabs/index'])
          }else if(res.data()?.role == "admin"){
            this.router.navigate(['admin-tabs/index'])
          }else{
            this.router.navigate(['directive-tabs/index'])
          }
        }
      })
    })
  }
  addUser(user: User, password: string, passwordLogged?: string){
    if(passwordLogged){
      return this.auth.createUserWithEmailAndPassword(user.email, password)
      .then(resU => {
        this.logIn(this.logged?.email || "", passwordLogged).then(() => {
          user.id = resU.user?.uid || "";
          this.fs.collection<User>("users").doc(user.id).set(user)
        })
      })
    }else {
      return this.auth.createUserWithEmailAndPassword(user.email, password)
      .then(resU => {
        user.id = resU.user?.uid || "";
        this.fs.collection<User>("users").doc(user.id).set(user)
      })
    }
  }
  updateUser(user: User){
    return this.fs.collection<User>("users").doc(user.id).update(user)
  }
  updateUserToken(token: string){
    return this.fs.collection<User>("users").doc(this.logged?.id).update({fcmToken: token})
  }
  getUserLogged(){
    this.auth.authState.subscribe(user => {
      if(user){
        this.fs.collection<User>("users").doc(user.uid).get().forEach(res => {
          this.logged = res.data()
          console.log(this.logged);
          
        }).then(() => {
          //Establecer las notificaciones a este usuario con este dispositivo
          this.setUpNotifications()
          this.eventS.getEvents(this.logged?.idClub || "")
          //Esto si el usuario es el admin de un club. Asi tienes la info y no debes esperar
          if(this.logged?.role == "sub-director" || this.logged?.role =="director" || this.logged?.role == "secretary" || this.logged?.role == "treasurer"){
            this.clubS.getClubInfo(this.logged.idClub).then(() => {
              this.clubS.getTopUsersByBalance(this.logged?.idClub || "")
            }).then(() => {
              this.transactionS.getTransactionsPerUser(this.clubS.club?.id || "")
              this.clubS.getMembers(this.clubS.club?.id || "").forEach(res => {
                for(let member of res.docs){
                  this.clubS.members.push(member.data())
                }
              })
              this.clubS.getTransactionsByClub(this.clubS.club?.id || "")
            })
          }
          else{
            //Esto si el usuario es un simple miembro de club
            this.transactionS.getTransactionsPerUser(this.logged?.id || "")
          }
        })
      }
    })
  }

  logOut(){
    return this.auth.signOut().then(() => {
      this.logged = undefined
    })
  }

  setUpNotifications(){
    if(this.platform.is("capacitor")){
      PushNotifications.requestPermissions().then(result => {
        if (result.receive === 'granted') {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();
        } else {
          // Show some error
        }
      });
  
      PushNotifications.addListener('registration', (token: Token) => {
        if(token.value != this.logged?.fcmToken){
          this.updateUserToken(token.value)
        }
      });
  
      PushNotifications.addListener('registrationError', (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      });
  
      PushNotifications.addListener(
        'pushNotificationReceived',
        (notification: PushNotificationSchema) => {
          
        },
      );
  
      PushNotifications.addListener(
        'pushNotificationActionPerformed',
        (notification: ActionPerformed) => {
          alert('Push action performed: ' + JSON.stringify(notification));
        },
      );
    }
   
  }
  
}
