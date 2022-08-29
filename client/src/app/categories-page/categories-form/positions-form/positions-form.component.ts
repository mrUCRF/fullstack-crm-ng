import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core'
import { Subscription } from 'rxjs'
import { PositionsService } from 'src/app/shared/services/positions.service'
import { IMaterialInstance, MaterialService } from 'src/app/shared/classes/material.service'
import { Position } from 'src/app/shared/interfaces'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.sass']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('modal') modalRef!: ElementRef
  @Input() categoryId!: string

  pSub!: Subscription

  modal: IMaterialInstance | any = null
  form!: FormGroup

  positions!: Position[]
  positionId: string | null = null
  loading = true

  constructor(private positionsService: PositionsService) {
  }

  ngOnInit() {
    this.pSub = this.positionsService.fetch(this.categoryId).subscribe(positions => {
      this.positions = positions
      this.loading = false
    })

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(null, [Validators.required, Validators.min(1)])
    })
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
    this.modal.destroy()
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  onSelectPosition(position: Position) {
    this.positionId = position._id as string
    this.form.patchValue({
      name: position.name,
      cost: position.cost
    })
    this.modal.open()
    MaterialService.updateTextInput()
  }

  addPosition() {
    this.positionId = null
    this.form.patchValue({
      name: null,
      cost: null
    })
    this.modal.open()
    MaterialService.updateTextInput()
  }

  removePosition(event: { stopPropagation: () => void }, position: Position) {
    event.stopPropagation()
    const decision = window.confirm('Вы уверены, что хотите удалить позицию?')
    if (decision) {
      this.positionsService.remove(position._id as string).subscribe({
        //response
        next: (res: any) => {
          const idx = this.positions.findIndex(p => p._id !== position._id)
          this.positions.splice(idx, 1)
          MaterialService.toast(res.message)
        },
        error: error => MaterialService.toast(error.error.message)
      }

      )
    }
  }

  onCancel() {
    this.modal.close()
    this.form.reset({name: '', cost: 0})
  }

  onSubmit() {
    this.form.disable()

    const position: Position = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId
    }

    if (this.positionId) {
      position._id = this.positionId
      this.positionsService.update(position).subscribe(
        pos => {
          const idx = this.positions.findIndex(p => p._id === pos._id)
          this.positions[idx] = pos
          MaterialService.toast('Изменения сохранены')
        },
        error => {
          this.form.enable()
          MaterialService.toast(error.error.message)
        },
        () => {
          this.modal.close()
          this.form.reset({name: '', cost: 0})
          this.form.enable()
        }
      )
    } else {
      this.positionsService.create(position).subscribe(
        pos => {
          this.positions.push(pos)
          MaterialService.toast('Изменения сохранены')
        },
        error => {
          this.form.enable()
          MaterialService.toast(error.error.message)
        },
        () => {
          this.modal.close()
          this.form.reset({name: '', cost: 0})
          this.form.enable()
        }
      )
    }
  }

}
