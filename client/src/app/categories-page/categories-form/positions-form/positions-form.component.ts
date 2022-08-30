import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {PositionsService} from '../../../shared/services/positions.service'
import {Position, PositionId} from '../../../shared/interfaces'
import {IMaterialInstance, MaterialService} from '../../../shared/classes/material.service'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import { Observable, Subscription } from 'rxjs'
import { transition } from '@angular/animations'

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.sass']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {
@Input('categoryId') categoryId!: string
@ViewChild('modal') modalRef!: ElementRef
positions: Position[] = []
positionId: null | string = null
loading = false
modal!: IMaterialInstance
form!: FormGroup



  constructor(private positionsService: PositionsService) {
  }

  onAddPosition() {
    this.positionId = null
    this.form.reset({name: null, cost: null})
    this.modal.open?.()
  }
  onSelectPosition(position: Position) {
    this.positionId = position._id as string
    this.form.patchValue({name: position.name, cost: position.cost})
    this.modal.open?.()
    MaterialService.updateTextInput()
  }
  onCancel() {
    this.modal.close?.()
  }
  onDeletePosition(position: Position) {

  }

  onSubmit() {
    this.form.disable()
    const newPosition: Position = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId
    }
    if(this.positionId) {
      //edit position
      newPosition._id = this.positionId
      this.positionsService.update(newPosition).subscribe({
        next: (pos) => {
          const indexSelectedPosition = this.positions.findIndex(p => p._id === pos._id)
          this.positions[indexSelectedPosition] = pos
          MaterialService.toast('Position has been changed')
        },
        error: (err) => {
          this.form.enable()
          MaterialService.toast(err.error.message)
        },
        complete: () => {
          this.modal.close?.()
          this.form.reset({name: '', cost: null})
          this.form.enable()
        }
      })
    } else {
      //or created position
      this.positionsService.create(newPosition).subscribe({
        next: (pos) => {
          this.positions.push(pos)
          MaterialService.toast('Position has been created')
        },
        error: (err) => {
          this.form.enable()
          MaterialService.toast(err.error.message)
        },
        complete: () => {
          this.modal.close?.()
          this.form.reset({name: '', cost: null})
          this.form.enable()
        }
      })

    }
  }


  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(null, [Validators.required, Validators.min(1)])
    })
    this.loading = true
    this.positionsService.fetch(this.categoryId).subscribe({
      next: (positions) => {
        this.positions = positions
        this.loading = false
      }
    })
  }
  ngOnDestroy(): void {
    console.log('destroy modal')
    this.modal.destroy?.()
  }
  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef)
  }


}
