import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {PositionsService} from '../../../shared/services/positions.service'
import {Position, PositionId} from '../../../shared/interfaces'
import {IMaterialInstance, MaterialService} from '../../../shared/classes/material.service'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import { Observable, Subscription } from 'rxjs'

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.sass']
})
export class PositionsFormComponent implements OnInit {
@Input('categoryId') categoryId!: string
positions: Position[] = []
loading = false
  constructor(private positionsService: PositionsService) {
  }

  ngOnInit() {
    this.loading = true
    this.positionsService.fetch(this.categoryId).subscribe({
      next: (positions) => {
        console.log(this.categoryId)
        this.positions = positions
        this.loading = false
      }
    })
  }

}
