import { Message } from './../../shared/interfaces';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import {ActivatedRoute, Params, Router} from '@angular/router'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {CategoriesService} from '../../shared/services/categories.service'
import {MaterialService} from '../../shared/classes/material.service'
import {Category} from '../../shared/interfaces'
import { of, switchMap } from 'rxjs'

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.sass']
})
export class CategoriesFormComponent implements OnInit {

  @ViewChild('input') inputRef!: ElementRef //доступ к #input

  form!: FormGroup
  image!: File
  imagePreview: string | any = ''
  isNew = true
  category!: Category | any

  constructor(private route: ActivatedRoute,
              private categoriesService: CategoriesService,
              private router: Router) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    })
  //  this.route.params.subscribe({
  //   next: (params: Params) => {
  //     if(params['id']) {
  //       //редактируем форму
  //       this.isNew = false
  //     }
  //     //добавление новой формы
  //   }
  //  })
   this.route.params.pipe(
    switchMap( (params: Params) => {
      if(params['id']) {
        this.isNew = false
        return this.categoriesService.getById(params['id'])
      }
      return of(null)
    })
   ).subscribe({
    next: category => {
      if(category) {
        this.category = category
        this.form.patchValue({
          name: category.name
        })
        this.imagePreview = category.imageSrc
        MaterialService.updateTextInput()
      }
    },
    error: err => MaterialService.toast(err.error.message)
  })
   }
triggerClick() {
  this.inputRef.nativeElement.click()
}
deleteCategory() {
  const decision = window.confirm(`Are you sure, you want to delete "${this.category.name}"`)
  if(decision) {
    this.categoriesService.delete(this.category._id).subscribe({
      next: (res) => {
        MaterialService.toast(res.message)
      },
      error: (err) => {
        MaterialService.toast(err.error.message)
      },
      complete: () => this.router.navigate(['/categories'])
    })
  }
}
onFileUpload(event: any) {
  const file = event.target.files[0]
  this.image = file

  const reader = new FileReader()
  reader.onload = () => {
    this.imagePreview = reader.result
  }
  reader.readAsDataURL(file)
}

  onSubmit() {
    let observable$
    this.form.disable()
    if(this.isNew) {
      //call service method 'create'
      observable$ = this.categoriesService.create(this.form.value.name, this.image)
    } else {
      //call service method 'update'
      observable$ = this.categoriesService.update(this.category._id, this.form.value.name, this.image)
    }
    observable$.subscribe({
      next: (category) => {
        this.category = category
        MaterialService.toast('Changes saved')
        this.form.enable()
      },
      error: (err) => {
        MaterialService.toast(err.error.message)
      }
    }

    )
  }


}
