import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, retry, interval, take, map,filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit,OnDestroy {

  intervalSubs!:Subscription;

  constructor() { 
    
   /* this.retornaObservable().pipe(
      retry(1)
    ).subscribe(
      valor=>console.log('subs',valor),
      error=>console.warn('Error:',error),
      ()=>console.info('obs terminado')
    );*/
    this.intervalSubs = this.retornaIntervalo()
      .subscribe((valor)=>console.log(valor))
  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }


  retornaIntervalo():Observable<number>{
    const interval$=interval(500).pipe(
      
      map(valor=>{return valor+1}),
      filter(valor=>(valor%2===0)?true:false),
      //take(10)
    );
    return interval$;
  }

  retornaObservable():Observable<number>{
    let i =-1;
    const obs$ = new Observable<number>(observer=>{
     
      const intervalo= setInterval(()=>{
        i++;
        observer.next(i);
        if (i===4){
          clearInterval(intervalo);
          observer.complete();
        }
        if (i===2){
          observer.error("i == 2")
        }
      },1000)
    })
    return obs$;
  }

  ngOnInit(): void {
  }

}
