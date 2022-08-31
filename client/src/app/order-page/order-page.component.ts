import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {NavigationEnd, Router} from '@angular/router'
import { Subscription } from 'rxjs'
import {IMaterialInstance, MaterialService} from '../shared/classes/material.service'
import {OrdersService} from '../shared/services/orders.service'
import { OrderService } from './order.service'

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.sass'],
  providers: [OrderService]
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('modal') modalRef!: ElementRef
  modal!: IMaterialInstance
  isRoot!: boolean
  pending = false

  oSub!: Subscription

  constructor(private router: Router,
              public order: OrderService,
              private ordersService: OrdersService) {
  }

  ngOnInit() {
    this.isRoot = this.router.url === '/order'
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order'
      }
    })
  }

  ngOnDestroy() {
    this.modal.destroy?.()
    if (this.oSub) {
      this.oSub.unsubscribe()
    }
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  openModal() {
    this.modal.open?.()
  }

  cancel() {
    this.modal.close?.()
  }

  submit() {
    this.pending = true
    const list = this.order.list.map(i => {
      delete i._id
      return i
    })
    this.oSub = this.ordersService.create({list}).subscribe({
      next: (order) => {
        this.order.clear?.()
        this.pending = false
        this.modal.close?.()
        MaterialService.toast(`Заказ №${order.order} добавлен`)
      },
      error: (err) => {
        MaterialService.toast(err.error.message)
        this.pending = false
      }
    })
  }
}
