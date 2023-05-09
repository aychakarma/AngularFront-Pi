import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Reclamation} from "../../reclamation";
import {ReclamationService} from "../../reclamation.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.scss']
})
export class ReclamationComponent implements OnInit {
  //idUser=sessionStorage.getItem("id");
  descFormControl = new FormControl('', [Validators.required]);
  descriptionFormControl = new FormControl('', [Validators.required]);
  listRec: Reclamation[];
  rec = new Reclamation();
  reclamation = new Reclamation();
  userId =2;
  branches: any = [];
  constructor(private recServices:ReclamationService , private route: Router,public dialog: MatDialog){

  }



  ngOnInit(): void {
    this.refreshData();
  }

  refreshData() {
    this.recServices.countByStatus().subscribe((response3: any) => {
      const transformedResponse = {};
      response3.forEach((item: any) => {
        transformedResponse[item[0]] = item[1];
      });

      console.log(transformedResponse);

    });

    this.recServices.getReclamations().subscribe(
      data => {
        console.log("res", data);
        this.listRec = data;
      }
    );
  }

  updaterec(idReclamation: any) {
    this.recServices.updateReclamation(this.reclamation, idReclamation).subscribe(data => {
      console.log(data);
      this.dialog.closeAll();
      this.refreshData(); // Call the refreshData method after updating the record
    });
  }








  AddRec(): void {
    if (this.descriptionFormControl.valid && this.reclamation.dateRec && this.reclamation.typeRec) {
      this.recServices.createReclamation(this.reclamation, 1)
        .subscribe(response => {
          console.log(response);
          this.recServices.getReclamations().subscribe(
            res => {
              console.log("res", res);
              this.listRec = res;
            }
          );
        });
    } else {
      console.log("Form is not fully filled. Please fill all the required fields.");
    }
  }

  deleteReclamation(id: number){
    this.recServices.deleteReclamation(id).subscribe( data => {
      console.log(data);
      this.ngOnInit();
    })
  }


  openDialog(templateRef, rec: Reclamation) {
    this.reclamation = { ...rec };

    const dialogRef = this.dialog.open(templateRef, {
      width: '800px',
      data: this.reclamation
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}
